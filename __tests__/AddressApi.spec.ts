import { Configuration } from "../configuration";

import { Address, AddressEditable, AddressList } from "../models";
import { AddressesApi } from "../api/addresses-api";

import { fail, debugLog } from "./testUtilities";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("AddressApi", () => {
  jest.setTimeout(1000 * 60);

  const addressCreate: AddressEditable = {
    name: "Thing T. Thing",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
  };

  const createdAddressIds: string[] = [];
  afterAll(async () => {
    const addressApi = new AddressesApi(CONFIG_FOR_INTEGRATION);
    for (const addressId of createdAddressIds) {
      await addressApi.delete(addressId);
    }
  });

  it("Address API can be instantiated", () => {
    const addressApi = new AddressesApi(CONFIG_FOR_INTEGRATION);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  describe("create", () => {
    it("creates a new address", async () => {
      const address = await new AddressesApi(CONFIG_FOR_INTEGRATION).create(
        addressCreate
      );
      expect(address).toBeDefined();
      expect(address.id).toBeDefined();
      createdAddressIds.push(address.id);
    });

    it("correctly handles connections with invalid keys", async () => {
      const badAddressApi = new AddressesApi(
        new Configuration({ username: "not a real key" })
      );
      expect(badAddressApi).toBeDefined();

      try {
        const address = await badAddressApi.create(addressCreate);
        debugLog(address);
        fail("Prior operation should have thrown.");
      } catch (err: any) {
        expect(err.message).toEqual(
          "Your API key is not valid. Please sign up on lob.com to get a valid api key."
        );
      }
    });
  });

  describe("get", () => {
    it("gets and address by id", async () => {
      const address = await new AddressesApi(CONFIG_FOR_INTEGRATION).get(
        createdAddressIds[0]
      );
      expect(address).toBeDefined();
      expect(address.id).toBeDefined();
    });
  });

  describe("list", () => {
    let nextUrl = "";
    let previousUrl = "";
    let addressList: Address[] = [];

    beforeAll(async () => {
      const addressApi = new AddressesApi(CONFIG_FOR_INTEGRATION);
      // ensure there are at least 3 addresses present, to test pagination
      const address1: AddressEditable = {
        name: "FESTER",
        address_line1: "001 CEMETERY LN",
        address_line2: "SUITE 666",
        address_city: "WESTFIELD ",
        address_state: "NJ",
        address_zip: "07000",
      };
      const address2: AddressEditable = {
        name: "MORTICIA ADDAMS",
        address_line1: "1212 CEMETERY LANE",
        address_city: "WESTFIELD",
        address_state: "NJ",
        address_zip: "07000",
      };
      const address3: AddressEditable = {
        name: "COUSIN ITT",
        address_line1: "1515 CEMETERY LN",
        address_line2: "FLOOR 0",
        address_city: "WESTFIELD",
        address_state: "NJ",
        address_zip: "07000",
      };
      createdAddressIds.push((await addressApi.create(address1)).id);
      createdAddressIds.push((await addressApi.create(address2)).id);
      createdAddressIds.push((await addressApi.create(address3)).id);

      const response = await addressApi.list();
      if (response && response.next_url) {
        nextUrl = response.next_url.slice(
          response.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await addressApi.list(
          10,
          undefined,
          nextUrl,
          undefined,
          undefined,
          undefined,
          undefined
        );
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        }
      }
    });

    it("exists", () => {
      const addressApi = new AddressesApi(CONFIG_FOR_INTEGRATION);
      expect(addressApi.list).toBeDefined();
      expect(typeof addressApi.list).toEqual("function");
    });

    it("lists addresses", async () => {
      const response = (await new AddressesApi(
        CONFIG_FOR_INTEGRATION
      ).list()) as AddressList;
      expect(response).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data).toBeDefined();
      addressList = response.data || [];
      expect(addressList.length).toBeGreaterThan(0);
    });

    it("lists addresses given an after param", async () => {
      const responseAfter = await new AddressesApi(CONFIG_FOR_INTEGRATION).list(
        10,
        undefined,
        nextUrl
      );
      expect(responseAfter).toBeDefined();
      expect(responseAfter?.data).toBeDefined();
      const addressList2: Address[] = responseAfter?.data || [];
      expect(addressList2.length).toBeGreaterThan(0);
    });

    it("lists addresses given a before param", async () => {
      const responseBefore = await new AddressesApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, previousUrl);
      expect(responseBefore).toBeDefined();
      expect(responseBefore?.data).toBeDefined();
      const addressList3: Address[] = responseBefore?.data || [];
      expect(addressList3.length).toBeGreaterThan(0);
    });

    it("lists addresses given an include param", async () => {
      const response = await new AddressesApi(CONFIG_FOR_INTEGRATION).list(
        10,
        undefined,
        undefined,
        ["total_es"]
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response.count).toBeDefined();
      const addressList2: Address[] = response?.data || [];
      expect(addressList2.length).toBeGreaterThan(0);
    });

    it("lists addresses using nextPageToken", async () => {
      const listResponse = await new AddressesApi(CONFIG_FOR_INTEGRATION).list(
        10
      );
      const responseAfter = await new AddressesApi(CONFIG_FOR_INTEGRATION).list(
        10,
        undefined,
        listResponse.nextPageToken
      );
      expect(responseAfter).toBeDefined();
      expect(responseAfter?.data).toBeDefined();
      const addressList2: Address[] = responseAfter?.data || [];
      expect(addressList2.length).toBeGreaterThan(0);
    });
  });

  describe("delete", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(CONFIG_FOR_INTEGRATION);
      expect(addressApi.delete).toBeDefined();
      expect(typeof addressApi.delete).toEqual("function");
    });

    it("deletes an address", async () => {
      const address = await new AddressesApi(CONFIG_FOR_INTEGRATION).create(
        addressCreate
      );
      expect(address).toBeDefined();
      expect(address.id).toBeDefined();

      const deletedAddress = await new AddressesApi(
        CONFIG_FOR_INTEGRATION
      ).delete(address.id);
      expect(deletedAddress).toBeDefined();
      expect(deletedAddress.id).toEqual(address.id);
      expect(deletedAddress.deleted).toEqual(true);
    });
  });
});
