import { Zip, ZipCodeType, ZipLookupCity, ZipEditable } from "../models";

describe("Zip Models", () => {
  describe("Zip", () => {
    it("can be created", () => {
      const rec = new Zip();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "us_zip_fakeId"],
      ["zip_code", 11111],
      ["cities", "fake city"],
      ["zip_code_type", ZipCodeType.Unique],
      ["zip_code_type", ZipCodeType.PoBox],
      ["zip_code_type", ZipCodeType.Standard],
      ["zip_code_type", ZipCodeType.Empty],
      ["zip_code_type", ZipCodeType.Military],
      ["object", "us_zip_lookup"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Zip(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new Zip();
      expect(rec.id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.id = val;
          throw new Error("Invalid id provided");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid id provided");
        }
      }
    });

    it("allows setting valid values for id", () => {
      const rec = new Zip();
      expect(rec.id).not.toBeDefined();

      const validValues = ["us_zip_fakeId"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for zip_code", () => {
      const rec = new Zip();
      expect(rec.zip_code).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.zip_code = val;
          throw new Error("Invalid zip_code provided");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid zip_code provided");
        }
      }
    });

    it("allows setting valid values for zip_code", () => {
      const rec = new Zip();
      expect(rec.zip_code).not.toBeDefined();

      const validValues = ["11111"];
      for (const val of validValues) {
        rec.zip_code = val;
        expect(rec.zip_code).toBeDefined();
        expect(rec.zip_code).toEqual(val);
      }
    });
  });

  describe("ZipLookupCity", () => {
    it("can be created", () => {
      const rec = new ZipLookupCity();
      expect(rec).toBeDefined();
    });

    it.each([
      ["city", "fake city"],
      ["state", "fake state"],
      ["county", "fake country"],
      ["county_fips", "11111"],
      ["preferred", true],
      ["preferred", false],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new ZipLookupCity(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for county_fips", () => {
      const rec = new ZipLookupCity();
      expect(rec.county_fips).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.county_fips = val;
          throw new Error("Invalid county_fips provided");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid county_fips provided");
        }
      }
    });

    it("allows setting valid values for county_fips", () => {
      const rec = new ZipLookupCity();
      expect(rec.county_fips).not.toBeDefined();

      const validValues = ["11111"];
      for (const val of validValues) {
        rec.county_fips = val;
        expect(rec.county_fips).toBeDefined();
        expect(rec.county_fips).toEqual(val);
      }
    });
  });

  describe("ZipEditable", () => {
    it("can be created", () => {
      const rec = new ZipEditable();
      expect(rec).toBeDefined();
    });

    it.each([["zip_code", 11111]])(
      "can be created with a provided %s value",
      (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new ZipEditable(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
      }
    );

    it("rejects invalid values for zip_code", () => {
      const rec = new ZipEditable();
      expect(rec.zip_code).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.zip_code = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid zip_code provided");
        }
      }
    });
  });
});
