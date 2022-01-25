import {
  CardList,
  Card,
  CardDeletion,
  CardOrder,
  CardSizeEnum,
  CardOrientationEnum,
  CardStatusEnum,
  CardEditable,
  CardOrderEditable,
  CardOrderStatusEnum,
  CardUpdatable,
} from "../models";
import { URL_VALID_LIST } from "./testFixtures";

describe("Card Models", () => {
  describe("Card", () => {
    it("can be created", () => {
      const rec = new Card();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "card_fakeId"],
      ["url", URL_VALID_LIST],
      ["auto_reorder", true],
      ["auto_reorder", false],
      ["reorder_quantity", 1000],
      ["raw_url", "some url"],
      ["front_original_url", "some url"],
      ["back_original_url", "some url"],
      ["back_original_url", "some url"],
      ["thumbnails", "fake thumbnail"],
      ["available_quantity", 1],
      ["pending_quantity", 20],
      ["status", CardStatusEnum.Rendered],
      ["status", CardStatusEnum.Processed],
      ["orientation", CardOrientationEnum.Vertical],
      ["orientation", CardOrientationEnum.Horizontal],
      ["threshold_amount", 1],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["deleted", true],
      ["deleted", false],
      ["object", "Card"],
      ["description", "fake description"],
      ["size", CardSizeEnum._3375x2125],
      ["size", CardSizeEnum._2125x3375],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Card(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new Card();
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
      const rec = new Card();
      expect(rec.id).not.toBeDefined();

      const validValues = ["card_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("CardDeletion", () => {
    it("can be created", () => {
      const rec = new CardDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", ["card_fakeId"]],
      ["object", "Address"],
      ["deleted", true],
      ["deleted", false],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new CardDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new CardDeletion();
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
      const rec = new CardDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["card_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("CardEditable", () => {
    it("can be created", () => {
      const rec = new CardEditable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["front", "fake front"],
      ["back", "fake back"],
      ["description", "fake description"],
      ["size", CardSizeEnum._3375x2125],
      ["size", CardSizeEnum._2125x3375],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new CardEditable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("CardUpdatable", () => {
    it("can be created", () => {
      const rec = new CardUpdatable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["description", "fake description"],
      ["auto_reorder", 10],
      ["reorder_quantity", 1000],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new CardUpdatable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("CardList", () => {
    it("can be created", () => {
      const rec = new CardList();
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

      const rec = new CardList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new CardList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new CardList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new CardList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new CardList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });

  describe("CardOrder", () => {
    it("can be created", () => {
      const rec = new CardOrder();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "co_fakeId"],
      ["card_id", "card_fakeId"],
      ["status", CardOrderStatusEnum.Cancelled],
      ["status", CardOrderStatusEnum.Depleted],
      ["status", CardOrderStatusEnum.Pending],
      ["status", CardOrderStatusEnum.Available],
      ["status", CardOrderStatusEnum.Printing],
      ["inventory", 17],
      ["quantity_ordered", 42],
      ["unit_price", 100],
      ["cancelled_reason", "fake reason"],
      ["availability_date", new Date().toISOString()],
      ["expected_availability_date", new Date().toISOString()],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["deleted", true],
      ["deleted", false],
      ["object", "CardOrder"],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new CardOrder(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new CardOrder();
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
      const rec = new CardOrder();
      expect(rec.id).not.toBeDefined();

      const validValues = ["co_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for card_id", () => {
      const rec = new CardOrder();
      expect(rec.card_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.card_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid card_id provided");
        }
      }
    });

    it("allows setting valid values for card_id", () => {
      const rec = new CardOrder();
      expect(rec.card_id).not.toBeDefined();

      const validValues = ["card_1234"];
      for (const val of validValues) {
        rec.card_id = val;
        expect(rec.card_id).toBeDefined();
        expect(rec.card_id).toEqual(val);
      }
    });
  });

  describe("CardOrderEditable", () => {
    it("can be created", () => {
      const rec = new CardOrderEditable();
      expect(rec).toBeDefined();
    });

    it.each([["quantity", 10]])(
      "can be created with a provided %s value",
      (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new CardOrderEditable(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
      }
    );
  });
});
