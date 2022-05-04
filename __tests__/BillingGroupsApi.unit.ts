import { BillingGroupEditable } from "../models";
import { BillingGroupsApi } from "../api";

import { fail } from "./testUtilities";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
  DATE_CREATED_QUERY_STRING,
  DATE_FILTER,
  DATE_MODIFIED_QUERY_STRING,
} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("BillingGroupsApi", () => {
  it("Billing Groups API can be instantiated", () => {
    const bgApi = new BillingGroupsApi(CONFIG_FOR_UNIT);
    expect(bgApi).toBeDefined();
    expect(typeof bgApi).toEqual("object");
    expect(bgApi).toBeInstanceOf(BillingGroupsApi);
  });

  describe("create", () => {
    const bgEditableMock = new BillingGroupEditable({
      description: "fake billing group description",
    });

    it("exists", async () => {
      const bgApi = new BillingGroupsApi(CONFIG_FOR_UNIT);
      expect(bgApi.create).toBeDefined();
      expect(typeof bgApi.create).toEqual("function");
    });

    it("creates a billing group", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bg_fakeId" },
      }));

      const bg_product = await new BillingGroupsApi(CONFIG_FOR_UNIT).create(
        bgEditableMock
      );
      expect(bg_product).toBeDefined();
      expect(bg_product.id).toEqual("bg_fakeId");
    });

    it("includes custom headers while it creates a billing group", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bg_fakeId" },
      }));

      const bgApi = await new BillingGroupsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(bgEditableMock);
      expect(bgApi).toBeDefined();
      expect(bgApi.id).toEqual("bg_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          bgEditableMock
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
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          bgEditableMock
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
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          bgEditableMock
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
        description: "billing group updated",
      };

      try {
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          bgEditableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_UNIT);
      expect(billingGroupsApi.get).toBeDefined();
      expect(typeof billingGroupsApi.get).toEqual("function");
    });

    it("gets billing groups for a billing group id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bg_fakeId" },
      }));

      const billing_groups = await new BillingGroupsApi(CONFIG_FOR_UNIT).get(
        "fake id"
      );
      expect(billing_groups).toBeDefined();
      expect(billing_groups.id).toEqual("bg_fakeId");
    });

    it("includes custom headers while it gets a billing group for a billing group id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bg_fakeId" },
      }));

      const billing_groups = await new BillingGroupsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("fake id");
      expect(billing_groups).toBeDefined();
      expect(billing_groups.id).toEqual("bg_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
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
        await new BillingGroupsApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new BillingGroupsApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "fake id"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const bgUpdatable = new BillingGroupEditable({
      description: "billing group updated",
    });

    it("exists", async () => {
      const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_UNIT);
      expect(billingGroupsApi.update).toBeDefined();
      expect(typeof billingGroupsApi.update).toEqual("function");
    });

    it("updates billing group for a billing group id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bg_fakeId" },
      }));

      const billing_groups = await new BillingGroupsApi(CONFIG_FOR_UNIT).update(
        "fake id",
        bgUpdatable
      );
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("bg_fakeId");
    });

    it("includes custom headers while it updates a billing group for a billing group id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bg_fakeId" },
      }));

      const billing_groups = await new BillingGroupsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update("fake id", bgUpdatable);
      expect(billing_groups).toBeDefined();
      expect(billing_groups?.id).toEqual("bg_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "fake id",
          bgUpdatable
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
        await new BillingGroupsApi(CONFIG_FOR_UNIT).update(
          "fake id",
          bgUpdatable
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
        await new BillingGroupsApi(CONFIG_FOR_UNIT).update(
          "fake id",
          bgUpdatable
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

      try {
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "fake id",
          bgUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const bgApi = new BillingGroupsApi(CONFIG_FOR_UNIT);
      expect(bgApi.list).toBeDefined();
      expect(typeof bgApi.list).toEqual("function");
    });

    it("gets all billing groups when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "bg_fakeId" }, { id: "another bg_fakeId" }],
        },
      }));

      const bgApi = await new BillingGroupsApi(CONFIG_FOR_UNIT).list();
      expect(bgApi).toBeDefined();
      expect(bgApi.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "bg_fakeId" }] },
      }));

      const bgApi = await new BillingGroupsApi(CONFIG_FOR_UNIT).list(1);
      expect(bgApi).toBeDefined();
      expect(bgApi.data?.length).toEqual(1);
    });

    it("lists billing groups with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BillingGroupsApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        ["this"]
      );
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toEqual(2);
    });

    it("should handle the offset correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("offset=1");
        return {
          data: { data: [{ id: "bg_fakeId" }] },
        };
      });

      const bgApi = await new BillingGroupsApi(CONFIG_FOR_UNIT).list(
        undefined,
        1
      );
      expect(bgApi).toBeDefined();
      expect(bgApi.data?.length).toEqual(1);
    });

    it("should handle the dateCreated correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(DATE_CREATED_QUERY_STRING);
        return {
          data: { data: [{ id: "bg_fakeId" }] },
        };
      });

      const bgApi = await new BillingGroupsApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        DATE_FILTER
      );
      expect(bgApi).toBeDefined();
      expect(bgApi.data?.length).toEqual(1);
    });

    it("should handle the dateModified correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(DATE_MODIFIED_QUERY_STRING);
        return {
          data: { data: [{ id: "bg_fakeId" }] },
        };
      });

      const bgApi = await new BillingGroupsApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        DATE_FILTER
      );
      expect(bgApi).toBeDefined();
      expect(bgApi.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "sort_by=%7B%22id%22%3A%22asc%22%7D"
        );
        return {
          data: { data: [{ id: "bg_fakeId" }] },
        };
      });

      const bgApi = await new BillingGroupsApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { id: "asc" }
      );
      expect(bgApi).toBeDefined();
      expect(bgApi.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new BillingGroupsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
