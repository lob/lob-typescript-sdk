import {
  BankAccount,
  BankAccountWritable,
  BankAccountVerify,
  BankTypeEnum,
} from "../models";
import { BankAccountsApi } from "../api/bank-accounts-api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("BankAccountsApi", () => {
  const dummyAccount: BankAccountWritable = {
    description: "Test Bank Account",
    routing_number: "322271627",
    account_number: "123456789",
    signatory: "Sinead Connor",
    account_type: BankTypeEnum.Individual,
  };

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
      const verify: BankAccountVerify = {
        amounts: [11, 35],
      };

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
    let bankList: BankAccount[] = [];

    const createdBankAccounts: string[] = [];
    beforeAll(async () => {
      const bankApi = new BankAccountsApi(CONFIG_FOR_INTEGRATION);

      // ensure there are at least 3 cards present, to test pagination
      const bank1: BankAccountWritable = {
        description: "Test Bank Account",
        routing_number: "322271627",
        account_number: "123456789",
        signatory: "Zsanett Farkas",
        account_type: BankTypeEnum.Individual,
      };
      const bank2: BankAccountWritable = Object.assign({}, bank1, {
        signatory: "Juanita Lupo",
      });
      const bank3: BankAccountWritable = Object.assign({}, bank1, {
        signatory: "Jeanette Leloup",
      });
      createdBankAccounts.push((await bankApi.create(bank1)).id);
      createdBankAccounts.push((await bankApi.create(bank2)).id);
      createdBankAccounts.push((await bankApi.create(bank3)).id);

      const response = await bankApi.list();
      if (response && response.next_url) {
        nextUrl = response.next_url.slice(
          response.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await bankApi.list(10, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        } else {
          throw new Error(
            "list should not be empty, and should contain a valid previous_url field"
          );
        }
      } else {
        throw new Error(
          "list should not be empty, and should contain a valid next_url field"
        );
      }
    });

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
      const responseAfter = await new BankAccountsApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, undefined, nextUrl);
      expect(responseAfter.data).toBeDefined();
      expect(responseAfter.data?.length).toBeGreaterThan(0);
    });

    it("lists bank accounts given a before param", async () => {
      const responseBefore = await new BankAccountsApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, previousUrl);
      expect(responseBefore.data).toBeDefined();
      expect(responseBefore.data?.length).toBeGreaterThan(0);
    });
  });
});
