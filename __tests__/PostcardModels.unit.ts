import {
  Address,
  AddressDomesticExpanded,
  MailType,
  Postcard,
  PostcardCarrierEnum,
  PostcardDeletion,
  PostcardEditable,
  PostcardList,
  PostcardSize,
  Thumbnail,
  TrackingEventNormal,
} from "../models";
import { URL_VALID_LIST } from "./testFixtures";

describe("Postcard Models", () => {
  describe("Postcard", () => {
    it("can be created", () => {
      const rec = new Postcard();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "psc_fakeId"],
      ["to", new Address()],
      ["from", new AddressDomesticExpanded()],
      ["carrier", PostcardCarrierEnum.Usps],
      ["thumbnails", [new Thumbnail()]],
      ["size", PostcardSize._6x9],
      ["size", PostcardSize._6x11],
      ["size", PostcardSize._4x6],
      ["expected_delivery_date", new Date().toISOString()],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["deleted", true],
      ["deleted", false],
      ["front_template_id", "tmpl_fakeId"],
      ["back_template_id", "tmpl_fakeId"],
      ["front_template_version_id", "vrsn_fakeId"],
      ["back_template_version_id", "vrsn_fakeId"],
      ["tracking_events", [new TrackingEventNormal()]],
      ["object", "Postcard"],
      ["url", URL_VALID_LIST],
      ["description", "fake description"],
      ["metadata", {}],
      ["mail_type", MailType.Standard],
      ["mail_type", MailType.FirstClass],
      ["merge_variables", {}],
      ["send_date", new Date().toISOString()],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Postcard(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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
      expect(rec.front_template_id).toBeNull();

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
      expect(rec.front_template_id).toBeNull();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.front_template_id = val;
        expect(rec.front_template_id).toBeDefined();
        expect(rec.front_template_id).toEqual(val);
      }
    });

    it("rejects invalid values for back_template_id", () => {
      const rec = new Postcard();
      expect(rec.back_template_id).toBeNull();

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
      expect(rec.back_template_id).toBeNull();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.back_template_id = val;
        expect(rec.back_template_id).toBeDefined();
        expect(rec.back_template_id).toEqual(val);
      }
    });

    it("rejects invalid values for front_template_version_id", () => {
      const rec = new Postcard();
      expect(rec.front_template_version_id).toBeNull();

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
      expect(rec.front_template_version_id).toBeNull();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.front_template_version_id = val;
        expect(rec.front_template_version_id).toBeDefined();
        expect(rec.front_template_version_id).toEqual(val);
      }
    });

    it("rejects invalid values for back_template_version_id", () => {
      const rec = new Postcard();
      expect(rec.back_template_version_id).toBeNull();

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
      expect(rec.back_template_version_id).toBeNull();

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

    it.each([
      ["id", "psc_fakeId"],
      ["deleted", true],
      ["deleted", false],
      ["object", "Check"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new PostcardDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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

  describe("PostcardEditable", () => {
    it("can be created", () => {
      const rec = new PostcardEditable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["to", new Address()],
      ["from", new AddressDomesticExpanded()],
      ["size", PostcardSize._6x9],
      ["size", PostcardSize._6x11],
      ["size", PostcardSize._4x6],
      ["description", "fake description"],
      ["metadata", {}],
      ["mail_type", MailType.Standard],
      ["mail_type", MailType.FirstClass],
      ["merge_variables", {}],
      ["send_date", new Date().toISOString()],
      ["front", "fake front"],
      ["back", "fake back"],
      ["billing_group_id", "fake billing group"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new PostcardEditable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("PostcardList", () => {
    it("can be created", () => {
      const rec = new PostcardList();
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

      const rec = new PostcardList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new PostcardList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new PostcardList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeNull();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new PostcardList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new PostcardList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeNull();
      });
    });
  });
});
