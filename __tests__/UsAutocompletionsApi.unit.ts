import { UsAutocompletionsWritable } from "../models";
import { UsAutocompletionsApi } from "../api";

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

describe("UsAutocompletionsApi", () => {
  it("US Autocompletions API can be instantiated", () => {
    const autocompletionApi = new UsAutocompletionsApi(CONFIG_FOR_UNIT);
    expect(autocompletionApi).toBeDefined();
    expect(typeof autocompletionApi).toEqual("object");
    expect(autocompletionApi).toBeInstanceOf(UsAutocompletionsApi);
  });

  it("US Autocompletions API can be instantiated with base options", () => {
    const autocompletionApi = new UsAutocompletionsApi(
      CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
    );
    expect(autocompletionApi).toBeDefined();
    expect(typeof autocompletionApi).toEqual("object");
    expect(autocompletionApi).toBeInstanceOf(UsAutocompletionsApi);
  });

  describe("autocomplete", () => {
    const autocompletionInput = new UsAutocompletionsWritable({
      address_prefix: "fake prefix",
      city: "fake city",
      state: "XX",
      zip_code: "12345",
      geo_ip_sort: false,
    });

    it("exists", () => {
      const autocompletionApi = new UsAutocompletionsApi(CONFIG_FOR_UNIT);
      expect(autocompletionApi.autocomplete).toBeDefined();
      expect(typeof autocompletionApi.autocomplete).toEqual("function");
    });

    it("autocompletes given input", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "us_auto_fakeId",
          suggestions: [],
          object: "us_autocompletion",
        },
      }));

      const response = await new UsAutocompletionsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).autocomplete(autocompletionInput);
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toEqual(0);
    });

    it("includes custom headers while it autocompletes given input", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "us_auto_fakeId",
          suggestions: [],
          object: "us_autocompletion",
        },
      }));

      const response = await new UsAutocompletionsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).autocomplete(autocompletionInput);
      expect(response.suggestions).toBeDefined();
      expect(response.suggestions?.length).toEqual(0);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } } },
        };
      });

      try {
        await new UsAutocompletionsApi(CONFIG_FOR_UNIT).autocomplete(
          autocompletionInput
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
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
        await new UsAutocompletionsApi(CONFIG_FOR_UNIT).autocomplete(
          autocompletionInput
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
        await new UsAutocompletionsApi(CONFIG_FOR_UNIT).autocomplete(
          autocompletionInput
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
        await new UsAutocompletionsApi(CONFIG_FOR_UNIT).autocomplete(
          autocompletionInput
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
