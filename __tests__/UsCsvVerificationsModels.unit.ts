import { UsCsvVerificationsResponse } from "../models";

describe("UsCsvVerifications Models", () => {
  describe("UsCsvVerificationsResponse", () => {
    it("can be created", () => {
      const rec = new UsCsvVerificationsResponse();
      expect(rec).toBeDefined();
    });

    it.each([
      ["csv_id", "csv_ver_fakeId"],
      ["status", "Received"],
    ])("can be created with provided %s value", (prop, val) => {
      const input = {};
      (input as any)[prop] = val;

      const rec = new UsCsvVerificationsResponse(input);

      expect(rec).toBeDefined();
      expect((rec as any)[prop]).toEqual(val);
    });

    // it("rejects invalid values for id", () => {
    //     const rec = new UsCsvVerificationsResponse();
    //     expect(rec.csv_id).not.toBeDefined();

    //     const invalidValues = ["Nope"];
    //     for (const val of invalidValues) {
    //       try {
    //         rec.csv_id = val;
    //         throw new Error("Should Throw");
    //       } catch (err: any) {
    //           console.error(err)
    //         expect(err.message).toEqual("Invalid id provided");
    //       }
    //     }
    //   });
    //To do: Add error handling

    it("allows setting valid values for id", () => {
      const rec = new UsCsvVerificationsResponse();
      expect(rec.csv_id).not.toBeDefined();
      const validValues = ["csv_ver_fakeId"];
      for (const val of validValues) {
        rec.csv_id = val;
        expect(rec.csv_id).toBeDefined();
        expect(rec.csv_id).toEqual(val);
      }
    });

    it("allows setting valid values for status", () => {
      const rec = new UsCsvVerificationsResponse();
      expect(rec.status).not.toBeDefined();
      const validValues = ["Received"];
      for (const val of validValues) {
        rec.status = val;
        expect(rec.status).toBeDefined();
        expect(rec.status).toEqual(val);
      }
    });
  });
});
