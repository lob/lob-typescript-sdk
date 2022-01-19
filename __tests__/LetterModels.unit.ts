import {LetterList, Letter, LetterDeletion} from "../models";

describe("Letter Models", () => {
  describe("Letter", () => {
    it("can be created", () => {
      const rec = new Letter();
      expect(rec).toBeDefined();
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
