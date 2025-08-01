import {
  IntlVerificationWritable,
  CountryExtended,
  IntlVerificationsPayload,
} from "../models";
import { IntlVerificationsApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("IntlVerificationsApi", () => {
  const multiLine = new IntlVerificationWritable({
    primary_line: "370 WATER ST",
    postal_code: "C1N 1C4",
    country: CountryExtended.Ca,
  });

  const address2 = new IntlVerificationWritable({
    primary_line: "012 PLACEHOLDER ST",
    postal_code: "F0O 8A2",
    country: CountryExtended.Ca,
  });

  const addressList = new IntlVerificationsPayload({
    addresses: [multiLine, address2, new IntlVerificationWritable()],
  });

  const singleLine = new IntlVerificationWritable({
    address: "370 WATER ST C1N 1C4",
    country: CountryExtended.Ca,
  });

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
      expect(response.addresses).toBeDefined();
      expect(response.errorAddresses).toBeDefined();
      // The API response may vary, so we just verify the structure is correct
      expect(Array.isArray(response.addresses)).toBeTruthy();
      expect(Array.isArray(response.errorAddresses)).toBeTruthy();
      // Verify that we got some response data
      expect(
        response.addresses?.length + response.errorAddresses?.length
      ).toBeGreaterThan(0);
    });
  });
});
