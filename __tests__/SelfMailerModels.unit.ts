import {
  SelfMailer,
  SelfMailerDeletion
} from "../models";

import {URL_VALID_LIST} from "./testFixtures";

describe("SelfMailer Models", () => {
  describe("SelfMailer", () => {
    it("can be created", () => {
      const rec = new SelfMailer();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new SelfMailer();
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
      const rec = new SelfMailer();
      expect(rec.id).not.toBeDefined();

      const validValues = ["sfm_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for url", () => {
      const rec = new SelfMailer();
      expect(rec.url).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.url = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid url provided");
        }
      }
    });

    it("allows setting valid values for url", () => {
      const rec = new SelfMailer();
      expect(rec.url).not.toBeDefined();

      const validValues = URL_VALID_LIST;
      for (const val of validValues) {
        rec.url = val;
        expect(rec.url).toBeDefined();
        expect(rec.url).toEqual(val);
      }
    });
  });

  describe("SelfMailerDeletion", () => {
    it("can be created", () => {
      const rec = new SelfMailerDeletion();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new SelfMailerDeletion();
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
      const rec = new SelfMailerDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["sfm_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });
});
