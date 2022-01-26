import {
  EngineHtml,
  Template,
  TemplateDeletion,
  TemplateList,
  TemplateUpdate,
  TemplateVersion,
  TemplateWritable,
} from "../models";

describe("Template Models", () => {
  describe("Template", () => {
    it("can be created", () => {
      const rec = new Template();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "tmpl_fakeId"],
      ["description", "fake description"],
      ["versions", [new TemplateVersion()]],
      ["published_version", new TemplateVersion()],
      ["object", "template"],
      ["metadata", {}],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["deleted", true],
      ["deleted", false],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Template(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new Template();
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
      const rec = new Template();
      expect(rec.id).not.toBeDefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("TemplateDeletion", () => {
    it("can be created", () => {
      const rec = new TemplateDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", ["tmpl_fakeId"]],
      ["object", "Address"],
      ["deleted", true],
      ["deleted", false],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new TemplateDeletion();
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
      const rec = new TemplateDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("TemplateList", () => {
    it("can be created", () => {
      const rec = new TemplateList();
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

      const rec = new TemplateList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new TemplateList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new TemplateList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new TemplateList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new TemplateList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });

  describe("TemplateUpdate", () => {
    it("can be created", () => {
      const rec = new TemplateUpdate();
      expect(rec).toBeDefined();
    });

    it.each([
      ["description", "fake description"],
      ["published_version", "vrsn_fakeId"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateUpdate(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for published_version", () => {
      const rec = new TemplateUpdate();
      expect(rec.published_version).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.published_version = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid published_version provided");
        }
      }
    });

    it("allows setting valid values for published_version", () => {
      const rec = new TemplateUpdate();
      expect(rec.published_version).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.published_version = val;
        expect(rec.published_version).toBeDefined();
        expect(rec.published_version).toEqual(val);
      }
    });
  });

  describe("TemplateWritable", () => {
    it("can be created", () => {
      const rec = new TemplateWritable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["description", "fake description"],
      ["html", "fake html"],
      ["metadata", {}],
      ["engine", EngineHtml.Legacy],
      ["engine", EngineHtml.Handlebars],
      ["engine", null],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateWritable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for published_version", () => {
      const rec = new TemplateUpdate();
      expect(rec.published_version).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.published_version = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid published_version provided");
        }
      }
    });

    it("allows setting valid values for published_version", () => {
      const rec = new TemplateUpdate();
      expect(rec.published_version).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.published_version = val;
        expect(rec.published_version).toBeDefined();
        expect(rec.published_version).toEqual(val);
      }
    });
  });
});
