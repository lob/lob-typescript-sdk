import { Configuration } from "../configuration";

import { Address, AddressEditable, AddressList } from "../models";
import { AddressesApi } from "../api/addresses-api";

import { fail, debugLog } from "./testUtilities";

describe("AddressApi", () => {
  jest.setTimeout(1000 * 60);
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const addressCreate: AddressEditable = {
    name: "ADITI RAMASWAMY",
    address_line1: "360 BERRY ST",
    address_city: "SAN FRANCISCO",
    address_state: "CA",
    address_zip: "94158",
  };

  it("Address API can be instantiated", () => {
    const addressApi = new AddressesApi(config);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  describe("create", () => {
    it("creates a new address", async () => {
      const address = await new AddressesApi(config).create(addressCreate);
      expect(address).toBeDefined();
      expect(address?.id).toBeDefined();
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

    it.skip("handles rate limiting", async () => {
      // ToDo: Rate limit needs to be thrown
      const addressApi = new AddressesApi(config);

      const res = await Promise.all(
        [...Array(100000)].fill(addressApi.create(addressCreate))
      );

      for (const address of res as Address[]) {
        expect(address.id).toBeDefined();
        expect(address.description).toBeNull();
        expect(address.name).toEqual("ADITI RAMASWAMY");
        expect(address.company).toBeNull();
        expect(address.phone).toBeNull();
        expect(address.email).toBeNull();
        expect(address.address_line1).toEqual("360 BERRY ST");
        expect(address.address_line2).toBeNull();
        expect(address.address_city).toEqual("SAN FRANCISCO");
        expect(address.address_state).toEqual("CA");
        expect(address.address_zip).toEqual("94158-1611");
        expect(address.address_country).toEqual("UNITED STATES");
        expect(address.metadata).toBeDefined();
        expect(address.date_created).toBeDefined();
        expect(address.date_modified).toBeDefined();
        expect(address.recipient_moved).toBeNull();
        expect(address.object).toEqual("address");
      }

      fail("The Rate should have been limited at some point");
    });
  });

  describe("list", () => {
    let nextUrl = "";
    let previousUrl = "";
    let addressList: Address[] = [];

    beforeAll(async () => {
      const addressApi = new AddressesApi(config);
      // ensure there are at least 3 addresses present, to test pagination
      const address1: AddressEditable = {
        name: "HARRY ZHANG",
        address_line1: "180 BERRY ST",
        address_line2: "SUITE 6100",
        address_city: "SAN FRANCISCO",
        address_state: "CA",
        address_zip: "94107",
      };
      const address2: AddressEditable = {
        name: "HOUSE",
        address_line1: "21888 SHATTUCK DRIVE",
        address_city: "CUPERTINO",
        address_state: "CA",
        address_zip: "95014",
      };
      const address3: AddressEditable = {
        name: "OFFICE",
        address_line1: "1 CHURCH ST",
        address_line2: "FLOOR 3",
        address_city: "BURLINGTON",
        address_state: "VT",
        address_zip: "05401",
      };
      const a1 = await addressApi.create(address1);
      const a2 = await addressApi.create(address2);
      const a3 = await addressApi.create(address3);

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
      const addressApi = new AddressesApi(config);
      expect(addressApi.list).toBeDefined();
      expect(typeof addressApi.list).toEqual("function");
    });

    it("lists addresses", async () => {
      const response = (await new AddressesApi(config).list()) as AddressList;
      expect(response).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response?.data).toBeDefined();
      addressList = response?.data || [];
      expect(addressList.length).toBeGreaterThan(0);
    });

    it("lists addresses given an after param", async () => {
      const responseAfter = await new AddressesApi(config).list(
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
      const responseBefore = await new AddressesApi(config).list(
        10,
        previousUrl
      );
      expect(responseBefore).toBeDefined();
      expect(responseBefore?.data).toBeDefined();
      const addressList3: Address[] = responseBefore?.data || [];
      expect(addressList3.length).toBeGreaterThan(0);
    });

    it("lists addresses given an include param", async () => {
      const response = await new AddressesApi(config).list(
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
      const listResponse = await new AddressesApi(config).list(10);

      console.log('banana');
      console.log(listResponse);
      console.log(listResponse.nextPageToken);
      const responseAfter = await new AddressesApi(config).list(
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
      const addressApi = new AddressesApi(config);
      expect(addressApi.delete).toBeDefined();
      expect(typeof addressApi.delete).toEqual("function");
    });

    it("deletes an address", async () => {
      const address = await new AddressesApi(config).create(addressCreate);
      expect(address).toBeDefined();
      expect(address?.id).toBeDefined();

      const deletedAddress = await new AddressesApi(config).delete(
        address?.id as string
      );
      expect(deletedAddress).toBeDefined();
      expect(deletedAddress?.id).toEqual(address?.id);
      expect(deletedAddress?.deleted).toEqual(true);
    });
  });
});
