import {
  Address,
  AddressDeletion,
  AddressDomestic,
  AddressDomesticExpanded,
} from "../models";

describe("Address Models", () => {
  describe("Address", () => {
    it("can be created", () => {
      const rec = new Address();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for id", () => {
      const rec = new Address();
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
      const rec = new Address();
      expect(rec.id).not.toBeDefined();

      const validValues = ["adr_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for address_state", () => {
      const rec = new Address();
      expect(rec.address_state).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.address_state = val;
          throw new Error("ST");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid address_state provided");
        }
      }
    });

    it("allows setting valid values for address_state", () => {
      const rec = new Address();
      expect(rec.address_state).not.toBeDefined();

      const validValues = ["TS"];
      for (const val of validValues) {
        rec.address_state = val;
        expect(rec.address_state).toBeDefined();
        expect(rec.address_state).toEqual(val);
      }
    });

    it("rejects invalid values for address_zip", () => {
      const rec = new Address();
      expect(rec.address_zip).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.address_zip = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid address_zip provided");
        }
      }
    });

    it("allows setting valid values for address_zip", () => {
      const rec = new Address();
      expect(rec.address_zip).not.toBeDefined();

      const validValues = ["00000"];
      for (const val of validValues) {
        rec.address_zip = val;
        expect(rec.address_zip).toBeDefined();
        expect(rec.address_zip).toEqual(val);
      }
    });
  });

  describe("address-deletion", () => {
    it("can be created", () => {
      const rec = new AddressDeletion();
      expect(rec).toBeDefined();
    });

    it("validates id", () => {
      const rec = new AddressDeletion();
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
      const rec = new AddressDeletion();
      expect(rec.id).not.toBeDefined();
      const validValues = ["adr_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("AddressDomesticExpanded", () => {
    it("can be created", () => {
      const rec = new AddressDomesticExpanded();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for address_country", () => {
      const rec = new AddressDomesticExpanded();
      expect(rec.address_country).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.address_country = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid address_country provided");
        }
      }
    });

    it("allows setting valid values for address_country", () => {
      const rec = new AddressDomesticExpanded();
      expect(rec.address_country).not.toBeDefined();

      const validValues = ["UNITED STATES"];
      for (const val of validValues) {
        rec.address_country = val;
        expect(rec.address_country).toBeDefined();
        expect(rec.address_country).toEqual(val);
      }
    });
  });

  describe("AddressDomestic", () => {
    it("can be created", () => {
      const rec = new AddressDomestic();
      expect(rec).toBeDefined();
    });

    it("rejects invalid values for address_country", () => {
      const rec = new AddressDomestic();
      expect(rec.address_country).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.address_country = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid address_country provided");
        }
      }
    });

    it("allows setting valid values for address_country", () => {
      const rec = new AddressDomestic();
      expect(rec.address_country).not.toBeDefined();

      const validValues = ["US"];
      for (const val of validValues) {
        rec.address_country = val;
        expect(rec.address_country).toBeDefined();
        expect(rec.address_country).toEqual(val);
      }
    });
  });
});
