import {
  Address,
  AddressEditable,
  LetterList,
  Letter,
  LetterDeletion,
  LetterCarrierEnum,
  Thumbnail,
  MailType,
  LetterAddressPlacementEnum,
  LetterCustomEnvelope, LetterEditable
} from "../models";

describe("Letter Models", () => {
  describe("Letter", () => {
    it("can be created", () => {
      const rec = new Letter();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "id", "ltr_fakeId" ],
      [ "to", new Address() ],
      [ "from", new Address() ],
      [ "carrier", LetterCarrierEnum.Usps ],
      [ "thumbnails", [new Thumbnail()] ],
      [ "expected_delivery_date", new Date().toISOString() ],
      [ "date_created", new Date().toISOString() ],
      [ "date_modified", new Date().toISOString() ],
      [ "deleted", true ],
      [ "deleted", false ],
      [ "template_id", "tmpl_fakeId" ],
      [ "template_version_id", "vrsn_fakeId" ],
      [ "object", "Letter" ],
      [ "description", "fake description" ],
      [ "metadata", {} ],
      [ "merge_variables", {} ],
      [ "send_date", new Date().toISOString() ],
      [ "extra_service", "fake extra service" ],
      [ "tracking_number", "fake tracking" ],
      [ "tracking_events", ["fake event"] ],
      [ "return_address", new AddressEditable() ],
      [ "mail_type", MailType.Standard ],
      [ "mail_type", MailType.FirstClass ],
      [ "color", true ],
      [ "color", false ],
      [ "double_sided", true ],
      [ "double_sided", false ],
      [ "address_placement", LetterAddressPlacementEnum.BottomFirstPageCenter ],
      [ "address_placement", LetterAddressPlacementEnum.InsertBlankPage ],
      [ "address_placement", LetterAddressPlacementEnum.BottomFirstPage ],
      [ "address_placement", LetterAddressPlacementEnum.TopFirstPage ],
      [ "return_envelope", true ],
      [ "return_envelope", false ],
      [ "perforated_page", 11 ],
      [ "custom_envelope", new LetterCustomEnvelope() ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Letter(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new Letter();
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
      const rec = new Letter();
      expect(rec.id).not.toBeDefined();

      const validValues = ["ltr_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for template_id", () => {
      const rec = new Letter();
      expect(rec.template_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid template_id provided");
        }
      }
    });

    it("allows setting valid values for template_id", () => {
      const rec = new Letter();
      expect(rec.template_id).not.toBeDefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.template_id = val;
        expect(rec.template_id).toBeDefined();
        expect(rec.template_id).toEqual(val);
      }
    });

    it("rejects invalid values for template_version_id", () => {
      const rec = new Letter();
      expect(rec.template_version_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid template_version_id provided");
        }
      }
    });

    it("allows setting valid values for template_version_id", () => {
      const rec = new Letter();
      expect(rec.template_version_id).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.template_version_id = val;
        expect(rec.template_version_id).toBeDefined();
        expect(rec.template_version_id).toEqual(val);
      }
    });
  });

  describe("LetterDeletion", () => {
    it("can be created", () => {
      const rec = new LetterDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      [ 'id', 'ltr_fakeId' ],
      [ 'deleted', true ],
      [ 'deleted', false ],
      [ 'object', "Check" ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new LetterDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new LetterDeletion();
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
      const rec = new LetterDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["ltr_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("LetterEditable", () => {
    it("can be created", () => {
      const rec = new LetterEditable();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "mail_type", MailType.Standard ],
      [ "mail_type", MailType.FirstClass ],
      [ "color", true ],
      [ "color", false ],
      [ "double_sided", true ],
      [ "double_sided", false ],
      [ "address_placement", LetterAddressPlacementEnum.BottomFirstPageCenter ],
      [ "address_placement", LetterAddressPlacementEnum.InsertBlankPage ],
      [ "address_placement", LetterAddressPlacementEnum.BottomFirstPage ],
      [ "address_placement", LetterAddressPlacementEnum.TopFirstPage ],
      [ "return_envelope", true ],
      [ "return_envelope", false ],
      [ "perforated_page", 11 ],
      [ "custom_envelope", new LetterCustomEnvelope() ],
      [ "to", new Address() ],
      [ "from", new Address() ],
      [ "file", "fake file" ],
      [ "extra_service", "fake extra service" ],
      [ "cards", ["fake card"] ],
      [ "billing_group_id", "fake billing group" ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new LetterEditable(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });
  });

  describe("LetterList", () => {
    it("can be created", () => {
      const rec = new LetterList();
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

      const rec = new LetterList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe('nextPageToken getter', () => {
      it('extracts and returns the token from the next_url value', () => {
        const rec = new LetterList({
          next_url: 'https://fake.com?param1=example&after=token'
        });
        expect(rec.nextPageToken).toEqual('token');
      });

      it('handles when the next_url value is missing', () => {
        const rec = new LetterList({
          next_url: null
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe('previousPageToken getter', () => {
      it('extracts and returns the token from the next_url value', () => {
        const rec = new LetterList({
          previous_url: 'https://fake.com?param1=example&before=token'
        });
        expect(rec.previousPageToken).toEqual('token');
      });

      it('handles when the next_url value is missing', () => {
        const rec = new LetterList({
          previous_url: null
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });
});
