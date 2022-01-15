import { Configuration } from "../configuration";

import { SelfMailerEditable, CountryExtended } from "../models";
import { SelfMailersApi } from "../api";

import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("SelfMailersApi", () => {
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

  it("self-mailers API can be instantiated", () => {
    const selfMailersApi = new SelfMailersApi(config);
    expect(selfMailersApi).toBeDefined();
    expect(typeof selfMailersApi).toEqual("object");
    expect(selfMailersApi).toBeInstanceOf(SelfMailersApi);
  });

  describe("create", () => {
    const sfmEditableMock: SelfMailerEditable = {
      to: {
        company: "Lob (old)",
        address_line1: "210 King St",
        address_line2: "# 6100",
        address_city: "San Francisco",
        address_state: "CA",
        address_zip: "94107",
        address_country: CountryExtended.Us,
      },
      from: {
        company: "Lob (new)",
        address_line1: "210 King St",
        address_city: "San Francisco",
        address_state: "CA",
        address_zip: "94107",
        address_country: CountryExtended.Us,
      },
      inside:
        "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
      outside:
        "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
    };

    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(config);
      expect(selfMailersApi.create).toBeDefined();
      expect(typeof selfMailersApi.create).toEqual("function");
    });

    it("creates a self-mailer", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake self-mailer id" },
      }));

      const self_mailer = await new SelfMailersApi(config).create(
        sfmEditableMock
      );
      expect(self_mailer).toBeDefined();
      expect(self_mailer.id).toEqual("fake self-mailer id");
    });

    it("includes custom headers while it creates a self-mailer", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake self-mailer id" },
      }));

      const selfMailersApi = await new SelfMailersApi(
        configWithBaseOptions
      ).create(sfmEditableMock);
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.id).toEqual("fake self-mailer id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(configWithBaseOptions).create(sfmEditableMock);
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
        await new SelfMailersApi(configWithBaseOptions).create(sfmEditableMock);
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
        await new SelfMailersApi(configWithBaseOptions).create(sfmEditableMock);
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
        await new SelfMailersApi(configWithBaseOptions).create(sfmEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(config);
      expect(selfMailersApi.get).toBeDefined();
      expect(typeof selfMailersApi.get).toEqual("function");
    });

    it("gets self-mailers for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake self-mailer id" },
      }));

      const self_mailers = await new SelfMailersApi(config).get("fake id");
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("fake self-mailer id");
    });

    it("includes custom headers while it gets a self-mailer for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake self-mailer id" },
      }));

      const self_mailers = await new SelfMailersApi(configWithBaseOptions).get(
        "fake id"
      );
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("fake self-mailer id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(configWithBaseOptions).get("fake id");
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
        await new SelfMailersApi(config).get("fake id");
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
        await new SelfMailersApi(config).get("fake id");
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
        await new SelfMailersApi(configWithBaseOptions).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(config);
      expect(selfMailersApi.delete).toBeDefined();
      expect(typeof selfMailersApi.delete).toEqual("function");
    });

    it("deletes self-mailer for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake self-mailer id" },
      }));

      const self_mailers = await new SelfMailersApi(config).delete("fake id");
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("fake self-mailer id");
    });

    it("includes custom headers while it deletes a self-mailer for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake self-mailer id" },
      }));

      const self_mailers = await new SelfMailersApi(configWithBaseOptions).delete(
        "fake id"
      );
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("fake self-mailer id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(configWithBaseOptions).delete("fake id");
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
        await new SelfMailersApi(config).delete("fake id");
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
        await new SelfMailersApi(config).delete("fake id");
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
        await new SelfMailersApi(configWithBaseOptions).delete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(config);
      expect(selfMailersApi.list).toBeDefined();
      expect(typeof selfMailersApi.list).toEqual("function");
    });

    it("gets all self_mailers when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [
            { id: "fake self-mailer id" },
            { id: "another fake self-mailer id" },
          ],
        },
      }));

      const selfMailersApi = await new SelfMailersApi(config).list();
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake self-mailer id" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(config).list(1);
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake self-mailer id" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(config).list(1, "fake");
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake self-mailer id" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(config).list(
        1,
        "fake",
        "id"
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake self-mailer id" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(config).list(
        1,
        "before",
        "after",
        ["include array"]
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(configWithBaseOptions).list();
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
        await new SelfMailersApi(configWithBaseOptions).list();
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
        await new SelfMailersApi(configWithBaseOptions).list();
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
        await new SelfMailersApi(configWithBaseOptions).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});