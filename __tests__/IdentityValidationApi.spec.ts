import { MultiLineAddress } from "../models";
import { IdentityValidationApi } from "../api/identity-validation-api";
import {
  CONFIG_FOR_INTEGRATION,
  CONFIG_FOR_INTEGRATION_WITH_LIVE,
} from "./testFixtures";

describe("IdentityValidationApi", () => {
  const identityValidationApi = new IdentityValidationApi(
    CONFIG_FOR_INTEGRATION_WITH_LIVE
  );

  it("Identity Validation API can be instantiated", () => {
    const api = new IdentityValidationApi(CONFIG_FOR_INTEGRATION_WITH_LIVE);
    expect(api).toBeDefined();
    expect(typeof api).toEqual("object");
    expect(api).toBeInstanceOf(IdentityValidationApi);
  });

  describe("validate", () => {
    const zipCodeIdentityValidationInput = new MultiLineAddress({
      recipient: "Lob.com",
      primary_line: "210 King St",
      zip_code: "94107",
    });

    it("exists", () => {
      expect(identityValidationApi.validate).toBeDefined();
      expect(typeof identityValidationApi.validate).toEqual("function");
    });

    it("validates given city and state", async () => {
      const cityStateIdentityValidationInput = new MultiLineAddress({
        recipient: "Lob.com",
        primary_line: "210 King St",
        city: "San Francisco",
        state: "CA",
      });

      const response = await identityValidationApi.validate(
        cityStateIdentityValidationInput
      );
      expect(response.id).toBeDefined();
    });

    it("validates given zipcode", async () => {
      const response = await identityValidationApi.validate(
        zipCodeIdentityValidationInput
      );
      expect(response.id).toBeDefined();
    });

    it("refuses to validate with test key", async () => {
      const response = await new IdentityValidationApi(
        CONFIG_FOR_INTEGRATION
      ).validate(zipCodeIdentityValidationInput);

      expect(response.recipient).toEqual("TEST KEYS DO NOT VERIFY ADDRESSES");
    });

    it("fails on erroneous identityValidation object", async () => {
      const invalidValidationInput = new MultiLineAddress({
        primary_line: "210 King St",
        zip_code: "94107",
      });

      try {
        await identityValidationApi.validate(invalidValidationInput);
        fail("should have thrown");
      } catch (err: any) {
        expect(err.message).toContain("recipient is required");
      }
    });
  });
});
