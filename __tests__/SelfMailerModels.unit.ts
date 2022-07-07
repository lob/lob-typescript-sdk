import {
  AddressEditable,
  MailType,
  SelfMailer,
  SelfMailerDeletion,
  SelfMailerEditable,
  SelfMailerList,
  SelfMailerSize,
} from "../models";

import { URL_VALID_LIST } from "./testFixtures";

describe("SelfMailer Models", () => {
  describe("SelfMailer", () => {
    it("can be created", () => {
      const rec = new SelfMailer();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "sfm_fakeId"],
      ["to", new AddressEditable()],
      ["from", new AddressEditable()],
      ["size", SelfMailerSize._11x9Bifold],
      ["size", SelfMailerSize._12x9Bifold],
      ["size", SelfMailerSize._6x18Bifold],
      ["description", "fake description"],
      ["metadata", {}],
      ["mail_type", MailType.Standard],
      ["mail_type", MailType.FirstClass],
      ["merge_variables", {}],
      ["send_date", new Date().toISOString()],
      ["outside_template_id", "tmpl_outsideFakeId"],
      ["inside_template_id", "tmpl_insideFakeId"],
      ["outside_template_version_id", "vrsn_outsideFakeId"],
      ["inside_template_version_id", "vrsn_insideFakeId"],
      ["object", "self_mailer"],
      ["tracking_events", []],
      ["url", URL_VALID_LIST],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new SelfMailer(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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

    it("rejects invalid values for outside_template_id", () => {
      const rec = new SelfMailer();
      expect(rec.outside_template_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.outside_template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid outside_template_id provided");
        }
      }
    });

    it("rejects invalid values for outside_template_id", () => {
      const rec = new SelfMailer();
      expect(rec.inside_template_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.inside_template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid inside_template_id provided");
        }
      }
    });

    it("rejects invalid values for outside_template_version_id", () => {
      const rec = new SelfMailer();
      expect(rec.outside_template_version_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.outside_template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual(
            "Invalid outside_template_version_id provided"
          );
        }
      }
    });

    it("rejects invalid values for inside_template_version_id", () => {
      const rec = new SelfMailer();
      expect(rec.inside_template_version_id).toBeUndefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.inside_template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual(
            "Invalid inside_template_version_id provided"
          );
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

  describe("SelfMailerEditable", () => {
    it("can be created", () => {
      const rec = new SelfMailerEditable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["to", new AddressEditable()],
      ["from", new AddressEditable()],
      ["size", SelfMailerSize._11x9Bifold],
      ["size", SelfMailerSize._12x9Bifold],
      ["size", SelfMailerSize._6x18Bifold],
      ["description", "fake description"],
      ["metadata", {}],
      ["mail_type", MailType.Standard],
      ["mail_type", MailType.FirstClass],
      ["merge_variables", {}],
      ["send_date", new Date().toISOString()],
      ["inside", "fake inside"],
      ["outside", "fake outside"],
      ["billing_group_id", "fake billing_group_id"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new SelfMailerEditable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("SelfMailerDeletion", () => {
    it("can be created", () => {
      const rec = new SelfMailerDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "sfm_fakeId"],
      ["deleted", true],
      ["deleted", false],
      ["object", "tracking_event"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new SelfMailerDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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

  describe("SelfMailerList", () => {
    it("can be created", () => {
      const rec = new SelfMailerList();
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

      const rec = new SelfMailerList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new SelfMailerList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new SelfMailerList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new SelfMailerList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new SelfMailerList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });
});
