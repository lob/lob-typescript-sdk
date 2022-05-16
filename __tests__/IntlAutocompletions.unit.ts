import { IntlAutocompletionsWritable, IntlSuggestions } from "../models";
import { IntlAutocompletionsApi } from "../api";
import { fail } from "./testUtilities";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("IntlAutocompletionsApi", () => {
  it("can be instantiated", () => {
    const intlApi = new IntlAutocompletionsApi(CONFIG_FOR_UNIT);
    expect(intlApi).toBeDefined();
    expect(typeof intlApi).toEqual("object");
    expect(intlApi).toBeInstanceOf(IntlAutocompletionsApi);
  });

  it("can be instantiated with base options", () => {
    const intlApi = new IntlAutocompletionsApi(
      CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
    );
    expect(intlApi).toBeDefined();
    expect(typeof intlApi).toEqual("object");
    expect(intlApi).toBeInstanceOf(IntlAutocompletionsApi);
  });

  describe("Autocomplete", () => {
    const autoCompletion = new IntlAutocompletionsWritable({
      address_prefix: "340 Wat",
      city: "Summerside",
      state: "Prince Edward Island",
      zip_code: "C1N 1C4",
      country: "CA",
    });

    const suggestion = new IntlSuggestions({
      primary_number_range: "",
      primary_line: "340 WATERSTONE PL SE",
      city: "AIRDRIE",
      state: "AB",
      country: "CA",
      zip_code: "T4B 2G7",
    });

    it("exists", () => {
      const intlApi = new IntlAutocompletionsApi(CONFIG_FOR_UNIT);
      expect(intlApi.Autocomplete).toBeDefined();
      expect(typeof intlApi.Autocomplete).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new IntlAutocompletionsApi(CONFIG_FOR_UNIT).Autocomplete(
          autoCompletion
        );
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new IntlAutocompletionsApi(CONFIG_FOR_UNIT).Autocomplete(
          autoCompletion
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new IntlAutocompletionsApi(CONFIG_FOR_UNIT).Autocomplete(
          autoCompletion
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new IntlAutocompletionsApi(CONFIG_FOR_UNIT).Autocomplete(
          autoCompletion
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("completes an international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { suggestions: [suggestion] },
      }));

      const response = await new IntlAutocompletionsApi(
        CONFIG_FOR_UNIT
      ).Autocomplete(autoCompletion);
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toEqual(1);
    });

    it("includes custom headers while it completes an international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { suggestions: [suggestion] },
      }));

      const response = await new IntlAutocompletionsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).Autocomplete(autoCompletion);
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toEqual(1);
    });

    it("completes an international address with xLang", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { suggestions: [suggestion] },
      }));

      const response = await new IntlAutocompletionsApi(
        CONFIG_FOR_UNIT
      ).Autocomplete(autoCompletion, "native");
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toEqual(1);
    });
  });
});
