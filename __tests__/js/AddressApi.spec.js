const { AddressesApi } = require("../../api");

describe("AddressApi Javascript Consumer", () => {
  const config = {
    username: process.env.LOB_API_TEST_KEY || process.env.LOB_API_LIVE_KEY,
  };

  let addressApi;

  const addressCreate = {
    name: "ADITI RAMASWAMY",
    address_line1: "360 BERRY ST",
    address_city: "SAN FRANCISCO",
    address_state: "CA",
    address_zip: "94158",
  };

  it("Can be instantiated", () => {
    addressApi = new AddressesApi(config);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  describe("create", () => {
    it("exists", () => {
      expect(addressApi.create).toBeDefined();
      expect(typeof addressApi.create).toEqual("function");
    });

    it("creates a new address", async () => {
      const response = await addressApi.create(addressCreate);
    });
  });

  describe("list", () => {
    it("exists", () => {
      expect(addressApi.list).toBeDefined();
      expect(typeof addressApi.list).toEqual("function");
    });

    it("lists addresses", async () => {
      const response = await addressApi.list();
      expect(response.data).toBeDefined();
    });
  });
});
