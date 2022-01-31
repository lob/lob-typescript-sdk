import { TemplateWritable } from "../models";
import { TemplatesApi } from "../api";

import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("TemplatesApi", () => {
  it("Templates API can be instantiated", () => {
    const templatesApi = new TemplatesApi(CONFIG_FOR_UNIT);
    expect(templatesApi).toBeDefined();
    expect(typeof templatesApi).toEqual("object");
    expect(templatesApi).toBeInstanceOf(TemplatesApi);
  });

  describe("create", () => {
    const templateWritableMock: TemplateWritable = {
      description: "Newer Template",
      html: "<html>Updated HTML for {{name}}</html>",
    };

    it("exists", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_UNIT);
      expect(templatesApi.create).toBeDefined();
      expect(typeof templatesApi.create).toEqual("function");
    });

    it("creates a template", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const template = await new TemplatesApi(CONFIG_FOR_UNIT).create(
        templateWritableMock
      );
      expect(template).toBeDefined();
      expect(template.id).toEqual("tmpl_fakeId");
    });

    it("includes custom headers while it creates a template", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templatesApi = await new TemplatesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(templateWritableMock);
      expect(templatesApi).toBeDefined();
      expect(templatesApi.id).toEqual("tmpl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          templateWritableMock
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          templateWritableMock
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          templateWritableMock
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          templateWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_UNIT);
      expect(templatesApi.get).toBeDefined();
      expect(typeof templatesApi.get).toEqual("function");
    });

    it("gets templates for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templates = await new TemplatesApi(CONFIG_FOR_UNIT).get("fake id");
      expect(templates).toBeDefined();
      expect(templates.id).toEqual("tmpl_fakeId");
    });

    it("includes custom headers while it gets a template for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templates = await new TemplatesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("fake id");
      expect(templates).toBeDefined();
      expect(templates.id).toEqual("tmpl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
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
        await new TemplatesApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new TemplatesApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "fake id"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_UNIT);
      expect(templatesApi.delete).toBeDefined();
      expect(typeof templatesApi.delete).toEqual("function");
    });

    it("deletes template for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templates = await new TemplatesApi(CONFIG_FOR_UNIT).delete(
        "fake id"
      );
      expect(templates).toBeDefined();
      expect(templates.id).toEqual("tmpl_fakeId");
    });

    it("includes custom headers while it deletes a template for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templates = await new TemplatesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).delete("fake id");
      expect(templates).toBeDefined();
      expect(templates.id).toEqual("tmpl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete(
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
        await new TemplatesApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new TemplatesApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete(
          "fake id"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const templateUpdatable = {
      description: "template updated",
      published_version: "fake version",
    };

    it("exists", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_UNIT);
      expect(templatesApi.update).toBeDefined();
      expect(typeof templatesApi.update).toEqual("function");
    });

    it("updates template for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templates = await new TemplatesApi(CONFIG_FOR_UNIT).update(
        "fake id",
        templateUpdatable
      );
      expect(templates).toBeDefined();
      expect(templates.id).toEqual("tmpl_fakeId");
    });

    it("includes custom headers while it updates a template for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "tmpl_fakeId" },
      }));

      const templates = await new TemplatesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update("fake id", templateUpdatable);
      expect(templates).toBeDefined();
      expect(templates.id).toEqual("tmpl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "fake id",
          templateUpdatable
        );
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "fake id",
          templateUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_UNIT);
      expect(templatesApi.list).toBeDefined();
      expect(typeof templatesApi.list).toEqual("function");
    });

    it("gets all templates when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "tmpl_fakeId" }, { id: "another tmpl_fakeId" }],
        },
      }));

      const templates = await new TemplatesApi(CONFIG_FOR_UNIT).list();
      expect(templates).toBeDefined();
      expect(templates.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templates = await new TemplatesApi(CONFIG_FOR_UNIT).list(1);
      expect(templates).toBeDefined();
      expect(templates.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templates = await new TemplatesApi(CONFIG_FOR_UNIT).list(
        1,
        "fake"
      );
      expect(templates).toBeDefined();
      expect(templates.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templatesApi = await new TemplatesApi(CONFIG_FOR_UNIT).list(
        1,
        "fake",
        "id"
      );
      expect(templatesApi).toBeDefined();
      expect(templatesApi.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templatesApi = await new TemplatesApi(CONFIG_FOR_UNIT).list(
        1,
        "before",
        "after",
        ["fake"]
      );
      expect(templatesApi).toBeDefined();
      expect(templatesApi.data?.length).toEqual(1);
    });

    it("should handle date_created parameter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templatesApi = await new TemplatesApi(CONFIG_FOR_UNIT).list(
        1,
        "before",
        "after",
        ["fake"],
        { date: "Jan. 26, 2022" }
      );
      expect(templatesApi).toBeDefined();
      expect(templatesApi?.data?.length).toEqual(1);
    });

    it("should handle metadata parameter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templatesApi = await new TemplatesApi(CONFIG_FOR_UNIT).list(
        1,
        "before",
        "after",
        ["fake"],
        { date: "Jan. 26, 2022" },
        {}
      );
      expect(templatesApi).toBeDefined();
      expect(templatesApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new TemplatesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
