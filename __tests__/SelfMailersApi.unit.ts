import {
  CountryExtended,
  MailType,
  SelfMailerEditable,
  SelfMailerSize,
} from "../models";
import { SelfMailersApi } from "../api";

import { fail } from "./testUtilities";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
  DATE_FILTER,
} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("SelfMailersApi", () => {
  it("self-mailers API can be instantiated", () => {
    const selfMailersApi = new SelfMailersApi(CONFIG_FOR_UNIT);
    expect(selfMailersApi).toBeDefined();
    expect(typeof selfMailersApi).toEqual("object");
    expect(selfMailersApi).toBeInstanceOf(SelfMailersApi);
  });

  it("self-mailers API can be instantiated with base options", () => {
    const selfMailersApi = new SelfMailersApi(
      CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
    );
    expect(selfMailersApi).toBeDefined();
    expect(typeof selfMailersApi).toEqual("object");
    expect(selfMailersApi).toBeInstanceOf(SelfMailersApi);
  });

  describe("create", () => {
    const sfmEditableMock: SelfMailerEditable = {
      to: {
        company: "Gothic Home (old)",
        address_line1: "001 CEMETERY LN",
        address_line2: "# 000",
        address_city: "WESTFIELD",
        address_state: "NJ",
        address_zip: "07000",
        address_country: CountryExtended.Us,
      },
      from: {
        company: "Gothic Home (new)",
        address_line1: "1313 CEMETERY LN",
        address_city: "WESTFIELD",
        address_state: "NJ",
        address_zip: "07000",
        address_country: CountryExtended.Us,
      },
      inside:
        "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
      outside:
        "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
    };

    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(CONFIG_FOR_UNIT);
      expect(selfMailersApi.create).toBeDefined();
      expect(typeof selfMailersApi.create).toEqual("function");
    });

    it("creates a self-mailer", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "sfm_fakeId" },
      }));

      const self_mailer = await new SelfMailersApi(CONFIG_FOR_UNIT).create(
        sfmEditableMock
      );
      expect(self_mailer).toBeDefined();
      expect(self_mailer.id).toEqual("sfm_fakeId");
    });

    it("includes custom headers while it creates a self-mailer", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "sfm_fakeId" },
      }));

      const selfMailersApi = await new SelfMailersApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(sfmEditableMock);
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.id).toEqual("sfm_fakeId");
    });

    it("creates a self-mailer with idempotency", async () => {
      axiosRequest.mockImplementationOnce(async (reqParams) => {
        expect(reqParams.headers["Idempotency-Key"]).toBeDefined();
        expect(reqParams.headers["Idempotency-Key"]).toEqual(
          "fake idempotency"
        );
        return {
          data: { id: "sfm_fakeId" },
        };
      });

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).create(
        sfmEditableMock,
        "fake idempotency"
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.id).toEqual("sfm_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(CONFIG_FOR_UNIT).create(sfmEditableMock);
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).create(sfmEditableMock);
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).create(sfmEditableMock);
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).create(sfmEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(CONFIG_FOR_UNIT);
      expect(selfMailersApi.get).toBeDefined();
      expect(typeof selfMailersApi.get).toEqual("function");
    });

    it("gets self-mailers for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "sfm_fakeId" },
      }));

      const self_mailers = await new SelfMailersApi(CONFIG_FOR_UNIT).get(
        "fake id"
      );
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("sfm_fakeId");
    });

    it("includes custom headers while it gets a self-mailer for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "sfm_fakeId" },
      }));

      const self_mailers = await new SelfMailersApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("fake id");
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("sfm_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(CONFIG_FOR_UNIT);
      expect(selfMailersApi.delete).toBeDefined();
      expect(typeof selfMailersApi.delete).toEqual("function");
    });

    it("deletes self-mailer for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "sfm_fakeId" },
      }));

      const self_mailers = await new SelfMailersApi(CONFIG_FOR_UNIT).delete(
        "fake id"
      );
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("sfm_fakeId");
    });

    it("includes custom headers while it deletes a self-mailer for a self-mailer id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "sfm_fakeId" },
      }));

      const self_mailers = await new SelfMailersApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).delete("fake id");
      expect(self_mailers).toBeDefined();
      expect(self_mailers?.id).toEqual("sfm_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new SelfMailersApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).delete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const selfMailersApi = new SelfMailersApi(CONFIG_FOR_UNIT);
      expect(selfMailersApi.list).toBeDefined();
      expect(typeof selfMailersApi.list).toEqual("function");
    });

    it("gets all self_mailers when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "sfm_fakeId" }, { id: "another sfm_fakeId" }],
        },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list();
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(1);
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        "fake"
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        "id"
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the include correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        ["include array"]
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the dateCreated correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        DATE_FILTER
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the metadata correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { what: "this" }
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the size correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        SelfMailerSize._6x18Bifold
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the scheduled correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      );
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the sendDate correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
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
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the mailType correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
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
      expect(selfMailersApi).toBeDefined();
      expect(selfMailersApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "sfm_fakeId" }] },
      }));

      const selfMailersApi = await new SelfMailersApi(CONFIG_FOR_UNIT).list(
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
        { date_created: "asc" }
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).list();
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).list();
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).list();
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
        await new SelfMailersApi(CONFIG_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
