import {Letter, LetterDeletion} from "../models";

describe("Letter Models", () => {
    describe("Letter", () => {
        it("can be created", () => {
            const rec = new Letter();
            expect(rec).toBeDefined();
        });

        it("rejects invalid values for id", () => {
            const rec = new Letter();
            expect(rec.id).not.toBeDefined();

            const invalidValues = ['Nope'];
            for (const val of invalidValues) {
                try {
                    rec.id = val;
                    throw new Error('Should Throw');
                } catch (err: any) {
                    expect(err.message).toEqual("Invalid id provided");
                }
            }
        });

        it('allows setting valid values for id', () => {
            const rec = new Letter();
            expect(rec.id).not.toBeDefined();

            const validValues = ['ltr_1234'];
            for (const val of validValues) {
                rec.id = val;
                expect(rec.id).toBeDefined();
                expect(rec.id).toEqual(val);
            }
        });

        it("rejects invalid values for template_id", () => {
            const rec = new Letter();
            expect(rec.template_id).not.toBeDefined();

            const invalidValues = ['Nope'];
            for (const val of invalidValues) {
                try {
                    rec.template_id = val;
                    throw new Error('Should Throw');
                } catch (err: any) {
                    expect(err.message).toEqual("Invalid template_id provided");
                }
            }
        });

        it('allows setting valid values for template_id', () => {
            const rec = new Letter();
            expect(rec.template_id).not.toBeDefined();

            const validValues = ['tmpl_1234'];
            for (const val of validValues) {
                rec.template_id = val;
                expect(rec.template_id).toBeDefined();
                expect(rec.template_id).toEqual(val);
            }
        });

        it("rejects invalid values for template_version_id", () => {
            const rec = new Letter();
            expect(rec.template_version_id).not.toBeDefined();

            const invalidValues = ['Nope'];
            for (const val of invalidValues) {
                try {
                    rec.template_version_id = val;
                    throw new Error('Should Throw');
                } catch (err: any) {
                    expect(err.message).toEqual("Invalid template_version_id provided");
                }
            }
        });

        it('allows setting valid values for template_version_id', () => {
            const rec = new Letter();
            expect(rec.template_version_id).not.toBeDefined();

            const validValues = ['vrsn_1234'];
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

            const invalidValues = ['Nope'];
            for (const val of invalidValues) {
                try {
                    rec.id = val;
                    throw new Error('Should Throw');
                } catch (err: any) {
                    expect(err.message).toEqual("Invalid id provided");
                }
            }
        });

        it('allows setting valid values for id', () => {
            const rec = new LetterDeletion();
            expect(rec.id).not.toBeDefined();

            const validValues = ['ltr_1234'];
            for (const val of validValues) {
                rec.id = val;
                expect(rec.id).toBeDefined();
                expect(rec.id).toEqual(val);
            }
        });
    });
});