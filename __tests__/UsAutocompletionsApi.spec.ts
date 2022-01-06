import { Configuration } from "../configuration";

import { UsAutocompletionsWritable } from "../models";
import { UsAutocompletions } from "../api";

describe("UsVerificationApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const autocomplete: UsAutocompletionsWritable = {
    primary_line: "180 BERRY ST",
    city: "SAN FRANCISCO",
    state: "CA",
    zip_code: "94107",
  };

  it("US Verifications API can be instantiated", () => {
    const autocompletionApi = new UsAutocompletions(config);
    expect(autocompletionApi).toBeDefined();
    expect(typeof autocompletionApi).toEqual("object");
    expect(autocompletionApi).toBeInstanceOf(UsAutocompletions);
  });

  describe("autocomplete", () => {
    it("exists", () => {
      const autocompletionApi = new UsAutocompletions(config);
      expect(autocompletionApi.autocomplete).toBeDefined();
      expect(typeof autocompletionApi.autocomplete).toEqual("function");
    });

    it("verifies a single US address", async () => {
      const autocompletionApi = new UsAutocompletions(config);
      const response = await autocompletionApi.autocomplete(autocomplete);
    });
  });
});
