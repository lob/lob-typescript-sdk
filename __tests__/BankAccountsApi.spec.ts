import { Configuration } from "../configuration";

import { BankAccount, BankAccountWritable, BankAccountVerify, BankTypeEnum } from "../models";
import { BankAccountsApi } from "../api/bank-accounts-api";

describe("BankAccountsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });
  let bankApi: BankAccountsApi;

  const dummyAccount: BankAccountWritable = {
    description: "Test Bank Account",
    routing_number: "322271627",
    account_number: "123456789",
    signatory: "Sinead Connor",
    account_type: BankTypeEnum.Individual,
  };

  it("Bank Accounts API can be instantiated", () => {
    bankApi = new BankAccountsApi(config);
    expect(bankApi).toBeDefined();
    expect(typeof bankApi).toEqual("object");
    expect(bankApi).toBeInstanceOf(BankAccountsApi);
  });

  describe("test operations on a single bank account", () => {
    it("create exists", () => {
      expect(bankApi.create).toBeDefined();
      expect(typeof bankApi.create).toEqual("function");
    });

    it("creates, verifies, retrieves, and deletes a bank account", async () => {
      const account = await bankApi.create(dummyAccount);
      const verify: BankAccountVerify = {
        amounts: [11, 35],
      };
      if (account?.id) {
        const verification = await bankApi.verify(
          account.id,
          verify
        );
        expect(verification).toBeDefined();
        expect(verification?.verified).toBeTruthy();

        const retrievedBankAccount = await bankApi.get(account.id);
        expect(retrievedBankAccount?.id).toEqual(account.id);

        const deletedBankAccount = await bankApi.delete(account.id);
        expect(deletedBankAccount?.deleted).toBeTruthy();
      } else {
        throw new Error("bank account ID must be defined on creation");
      }
    });
  });

  describe("list Cards", () => {
    let nextUrl = "";
    let previousUrl = "";
    let bankList: BankAccount[] = [];
    beforeAll(async () => {
      // ensure there are at least 3 cards present, to test pagination
      const bank1: BankAccountWritable = {
        description: "Test Bank Account",
        routing_number: "322271627",
        account_number: "123456789",
        signatory: "Zsanett Farkas",
        account_type: BankTypeEnum.Individual,
      };
      const bank2: BankAccountWritable = {
        description: "Test Bank Account",
        routing_number: "322271627",
        account_number: "123456789",
        signatory: "Juanita Lupo",
        account_type: BankTypeEnum.Individual,
      };
      const bank3: BankAccountWritable = {
        description: "Test Bank Account",
        routing_number: "322271627",
        account_number: "123456789",
        signatory: "Jeanette Leloup",
        account_type: BankTypeEnum.Individual,
      };
      const c1 = await bankApi.create(bank1);
      const c2 = await bankApi.create(bank2);
      const c3 = await bankApi.create(bank3);

      const response = await bankApi.list();
      if (response && response.next_url) {
        nextUrl = response?.next_url.slice(
          response?.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await bankApi.list(10, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        } else {
          throw new Error("list should not be empty, and should contain a valid previous_url field")
        }
      } else {
        throw new Error("list should not be empty, and should contain a valid next_url field")
      }
    });

    it("exists", () => {
      expect(bankApi.list).toBeDefined();
      expect(typeof bankApi.list).toEqual("function");
    });

    it("lists bank accounts", async () => {
      const response = await bankApi.list();
      expect(response?.data).toBeDefined();
      bankList = response?.data || [];
      expect(bankList.length).toBeGreaterThan(0);
    });

    it("lists bank accounts given an after param", async () => {
      const responseAfter = await bankApi.list(10, undefined, nextUrl);
      expect(responseAfter?.data).toBeDefined();
      const bankList2: BankAccount[] = responseAfter?.data || [];
      expect(bankList2.length).toBeGreaterThan(0);
    });

    it("lists bank accounts given a before param", async () => {
      const responseBefore = await bankApi.list(10, previousUrl);
      expect(responseBefore?.data).toBeDefined();
      const bankList3: BankAccount[] = responseBefore?.data || [];
      expect(bankList3.length).toBeGreaterThan(0);
    });
  });
});
