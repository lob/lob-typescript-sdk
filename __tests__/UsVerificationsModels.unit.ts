import {UsVerification} from "../models";

describe("Us Verifications Models", () => {
    describe("UsVerification", () => {
        it("can be created", () => {
            const rec = new UsVerification();
            expect(rec).toBeDefined();
        });

        it("rejects invalid values for id", () => {
            const rec = new UsVerification();
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
            const rec = new UsVerification();
            expect(rec.id).not.toBeDefined();

            const validValues = ['us_ver_1234'];
            for (const val of validValues) {
                rec.id = val;
                expect(rec.id).toBeDefined();
                expect(rec.id).toEqual(val);
            }
        });
    });
});
