import { Configuration } from "../configuration";

import { IntlVerificationWritable, CountryExtended, IntlVerificationsPayload } from "../models";
import { IntlVerificationsApi } from "../api";

describe("IntlVerificationsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const multiLine: IntlVerificationWritable = {
    primary_line: "370 WATER ST",
    postal_code: "C1N 1C4",
    country: CountryExtended.Ca
  };

  const address2: IntlVerificationWritable = {
    primary_line: "012 PLACEHOLDER ST",
    postal_code: "F0O 8A2",
    country: CountryExtended.Ca
  }

  const addressList: IntlVerificationsPayload = {
    addresses: [multiLine, address2]
  }

  const singleLine: IntlVerificationWritable = {
    address: "370 WATER ST C1N 1C4",
    country: CountryExtended.Ca
  };

  it("International Verifications API can be instantiated", () => {
    const intlvApi = new IntlVerificationsApi(config);
    expect(intlvApi).toBeDefined();
    expect(typeof intlvApi).toEqual("object");
    expect(intlvApi).toBeInstanceOf(IntlVerificationsApi);
  });

  describe("verifySingle", () => {
    it("exists", () => {
      const intlvApi = new IntlVerificationsApi(config);
      expect(intlvApi.verifySingle).toBeDefined();
      expect(typeof intlvApi.verifySingle).toEqual("function");
    });

    it("verifies a single international address", async () => {
      const intlvApi = new IntlVerificationsApi(config);
      const response = await intlvApi.verifySingle(multiLine);
      expect(response?.status).toBeDefined()
    });

    it("verifies a single-line international address", async () => {
      const intlvApi = new IntlVerificationsApi(config);
      const response = await intlvApi.verifySingle(singleLine);
      expect(response?.status).toBeDefined()
    });
  });

  describe("verifyBulk", () => {
    it("exists", () => {
      const intlvApi = new IntlVerificationsApi(config);
      expect(intlvApi.verifyBulk).toBeDefined();
      expect(typeof intlvApi.verifyBulk).toEqual("function");
    });

    it("verifies a list of international addresses", async () => {
      const intlvApi = new IntlVerificationsApi(config);
      const response = await intlvApi.verifyBulk(addressList);
      expect(response).toBeDefined();
      expect(response?.addresses?.length).toEqual(2);
    });
  });
});
