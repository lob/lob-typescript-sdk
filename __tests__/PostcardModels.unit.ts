import { Postcard, PostcardDeletion } from "../models";
import {URL_VALID_LIST} from "./testFixtures";

describe("Postcard Models", () => {
  describe("Postcard", () => {
    it("can be created", () => {
      const rec = new Postcard();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new Postcard();
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
      const rec = new Postcard();
      expect(rec.id).not.toBeDefined();

      const validValues = ["psc_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for front_template_id", () => {
      const rec = new Postcard();
      expect(rec.front_template_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.front_template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid front_template_id provided");
        }
      }
    });

    it("allows setting valid values for front_template_id", () => {
      const rec = new Postcard();
      expect(rec.front_template_id).toBeUndefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.front_template_id = val;
        expect(rec.front_template_id).toBeDefined();
        expect(rec.front_template_id).toEqual(val);
      }
    });

    it("rejects invalid values for back_template_id", () => {
      const rec = new Postcard();
      expect(rec.back_template_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.back_template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid back_template_id provided");
        }
      }
    });

    it("allows setting valid values for back_template_id", () => {
      const rec = new Postcard();
      expect(rec.back_template_id).toBeUndefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.back_template_id = val;
        expect(rec.back_template_id).toBeDefined();
        expect(rec.back_template_id).toEqual(val);
      }
    });

    it("rejects invalid values for front_template_version_id", () => {
      const rec = new Postcard();
      expect(rec.front_template_version_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.front_template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual(
            "Invalid front_template_version_id provided"
          );
        }
      }
    });

    it("allows setting valid values for front_template_version_id", () => {
      const rec = new Postcard();
      expect(rec.front_template_version_id).toBeUndefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.front_template_version_id = val;
        expect(rec.front_template_version_id).toBeDefined();
        expect(rec.front_template_version_id).toEqual(val);
      }
    });

    it("rejects invalid values for back_template_version_id", () => {
      const rec = new Postcard();
      expect(rec.back_template_version_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.back_template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual(
            "Invalid back_template_version_id provided"
          );
        }
      }
    });

    it("allows setting valid values for back_template_version_id", () => {
      const rec = new Postcard();
      expect(rec.back_template_version_id).toBeUndefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.back_template_version_id = val;
        expect(rec.back_template_version_id).toBeDefined();
        expect(rec.back_template_version_id).toEqual(val);
      }
    });

    it("rejects invalid values for url", () => {
      const rec = new Postcard();
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
      const rec = new Postcard();
      expect(rec.url).not.toBeDefined();

      const validValues = URL_VALID_LIST;
      for (const val of validValues) {
        rec.url = val;
        expect(rec.url).toBeDefined();
        expect(rec.url).toEqual(val);
      }
    });
  });

  describe("PostcardDeletion", () => {
    it("can be created", () => {
      const rec = new PostcardDeletion();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new PostcardDeletion();
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
      const rec = new PostcardDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["psc_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });
});
