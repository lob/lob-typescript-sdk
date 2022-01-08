import { Configuration } from "../configuration";

import { IntlVerificationWritable, CountryExtended } from "../models";
import { IntlVerificationsApi } from "../api";

describe("UsVerificationApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const multiLine: IntlVerificationWritable = {
    primary_line: "370 WATER ST",
    postal_code: "94107",
    country: CountryExtended.Ca
  };

  const singleLine: IntlVerificationWritable = {
    address: "370 WATER ST C1N 1C4",
    country: CountryExtended.Ca
  };

  it("US Verifications API can be instantiated", () => {
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
    });

    it("verifies a single-line international address", async () => {
      const intlvApi = new IntlVerificationsApi(config);
      const response = await intlvApi.verifySingle(singleLine);
    });
  });
});
