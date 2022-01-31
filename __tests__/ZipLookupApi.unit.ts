import { ZipLookupsApi } from "../api";
import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("ZipLookupsApi", () => {
  it("can be instantiated", () => {
    const zipLookupsApi = new ZipLookupsApi(CONFIG_FOR_UNIT);
    expect(zipLookupsApi).toBeDefined();
    expect(typeof zipLookupsApi).toEqual("object");
    expect(zipLookupsApi).toBeInstanceOf(ZipLookupsApi);
  });

  it("can be instantiated with base options", () => {
    const zipLookupsApi = new ZipLookupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT);
    expect(zipLookupsApi).toBeDefined();
    expect(typeof zipLookupsApi).toEqual("object");
    expect(zipLookupsApi).toBeInstanceOf(ZipLookupsApi);
  });

  describe("lookup", () => {
    it("exists", () => {
      const zipLookupsApi = new ZipLookupsApi(CONFIG_FOR_UNIT);
      expect(zipLookupsApi.lookup).toBeDefined();
      expect(typeof zipLookupsApi.lookup).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ZipLookupsApi(CONFIG_FOR_UNIT).lookup("07090");
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
        await new ZipLookupsApi(CONFIG_FOR_UNIT).lookup("07090");
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
        await new ZipLookupsApi(CONFIG_FOR_UNIT).lookup("07090");
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
        await new ZipLookupsApi(CONFIG_FOR_UNIT).lookup("07090");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "us_zip_fakeId" },
      }));

      const response = await new ZipLookupsApi(CONFIG_FOR_UNIT).lookup("07090");
      expect(response).toBeDefined();
      expect(response.id).toEqual("us_zip_fakeId");
    });

    it("includes custom headers while it verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "us_zip_fakeId" },
      }));

      const response = await new ZipLookupsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).lookup("07090");
      expect(response).toBeDefined();
      expect(response.id).toEqual("us_zip_fakeId");
    });
  });
});
