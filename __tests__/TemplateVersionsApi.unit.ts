import { Configuration } from "../configuration";

import { TemplateVersionsApi } from "../api";
import { TemplateVersionWritable } from "..";

import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("TemplateVersionsApi", () => {
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

  it("Template Versions API can be instantiated", () => {
    const templateVersionsApi = new TemplateVersionsApi(config);
    expect(templateVersionsApi).toBeDefined();
    expect(typeof templateVersionsApi).toEqual("object");
    expect(templateVersionsApi).toBeInstanceOf(TemplateVersionsApi);
  });

  describe("create", () => {
    const templateForCreate: TemplateVersionWritable = {
      description: "Newer Template",
      html: "<html>Updated HTML for Template 1/html>",
    };

    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.create).toBeDefined();
      expect(typeof templateVersionsApi.create).toEqual("function");
    });

    it("creates a template version", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_fakeId" },
      }));

      const templateVersion = await new TemplateVersionsApi(config).create(
        "fake id",
        templateForCreate
      );
      expect(templateVersion).toBeDefined();
      expect(templateVersion?.id).toEqual("vrsn_fakeId");
    });

    it("includes custom headers while it creates a template version", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_fakeId" },
      }));

      const templateVersion = await new TemplateVersionsApi(
        configWithBaseOptions
      ).create("fake id", templateForCreate);
      expect(templateVersion).toBeDefined();
      expect(templateVersion?.id).toEqual("vrsn_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplateVersionsApi(configWithBaseOptions).create(
          "fake id",
          templateForCreate
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
        await new TemplateVersionsApi(configWithBaseOptions).create(
          "fake id",
          templateForCreate
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
        await new TemplateVersionsApi(configWithBaseOptions).create(
          "fake id",
          templateForCreate
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
        await new TemplateVersionsApi(configWithBaseOptions).create(
          "fake id",
          templateForCreate
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("templateVersionGet", () => {
    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.get).toBeDefined();
      expect(typeof templateVersionsApi.get).toEqual("function");
    });

    it("gets template version given template and version ids", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake template version id" }] },
      }));

      const templateVersion = await new TemplateVersionsApi(config).get(
        "tmpl_fakeId",
        "vrsn_fakeId"
      );
      expect(templateVersion).toBeDefined();
    });

    it("includes custom headers while it gets a template version associated with a template", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "vrsn_fakeId" }] },
      }));

      const templateVersion = await new TemplateVersionsApi(
        configWithBaseOptions
      ).get("tmpl_fakeId", "vrsn_fakeId");
      expect(templateVersion).toBeDefined();
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplateVersionsApi(configWithBaseOptions).get(
          "tmpl_fakeId",
          "vrsn_fakeId"
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
        await new TemplateVersionsApi(configWithBaseOptions).get(
          "tmpl_fakeId",
          "vrsn_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.delete).toBeDefined();
      expect(typeof templateVersionsApi.delete).toEqual("function");
    });

    it("deletes template version for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_fakeId" },
      }));

      const templates = await new TemplateVersionsApi(config).delete(
        "fake id",
        "fake vrsn id"
      );
      expect(templates).toBeDefined();
      expect(templates?.id).toEqual("vrsn_fakeId");
    });

    it("includes custom headers while it deletes a template version for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_tmplFakeId" },
      }));

      const templates = await new TemplateVersionsApi(
        configWithBaseOptions
      ).delete("fake id", "fake vrsn id");
      expect(templates).toBeDefined();
      expect(templates?.id).toEqual("vrsn_tmplFakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplateVersionsApi(configWithBaseOptions).delete(
          "fake id",
          "fake vrsn id"
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
        await new TemplateVersionsApi(config).delete("fake id", "fake vrsn id");
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
        await new TemplateVersionsApi(config).delete("fake id", "fake vrsn id");
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
        await new TemplateVersionsApi(configWithBaseOptions).delete(
          "fake id",
          "fake vrsn id"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const templateVersionUpdatable = {
      description: "template version updated",
      published_version: "fake version",
    };

    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.update).toBeDefined();
      expect(typeof templateVersionsApi.update).toEqual("function");
    });

    it("updates template  version for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_tmplFakeId" },
      }));

      const templates = await new TemplateVersionsApi(config).update(
        "fake id",
        "fake vrsn id",
        templateVersionUpdatable
      );
      expect(templates).toBeDefined();
      expect(templates?.id).toEqual("vrsn_tmplFakeId");
    });

    it("includes custom headers while it updates a template version for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_tmplFakeId" },
      }));

      const templates = await new TemplateVersionsApi(
        configWithBaseOptions
      ).update("fake id", "fake vrsn id", templateVersionUpdatable);
      expect(templates).toBeDefined();
      expect(templates?.id).toEqual("vrsn_tmplFakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplateVersionsApi(configWithBaseOptions).update(
          "fake id",
          "fake vrsn id",
          templateVersionUpdatable
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
        await new TemplateVersionsApi(config).update(
          "fake id",
          "fake vrsn id",
          templateVersionUpdatable
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
        await new TemplateVersionsApi(config).update(
          "fake id",
          "fake vrsn id",
          templateVersionUpdatable
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
        await new TemplateVersionsApi(configWithBaseOptions).update(
          "fake id",
          "fake vrsn id",
          templateVersionUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const templateVersionUpdatable = {
      description: "template  version updated",
      published_version: "fake version",
    };

    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.update).toBeDefined();
      expect(typeof templateVersionsApi.update).toEqual("function");
    });

    it("updates template  version for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_tmplFakeId" },
      }));

      const templates = await new TemplateVersionsApi(config).update(
        "fake id",
        "fake vrsn id",
        templateVersionUpdatable
      );
      expect(templates).toBeDefined();
      expect(templates?.id).toEqual("vrsn_tmplFakeId");
    });

    it("includes custom headers while it updates a template version for a template id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "vrsn_tmplFakeId" },
      }));

      const templates = await new TemplateVersionsApi(
        configWithBaseOptions
      ).update("fake id", "fake vrsn id", templateVersionUpdatable);
      expect(templates).toBeDefined();
      expect(templates?.id).toEqual("vrsn_tmplFakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplateVersionsApi(configWithBaseOptions).update(
          "fake id",
          "fake vrsn id",
          templateVersionUpdatable
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
        await new TemplateVersionsApi(configWithBaseOptions).update(
          "fake id",
          "fake vrsn id",
          templateVersionUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.list).toBeDefined();
      expect(typeof templateVersionsApi.list).toEqual("function");
    });

    it("gets all templates when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [
            { id: "vrsn_tmpl_fakeId" },
            { id: "vrsn_another tmpl_fakeId" },
          ],
        },
      }));

      const templateVersionsApi = await new TemplateVersionsApi(config).list(
        "fake id"
      );
      expect(templateVersionsApi).toBeDefined();
      expect(templateVersionsApi?.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templateVersionsApi = await new TemplateVersionsApi(config).list(
        "fake id",
        1
      );
      expect(templateVersionsApi).toBeDefined();
      expect(templateVersionsApi?.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "tmpl_fakeId" }] },
      }));

      const templateVersionsApi = await new TemplateVersionsApi(config).list(
        "fake id",
        1,
        "fake"
      );
      expect(templateVersionsApi).toBeDefined();
      expect(templateVersionsApi?.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "vrsn_tmpl_fakeId" }] },
      }));

      const templateVersionsApi = await new TemplateVersionsApi(config).list(
        "fake id",
        1,
        "fake"
      );
      expect(templateVersionsApi).toBeDefined();
      expect(templateVersionsApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "vrsn_tmpl_fakeId" }] },
      }));

      const templateVersionsApi = await new TemplateVersionsApi(config).list(
        "fake id",
        1,
        "before",
        "after",
        ["fake"],
        { date: "jan 24, 2022" }
      );
      expect(templateVersionsApi).toBeDefined();
      expect(templateVersionsApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new TemplateVersionsApi(configWithBaseOptions).list("fake id");
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
        await new TemplateVersionsApi(configWithBaseOptions).list("fake id");
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
        await new TemplateVersionsApi(configWithBaseOptions).list("fake id");
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
        await new TemplateVersionsApi(configWithBaseOptions).list("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
