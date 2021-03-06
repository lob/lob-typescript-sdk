import { UsAutocompletionsWritable } from "../models";
import { UsAutocompletionsApi } from "../api";
import { CONFIG_FOR_INTEGRATION_WITH_LIVE } from "./testFixtures";

describe("UsAutocompletionsApi", () => {
  const autocompletionInput = new UsAutocompletionsWritable({
    address_prefix: "1313",
    city: "WESTFIELD",
    state: "NJ",
    zip_code: "07090",
    geo_ip_sort: false,
  });

  it("US Autocompletions API can be instantiated", () => {
    const autocompletionApi = new UsAutocompletionsApi(
      CONFIG_FOR_INTEGRATION_WITH_LIVE
    );
    expect(autocompletionApi).toBeDefined();
    expect(typeof autocompletionApi).toEqual("object");
    expect(autocompletionApi).toBeInstanceOf(UsAutocompletionsApi);
  });

  describe("autocomplete", () => {
    it("exists", () => {
      const autocompletionApi = new UsAutocompletionsApi(
        CONFIG_FOR_INTEGRATION_WITH_LIVE
      );
      expect(autocompletionApi.autocomplete).toBeDefined();
      expect(typeof autocompletionApi.autocomplete).toEqual("function");
    });

    it("autocompletes given input", async () => {
      const response = await new UsAutocompletionsApi(
        CONFIG_FOR_INTEGRATION_WITH_LIVE
      ).autocomplete(autocompletionInput);
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toBeGreaterThan(0);
    });
  });
});
