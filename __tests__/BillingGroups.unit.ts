import { Configuration } from "../configuration";

import {
  BillingGroupEditable
} from "../models";
import {AddressesApi, BillingGroupsApi} from "../api";

import axios from "axios";

import { fail } from "./testUtilities";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("BillingGroupsApi", () => {
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

  it("Billing Groups API can be instantiated", () => {
    const bgApi = new BillingGroupsApi(config);
    expect(bgApi).toBeDefined();
    expect(typeof bgApi).toEqual("object");
    expect(bgApi).toBeInstanceOf(BillingGroupsApi);
  });

  describe("create", () => {
    const bgEditableMock: BillingGroupEditable = {
      description: 'fake billing group description'
    };

    it("exists", async () => {
      const bgApi = new BillingGroupsApi(config);
      expect(bgApi.create).toBeDefined();
      expect(typeof bgApi.create).toEqual("function");
    });

    it("creates a billing group", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake billing group id" }
      }));

      const bg_product = await new BillingGroupsApi(config).create(bgEditableMock);
      expect(bg_product).toBeDefined();
      expect(bg_product.id).toEqual("fake billing group id");
    });

    it("includes custom headers while it creates a billing group", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake billing group id" }
      }));

      const bgApi = await new BillingGroupsApi(configWithBaseOptions).create(bgEditableMock);
      expect(bgApi).toBeDefined();
      expect(bgApi?.id).toEqual("fake billing group id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });
      const bgUpdatable = {
        description: "billing group updated"
      };

      try {
        await new BillingGroupsApi(configWithBaseOptions).create(bgEditableMock);
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
        await new BillingGroupsApi(configWithBaseOptions).create(bgEditableMock);
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
        await new BillingGroupsApi(configWithBaseOptions).create(bgEditableMock);
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
        description: "billing group updated"
      };

      try {
        await new BillingGroupsApi(configWithBaseOptions).create(bgEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const billingGroupsApi = new BillingGroupsApi(config);
      expect(billingGroupsApi.get).toBeDefined();
      expect(typeof billingGroupsApi.get).toEqual("function");
    });

    it("gets billing groups for a billing group id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake billing group id" }
        }));

        const billing_groups = await new BillingGroupsApi(config).get("fake id");
        expect(billing_groups).toBeDefined();
        expect(billing_groups?.id).toEqual("fake billing group id");
    });

    it("includes custom headers while it gets a billing group for a billing group id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake billing group id" }
        }));


        const billing_groups = await new BillingGroupsApi(configWithBaseOptions).get("fake id");
        expect(billing_groups).toBeDefined();
        expect(billing_groups?.id).toEqual("fake billing group id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new BillingGroupsApi(configWithBaseOptions).get("fake id");
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
        await new BillingGroupsApi(config).get("fake id");
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
        await new BillingGroupsApi(config).get("fake id");
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
        await new BillingGroupsApi(configWithBaseOptions).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const bgUpdatable = {
      description: "billing group updated"
    };

    it("exists", async () => {
      const billingGroupsApi = new BillingGroupsApi(config);
      expect(billingGroupsApi.update).toBeDefined();
      expect(typeof billingGroupsApi.update).toEqual("function");
    });

    it("updates billing group for a billing group id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake billing group id" }
        }));

        const billing_groups = await new BillingGroupsApi(config).update("fake id", bgUpdatable);
        expect(billing_groups).toBeDefined();
        expect(billing_groups?.id).toEqual("fake billing group id");
    });

    it("includes custom headers while it updates a billing group for a billing group id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake billing group id" }
        }));

        const billing_groups = await new BillingGroupsApi(configWithBaseOptions).update("fake id", bgUpdatable);
        expect(billing_groups).toBeDefined();
        expect(billing_groups?.id).toEqual("fake billing group id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new BillingGroupsApi(configWithBaseOptions).update("fake id", bgUpdatable);
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
        await new BillingGroupsApi(config).update("fake id", bgUpdatable);
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
        await new BillingGroupsApi(config).update("fake id", bgUpdatable);
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
        await new BillingGroupsApi(configWithBaseOptions).update("fake id", bgUpdatable);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
  
  describe("update", () => {
    const bgUpdatable = {
      description: "billing group updated"
    };

    it("exists", async () => {
      const billingGroupsApi = new BillingGroupsApi(config);
      expect(billingGroupsApi.update).toBeDefined();
      expect(typeof billingGroupsApi.update).toEqual("function");
    });

    it("updates billing group for a billing group id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake billing group id" }
        }));

        const billing_groups = await new BillingGroupsApi(config).update("fake id", bgUpdatable);
        expect(billing_groups).toBeDefined();
        expect(billing_groups?.id).toEqual("fake billing group id");
    });

    it("includes custom headers while it updates a billing group for a billing group id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake billing group id" }
        }));

        const billing_groups = await new BillingGroupsApi(configWithBaseOptions).update("fake id", bgUpdatable);
        expect(billing_groups).toBeDefined();
        expect(billing_groups?.id).toEqual("fake billing group id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new BillingGroupsApi(configWithBaseOptions).update("fake id", bgUpdatable);
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
        await new BillingGroupsApi(configWithBaseOptions).update("fake id", bgUpdatable);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const bgApi = new BillingGroupsApi(config);
      expect(bgApi.list).toBeDefined();
      expect(typeof bgApi.list).toEqual("function");
    });

    it("gets all billing groups when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake billing group id" }, { id: "another fake billing group id" } ] }
      }));

      const bgApi = await new BillingGroupsApi(config).list();
      expect(bgApi).toBeDefined();
      expect(bgApi?.data?.length).toEqual(2);
    });
    
    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake billing group id" } ] }
      }));

      const bgApi = await new BillingGroupsApi(config).list(1);
      expect(bgApi).toBeDefined();
      expect(bgApi?.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake billing group id" } ] }
      }));

      const bgApi = await new BillingGroupsApi(config).list(1, 0, ["fake"]);
      expect(bgApi).toBeDefined();
      expect(bgApi?.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake billing group id" } ] }
      }));

      const bgApi = await new BillingGroupsApi(config).list(1, 0, ["fake"]);
      expect(bgApi).toBeDefined();
      expect(bgApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake billing group id" } ] }
      }));

      const bgApi = await new BillingGroupsApi(config).list(1, 0, ["fake"], { id: "asc" } );
      expect(bgApi).toBeDefined();
      expect(bgApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new BillingGroupsApi(configWithBaseOptions).list();
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
        await new BillingGroupsApi(configWithBaseOptions).list();
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
        await new BillingGroupsApi(configWithBaseOptions).list();
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
        await new BillingGroupsApi(configWithBaseOptions).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
