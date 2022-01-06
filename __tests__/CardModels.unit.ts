import {Card, CardDeletion, CardOrder} from "../models";

describe("Card Models", () => {
    describe("Card", () => {
        it("can be created", () => {
            const rec = new Card();
            expect(rec).toBeDefined();
        });

        it("rejects invalid values for id", () => {
            const rec = new Card();
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
            const rec = new Card();
            expect(rec.id).not.toBeDefined();

            const validValues = ['card_1234'];
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

        it("rejects invalid values for id", () => {
            const rec = new CardDeletion();
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
            const rec = new CardDeletion();
            expect(rec.id).not.toBeDefined();

            const validValues = ['card_1234'];
            for (const val of validValues) {
                rec.id = val;
                expect(rec.id).toBeDefined();
                expect(rec.id).toEqual(val);
            }
        });
    });

    describe("CardOrder", () => {
        it("can be created", () => {
            const rec = new CardOrder();
            expect(rec).toBeDefined();
        });

        it("rejects invalid values for id", () => {
            const rec = new CardOrder();
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
            const rec = new CardOrder();
            expect(rec.id).not.toBeDefined();

            const validValues = ['co_1234'];
            for (const val of validValues) {
                rec.id = val;
                expect(rec.id).toBeDefined();
                expect(rec.id).toEqual(val);
            }
        });

        it("rejects invalid values for card_id", () => {
            const rec = new CardOrder();
            expect(rec.card_id).not.toBeDefined();

            const invalidValues = ['Nope'];
            for (const val of invalidValues) {
                try {
                    rec.card_id = val;
                    throw new Error('Should Throw');
                } catch (err: any) {
                    expect(err.message).toEqual("Invalid card_id provided");
                }
            }
        });

        it('allows setting valid values for card_id', () => {
            const rec = new CardOrder();
            expect(rec.card_id).not.toBeDefined();

            const validValues = ['card_1234'];
            for (const val of validValues) {
                rec.card_id = val;
                expect(rec.card_id).toBeDefined();
                expect(rec.card_id).toEqual(val);
            }
        });
    });
});