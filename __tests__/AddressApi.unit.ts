import { Configuration } from "../configuration";

import {
  AddressEditable,
} from "../models";
import { AddressesApi } from "../api/addresses-api";

import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
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

  describe("create", () => {
    const addressCreate: AddressEditable = {
      name: "ADITI RAMASWAMY",
      address_line1: "360 BERRY ST",
      address_city: "SAN FRANCISCO",
      address_state: "CA",
      address_zip: "94158",
    };

    it("exists", () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.create).toBeDefined();
      expect(typeof addressApi.create).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new AddressesApi(config).create(addressCreate);
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {}
        };
      });

      try {
        await new AddressesApi(config).create(addressCreate);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {}}
        };
      });

      try {
        await new AddressesApi(config).create(addressCreate);
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
        await new AddressesApi(config).create(addressCreate);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake id" },
      }));

      const address = await new AddressesApi(config).create(
          addressCreate
      );
      expect(address).toBeDefined();
      expect(address?.id).toBeDefined();
    });

    it("includes custom headers while it creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake id" },
      }));

      const address = await new AddressesApi(configWithBaseOptions).create(
          addressCreate
      );
      expect(address).toBeDefined();
      expect(address?.id).toBeDefined();
    });

  });

  describe("get", () => {

    it("exists", async () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.get).toBeDefined();
      expect(typeof addressApi.get).toEqual('function');
    });

    it("retrieves an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: 'different fake id' }
      }));

      const address = await new AddressesApi(config).get("fake id");
      expect(address?.id).toEqual('different fake id');
    });

    it("includes custom headers while it retrieves an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: 'different fake id' }
      }));

      const address = await new AddressesApi(configWithBaseOptions).get("fake id");
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
        await new AddressesApi(config).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {}
        };
      });

      try {
        await new AddressesApi(config).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {}}
        };
      });

      try {
        await new AddressesApi(config).get("fake id");
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
        await new AddressesApi(config).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

  });

  describe("list", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.list).toBeDefined();
      expect(typeof addressApi.list).toEqual("function");
    });

    it("lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new AddressesApi(config).list();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("includes custom headers while it lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new AddressesApi(configWithBaseOptions).list();
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
        await new AddressesApi(config).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {}
        };
      });

      try {
        await new AddressesApi(config).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {}}
        };
      });

      try {
        await new AddressesApi(config).list();
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
        await new AddressesApi(config).list();
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

      const response = await new AddressesApi(config).list(
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

      const response = await new AddressesApi(config).list(
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

      const response = await new AddressesApi(config).list(
          undefined,
          undefined,
          "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists addresses with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).list(
          undefined,
          undefined,
          undefined,
          ["this" ]
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists addresses with a dateCreated parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
            "date_created=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%3A34%3A56Z%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).list(
          undefined,
          undefined,
          undefined,
          undefined,
          { gt: '2020-01-01', lt: '2020-01-31T12:34:56Z' }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists addresses with a metadata parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("metadata=%7B%22what%22%3A%22this%22%7D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        }
      });

      const response = await new AddressesApi(config).list(
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

      const response = await new AddressesApi(config).list(
          10,
          undefined,
          "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

  });

  describe("delete", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(config);
      expect(addressApi.delete).toBeDefined();
      expect(typeof addressApi.delete).toEqual("function");
    });

    it("deletes an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "fake id",
          deleted: true,
        },
      }));
      const deletedAddress = await new AddressesApi(config).delete(
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
      const deletedAddress = await new AddressesApi(configWithBaseOptions).delete(
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
        await new AddressesApi(config).delete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {}
        };
      });

      try {
        await new AddressesApi(config).delete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {}}
        };
      });

      try {
        await new AddressesApi(config).delete("fake id");
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
        await new AddressesApi(config).delete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
