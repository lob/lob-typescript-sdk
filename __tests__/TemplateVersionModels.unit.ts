import {
  EngineHtml,
  TemplateVersion,
  TemplateVersionDeletion,
  TemplateVersionList,
  TemplateVersionUpdatable,
  TemplateVersionWritable
} from "../models";

describe("TemplateVersion Models", () => {
  describe("TemplateVersion", () => {
    it("can be created", () => {
      const rec = new TemplateVersion();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "id", "vrsn_fakeId" ],
      [ "description", "fake description" ],
      [ "html", "fake html" ],
      [ "engine", EngineHtml.Legacy ],
      [ "engine", EngineHtml.Handlebars ],
      [ "engine", null ],
      [ "suggest_json_editor", true ],
      [ "suggest_json_editor", false ],
      [ "merge_variables", {} ],
      [ "date_created", new Date().toISOString() ],
      [ "date_modified", new Date().toISOString() ],
      [ "deleted", true ],
      [ "deleted", false ],
      [ "object", "template_version" ]
  ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateVersion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new TemplateVersion();
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
      const rec = new TemplateVersion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("TemplateVersionDeletion", () => {
    it("can be created", () => {
      const rec = new TemplateVersionDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      [ 'id', [ 'vrsn_fakeId'] ],
      [ 'object', 'Address' ],
      [ 'deleted', true ],
      [ 'deleted', false ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateVersionDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new TemplateVersionDeletion();
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
      const rec = new TemplateVersionDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("TemplateVersionList", () => {
    it("can be created", () => {
      const rec = new TemplateVersionList();
      expect(rec).toBeDefined();
    });

    it.each([
      [ 'object', 'Address' ],
      [ 'data', [] ],
      [ 'next_url', 'some url' ],
      [ 'previous_url', 'some url' ],
      [ 'count', 1 ],
      [ 'total_count', 100 ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateVersionList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe('nextPageToken getter', () => {
      it('extracts and returns the token from the next_url value', () => {
        const rec = new TemplateVersionList({
          next_url: 'https://fake.com?param1=example&after=token'
        });
        expect(rec.nextPageToken).toEqual('token');
      });

      it('handles when the next_url value is missing', () => {
        const rec = new TemplateVersionList({
          next_url: null
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe('previousPageToken getter', () => {
      it('extracts and returns the token from the next_url value', () => {
        const rec = new TemplateVersionList({
          previous_url: 'https://fake.com?param1=example&before=token'
        });
        expect(rec.previousPageToken).toEqual('token');
      });

      it('handles when the next_url value is missing', () => {
        const rec = new TemplateVersionList({
          previous_url: null
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });

  describe("TemplateVersionUpdatable", () => {
    it("can be created", () => {
      const rec = new TemplateVersionUpdatable();
      expect(rec).toBeDefined();
    });

    it.each([
      [ 'description', "fake description" ],
      [ 'engine', EngineHtml.Legacy ],
      [ 'engine', EngineHtml.Handlebars ],
      [ 'engine', null ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateVersionUpdatable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("TemplateVersionWritable", () => {
    it("can be created", () => {
      const rec = new TemplateVersionWritable();
      expect(rec).toBeDefined();
    });

    it.each([
      [ 'description', "fake description" ],
      [ 'html', 'fake html' ],
      [ 'engine', EngineHtml.Legacy ],
      [ 'engine', EngineHtml.Handlebars ],
      [ 'engine', null ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new TemplateVersionWritable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });
});
