import { AddressEditable } from "../models";
import { AddressesApi } from "../api/addresses-api";

import { fail } from "./testUtilities";
import {
  ADDRESSES_EDITABLE,
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
  DATE_CREATED_QUERY_STRING,
  DATE_FILTER,
  METADATA_OBJECT,
  METADATA_QUERY_STRING,
} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("AddressApi", () => {
  it("Address API can be instantiated", () => {
    const addressApi = new AddressesApi(CONFIG_FOR_UNIT);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  it("Address API can be instantiated with base options", () => {
    const addressApi = new AddressesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT);
    expect(addressApi).toBeDefined();
    expect(typeof addressApi).toEqual("object");
    expect(addressApi).toBeInstanceOf(AddressesApi);
  });

  describe("create", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(CONFIG_FOR_UNIT);
      expect(addressApi.create).toBeDefined();
      expect(typeof addressApi.create).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new AddressesApi(CONFIG_FOR_UNIT).create(ADDRESSES_EDITABLE[0]);
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
        await new AddressesApi(CONFIG_FOR_UNIT).create(ADDRESSES_EDITABLE[0]);
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
        await new AddressesApi(CONFIG_FOR_UNIT).create(ADDRESSES_EDITABLE[0]);
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
        await new AddressesApi(CONFIG_FOR_UNIT).create(ADDRESSES_EDITABLE[0]);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "adr_fakeId" },
      }));

      const address = await new AddressesApi(CONFIG_FOR_UNIT).create(
        ADDRESSES_EDITABLE[0]
      );
      expect(address).toBeDefined();
      expect(address.id).toBeDefined();
    });

    it("includes custom headers while it creates a new address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "adr_fakeId" },
      }));

      const address = await new AddressesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(ADDRESSES_EDITABLE[0]);
      expect(address).toBeDefined();
      expect(address.id).toBeDefined();
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const addressApi = new AddressesApi(CONFIG_FOR_UNIT);
      expect(addressApi.get).toBeDefined();
      expect(typeof addressApi.get).toEqual("function");
    });

    it("retrieves an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "adr_differentFakeId" },
      }));

      const address = await new AddressesApi(CONFIG_FOR_UNIT).get("adr_fakeId");
      expect(address.id).toEqual("adr_differentFakeId");
    });

    it("includes custom headers while it retrieves an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "adr_differentFakeId" },
      }));

      const address = await new AddressesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("adr_fakeId");
      expect(address.id).toEqual("adr_differentFakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } } },
        };
      });

      try {
        await new AddressesApi(CONFIG_FOR_UNIT).get("adr_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
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
        await new AddressesApi(CONFIG_FOR_UNIT).get("adr_fakeId");
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
        await new AddressesApi(CONFIG_FOR_UNIT).get("adr_fakeId");
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
        await new AddressesApi(CONFIG_FOR_UNIT).get("adr_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(CONFIG_FOR_UNIT);
      expect(addressApi.list).toBeDefined();
      expect(typeof addressApi.list).toEqual("function");
    });

    it("lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
      }));

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list();
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("includes custom headers while it lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
      }));

      const response = await new AddressesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).list();
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new AddressesApi(CONFIG_FOR_UNIT).list();
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
        await new AddressesApi(CONFIG_FOR_UNIT).list();
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
        await new AddressesApi(CONFIG_FOR_UNIT).list();
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
        await new AddressesApi(CONFIG_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("lists addresses with a limit parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10");
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(10);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("lists addresses with a before parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("before=before");
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(
        undefined,
        "before"
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("lists addresses with an after parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("lists addresses with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        ["this"]
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("lists addresses with a dateCreated parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(DATE_CREATED_QUERY_STRING);
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        DATE_FILTER
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("lists addresses with a metadata parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(METADATA_QUERY_STRING);
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        METADATA_OBJECT
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("lists addresses with multiple parameters", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10&after=after");
        return {
          data: { data: [{ id: "adr_fakeId1" }, { id: "adr_fakeId2" }] },
        };
      });

      const response = await new AddressesApi(CONFIG_FOR_UNIT).list(
        10,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });
  });

  describe("delete", () => {
    it("exists", () => {
      const addressApi = new AddressesApi(CONFIG_FOR_UNIT);
      expect(addressApi.delete).toBeDefined();
      expect(typeof addressApi.delete).toEqual("function");
    });

    it("deletes an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "adr_fakeId",
          deleted: true,
        },
      }));
      const deletedAddress = await new AddressesApi(CONFIG_FOR_UNIT).delete(
        "adr_fakeId"
      );
      expect(deletedAddress.deleted).toEqual(true);
    });

    it("includes custom headers while it deletes an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "adr_fakeId",
          deleted: true,
        },
      }));
      const deletedAddress = await new AddressesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).delete("adr_fakeId");
      expect(deletedAddress.deleted).toEqual(true);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } } },
        };
      });

      try {
        await new AddressesApi(CONFIG_FOR_UNIT).delete("adr_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by Api");
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
        await new AddressesApi(CONFIG_FOR_UNIT).delete("adr_fakeId");
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
        await new AddressesApi(CONFIG_FOR_UNIT).delete("adr_fakeId");
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
        await new AddressesApi(CONFIG_FOR_UNIT).delete("adr_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
