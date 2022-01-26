import {
  BankAccount,
  BankAccountDeletion,
  BankAccountDeletionObjectEnum,
  BankAccountList,
  BankAccountVerify,
  BankAccountWritable,
  BankTypeEnum,
} from "../models";
import { URL_VALID_LIST } from "./testFixtures";

describe("Bank Account Models", () => {
  describe("BankAccount", () => {
    it("can be created", () => {
      const rec = new BankAccount();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "bank_fakeId"],
      ["description", "fake description"],
      ["routing_number", "fake routing"],
      ["account_number", "fake account"],
      ["account_type", BankTypeEnum.Company],
      ["account_type", BankTypeEnum.Individual],
      ["signatory", "fake signatory"],
      ["metadata", {}],
      ["signature_url", URL_VALID_LIST],
      ["bank_name", "Bank"],
      ["verified", false],
      ["verified", true],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["deleted", false],
      ["deleted", true],
      ["object", "Bank"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BankAccount(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new BankAccount();
      expect(rec.id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid id provided");
        }
      }
    });

    it("allows setting valid values for id", () => {
      const rec = new BankAccount();
      expect(rec.id).not.toBeDefined();

      const validValues = ["bank_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for signature_url", () => {
      const rec = new BankAccount();
      expect(rec.signature_url).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.signature_url = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid signature_url provided");
        }
      }
    });

    it("allows setting valid values for signature_url", () => {
      const rec = new BankAccount();
      expect(rec.signature_url).not.toBeDefined();

      const validValues = URL_VALID_LIST;
      for (const val of validValues) {
        rec.signature_url = val;
        expect(rec.signature_url).toBeDefined();
        expect(rec.signature_url).toEqual(val);
      }
    });
  });

  describe("BankAccountDeletion", () => {
    it("can be created", () => {
      const rec = new BankAccountDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "bank_fakeId"],
      ["deleted", true],
      ["object", BankAccountDeletionObjectEnum],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BankAccountDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new BankAccountDeletion();
      expect(rec.id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid id provided");
        }
      }
    });

    it("allows setting valid values for id", () => {
      const rec = new BankAccountDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["bank_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("BankAccountList", () => {
    it("can be created", () => {
      const rec = new BankAccountList();
      expect(rec).toBeDefined();
    });

    it.each([
      ["object", "Address"],
      ["data", []],
      ["next_url", "some url"],
      ["previous_url", "some url"],
      ["count", 1],
      ["total_count", 100],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BankAccountList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new BankAccountList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new BankAccountList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new BankAccountList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new BankAccountList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });

  describe("BankAccountVerify", () => {
    it("can be created", () => {
      const rec = new BankAccountVerify();
      expect(rec).toBeDefined();
    });

    it.each([["amounts", [1, 2]]])(
      "can be created with a provided %s value",
      (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new BankAccountVerify(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
      }
    );
  });

  describe("BankAccountWritable", () => {
    it("can be created", () => {
      const rec = new BankAccountWritable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["description", "fake description"],
      ["routing_number", "fake routing"],
      ["account_number", "fake account"],
      ["account_type", BankTypeEnum.Company],
      ["signatory", "fake signatory"],
      ["metadata", {}],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BankAccountWritable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });
});
