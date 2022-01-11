import { Configuration } from "../configuration";

import { UsVerificationsWritable, MultipleComponentsList } from "../models";
import { USVerificationsApi } from "../api";

describe("UsVerificationApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const singleAddress: UsVerificationsWritable = {
    primary_line: "180 BERRY ST",
    city: "SAN FRANCISCO",
    state: "CA",
    zip_code: "94107",
  };

  const address2: UsVerificationsWritable = {
    primary_line: "123 TEST ST",
    city: "SAN FRANCISCO",
    state: "CA",
    zip_code: "94107",
  };

  const addressList: MultipleComponentsList = {
    addresses: [singleAddress, address2],
  };

  const singleLine: UsVerificationsWritable = {
    address: "123 TEST ST SAN FRANCISCO CA 94107",
  };

  it("US Verifications API can be instantiated", () => {
    const usvApi = new USVerificationsApi(config);
    expect(usvApi).toBeDefined();
    expect(typeof usvApi).toEqual("object");
    expect(usvApi).toBeInstanceOf(USVerificationsApi);
  });

  describe("verifySingle", () => {
    it("exists", () => {
      const usvApi = new USVerificationsApi(config);
      expect(usvApi.verifySingle).toBeDefined();
      expect(typeof usvApi.verifySingle).toEqual("function");
    });

    it("verifies a single multi-line US address", async () => {
      const usvApi = new USVerificationsApi(config);
      const response = await usvApi.verifySingle(singleAddress);
      expect(response?.deliverability).toBeDefined();
    });

    it("verifies a single one-line US address", async () => {
      const usvApi = new USVerificationsApi(config);
      const response = await usvApi.verifySingle(singleLine);
      expect(response?.deliverability).toBeDefined();
    });
  });

  describe("verifyBulk", () => {
    it("exists", () => {
      const usvApi = new USVerificationsApi(config);
      expect(usvApi.verifyBulk).toBeDefined();
      expect(typeof usvApi.verifyBulk).toEqual("function");
    });

    it("verifies multiple US addresses", async () => {
      const usvApi = new USVerificationsApi(config);
      const response = await usvApi.verifyBulk(addressList);
      expect(response).toBeDefined();
      expect(response?.addresses?.length).toEqual(2);
    });
  });
});
