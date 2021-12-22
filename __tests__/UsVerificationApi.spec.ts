import { Configuration } from "../configuration";

import { UsVerificationsWritable, USVerificationsApi } from "../api";

describe("UsVerificationApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LIVE_API_KEY,
  });
  let usvApi: USVerificationsApi;

  const verifySingle: UsVerificationsWritable = {
    primary_line: "180 BERRY ST",
    city: "SAN FRANCISCO",
    state: "CA",
    zip_code: "94107",
  };

  it("US Verifications API can be instantiated", () => {
    usvApi = new USVerificationsApi(config);
    expect(usvApi).toBeDefined();
    expect(typeof usvApi).toEqual("object");
    expect(usvApi).toBeInstanceOf(USVerificationsApi);
  });

  describe("verify domestic address", () => {
    it("exists", () => {
      expect(usvApi.usVerification).toBeDefined();
      expect(typeof usvApi.usVerification).toEqual("function");
    });

    it("verifies a single US address", async () => {
      const response = await usvApi.usVerification(verifySingle);
    });
  });
});
