import {
  Check,
  CheckDeletion,
  CheckList,
  CheckEditableProps,
  CheckEditablePropsMailTypeEnum,
  CheckMailTypeEnum
} from "../models";
import {URL_VALID_LIST} from "./testFixtures";

describe("Check Models", () => {
  describe("", () => {
    it("can be created", () => {
      const rec = new Check();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "id", "chk_fakeId" ],
      [ "to", "fake to" ],
      [ "from", "fake from" ],
      [ "description", "fake description" ],
      [ "metadata", {} ],
      [ "merge_variables", {} ],
      [ "send_date", new Date().toISOString() ],
      [ "mail_type", CheckMailTypeEnum.UspsFirstClass ],
      [ "memo", "fame memo" ],
      [ "check_number", "fake check number" ],
      [ "message", "fake message" ],
      [ "amount", 71 ],
      [ "bank_account", "123456" ],
      [ "check_bottom_template_id", "tmpl_fakeId" ],
      [ "attachment_template_id", "tmpl_fakeId" ],
      [ "check_bottom_template_version_id", "vrsn_fakeId" ],
      [ "attachment_template_version_id", "vrsn_fakeId" ],
      [ "url", URL_VALID_LIST ],
      [ "carrier", "" ],
      [ "thumbnails", "" ],
      [ "expected_delivery_date", "" ],
      [ "tracking_events", "" ],
      [ "object", "" ],
      [ "date_created", new Date().toISOString() ],
      [ "date_modified", new Date().toISOString() ],
      [ "deleted", true ],
      [ "deleted", false ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new Check(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new Check();
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
      const rec = new Check();
      expect(rec.id).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });

    it("rejects invalid values for check_bottom_template_id", () => {
      const rec = new Check();
      expect(rec.check_bottom_template_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.check_bottom_template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid check_bottom_template_id provided");
        }
      }
    });

    it("allows setting valid values for check_bottom_template_id", () => {
      const rec = new Check();
      expect(rec.check_bottom_template_id).not.toBeDefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.check_bottom_template_id = val;
        expect(rec.check_bottom_template_id).toBeDefined();
        expect(rec.check_bottom_template_id).toEqual(val);
      }
    });

    it("rejects invalid values for attachment_template_id", () => {
      const rec = new Check();
      expect(rec.attachment_template_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.attachment_template_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid attachment_template_id provided");
        }
      }
    });

    it("allows setting valid values for attachment_template_id", () => {
      const rec = new Check();
      expect(rec.attachment_template_id).not.toBeDefined();

      const validValues = ["tmpl_1234"];
      for (const val of validValues) {
        rec.attachment_template_id = val;
        expect(rec.attachment_template_id).toBeDefined();
        expect(rec.attachment_template_id).toEqual(val);
      }
    });

    it("rejects invalid values for check_bottom_template_version_id", () => {
      const rec = new Check();
      expect(rec.check_bottom_template_version_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.check_bottom_template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid check_bottom_template_version_id provided");
        }
      }
    });

    it("allows setting valid values for check_bottom_template_version_id", () => {
      const rec = new Check();
      expect(rec.check_bottom_template_version_id).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.check_bottom_template_version_id = val;
        expect(rec.check_bottom_template_version_id).toBeDefined();
        expect(rec.check_bottom_template_version_id).toEqual(val);
      }
    });

    it("rejects invalid values for attachment_template_version_id", () => {
      const rec = new Check();
      expect(rec.attachment_template_version_id).not.toBeDefined();

      const invalidValues = ["Nope"];
      for (const val of invalidValues) {
        try {
          rec.attachment_template_version_id = val;
          throw new Error("Should Throw");
        } catch (err: any) {
          expect(err.message).toEqual("Invalid attachment_template_version_id provided");
        }
      }
    });

    it("allows setting valid values for attachment_template_version_id", () => {
      const rec = new Check();
      expect(rec.attachment_template_version_id).not.toBeDefined();

      const validValues = ["vrsn_1234"];
      for (const val of validValues) {
        rec.attachment_template_version_id = val;
        expect(rec.attachment_template_version_id).toBeDefined();
        expect(rec.attachment_template_version_id).toEqual(val);
      }
    });

    it("rejects invalid values for url", () => {
      const rec = new Check();
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
      const rec = new Check();
      expect(rec.url).not.toBeDefined();

      const validValues = URL_VALID_LIST;
      for (const val of validValues) {
        rec.url = val;
        expect(rec.url).toBeDefined();
        expect(rec.url).toEqual(val);
      }
    });
  });

  describe("CheckDeletion", () => {
    it("can be created", () => {
      const rec = new CheckDeletion();
      expect(rec).toBeDefined();
    });

    it.each([
      [ 'id', 'chk_fakeId' ],
      [ 'deleted', true ],
      [ 'deleted', false ],
      [ 'object', "Check" ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new CheckDeletion(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
      const rec = new CheckDeletion();
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
      const rec = new CheckDeletion();
      expect(rec.id).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.id = val;
        expect(rec.id).toBeDefined();
        expect(rec.id).toEqual(val);
      }
    });
  });

  describe("CheckEditablePropsAllOf", () => {
    it("can be created", () => {
      const rec = new CheckEditableProps();
      expect(rec).toBeDefined();
    });

    it.each([
      [ "from", "fake from" ],
      [ "to", "fake to" ],
      [ "bank_account", "fake account" ],
      [ "amount", 111 ],
      [ "logo", "fake logo" ],
      [ "check_bottom", "fake bottom" ],
      [ "attachment", "fake attachment" ],
      [ "description", "fake description" ],
      [ "metadata", {} ],
      [ "merge_variables", {} ],
      [ "send_date", new Date().toISOString() ],
      [ "mail_type", CheckEditablePropsMailTypeEnum.UspsFirstClass ],
      [ "memo", "fake memo" ],
      [ "check_number", 123456 ],
      [ "message", "fake message" ],
      [ "billing_group_id", "fake billing group" ]
    ])("can be created with a provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new CheckEditableProps(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    it("allows setting valid values for mail type", () => {
      const rec = new CheckEditableProps();
      expect(rec.amount).not.toBeDefined();

      rec.amount = 1;
      expect(rec.amount).toBeDefined();
    });

    it("allows setting valid values for memo", () => {
      const rec = new CheckEditableProps();
      expect(rec.from).not.toBeDefined();

      const validValues = ["chk_1234"];
      for (const val of validValues) {
        rec.from = val;
        expect(rec.from).toBeDefined();
        expect(rec.from).toEqual(val);
      }
    });
  });

  describe("CheckList", () => {
    it("can be created", () => {
      const rec = new CheckList();
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

      const rec = new CheckList(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    describe('nextPageToken getter', () => {
      it('extracts and returns the token from the next_url value', () => {
        const rec = new CheckList({
          next_url: 'https://fake.com?param1=example&after=token'
        });
        expect(rec.nextPageToken).toEqual('token');
      });

      it('handles when the next_url value is missing', () => {
        const rec = new CheckList({
          next_url: null
        });
        expect(rec.nextPageToken).toBeUndefined();
      });
    });

    describe('previousPageToken getter', () => {
      it('extracts and returns the token from the next_url value', () => {
        const rec = new CheckList({
          previous_url: 'https://fake.com?param1=example&before=token'
        });
        expect(rec.previousPageToken).toEqual('token');
      });

      it('handles when the next_url value is missing', () => {
        const rec = new CheckList({
          previous_url: null
        });
        expect(rec.previousPageToken).toBeUndefined();
      });
    });
  });
});
