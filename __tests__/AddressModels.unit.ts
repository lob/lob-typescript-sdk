import {
  Address,
  AddressDeletion,
  AddressDomesticExpanded,
  AddressDeletionObjectEnum,
  AddressEditable,
  AddressList,
  CountryExtendedExpanded,
} from "../models";

describe("Address Models", () => {
  describe("Address", () => {
    it("can be created", () => {
      const rec = new Address();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "adr_fakeId"],
      ["description", "fake description"],
      ["name", "fake name"],
      ["company", "fake company"],
      ["phone", "000-000-0000"],
      ["email", "fake@email.com"],
      ["metadata", {}],
      ["address_line1", "address line 1"],
      ["address_line2", "address line 2"],
      ["address_city", "Some City"],
      ["address_state", "CA"],
      ["address_zip", "11111"],
      ["address_country", "US"],
      ["object", "Address"],
      ["date_created", new Date().toISOString()],
      ["date_modified", new Date().toISOString()],
      ["deleted", false],
      ["deleted", true],
      ["recipient_moved", false],
      ["recipient_moved", true],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Address(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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

    it("correctly outputs in JSON", () => {
      const untyped_stub = {
        id: "adr_fakeId",
        description: "fake description",
        name: "fake name",
        company: "fake company",
        phone: "123-456-7890",
        email: "fake@email.com",
        metadata: {},
        address_line1: "1234 Street Rd.",
        address_line2: "apt 1",
        address_city: "City",
        address_state: "TX",
        address_zip: "12345",
        address_country: CountryExtendedExpanded.UnitedStates,
        object: "address",
        date_created: new Date(),
        date_modified: new Date(),
        deleted: false,
        recipient_moved: false,
      };

      const recString = JSON.stringify(new Address(untyped_stub));
      const recMadeRaw = JSON.parse(recString);
      expect(typeof recMadeRaw).toEqual("object");

      // Ensure that the private convention attributes have been removed
      expect(recMadeRaw._id).toBeUndefined();
      expect(recMadeRaw._address_state).toBeUndefined();
      expect(recMadeRaw._address_zip).toBeUndefined();

      // Ensure that the attributes are correctly present
      expect(recMadeRaw.id).toEqual(untyped_stub.id);
      expect(recMadeRaw.address_state).toEqual(untyped_stub.address_state);
      expect(recMadeRaw.address_zip).toEqual(untyped_stub.address_zip);

      // Ensure that the entity can be re-created from the parsed JSON string
      const reInstantiateRecord = new Address(recMadeRaw);
      expect(reInstantiateRecord.id).toEqual(untyped_stub.id);
      expect(reInstantiateRecord.address_state).toEqual(
        untyped_stub.address_state
      );
      expect(reInstantiateRecord.address_zip).toEqual(untyped_stub.address_zip);
    });
  });

  describe("address-deletion", () => {
    it("can be created", () => {
      const rec = new AddressDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      ["id", "adr_fakeId"],
      ["deleted", true],
      ["object", AddressDeletionObjectEnum],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new AddressDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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

    it.each([
      ["address_line1", "address line 1"],
      ["address_line2", "address line 2"],
      ["address_city", "Some City"],
      ["address_state", "CA"],
      ["address_zip", "11111"],
      ["description", "description"],
      ["name", "fake name"],
      ["company", "fake company"],
      ["phone", "000-000-0000"],
      ["email", "fake@email.com"],
      ["address_country", "UNITED STATES"],
      ["metadata", {}],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new AddressDomesticExpanded(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
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

  describe("AddressEditable", () => {
    it("can be created", () => {
      const rec = new AddressEditable();
      expect(rec).toBeDefined();
    });

    it.each([
      ["address_line1", "address line 1"],
      ["address_line2", "address line 2"],
      ["address_city", "Some City"],
      ["address_state", "CA"],
      ["address_zip", "11111"],
      ["description", "description"],
      ["name", "fake name"],
      ["company", "fake company"],
      ["phone", "000-000-0000"],
      ["email", "fake@email.com"],
      ["address_country", "US"],
      ["metadata", {}],
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new AddressEditable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("AddressList", () => {
    it("can be created", () => {
      const rec = new AddressList();
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

      const rec = new AddressList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe("nextPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new AddressList({
          next_url: "https://fake.com?param1=example&after=token",
        });
        expect(rec.nextPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new AddressList({
          next_url: null,
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe("previousPageToken getter", () => {
      it("extracts and returns the token from the next_url value", () => {
        const rec = new AddressList({
          previous_url: "https://fake.com?param1=example&before=token",
        });
        expect(rec.previousPageToken).toEqual("token");
      });

      it("handles when the next_url value is missing", () => {
        const rec = new AddressList({
          previous_url: null,
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });
});
