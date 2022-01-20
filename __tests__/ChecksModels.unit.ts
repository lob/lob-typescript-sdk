import { CheckAllOf } from "../models/check-all-of";
import { CheckBaseAllOf, CheckBaseAllOfMailTypeEnum } from "../models/check-base-all-of"
import { CheckDeletion } from "../models/check-deletion";
import { CheckEditablePropsAllOf } from "../models/check-editable-props-all-of";
import { CheckInputTo } from "../models/check-input-to";

describe("Check Models", () => {
  describe("CheckAllOf", () => {
    it("can be created", () => {
      const rec = new CheckAllOf();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new CheckAllOf();
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
      const rec = new CheckAllOf();
      expect(rec.id).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("CheckBaseAllOf", () => {
    it("can be created", () => {
      const rec = new CheckBaseAllOf();
      expect(rec).toBeDefined();
    });


    it("allows setting valid values for mail type", () => {
      const rec = new CheckBaseAllOf();
      expect(rec.mail_type).not.toBeDefined();

      rec.mail_type = CheckBaseAllOfMailTypeEnum.UspsFirstClass;
      expect(rec.mail_type).toBeDefined();
    });

    it("allows setting valid values for memo", () => {
      const rec = new CheckBaseAllOf();
      expect(rec.memo).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.memo = val;
        expect(rec.memo).toBeDefined();
        expect(rec.memo).toEqual(val);
      }
    });
  });

  describe("CheckDeletion", () => {
    it("can be created", () => {
      const rec = new CheckDeletion();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new CheckDeletion();
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
      const rec = new CheckDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("CheckEditablePropsAllOf", () => {
    it("can be created", () => {
      const rec = new CheckEditablePropsAllOf();
      expect(rec).toBeDefined();
    });


    it("allows setting valid values for mail type", () => {
      const rec = new CheckEditablePropsAllOf();
      expect(rec.amount).not.toBeDefined();

      rec.amount = 1;
      expect(rec.amount).toBeDefined();
    });

    it("allows setting valid values for memo", () => {
      const rec = new CheckEditablePropsAllOf();
      expect(rec.from).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.from = val;
        expect(rec.from).toBeDefined();
        expect(rec.from).toEqual(val);
      }
    });
  });

  describe("CheckInputTo", () => {
    it("can be created", () => {
      const rec = new CheckInputTo();
      expect(rec).toBeDefined();
    });

    it("allows setting valid values for memo", () => {
      const rec = new CheckInputTo();
      expect(rec.to).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.to = val;
        expect(rec.to).toBeDefined();
        expect(rec.to).toEqual(val);
      }
    });
  });
});
