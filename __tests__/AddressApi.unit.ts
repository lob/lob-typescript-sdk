import { Configuration } from "../configuration";

import {
  AddressEditable,
} from "../models";
import { AddressesApi } from "../api/addresses-api";

import axios from "axios";

import {debugLog, fail} from "./testUtilities";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock('axios', () => ({
  request: jest.fn().mockImplementation(async (args) => ({ data: 'blah' }))
}));

describe("AddressApi", () => {
  const config: Configuration = new Configuration({
    username: 'Totally Fake Key',
  });

  it("Address API can be instantiated", () => {
    const addressApi = new AddressesApi(config);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  describe("createAddress", () => {
    const addressCreate: AddressEditable = {
      name: "ADITI RAMASWAMY",
      address_line1: "360 BERRY ST",
      address_city: "SAN FRANCISCO",
      address_state: "CA",
      address_zip: "94158",
    };

    it("exists", () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.createAddress).toBeDefined();
      expect(typeof addressApi.createAddress).toEqual("function");
    });

    it.skip("handles errors in making the request", async () => {
      // ToDo: A consumer should be able to identify when something has failed
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error('Fail Case');
      });

      try {
        const result = await new AddressesApi(config).createAddress(addressCreate);
        debugLog(result);
        throw new Error('Test Fail');
      } catch (err: any) {
        expect(err.message).toEqual('Fail Case');
      }
    });

    it("creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: 'fake id' }
      }));

      const address = await new AddressesApi(config).createAddress(addressCreate);
      expect(address).toBeDefined();
      expect(address?.id).toBeDefined();
    });

  });

  describe("getAddress", () => {

    it("exists", async () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.getAddress).toBeDefined();
      expect(typeof addressApi.getAddress).toEqual('function');
    });

    it("retrieves an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: 'different fake id' }
      }));
      
      const address = await new AddressesApi(config).getAddress("fake id");
      expect(address?.id).toEqual('different fake id');
    });

    it.skip("correctly handles errors", async () => {
      // ToDo: Should throw
      const AuthnViolationPayload = { error: 'this is an error message', code: 401 };

      axiosRequest.mockImplementationOnce(async () => ({
        data: AuthnViolationPayload
      }));

      try {
        const address = await new AddressesApi(config).getAddress("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("this is an error message");
      }
    });

  });

  describe("listAddresses", () => {

    it("exists", () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.listAddresses).toBeDefined();
      expect(typeof addressApi.listAddresses).toEqual("function");
    });

    it("lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: 'fake 1' }, { id: 'fake 2' }] }
      }));

      const response = await new AddressesApi(config).listAddresses();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

  });

  describe("deleteAddress", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.deleteAddress).toBeDefined();
      expect(typeof addressApi.deleteAddress).toEqual("function");
    });

    it("deletes an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: 'fake id',
          deleted: true
        }
      }));
      const deletedAddress = await new AddressesApi(config).deleteAddress('fake id');
      expect(deletedAddress?.deleted).toEqual(true);
    });
  });
});
