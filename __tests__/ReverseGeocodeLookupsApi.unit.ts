import { Configuration } from "../configuration";

import { Location } from "../models";
import { ReverseGeocodeLookupsApi } from "../api";

import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("ReverseGeocodeLookupsApi", () => {
  const config: Configuration = new Configuration({
    username: "Totally Fake Key",
  });
  const configWithBaseOptions = new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  it("reverse geocode lookup API can be instantiated", () => {
    const reverseGeocodeApi = new ReverseGeocodeLookupsApi(config);
    expect(reverseGeocodeApi).toBeDefined();
    expect(typeof reverseGeocodeApi).toEqual("object");
    expect(reverseGeocodeApi).toBeInstanceOf(ReverseGeocodeLookupsApi);
  });

  describe("lookup", () => {
    const mockLocation = new Location;
    mockLocation.latitude = 10.0518,
    mockLocation.longitude = 77.5677

    it("exists", async () => {
      const reverseGeocodeApi = new ReverseGeocodeLookupsApi(config);
      expect(reverseGeocodeApi.lookup).toBeDefined();
      expect(typeof reverseGeocodeApi.lookup).toEqual("function");
    });

    it("looks up a geocode", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "us_reverse_geocode_fakeId" },
      }));

      const geocodeResult = await new ReverseGeocodeLookupsApi(config).lookup(
        mockLocation
      );
      expect(geocodeResult).toBeDefined();
      expect(geocodeResult.id).toEqual("us_reverse_geocode_fakeId");
    });

    it("includes custom headers while it looks up a geocode", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "us_reverse_geocode_fakeId" },
      }));

      const reverseGeocodeApi = await new ReverseGeocodeLookupsApi(
        configWithBaseOptions
      ).lookup(mockLocation);
      expect(reverseGeocodeApi).toBeDefined();
      expect(reverseGeocodeApi?.id).toEqual("us_reverse_geocode_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ReverseGeocodeLookupsApi(configWithBaseOptions).lookup(mockLocation);
        fail("Should throw");
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
        await new ReverseGeocodeLookupsApi(configWithBaseOptions).lookup(mockLocation);
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
        await new ReverseGeocodeLookupsApi(configWithBaseOptions).lookup(mockLocation);
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
        await new ReverseGeocodeLookupsApi(configWithBaseOptions).lookup(mockLocation);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
