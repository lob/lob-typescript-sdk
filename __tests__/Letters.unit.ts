import { Configuration } from "../configuration";

import { LetterEditable, AddressEditable, MailType } from "../models";
import { LettersApi } from "../api/letters-api";

import { fail } from "./testUtilities";

import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
    request: jest.fn(),
}));

describe("LetterApi", () => {
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

  it("Letter API can be instantiated", () => {
    const letterApi = new LettersApi(config);
    expect(letterApi).toBeDefined();
    expect(typeof letterApi).toEqual("object");
    expect(letterApi).toBeInstanceOf(LettersApi);
  });

  it("Letter API can be instantiated with base options", () => {
    const letterApi = new LettersApi(configWithBaseOptions);
    expect(letterApi).toBeDefined();
    expect(typeof letterApi).toEqual("object");
    expect(letterApi).toBeInstanceOf(LettersApi);
  });

  describe("get", () => {
    it("exists", () => {
      const letterApi = new LettersApi(config);
      expect(letterApi.get).toBeDefined();
      expect(typeof letterApi.get).toEqual("function");
    });

    it("gets a record", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "ltr_fakeId", deleted: false },
      }));

      const letter = await new LettersApi(config).get("ltr_fakeId");
      expect(letter).toBeDefined();
      expect(letter.id).toEqual("ltr_fakeId");
      expect(letter.deleted).toEqual(false);
    });

    it("includes custom headers while it gets a letter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "ltr_fakeId2" },
      }));

      const letter = await new LettersApi(configWithBaseOptions).get("ltr_fakeId");
      expect(letter).toBeDefined();
      expect(letter?.id).toEqual("ltr_fakeId2");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new LettersApi(config).get("ltr_fakeId");
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
        await new LettersApi(config).get("ltr_fakeId");
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
        await new LettersApi(config).get("ltr_fakeId");
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
        await new LettersApi(config).get("ltr_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", () => {
      const lettersApi = new LettersApi(config);
      expect(lettersApi.list).toBeDefined();
      expect(typeof lettersApi.list).toEqual("function");
    });

    it("lists letters", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new LettersApi(config).list();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("includes custom headers while it lists addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new LettersApi(configWithBaseOptions).list();
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
        await new LettersApi(config).list();
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
        await new LettersApi(config).list();
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
        await new LettersApi(config).list();
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
        await new LettersApi(config).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("lists letters with a limit parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(10);
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists letters with a before parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("before=before");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(undefined, "before");
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists letters with an after parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
        undefined,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists letters with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
        undefined,
        undefined,
        undefined,
        ["this"]
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists letters with a dateCreated parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "date_created=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%3A34%3A56Z%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        { gt: "2020-01-01", lt: "2020-01-31T12:34:56Z" }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists letters with a metadata parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "metadata=%7B%22what%22%3A%22this%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
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

    it("lists letters with a color parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("color=true");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
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

    it("lists letters with a scheduled parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("scheduled=true");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
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

    it("lists letters with a sendDate parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "send_date=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%3A34%3A56Z%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { gt: "2020-01-01", lt: "2020-01-31T12:34:56Z" }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists letters with a mailType parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("mail_type=usps_first_class");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
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
          data: { data: [{ id: "ltr_fakeId" }] },
        };
      });

      const letter = await new LettersApi(config).list(
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
      expect(letter).toBeDefined();
      expect(letter?.data?.length).toEqual(1);
    });

    it("lists letters with multiple parameters", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10&after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new LettersApi(config).list(
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
      const letterApi = new LettersApi(config);
      expect(letterApi.create).toBeDefined();
      expect(typeof letterApi.create).toEqual("function");
    });

    it("cancels a letter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "ltr_fakeId",
          deleted: true,
        },
      }));
      const canceledLetter = await new LettersApi(config).cancel("ltr_fakeId");
      expect(canceledLetter?.deleted).toEqual(true);
    });

    it("includes custom headers while it deletes an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "ltr_fakeId",
          deleted: true,
        },
      }));
      const canceledLetter = await new LettersApi(configWithBaseOptions).cancel(
        "ltr_fakeId"
      );
      expect(canceledLetter?.deleted).toEqual(true);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by Api" } } },
        };
      });

      try {
        await new LettersApi(config).cancel("ltr_fakeId");
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
        await new LettersApi(config).cancel("ltr_fakeId");
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
        await new LettersApi(config).cancel("ltr_fakeId");
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
        await new LettersApi(config).cancel("ltr_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });
  });

  describe("create", () => {
    const addressCreate: AddressEditable = {
      name: "ADITI RAMASWAMY",
      address_line1: "360 BERRY ST",
      address_city: "SAN FRANCISCO",
      address_state: "CA",
      address_zip: "94158",
    };
    const createLetter: LetterEditable = {
      to: addressCreate,
      from: addressCreate,
      file: "https://docs.google.com/document/d/1YE9GsoeWl5oPIXxsJ2SI0JweTURfOR8tW0UGK9_H_vo/edit?usp=sharing",
    };

    it("exists", () => {
      const letterApi = new LettersApi(config);
      expect(letterApi.create).toBeDefined();
      expect(typeof letterApi.create).toEqual("function");
    });

    it("creates a letter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "ltr_fakeId" },
      }));

      const letter = await new LettersApi(config).create(createLetter);
      expect(letter).toBeDefined();
      expect(letter?.id).toBeDefined();
    });

    it("includes custom headers while it creates a letter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "ltr_fakeId" },
      }));

      const letter = await new LettersApi(configWithBaseOptions).create(
        createLetter
      );
      expect(letter).toBeDefined();
      expect(letter?.id).toBeDefined();
    });

    it("creates a letter with idempotency", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
          data: { id: "ltr_fakeId" },
        }));
  
        const letter = await new LettersApi(config).create(
          createLetter, "fake key"
        );
        expect(letter).toBeDefined();
        expect(letter?.id).toBeDefined();
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
        await new LettersApi(config).create(createLetter);
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
        await new LettersApi(config).create(createLetter);
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
        await new LettersApi(config).create(createLetter);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates letters with an idempotency_key  ", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "idempotencyKey=026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        );
        return {
          id: "fake 1",
          description: "fake 2",
        };
      });

      const letterApi = new LettersApi(config);
      expect(letterApi.create).toBeDefined();
      expect(typeof letterApi.create).toEqual("function");
    });
  })
});
