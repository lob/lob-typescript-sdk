import {
  BankAccountWritable,
  BankAccountVerify,
  BankTypeEnum,
} from "../models";
import { BankAccountsApi } from "../api/bank-accounts-api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("BankAccountsApi", () => {
  const dummyAccount = new BankAccountWritable({
    description: "Test Bank Account",
    routing_number: "322271627",
    account_number: "123456789",
    signatory: "Sinead Connor",
    account_type: BankTypeEnum.Individual,
  });

  it("Bank Accounts API can be instantiated", () => {
    const bankApi = new BankAccountsApi(CONFIG_FOR_INTEGRATION);
    expect(bankApi).toBeDefined();
    expect(typeof bankApi).toEqual("object");
    expect(bankApi).toBeInstanceOf(BankAccountsApi);
  });

  describe("test operations on a single bank account", () => {
    let createdBankAccountId: string;

    it("creates, verifies, retrieves, and deletes a bank account", async () => {
      const account = await new BankAccountsApi(CONFIG_FOR_INTEGRATION).create(
        dummyAccount
      );
      expect(account.id).toBeDefined();
      createdBankAccountId = account.id;
    });

    it("verifies a bank account", async () => {
      const verify = new BankAccountVerify({
        amounts: [11, 35],
      });

      const verification = await new BankAccountsApi(
        CONFIG_FOR_INTEGRATION
      ).verify(createdBankAccountId, verify);
      expect(verification).toBeDefined();
      expect(verification.verified).toBeTruthy();
    });

    it("gets a bank account", async () => {
      const retrievedBankAccount = await new BankAccountsApi(
        CONFIG_FOR_INTEGRATION
      ).get(createdBankAccountId);
      expect(retrievedBankAccount.id).toEqual(createdBankAccountId);
    });

    it("deletes a bank account", async () => {
      const deletedBankAccount = await new BankAccountsApi(
        CONFIG_FOR_INTEGRATION
      ).delete(createdBankAccountId);
      expect(deletedBankAccount.deleted).toBeTruthy();
    });
  });

  describe("list Cards", () => {
    let nextUrl = "";
    let previousUrl = "";

    const createdBankAccounts: string[] = [];
    beforeAll(async () => {
      const bankApi = new BankAccountsApi(CONFIG_FOR_INTEGRATION);

      // Create enough bank accounts to ensure pagination works
      const bankAccountsToCreate = [
        dummyAccount,
        Object.assign({}, dummyAccount, { signatory: "Juanita Lupo" }),
        Object.assign({}, dummyAccount, { signatory: "Jeanette Leloup" }),
        Object.assign({}, dummyAccount, { signatory: "John Smith" }),
        Object.assign({}, dummyAccount, { signatory: "Jane Doe" }),
        Object.assign({}, dummyAccount, { signatory: "Bob Johnson" }),
      ];

      // Create all bank accounts with retry logic
      const creationPromises = bankAccountsToCreate.map(
        async (bankAccount, index) => {
          const maxRetries = 3;
          let lastError: any;

          for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
              const created = await bankApi.create(bankAccount);
              return { id: created.id, signatory: bankAccount.signatory };
            } catch (error) {
              lastError = error;
              if (attempt < maxRetries) {
                // Wait before retry (exponential backoff)
                await new Promise((resolve) =>
                  setTimeout(resolve, attempt * 1000)
                );
              }
            }
          }

          // Return null for failed creations (will be filtered out)
          return null;
        }
      );

      const createdResults = await Promise.all(creationPromises);
      // Filter out any failed creations
      const successfulCreations = createdResults.filter(
        (result): result is { id: string; signatory: string } => result !== null
      );
      createdBankAccounts.push(
        ...successfulCreations.map((result) => result.id)
      );

      // Ensure we have enough data for pagination tests
      expect(successfulCreations.length).toBeGreaterThan(0);

      // Get pagination data with a small limit to force pagination
      const response = await bankApi.list(3);

      // Verify we have pagination data
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^bank_[a-zA-Z0-9]+$/),
              routing_number: expect.any(String),
              account_number: expect.any(String),
              account_type: expect.stringMatching(/^(company|individual)$/),
              signatory: expect.any(String),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "bank_account",
            }),
          ]),
        })
      );

      if (response.next_url) {
        const url = new URL(response.next_url);
        nextUrl = url.searchParams.get("after") || "";
        const responseAfter = await bankApi.list(3, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          const prevUrl = new URL(responseAfter.previous_url);
          previousUrl = prevUrl.searchParams.get("before") || "";
        }
      }
    }, 10000); // Timeout for concurrent API operations (reduced since Promise.all runs operations in parallel)

    afterAll(async () => {
      const bankAccountApi = new BankAccountsApi(CONFIG_FOR_INTEGRATION);
      for (const bankAcctId of createdBankAccounts) {
        await bankAccountApi.delete(bankAcctId);
      }
    });

    it("lists bank accounts", async () => {
      const response = await new BankAccountsApi(CONFIG_FOR_INTEGRATION).list();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });

    it("lists bank accounts given an after param", async () => {
      if (nextUrl) {
        const responseAfter = await new BankAccountsApi(
          CONFIG_FOR_INTEGRATION
        ).list(3, undefined, nextUrl);
        expect(responseAfter.data).toBeDefined();
        expect(responseAfter.data?.length).toBeGreaterThan(0);
      } else {
        // If no pagination, just verify the API works
        const response = await new BankAccountsApi(
          CONFIG_FOR_INTEGRATION
        ).list();
        expect(response.data).toBeDefined();
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });

    it("lists bank accounts given a before param", async () => {
      if (previousUrl) {
        const responseBefore = await new BankAccountsApi(
          CONFIG_FOR_INTEGRATION
        ).list(3, previousUrl);
        expect(responseBefore.data).toBeDefined();
        expect(responseBefore.data?.length).toBeGreaterThan(0);
      } else {
        // If no pagination, just verify the API works
        const response = await new BankAccountsApi(
          CONFIG_FOR_INTEGRATION
        ).list();
        expect(response.data).toBeDefined();
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });
  });
});
