import { Configuration } from "../configuration";

import { ChecksApi } from "../api/checks-api";
import { CheckEditable } from "../models/check-editable";
import { Check } from "../models/check";
import { BankAccount, BankAccountsApi, BankAccountVerify, BankAccountWritable, BankTypeEnum, CountryExtended, MailType } from "..";

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
    bankApi = new BankAccountsApi(config);
    account = await bankApi.create(dummyAccount);
    const verify: BankAccountVerify = {
      amounts: [11, 35],
    };
    if (account?.id) {
      const verification = await bankApi.verify(account.id, verify);
      expect(verification).toBeDefined();
      expect(verification?.verified).toBeTruthy();
    }
  });
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  it("Checks API can be instantiated", () => {
    const checksApi = new ChecksApi(config);
    expect(checksApi).toBeDefined();
    expect(typeof checksApi).toEqual("object");
    expect(checksApi).toBeInstanceOf(ChecksApi);
  });

  it("all individual Check functions exists", () => {
    const checksApi = new ChecksApi(config);
    expect(checksApi.Cancel).toBeDefined();
    expect(typeof checksApi.Cancel).toEqual("function");

    expect(checksApi.Create).toBeDefined();
    expect(typeof checksApi.Create).toEqual("function");

    expect(checksApi.List).toBeDefined();
    expect(typeof checksApi.List).toEqual("function");

    expect(checksApi.Retrieve).toBeDefined();
    expect(typeof checksApi.Retrieve).toEqual("function");
  });

  describe("performs single-Check operations", () => {
    describe("creates, retrieves, cancels, and lists a check", () => {
      let createCheck: CheckEditable;
      let checksApi: ChecksApi;

      beforeAll(() => {
        createCheck = {
          description: "check 1",
          to: {
            company: "Lob (old)",
            address_line1: "210 King St",
            address_line2: "# 6100",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: CountryExtended.Us,
          },
          from: {
            company: "Lob (new)",
            address_line1: "210 King St",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: "US",
          },
          bank_account: account.id,
          amount: 100,
        };

        checksApi = new ChecksApi(config);
      });

      it("creates a check", async () => {
        // Create
        const createdCheck = await new ChecksApi(config).Create(createCheck);
        expect(createdCheck?.id).toBeDefined();
        expect(createdCheck?.description).toEqual(createCheck.description);
      });

      it("Retrieves a check", async () => {
        // Retrieve
        const createdCheck = await new ChecksApi(config).Create(createCheck);

        const retrievedCheck = await checksApi.Retrieve(createdCheck.id as string);
        expect(retrievedCheck).toBeDefined();
        expect(retrievedCheck?.id).toEqual(createdCheck?.id);
      });

      it("Cancels a check", async () => {
        // Cancel
        const createdCheck = await new ChecksApi(config).Create(createCheck);
  
        const cancelledCheck = await checksApi.Cancel(createdCheck.id as string);
        expect(cancelledCheck).toBeDefined();
        expect(cancelledCheck?.id).toEqual(createdCheck?.id);
      });

      it("Lists a check", async () => {
        // List
        const createdCheck = await new ChecksApi(config).Create(createCheck);
  
        const updatedCheck = await checksApi.List(
          1
        );
        expect(updatedCheck).toBeDefined();
      });
    });
  });
    

  describe("list checks", () => {
    let createdChecks: Check[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 checks present, to test pagination
      const check1: CheckEditable = {
        description: "check 1",
        to: {
          company: "Lob (old)",
          address_line1: "210 King St",
          address_line2: "# 6100",
          address_city: "San Francisco",
          address_state: "CA",
          address_zip: "94107",
          address_country: CountryExtended.Us,
        },
        from: {
          company: "Lob (new)",
          address_line1: "210 King St",
          address_city: "San Francisco",
          address_state: "CA",
          address_zip: "94107",
          address_country: "US",
        },
        bank_account: account.id,
        amount: 100,
      };
      const check2: CheckEditable = Object.assign({}, check1, {
        description: "Check 2",
        amount: 200,
      });
      const check3: CheckEditable = Object.assign({}, check1, {
        description: "Check 3",
        amount: 300,
      });

      const checksApi = new ChecksApi(config);
      await Promise.all([
        checksApi.Create(check1),
        checksApi.Create(check2),
        checksApi.Create(check3),
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
      const checksApi = new ChecksApi(config);
      expect(checksApi.List).toBeDefined();
      expect(typeof checksApi.List).toEqual("function");
    });

    it("lists checks", async () => {
      const response = await new ChecksApi(config).List();
      expect(response?.data).toBeDefined();
      const bgList = response?.data || [];
      expect(bgList.length).toBeGreaterThan(0);
    });
  });
});
