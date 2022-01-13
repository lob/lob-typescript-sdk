import { Configuration } from "../configuration";

import { TemplatesApi, TemplateVersionsApi } from "../api";
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
        html: "<html>Updated HTML for Template 1/html>"
    };

    it("exists", async () => {
      const templateVersionsApi = new TemplateVersionsApi(config);
      expect(templateVersionsApi.create).toBeDefined();
      expect(typeof templateVersionsApi.create).toEqual("function");
    });

    it("creates a template version", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake version id" },
      }));

      const templateVersion = await new TemplateVersionsApi(config).create(
        "fake id",
        templateForCreate
      );
      expect(templateVersion).toBeDefined();
      expect(templateVersion?.id).toEqual("fake version id");
    });

    it("includes custom headers while it creates a template version", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake version id" },
      }));

      const templateVersion = await new TemplateVersionsApi(configWithBaseOptions).create(
        "fake id",
        templateForCreate
      );
      expect(templateVersion).toBeDefined();
      expect(templateVersion?.id).toEqual("fake version id");
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

      const templateVersion = await new TemplateVersionsApi(config).get("fake template id", "fake version id");
      expect(templateVersion).toBeDefined();
    });

    it("includes custom headers while it gets a template version associated with a template", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake template version id" }] },
      }));

      const templateVersion = await new TemplateVersionsApi(configWithBaseOptions).get("fake template id", "fake version id");
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
        await new TemplateVersionsApi(configWithBaseOptions).get("fake template id", "fake version id");
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
        await new TemplateVersionsApi(configWithBaseOptions).get("fake template id", "fake version id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
