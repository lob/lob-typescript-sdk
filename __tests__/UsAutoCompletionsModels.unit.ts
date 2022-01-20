import {
  UsAutocompletions,
  UsAutocompletionsWritable,
  Suggestions
} from "../models";

describe("UsAutocompletions Models", () => {
  describe("UsAutocompletions", () => {
    it("can be created", () => {
      const rec = new UsAutocompletions();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "id", "us_auto_fakeId" ],
      [ "suggestions", [ new Suggestions() ] ],
      [ "object", "US Auto Completion" ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsAutocompletions(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new UsAutocompletions();
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
      const rec = new UsAutocompletions();
      expect(rec.id).not.toBeDefined();

      const validValues = ["us_auto_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("UsAutocompletionsWritable", () => {
    it("can be created", () => {
      const rec = new UsAutocompletionsWritable();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "address_prefix", "fake prefix" ],
      [ "city", "fake city" ],
      [ "state", "fake state" ],
      [ "zip_code", "fake zip" ],
      [ "geo_ip_sort", true ],
      [ "geo_ip_sort", false ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsAutocompletionsWritable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });
});
