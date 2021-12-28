import { Configuration } from "../configuration";

import {
  Address,
  AddressDeletion,
  AddressEditable,
  AddressList,
} from "../models";
import { AddressesApi } from "../api/addresses-api";

import axios from "axios";

import { debugLog, fail } from "./testUtilities";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("AddressApi", () => {
  const config: Configuration = new Configuration({
    username: "Totally Fake Key",
  });
  const configWithBaseOptions = new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });

  it("Address API can be instantiated", () => {
    const addressApi = new AddressesApi(config);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  it("Address API can be instantiated with base options", () => {
    const addressApi = new AddressesApi(configWithBaseOptions);
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

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new AddressesApi(config).createAddress(addressCreate);
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new AddressesApi(config).createAddress(addressCreate);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake id" },
      }));

      const address = await new AddressesApi(config).createAddress(
          addressCreate
      );
      expect(address).toBeDefined();
      expect(address?.id).toBeDefined();
    });

    it("includes custom headers while it creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake id" },
      }));

      const address = await new AddressesApi(configWithBaseOptions).createAddress(
          addressCreate
      );
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

    it("includes custom headers while it retrieves an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: 'different fake id' }
      }));

      const address = await new AddressesApi(configWithBaseOptions).getAddress("fake id");
      expect(address?.id).toEqual('different fake id');
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } }}
        };
      });

      try {
        await new AddressesApi(config).getAddress("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new AddressesApi(config).getAddress("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
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
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new AddressesApi(config).listAddresses();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("includes custom headers while it lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new AddressesApi(configWithBaseOptions).listAddresses();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new AddressesApi(config).listAddresses();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new AddressesApi(config).listAddresses();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("lists addresses with a limit parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          10
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists addresses with a before parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("before=before");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          undefined,
          "before"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists addresses with an after parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          undefined,
          undefined,
          "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it.skip("lists addresses with an include parameter", async () => {
      // ToDo: https://lobsters.atlassian.net/browse/DXP-607
      //  currently is resulting in "'https://api.lob.com/v1/addresses?include=%5Bobject+Object%5D'"
      // This is wrong
      axiosRequest.mockImplementationOnce(async (request) => {
        console.log(request);
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          undefined,
          undefined,
          undefined,
          { what: "this" }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it.skip("lists addresses with a dateCreated parameter", async () => {
      // ToDo: https://lobsters.atlassian.net/browse/DXP-607
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          undefined,
          undefined,
          undefined,
          undefined,
        { what: 'this' }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it.skip("lists addresses with a metadata parameter", async () => {
      // ToDo: https://lobsters.atlassian.net/browse/DXP-607
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          { what: 'this' }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists addresses with multiple parameters", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10&after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).listAddresses(
          10,
          undefined,
          "after"
      );
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
          id: "fake id",
          deleted: true,
        },
      }));
      const deletedAddress = await new AddressesApi(config).deleteAddress(
          "fake id"
      );
      expect(deletedAddress?.deleted).toEqual(true);
    });

    it("includes custom headers while it deletes an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "fake id",
          deleted: true,
        },
      }));
      const deletedAddress = await new AddressesApi(configWithBaseOptions).deleteAddress(
          "fake id"
      );
      expect(deletedAddress?.deleted).toEqual(true);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } }}
        };
      });

      try {
        await new AddressesApi(config).deleteAddress("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new AddressesApi(config).deleteAddress("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
