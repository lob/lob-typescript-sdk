import { IntlAutocompletionsWritable } from "../models";
import { IntlAutocompletionsApi } from "../api";
import {
  CONFIG_FOR_INTEGRATION,
  CONFIG_FOR_INTEGRATION_WITH_LIVE,
} from "./testFixtures";

describe("IntlAutocompletionsApi", () => {
  const autocompletionInput = new IntlAutocompletionsWritable({
    address_prefix: "35 T",
    city: "LONDON",
    zip_code: "EC3N 4DR",
    country: "GB",
  });

  const autocompletionApi = new IntlAutocompletionsApi(
    CONFIG_FOR_INTEGRATION_WITH_LIVE
  );

  it("Intl Autocompletions API can be instantiated", () => {
    const api = new IntlAutocompletionsApi(CONFIG_FOR_INTEGRATION_WITH_LIVE);
    expect(api).toBeDefined();
    expect(typeof api).toEqual("object");
    expect(api).toBeInstanceOf(IntlAutocompletionsApi);
  });

  describe("autocomplete", () => {
    it("exists", () => {
      expect(autocompletionApi.autocomplete).toBeDefined();
      expect(typeof autocompletionApi.autocomplete).toEqual("function");
    });

    // TODO: Tests failing due to account setting issue. Fix by adding test account
    //  to 'international_autocompletion' FF.
    it.skip("autocompletes given input", async () => {
      const response = await autocompletionApi.autocomplete(
        autocompletionInput
      );
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toBeGreaterThan(0);
    });

    // TODO: Tests failing due to account setting issue. Fix by adding test account
    //  to 'international_autocompletion' FF.
    it.skip("refuses to autocomplete with test key", async () => {
      const response = await new IntlAutocompletionsApi(
        CONFIG_FOR_INTEGRATION
      ).autocomplete(autocompletionInput);

      expect(response.suggestions?.[0].primary_line).toEqual(
        "TEST KEYS DO NOT AUTOCOMPLETE INTL ADDRESSES"
      );
    });

    // TODO: Tests failing due to account setting issue. Fix by adding test account
    //  to 'international_autocompletion' FF.
    it.skip("fails on erroneous autocompletion object", async () => {
      const invalidAutocompletionInput = new IntlAutocompletionsWritable({
        city: "LONDON",
        zip_code: "EC3N 4DR",
        country: "GB",
      });

      try {
        await autocompletionApi.autocomplete(invalidAutocompletionInput);
        fail("should have thrown");
      } catch (err: any) {
        expect(err.message).toContain("address_prefix is required");
      }
    });
  });
});
