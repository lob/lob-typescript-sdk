import { Configuration } from "../configuration";

import { Location } from "../models";
import { ReverseGeocodeLookupsApi } from "../api";

describe("ReverseGeocodeLookupsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_LIVE_API_KEY,
  });

  const testCoordinates: Location = {
    latitude: 37.777456,
    longitude: -122.393039
  };

  it("US Reverse Geocode Lookup API can be instantiated", () => {
    const geocodeApi = new ReverseGeocodeLookupsApi(config);
    expect(geocodeApi).toBeDefined();
    expect(typeof geocodeApi).toEqual("object");
    expect(geocodeApi).toBeInstanceOf(ReverseGeocodeLookupsApi);
  });

  describe("lookup", () => {
    it("exists", () => {
      const geocodeApi = new ReverseGeocodeLookupsApi(config);
      expect(geocodeApi.lookup).toBeDefined();
      expect(typeof geocodeApi.lookup).toEqual("function");
    });

    it("looks up given input", async () => {
      const geocodeApi = new ReverseGeocodeLookupsApi(config);
      const response = await geocodeApi.lookup(
        testCoordinates
      );
      expect(response.addresses).toBeDefined();
      expect(response?.addresses?.length).toBeGreaterThan(0);
    });
  });
});
