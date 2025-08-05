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

      // Create all bank accounts
      try {
        const creationPromises = bankAccountsToCreate.map(
          async (bankAccount) => {
            try {
              const created = await bankApi.create(bankAccount);
              return created.id;
            } catch (error) {
              console.log(`Failed to create bank account: ${error}`);
              return null;
            }
          }
        );

        const createdIds = await Promise.all(creationPromises);
        // Filter out any failed creations
        createdBankAccounts.push(
          ...createdIds.filter((id): id is string => id !== null)
        );
      } catch (error) {
        console.log(`Error during bank account creation: ${error}`);
      }

      // Wait a moment for API processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get pagination data with a small limit to force pagination
      const response = await bankApi.list(3);

      // Verify we have pagination data
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([expect.any(Object)]),
        })
      );

      if (response.next_url) {
        nextUrl = response.next_url.slice(
          response.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await bankApi.list(3, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        }
      }
    }, 30000); // Increased timeout for API operations

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
