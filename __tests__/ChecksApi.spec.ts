import { ChecksApi } from "../api/checks-api";
import { CheckEditable } from "../models";
import { Check } from "../models";
import {
  BankAccount,
  BankAccountsApi,
  BankAccountVerify,
  BankAccountWritable,
  BankTypeEnum,
} from "..";
import { ADDRESSES_EDITABLE, CONFIG_FOR_INTEGRATION } from "./testFixtures";

let bankApi: BankAccountsApi;
let account: BankAccount;
describe("ChecksApi", () => {
  beforeAll(async () => {
    const dummyAccount: BankAccountWritable = {
      description: "Test Bank Account",
      routing_number: "322271627",
      account_number: "123456789",
      signatory: "Sinead Connor",
      account_type: BankTypeEnum.Individual,
    };
    bankApi = new BankAccountsApi(CONFIG_FOR_INTEGRATION);
    account = await bankApi.create(dummyAccount);
    const verify: BankAccountVerify = {
      amounts: [11, 35],
    };
    if (account.id) {
      const verification = await bankApi.verify(account.id, verify);
      expect(verification).toBeDefined();
      expect(verification.verified).toBeTruthy();
    }
  });

  it("Checks API can be instantiated", () => {
    const checksApi = new ChecksApi(CONFIG_FOR_INTEGRATION);
    expect(checksApi).toBeDefined();
    expect(typeof checksApi).toEqual("object");
    expect(checksApi).toBeInstanceOf(ChecksApi);
  });

  it("all individual Check functions exists", () => {
    const checksApi = new ChecksApi(CONFIG_FOR_INTEGRATION);
    expect(checksApi.cancel).toBeDefined();
    expect(typeof checksApi.cancel).toEqual("function");

    expect(checksApi.create).toBeDefined();
    expect(typeof checksApi.create).toEqual("function");

    expect(checksApi.list).toBeDefined();
    expect(typeof checksApi.list).toEqual("function");

    expect(checksApi.get).toBeDefined();
    expect(typeof checksApi.get).toEqual("function");
  });

  describe("performs single-Check operations", () => {
    describe("creates, retrieves, cancels, and lists a check", () => {
      let createCheck: CheckEditable;
      let checksApi: ChecksApi;

      beforeAll(() => {
        createCheck = new CheckEditable({
          description: "check 1",
          to: ADDRESSES_EDITABLE[0],
          from: ADDRESSES_EDITABLE[1],
          bank_account: account.id,
          amount: 100,
        });

        checksApi = new ChecksApi(CONFIG_FOR_INTEGRATION);
      });

      it("creates a check", async () => {
        // create
        const createdCheck = await new ChecksApi(CONFIG_FOR_INTEGRATION).create(
          createCheck
        );
        expect(createdCheck.id).toBeDefined();
        expect(createdCheck.description).toEqual(createCheck.description);
      });

      it("Retrieves a check", async () => {
        // Retrieve
        const createdCheck = await new ChecksApi(CONFIG_FOR_INTEGRATION).create(
          createCheck
        );

        const retrievedCheck = await checksApi.get(createdCheck.id as string);
        expect(retrievedCheck).toBeDefined();
        expect(retrievedCheck.id).toEqual(createdCheck.id);
      });

      it("cancels a check", async () => {
        // cancel
        const createdCheck = await new ChecksApi(CONFIG_FOR_INTEGRATION).create(
          createCheck
        );

        const cancelledCheck = await checksApi.cancel(
          createdCheck.id as string
        );
        expect(cancelledCheck).toBeDefined();
        expect(cancelledCheck.id).toEqual(createdCheck.id);
      });

      it("Lists a check", async () => {
        // List
        const createdCheck = await new ChecksApi(CONFIG_FOR_INTEGRATION).create(
          createCheck
        );

        const updatedCheck = await checksApi.list(1);
        expect(updatedCheck).toBeDefined();
      });
    });
  });

  describe("list checks", () => {
    let createdChecks: Check[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 checks present, to test pagination
      const check1 = new CheckEditable({
        description: "check 1",
        to: ADDRESSES_EDITABLE[0],
        from: ADDRESSES_EDITABLE[1],
        bank_account: account.id,
        amount: 100,
      });
      const check2 = new CheckEditable(Object.assign({}, check1, {
        description: "Check 2",
        amount: 200,
      }));
      const check3 = new CheckEditable(Object.assign({}, check1, {
        description: "Check 3",
        amount: 300,
      }));

      const checksApi = new ChecksApi(CONFIG_FOR_INTEGRATION);
      await Promise.all([
        checksApi.create(check1),
        checksApi.create(check2),
        checksApi.create(check3),
      ])
        .then((creationResults) => {
          expect(creationResults.length).toEqual(3);
          createdChecks = createdChecks.concat(creationResults);
        })
        .catch((err) => {
          throw err;
        });
    });

    it("exists", () => {
      const checksApi = new ChecksApi(CONFIG_FOR_INTEGRATION);
      expect(checksApi.list).toBeDefined();
      expect(typeof checksApi.list).toEqual("function");
    });

    it("lists checks", async () => {
      const response = await new ChecksApi(CONFIG_FOR_INTEGRATION).list();
      expect(response.data).toBeDefined();
      const bgList = response.data || [];
      expect(bgList.length).toBeGreaterThan(0);
    });
  });
});
