import { BankAccount, BankAccountDeletion } from "../models";
import {URL_VALID_LIST} from "./testFixtures";

describe("Bank Account Models", () => {
  describe("BankAccount", () => {
    it("can be created", () => {
      const rec = new BankAccount();
      expect(rec).toBeDefined();
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
});
