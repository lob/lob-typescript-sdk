const { AddressesApi } = require("../../api");

describe("AddressApi Javascript Consumer", () => {
  const config = {
    username: process.env.LOB_API_KEY,
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

  describe("createAddress", () => {
    it("exists", () => {
      expect(addressApi.createAddress).toBeDefined();
      expect(typeof addressApi.createAddress).toEqual("function");
    });

    it("creates a new address", async () => {
      const response = await addressApi.createAddress(addressCreate);
    });
  });

  describe("listAddresses", () => {
    it("exists", () => {
      expect(addressApi.listAddresses).toBeDefined();
      expect(typeof addressApi.listAddresses).toEqual("function");
    });

    it("lists addresses", async () => {
      const response = await addressApi.listAddresses();
      expect(response.data).toBeDefined();
    });
  });
});
