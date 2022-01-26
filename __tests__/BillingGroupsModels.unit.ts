import {
  BillingGroup,
  BillingGroupEditable,
  BillingGroupList,
} from "../models";

describe("Billing Group Models", () => {
  describe("BillingGroup", () => {
    it("can be created", () => {
      const rec = new BillingGroup();
      expect(rec).toBeDefined();
    });

    it.each([
      ["description", "fake description"],
      ["name", "fake name"],
      ["id", "bg_fakeId"],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["object", "BillingGroup"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BillingGroup(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new BillingGroup();
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
      const rec = new BillingGroup();
      expect(rec.id).not.toBeDefined();

      const validValues = ["bg_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("BillingGroupEditable", () => {
    it("can be created", () => {
      const rec = new BillingGroupEditable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["description", "fake description"],
      ["name", "fake name"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BillingGroupEditable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("BillingGroupList", () => {
    it("can be created", () => {
      const rec = new BillingGroupList();
      expect(rec).toBeDefined();
    });

    it.each([
      ["object", "Address"],
      ["data", []],
      ["next_url", "some url"],
      ["previous_url", "some url"],
      ["count", 1],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new BillingGroupList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new BillingGroupList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new BillingGroupList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new BillingGroupList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new BillingGroupList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });
});
