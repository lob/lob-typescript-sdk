import { Configuration } from "../configuration";

import { Check } from "../models/check";
import { ChecksApi } from "../api/checks-api";

import axios from "axios";

import { fail } from "./testUtilities";
import { CheckEditable } from "../models/check-editable";
import { MailType } from "..";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("ChecksApi", () => {
  const config: Configuration = new Configuration({
    username: "Totally Fake Key",
  });
  const configWithBaseOptions = new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": "fake Idempotency-Key"
      },
    },
  });

  it("Checks API can be instantiated", () => {
    const checkApi = new ChecksApi(config);
    expect(checkApi).toBeDefined();
    expect(typeof checkApi).toEqual("object");
    expect(checkApi).toBeInstanceOf(ChecksApi);
  });

  describe("create", () => {
    const chkEditableMock: CheckEditable = {
      from: "fake from",
      bank_account: "fake bank account",
      amount: 100
    };

    it("exists", async () => {
      const chkApi = new ChecksApi(config);
      expect(chkApi.Create).toBeDefined();
      expect(typeof chkApi.Create).toEqual("function");
    });

    it("creates a check", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake check id" },
      }));

      const chk = await new ChecksApi(config).Create(
        chkEditableMock
      );
      expect(chk).toBeDefined();
      expect(chk.id).toEqual("fake check id");
    });


    it("creates an idempotency key", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { idempotencyKey: "fake key" },
      }));

      const chk = await new ChecksApi(config).Create(
        chkEditableMock,
        "fake idempotency key"
      );
      expect(chk).toBeDefined();
    });

    it("includes custom headers while it creates a check", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake check id" },
      }));

      const chkApi = await new ChecksApi(configWithBaseOptions).Create(
        chkEditableMock
      );
      expect(chkApi).toBeDefined();
      expect(chkApi?.id).toEqual("fake check id");
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
        await new ChecksApi(configWithBaseOptions).Create(
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
        await new ChecksApi(configWithBaseOptions).Create(
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
        await new ChecksApi(configWithBaseOptions).Create(
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
        await new ChecksApi(configWithBaseOptions).Create(
          chkEditableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("Retrieve", () => {
    it("exists", async () => {
      const checksApi = new ChecksApi(config);
      expect(checksApi.Retrieve).toBeDefined();
      expect(typeof checksApi.Retrieve).toEqual("function");
    });

    it("Retrieve checks for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake check id" },
      }));

      const billing_groups = await new ChecksApi(config).Retrieve("fake id");
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("fake check id");
    });

    it("includes custom headers while it retrieves a check for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake check id" },
      }));

      const checks = await new ChecksApi(
        configWithBaseOptions
      ).Retrieve("fake id");
      expect(checks).toBeDefined();
      expect(checks?.id).toEqual("fake check id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ChecksApi(configWithBaseOptions).Retrieve("fake id");
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
        await new ChecksApi(config).Retrieve("fake id");
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
        await new ChecksApi(config).Retrieve("fake id");
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
        await new ChecksApi(configWithBaseOptions).Retrieve("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("Cancel", () => {
    const chkCancelled = {
      description: "check cancelled",
    };

    it("exists", async () => {
      const checksApi = new ChecksApi(config);
      expect(checksApi.Cancel).toBeDefined();
      expect(typeof checksApi.Cancel).toEqual("function");
    });

    it("cancels a check for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake check id" },
      }));

      const billing_groups = await new ChecksApi(config).Cancel(
        "fake id"
      );
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("fake check id");
    });

    it("includes custom headers while it cancels a check for a check id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake check id" },
      }));

      const billing_groups = await new ChecksApi(
        configWithBaseOptions
      ).Cancel("fake id");
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("fake check id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new ChecksApi(configWithBaseOptions).Cancel(
          "fake id"
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
        await new ChecksApi(config).Cancel("fake id");
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
        await new ChecksApi(config).Cancel("fake id");
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
        await new ChecksApi(configWithBaseOptions).Cancel(
          "fake id"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const chkApi = new ChecksApi(config);
      expect(chkApi.List).toBeDefined();
      expect(typeof chkApi.List).toEqual("function");
    });

    it("retrieves all check when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [
            { id: "fake check id" },
            { id: "another check id" },
          ],
        },
      }));

      const chkApi = await new ChecksApi(config).List();
      expect(chkApi).toBeDefined();
      expect(chkApi?.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake check id" }] },
      }));

      const chkApi = await new ChecksApi(config).List(1);
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

      const response = await new ChecksApi(config).List(
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
        expect(request.url.split("?")[1]).toEqual(
          "after=2020-01-01"
        );
        return {
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(config).List(
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
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(config).List(
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
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const fakeMetadata = { metadata: "fakemetadata" };
      const chkApi = await new ChecksApi(config).List(
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
        expect(request.url.split("?")[1]).toEqual(
          "scheduled=true"
        );
        return {
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const fakeMetadata = { metadata: "fakemetadata" };
      const chkApi = await new ChecksApi(config).List(
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
        expect(request.url.split("?")[1]).toEqual(
          "send_date=2020-01-01"
        );
        return {
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(config).List(
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
        expect(request.url.split("?")[1]).toEqual(
          "mail_type=usps_first_class"
        );
        return {
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const chkApi = await new ChecksApi(config).List(
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
        expect(request.url.split("?")[1]).toEqual(
          "before=2020-01-31T12"
        );
        return {
          data: { data: [{ id: "fake billing group id" }] },
        };
      });

      const dateFilter = { gt: "2020-01-01", lt: "2020-01-31T12" };
      const chkApi = await new ChecksApi(config).List(
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
          data: { data: [{ id: "fake check id" }] },
        };
      });

      const chkApi = await new ChecksApi(config).List(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { sortBy: "asc" },
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
        await new ChecksApi(configWithBaseOptions).List();
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
        await new ChecksApi(configWithBaseOptions).List();
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
        await new ChecksApi(configWithBaseOptions).List();
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
        await new ChecksApi(configWithBaseOptions).List();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
