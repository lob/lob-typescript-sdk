import {
  IntlVerificationWritable,
  CountryExtended,
  IntlVerificationsPayload,
} from "../models";
import { IntlVerificationsApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("IntlVerificationsApi", () => {
  const multiLine: IntlVerificationWritable = {
    primary_line: "370 WATER ST",
    postal_code: "C1N 1C4",
    country: CountryExtended.Ca,
  };

  const address2: IntlVerificationWritable = {
    primary_line: "012 PLACEHOLDER ST",
    postal_code: "F0O 8A2",
    country: CountryExtended.Ca,
  };

  const addressList: IntlVerificationsPayload = {
    addresses: [multiLine, address2],
  };

  const singleLine: IntlVerificationWritable = {
    address: "370 WATER ST C1N 1C4",
    country: CountryExtended.Ca,
  };

  it("International Verifications API can be instantiated", () => {
    const intlvApi = new IntlVerificationsApi(CONFIG_FOR_INTEGRATION);
    expect(intlvApi).toBeDefined();
    expect(typeof intlvApi).toEqual("object");
    expect(intlvApi).toBeInstanceOf(IntlVerificationsApi);
  });

  describe("verifySingle", () => {
    it("exists", () => {
      const intlvApi = new IntlVerificationsApi(CONFIG_FOR_INTEGRATION);
      expect(intlvApi.verifySingle).toBeDefined();
      expect(typeof intlvApi.verifySingle).toEqual("function");
    });

    it("verifies a single international address", async () => {
      const response = await new IntlVerificationsApi(
        CONFIG_FOR_INTEGRATION
      ).verifySingle(multiLine);
      expect(response.status).toBeDefined();
    });

    it("verifies a single-line international address", async () => {
      const response = await new IntlVerificationsApi(
        CONFIG_FOR_INTEGRATION
      ).verifySingle(singleLine);
      expect(response.status).toBeDefined();
    });
  });

  describe("verifyBulk", () => {
    it("exists", () => {
      const intlvApi = new IntlVerificationsApi(CONFIG_FOR_INTEGRATION);
      expect(intlvApi.verifyBulk).toBeDefined();
      expect(typeof intlvApi.verifyBulk).toEqual("function");
    });

    it("verifies a list of international addresses", async () => {
      const response = await new IntlVerificationsApi(
        CONFIG_FOR_INTEGRATION
      ).verifyBulk(addressList);
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(2);
    });
  });
});
