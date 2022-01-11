import { Configuration } from "../configuration";

import { UsAutocompletionsWritable } from "../models";
import { USAutocompletionsApi } from "../api";

describe("USAutocompletionsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_LIVE_API_KEY,
  });

  const autocompletionInput: UsAutocompletionsWritable = {
    address_prefix: "185 B",
    city: "San Francisco",
    state: "CA",
    zip_code: "94107",
    geo_ip_sort: false,
  };

  it("US Autocompletions API can be instantiated", () => {
    const autocompletionApi = new USAutocompletionsApi(config);
    expect(autocompletionApi).toBeDefined();
    expect(typeof autocompletionApi).toEqual("object");
    expect(autocompletionApi).toBeInstanceOf(USAutocompletionsApi);
  });

  describe("autocomplete", () => {
    it("exists", () => {
      const autocompletionApi = new USAutocompletionsApi(config);
      expect(autocompletionApi.autocomplete).toBeDefined();
      expect(typeof autocompletionApi.autocomplete).toEqual("function");
    });

    it("autocompletes given input", async () => {
      const autocompletionApi = new USAutocompletionsApi(config);
      const response = await autocompletionApi.autocomplete(
        autocompletionInput
      );
      expect(response.suggestions).toBeDefined();
      expect(response?.suggestions?.length).toBeGreaterThan(0);
    });
  });
});
