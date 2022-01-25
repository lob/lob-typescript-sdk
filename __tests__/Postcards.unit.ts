import { Configuration } from "../configuration";

import { PostcardEditable, AddressEditable, MailType, PostcardSize } from "../models";
import { PostcardsApi } from "../api/postcards-api";

import { fail } from "./testUtilities";
import {DATE_FILTER} from "./testFixtures";

import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
    request: jest.fn(),
}));

describe("PostcardsApi", () => {
  const config: Configuration = new Configuration({
    username: "Totally Fake Key",
  });
  const configWithBaseOptions = new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  it("Postcards API can be instantiated", () => {
    const postcardApi = new PostcardsApi(config);
    expect(postcardApi).toBeDefined();
    expect(typeof postcardApi).toEqual("object");
    expect(postcardApi).toBeInstanceOf(PostcardsApi);
  });

  it("Postcards API can be instantiated with base options", () => {
    const postcardApi = new PostcardsApi(configWithBaseOptions);
    expect(postcardApi).toBeDefined();
    expect(typeof postcardApi).toEqual("object");
    expect(postcardApi).toBeInstanceOf(PostcardsApi);
  });

  
  describe("get", () => {
    it("exists", () => {
      const postcardApi = new PostcardsApi
      (config);
      expect(postcardApi.get).toBeDefined();
      expect(typeof postcardApi.get).toEqual("function");
    });

    it("gets a record", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "psc_fakeId", deleted: false },
      }));

      const postcard = await new PostcardsApi
      (config).get("ID");
      expect(postcard).toBeDefined();
      expect(postcard.id).toEqual("psc_fakeId");
      expect(postcard.deleted).toEqual(false);
    });

    it("includes custom headers while it gets a postcard", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "psc_differentFakeId" },
      }));

      const postcard = await new PostcardsApi
      (configWithBaseOptions).get("psc_ID");
      expect(postcard).toBeDefined();
      expect(postcard?.id).toEqual("psc_differentFakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new PostcardsApi
        (config).get("fake id");
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
        await new PostcardsApi
        (config).get("fake id");
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
        await new PostcardsApi
        (config).get("fake id");
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
        await new PostcardsApi
        (config).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", () => {
      const postcardApi = new PostcardsApi(config);
      expect(postcardApi.list).toBeDefined();
      expect(typeof postcardApi.list).toEqual("function");
    });

    it("lists postcards", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new PostcardsApi(config).list();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("includes custom headers while it lists postcards", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new PostcardsApi(configWithBaseOptions).list();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new PostcardsApi(config).list();
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
        await new PostcardsApi(config).list();
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
        await new PostcardsApi(config).list();
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
        await new PostcardsApi(config).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("lists postcards with a limit parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(10);
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a before parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("before=before");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(undefined, "before");
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with an after parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        ["this"]
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a dateCreated parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "date_created=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
          DATE_FILTER
      );
      expect(response).toBeDefined(); 
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a metadata parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "metadata=%7B%22what%22%3A%22this%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { what: "this" }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a size parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("size=4x6");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        PostcardSize._4x6
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a scheduled parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("scheduled=true");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a sendDate parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "send_date=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        DATE_FILTER
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists postcards with a mailType parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("mail_type=usps_first_class");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        MailType.FirstClass
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "sort_by=%7B%22id%22%3A%22asc%22%7D"
        );
        return {
          data: { data: [{ id: "fake id" }] },
        };
      });

      const postcard = await new PostcardsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { id: "asc" }
      );
      expect(postcard).toBeDefined();
      expect(postcard?.data?.length).toEqual(1);
    });

    it("lists postcards with multiple parameters", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10&after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new PostcardsApi(config).list(
        10,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });
  });

  describe("cancel", () => {
    it("exists", () => {
      const postcardApi = new PostcardsApi(config);
      expect(postcardApi.create).toBeDefined();
      expect(typeof postcardApi.create).toEqual("function");
    });

    it("cancels a postcard", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "psc_fakeId",
          deleted: true,
        },
      }));
      const canceledPostcard = await new PostcardsApi(config).cancel("psc_fakeId");
      expect(canceledPostcard?.deleted).toEqual(true);
    });

    it("includes custom headers while it deletes a postcard", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "psc_fakeId",
          deleted: true,
        },
      }));
      const canceledPostcard = await new PostcardsApi(configWithBaseOptions).cancel(
        "psc_fakeId"
      );
      expect(canceledPostcard?.deleted).toEqual(true);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } } },
        };
      });

      try {
        await new PostcardsApi(config).cancel("fake id");
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
        await new PostcardsApi(config).cancel("fake id");
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
        await new PostcardsApi(config).cancel("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("error");
      });

      try {
        await new PostcardsApi(config).cancel("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });
  });

  describe("create", () => {
    const addressCreate: AddressEditable = {
      name: "Thing T. Thing",
      address_line1: "1313 CEMETERY LN",
      address_city: "WESTFIELD",
      address_state: "NJ",
      address_zip: "07000",
    };
    const createPostcard: PostcardEditable = {
      to: addressCreate,
    };
    it("exists", () => {
      const postcardApi = new PostcardsApi(config);
      expect(postcardApi.create).toBeDefined();
      expect(typeof postcardApi.create).toEqual("function");
    });

    it("creates a postcard", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "psc_fakeId" },
      }));

      const postcard = await new PostcardsApi(config).create(createPostcard);
      expect(postcard).toBeDefined();
      expect(postcard?.id).toBeDefined();
    });

    it("includes custom headers while it creates a postcard", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "psc_fakeId" },
      }));

      const postcard = await new PostcardsApi(configWithBaseOptions).create(
        createPostcard
      );
      expect(postcard).toBeDefined();
      expect(postcard?.id).toBeDefined();
    });

    it("creates a postcard with idempotency", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
          data: { id: "psc_fakeId" },
        }));
  
        const postcard = await new PostcardsApi(config).create(
          createPostcard, "fake key"
        );
        expect(postcard).toBeDefined();
        expect(postcard?.id).toBeDefined();
      });


    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        //
        await new PostcardsApi(config).create(createPostcard);
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
        await new PostcardsApi(config).create(createPostcard);
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
        await new PostcardsApi(config).create(createPostcard);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates postcards with an idempotency_key  ", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "idempotencyKey=026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        );
        return {
          id: "fake 1",
          description: "fake 2",
        };
      });

      const postcardApi = new PostcardsApi(config);
      expect(postcardApi.create).toBeDefined();
      expect(typeof postcardApi.create).toEqual("function");
    });
  });



});
