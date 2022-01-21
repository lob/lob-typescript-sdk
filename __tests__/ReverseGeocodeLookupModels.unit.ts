import {
    LocationAnalysis, GeocodeAddresses, GeocodeComponents, ReverseGeocode
} from "../models";

describe("LocationAnalysis", () => {
    it("can be created", () => {
        const rec = new LocationAnalysis();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "latitude", 1 ],
        [ "longitude", 2 ],
        [ "distance", 3 ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new LocationAnalysis(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});

describe("GeocodeAddresses", () => {
    it("can be created", () => {
        const rec = new GeocodeAddresses();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "components", new GeocodeComponents() ],
        [ "location_analysis", new LocationAnalysis() ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new GeocodeAddresses(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });
});

describe("GeocodeComponents", () => {
    it("can be created", () => {
        const rec = new GeocodeComponents();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "zip_code", 11111 ],
        [ "zip_code_plus_4", 1111 ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new GeocodeComponents(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for zip_code", () => {
        const rec = new GeocodeComponents();
        expect(rec.zip_code).not.toBeDefined();

        const invalidValues = ["Nope"];
        for (const val of invalidValues) {
            try {
                rec.zip_code = val;
                throw new Error("Should Throw");
            } catch (err: any) {
                expect(err.message).toEqual("Invalid zip_code provided");
            }
        }
    });

    it("allows setting valid values for zip_code", () => {
        const rec = new GeocodeComponents();
        expect(rec.zip_code).not.toBeDefined();

        const validValues = ["11111"];
        for (const val of validValues) {
            rec.zip_code = val;
            expect(rec.zip_code).toBeDefined();
            expect(rec.zip_code).toEqual(val);
        }
    });

    it("rejects invalid values for zip_code_plus_4", () => {
        const rec = new GeocodeComponents();
        expect(rec.zip_code_plus_4).not.toBeDefined();

        const invalidValues = ["Nope"];
        for (const val of invalidValues) {
            try {
                rec.zip_code_plus_4 = val;
                throw new Error("Should Throw");
            } catch (err: any) {
                expect(err.message).toEqual("Invalid zip_code_plus_4 provided");
            }
        }
    });

    it("allows setting valid values for zip_code_plus_4", () => {
        const rec = new GeocodeComponents();
        expect(rec.zip_code_plus_4).not.toBeDefined();

        const validValues = ["1111"];
        for (const val of validValues) {
            rec.zip_code_plus_4 = val;
            expect(rec.zip_code_plus_4).toBeDefined();
            expect(rec.zip_code_plus_4).toEqual(val);
        }
    });
});

describe("ReverseGeocode", () => {
    it("can be created", () => {
        const rec = new ReverseGeocode();
        expect(rec).toBeDefined();
    });

    it.each([
        [ "id", "us_reverse_geocode_fakeId" ],
        [ "addresses", [new GeocodeAddresses()] ],
        [ "object", "us_reverse_geocode_lookup" ]
    ])("can be created with a provided %s value", (prop, val) => {
        const input = {};
        (input as any)[prop] = val;

        const rec = new ReverseGeocode(input);

        expect(rec).toBeDefined();
        expect((rec as any)[prop]).toEqual(val);
    });

    it("rejects invalid values for id", () => {
        const rec = new ReverseGeocode();
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
        const rec = new ReverseGeocode();
        expect(rec.id).not.toBeDefined();

        const validValues = ["us_reverse_geocode_1234"];
        for (const val of validValues) {
            rec.id = val;
            expect(rec.id).toBeDefined();
            expect(rec.id).toEqual(val);
        }
    });
});
