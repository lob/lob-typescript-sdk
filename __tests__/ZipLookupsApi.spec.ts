import { ZipEditable } from "../models";
import { ZipLookupsApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("ZipLookupsApi", () => {
  const testZip = new ZipEditable({
    zip_code: "94107",
  });

  it("US Zip Lookup API can be instantiated", () => {
    const zipApi = new ZipLookupsApi(CONFIG_FOR_INTEGRATION);
    expect(zipApi).toBeDefined();
    expect(typeof zipApi).toEqual("object");
    expect(zipApi).toBeInstanceOf(ZipLookupsApi);
  });

  describe("lookup", () => {
    it("exists", () => {
      const zipApi = new ZipLookupsApi(CONFIG_FOR_INTEGRATION);
      expect(zipApi.lookup).toBeDefined();
      expect(typeof zipApi.lookup).toEqual("function");
    });

    it("looks up given input", async () => {
      const zipApi = new ZipLookupsApi(CONFIG_FOR_INTEGRATION);
      const response = await zipApi.lookup(testZip);
      expect(response.cities).toBeDefined();
      expect(response.cities?.length).toBeGreaterThan(0);
    });
  });
});
