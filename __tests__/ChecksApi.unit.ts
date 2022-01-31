import { ChecksApi } from "../api/checks-api";

import axios from "axios";

import { fail } from "./testUtilities";
import { CheckEditable } from "../models/check-editable";
import { MailType } from "..";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("ChecksApi", () => {
  it("Checks API can be instantiated", () => {
    const checkApi = new ChecksApi(CONFIG_FOR_UNIT);
    expect(checkApi).toBeDefined();
    expect(typeof checkApi).toEqual("object");
    expect(checkApi).toBeInstanceOf(ChecksApi);
  });

  describe("create", () => {
    const chkEditableMock: CheckEditable = {
      from: "fake from",
      bank_account: "fake bank account",
      amount: 100,
    };

    it("exists", async () => {
      const chkApi = new ChecksApi(CONFIG_FOR_UNIT);
      expect(chkApi.create).toBeDefined();
      expect(typeof chkApi.create).toEqual("function");
    });

    it("creates a check", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "chk_fakeId" },
      }));

      const chk = await new ChecksApi(CONFIG_FOR_UNIT).create(chkEditableMock);
      expect(chk).toBeDefined();
      expect(chk.id).toEqual("chk_fakeId");
    });

    it("creates an idempotency key", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { idempotencyKey: "fake key" },
      }));

      const chk = await new ChecksApi(CONFIG_FOR_UNIT).create(
        chkEditableMock,
        "chk_fakeIdempotency key"
      );
      expect(chk).toBeDefined();
    });

    it("includes custom headers while it creates a check", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "chk_fakeId" },
      }));

      const chkApi = await new ChecksApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(chkEditableMock);
      expect(chkApi).toBeDefined();
      expect(chkApi?.id).toEqual("chk_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });
      const bgUpdatable = {
        description: "check updated",
      };

      try {
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          chkEditableMock
        );
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          chkEditableMock
        );
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          chkEditableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });
      const bgUpdatable = {
        description: "check updated",
      };

      try {
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          chkEditableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const checksApi = new ChecksApi(CONFIG_FOR_UNIT);
      expect(checksApi.get).toBeDefined();
      expect(typeof checksApi.get).toEqual("function");
    });

    it("get checks for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "chk_fakeId" },
      }));

      const billing_groups = await new ChecksApi(CONFIG_FOR_UNIT).get(
        "chk_fakeId"
      );
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("chk_fakeId");
    });

    it("includes custom headers while it retrieves a check for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "chk_fakeId" },
      }));

      const checks = await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
        "chk_fakeId"
      );
      expect(checks).toBeDefined();
      expect(checks?.id).toEqual("chk_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "chk_fakeId"
        );
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
        await new ChecksApi(CONFIG_FOR_UNIT).get("chk_fakeId");
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
        await new ChecksApi(CONFIG_FOR_UNIT).get("chk_fakeId");
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "chk_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("cancel", () => {
    const chkcancelled = {
      description: "check cancelled",
    };

    it("exists", async () => {
      const checksApi = new ChecksApi(CONFIG_FOR_UNIT);
      expect(checksApi.cancel).toBeDefined();
      expect(typeof checksApi.cancel).toEqual("function");
    });

    it("cancels a check for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "chk_fakeId" },
      }));

      const billing_groups = await new ChecksApi(CONFIG_FOR_UNIT).cancel(
        "chk_fakeId"
      );
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("chk_fakeId");
    });

    it("includes custom headers while it cancels a check for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "chk_fakeId" },
      }));

      const billing_groups = await new ChecksApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).cancel("chk_fakeId");
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("chk_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).cancel(
          "chk_fakeId"
        );
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
        await new ChecksApi(CONFIG_FOR_UNIT).cancel("chk_fakeId");
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
        await new ChecksApi(CONFIG_FOR_UNIT).cancel("chk_fakeId");
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).cancel(
          "chk_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const chkApi = new ChecksApi(CONFIG_FOR_UNIT);
      expect(chkApi.list).toBeDefined();
      expect(typeof chkApi.list).toEqual("function");
    });

    it("retrieves all check when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "chk_fakeId" }, { id: "another check id" }],
        },
      }));

      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list();
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "chk_fakeId" }] },
      }));

      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(1);
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("lists checks with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        ["this"]
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("should handle the after date correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=2020-01-01");
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        dateFilter.gt
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the date created correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "date_created=%7B%22date%22%3A%222020-01-01%22%7D"
        );
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        { date: dateFilter.gt }
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the metadata correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "metadata=%7B%22fakeMetadata%22%3A%22fakemetadata%22%7D"
        );
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const fakeMetadata = { metadata: "fakemetadata" };
      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { fakeMetadata: "fakemetadata" }
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the scheduled correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("scheduled=true");
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const fakeMetadata = { metadata: "fakemetadata" };
      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the send date correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("send_date=2020-01-01");
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        dateFilter.gt
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the mail type correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("mail_type=usps_first_class");
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
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
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the before date correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("before=2020-01-31T12");
        return {
          data: { data: [{ id: "fake billing group id" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        dateFilter.lt
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "sort_by=%7B%22sortBy%22%3A%22asc%22%7D"
        );
        return {
          data: { data: [{ id: "chk_fakeId" }] },
        };
      });

      const chkApi = await new ChecksApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { sortBy: "asc" }
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new ChecksApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
