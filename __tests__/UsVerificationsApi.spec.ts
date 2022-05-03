import {
  UsVerificationsWritable,
  MultipleComponentsList,
  MultipleComponents,
} from "../models";
import { UsVerificationsApi } from "../api";
import { CONFIG_FOR_INTEGRATION, CONFIG_FOR_INTEGRATION_WITH_LIVE } from "./testFixtures";

describe("UsVerificationApi", () => {
  const singleAddressVerification: UsVerificationsWritable = {
    primary_line: "1313 CEMETERY LN",
    city: "WESTFIELD",
    state: "NJ",
    zip_code: "07000",
  };

  const singleAddress = new MultipleComponents({
    primary_line: "1313 CEMETERY LN",
    city: "WESTFIELD",
  });

  // const address2 = new MultipleComponents({
  //   primary_line: "1212 CEMETERY LANE",
  //   city: "WESTFIELD",
  // });

  const addressList = new MultipleComponentsList({
    addresses: [singleAddress],
  });

  it("US Verifications API can be instantiated", () => {
    const usvApi = new UsVerificationsApi(CONFIG_FOR_INTEGRATION);
    expect(usvApi).toBeDefined();
    expect(typeof usvApi).toEqual("object");
    expect(usvApi).toBeInstanceOf(UsVerificationsApi);
  });

  describe("verifySingle", () => {
    it("exists", () => {
      const usvApi = new UsVerificationsApi(CONFIG_FOR_INTEGRATION);
      expect(usvApi.verifySingle).toBeDefined();
      expect(typeof usvApi.verifySingle).toEqual("function");
    });

    it("verifies a single multi-line US address", async () => {
      const usvApi = new UsVerificationsApi(CONFIG_FOR_INTEGRATION);
      const response = await usvApi.verifySingle(singleAddressVerification);
      expect(response.deliverability).toBeDefined();
    });

    it("verifies a single one-line US address", async () => {
      const singleLine = new UsVerificationsWritable({
        address: "1515 CEMETERY LN WESTFIELD NJ 07000",
      });

      const usvApi = new UsVerificationsApi(CONFIG_FOR_INTEGRATION);
      const response = await usvApi.verifySingle(singleLine);
      expect(response.deliverability).toBeDefined();
    });
  });

  describe("verifyBulk", () => {
    it("exists", () => {
      const usvApi = new UsVerificationsApi(CONFIG_FOR_INTEGRATION);
      expect(usvApi.verifyBulk).toBeDefined();
      expect(typeof usvApi.verifyBulk).toEqual("function");
    });

    it("verifies multiple US addresses", async () => {
      const usvApi = new UsVerificationsApi(CONFIG_FOR_INTEGRATION_WITH_LIVE);
      const response = await usvApi.verifyBulk(addressList);
      console.log("---------------------RESPONSE---------------------");
      console.log(JSON.stringify(response, null, 2));
      console.log("---------------------RESPONSE---------------------");
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(1);
      expect(response.errorAddresses?.length).toEqual(1);
    });
  });
});
