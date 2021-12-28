import { Configuration } from "../configuration";

import { UsVerificationsWritable } from "../models";
import { USVerificationsApi } from "../api";

describe("UsVerificationApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const verifySingle: UsVerificationsWritable = {
    primary_line: "180 BERRY ST",
    city: "SAN FRANCISCO",
    state: "CA",
    zip_code: "94107",
  };

  it("US Verifications API can be instantiated", () => {
    const usvApi = new USVerificationsApi(config);
    expect(usvApi).toBeDefined();
    expect(typeof usvApi).toEqual("object");
    expect(usvApi).toBeInstanceOf(USVerificationsApi);
  });

  describe("usVerifications", () => {
    it("exists", () => {
      const usvApi = new USVerificationsApi(config);
      expect(usvApi.usVerification).toBeDefined();
      expect(typeof usvApi.usVerification).toEqual("function");
    });

    it("verifies a single US address", async () => {
      const usvApi = new USVerificationsApi(config);
      const response = await usvApi.usVerification(verifySingle);
      console.log(response);
    });
  });
});
