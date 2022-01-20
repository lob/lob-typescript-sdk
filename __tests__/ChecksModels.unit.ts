import { CheckDeletion } from "../models/check-deletion";

describe("Check Models", () => {
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
      const rec = new CheckEditableProps();
      expect(rec).toBeDefined();
    });


    it("allows setting valid values for mail type", () => {
      const rec = new CheckEditableProps();
      expect(rec.amount).not.toBeDefined();

      rec.amount = 1;
      expect(rec.amount).toBeDefined();
    });

    it("allows setting valid values for memo", () => {
      const rec = new CheckEditableProps();
      expect(rec.from).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.from = val;
        expect(rec.from).toBeDefined();
        expect(rec.from).toEqual(val);
      }
    });
  });
});
