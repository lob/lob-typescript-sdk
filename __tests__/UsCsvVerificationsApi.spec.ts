import { UsCsvVerificationsResponse } from "../models";
import {
  CONFIG_FOR_INTEGRATION,
  CONFIG_FOR_INTEGRATION_WITH_LIVE,
} from "./testFixtures";
import { USVerificationsApi } from "../api/usverifications-api";

describe("USVerificationsApi", () => {
  it("US CSV API can be instantiated", () => {
    const UsCsvApi = new USVerificationsApi(CONFIG_FOR_INTEGRATION_WITH_LIVE);
    expect(typeof UsCsvApi).toEqual("object");
    expect(UsCsvApi).toBeInstanceOf(USVerificationsApi);
  });

  describe("Verifications Response", () => {
    it("exists", () => {
      const UsCsvApi = new USVerificationsApi(CONFIG_FOR_INTEGRATION_WITH_LIVE);
      expect(UsCsvApi.UsCsvVerificationsResponse).toBeDefined();
      expect(typeof UsCsvApi.UsCsvVerificationsResponse).toEqual("function");
    });

    // it("Verifies a CSV of US or US Territory", async () => {
    //   const UsCsvApi = new USVerificationsApi(CONFIG_FOR_INTEGRATION_WITH_LIVE);
    //   const response = await UsCsvApi.UsCsvVerificationsResponse(
    //     1,
    //     2,
    //     3,
    //     4,
    //     5,
    //     6
    //   );
    //   expect(response).toBeDefined();
    //   expect(typeof UsCsvApi.UsCsvVerificationsResponse).toEqual("function");
    // }); //Header missing boundary
  });
});
