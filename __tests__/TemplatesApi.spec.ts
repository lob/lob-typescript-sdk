import { Configuration } from "../configuration";

import {
  Template,
  TemplateWritable,
  TemplateUpdate
} from "../models";
import { TemplatesApi } from "../api";

describe("TemplatesApi", () => {
  jest.setTimeout(1000 * 60);

  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  it("Template API can be instantiated", () => {
    const templatesApi = new TemplatesApi(config);
    expect(templatesApi).toBeDefined();
    expect(typeof templatesApi).toEqual("object");
    expect(templatesApi).toBeInstanceOf(TemplatesApi);
  });

  it("all individual Template functions exists", () => {
    const templatesApi = new TemplatesApi(config);
    expect(templatesApi.create).toBeDefined();
    expect(typeof templatesApi.create).toEqual("function");

    expect(templatesApi.get).toBeDefined();
    expect(typeof templatesApi.get).toEqual("function");

    expect(templatesApi.update).toBeDefined();
    expect(typeof templatesApi.update).toEqual("function");

    expect(templatesApi.delete).toBeDefined();
    expect(typeof templatesApi.delete).toEqual("function");
  });

  describe("performs single-Template operations", () => {
    const templateWrite: TemplateWritable = {
      description: "Newer Template",
      html: "<html>Updated HTML for {{name}}</html>",
    };

    it("creates, updates, retrieves, and deletes a template", async () => {
      const templatesApi = new TemplatesApi(config);
      // Create
      const createdTemplate = await new TemplatesApi(config).create(templateWrite);
      expect(createdTemplate?.id).toBeDefined();
      expect(createdTemplate?.description).toEqual(templateWrite.description);

      // Get
      const retrievedTemplate = await templatesApi.get(createdTemplate.id as string);
      expect(retrievedTemplate).toBeDefined();
      expect(retrievedTemplate?.id).toEqual(createdTemplate?.id);

      // Update
      const updates: TemplateUpdate = {
        description: "updated template",
        published_version: retrievedTemplate?.published_version?.id as string,
      };
      const updatedTemplate = await templatesApi.update(
        retrievedTemplate.id as string,
        updates
      );
      expect(updatedTemplate).toBeDefined();
      expect(updatedTemplate?.description).toEqual("updated template");

      // Delete
      const deletedTemplate = await templatesApi.delete(updatedTemplate.id as string);
      expect(deletedTemplate?.deleted).toBeTruthy();
    });
  });

  describe("list templates", () => {
    let createdTemplates: Template[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 templates present, to test pagination
      const template1: TemplateWritable = {
        description: "Newer Template",
        html: "<html>Updated HTML for Template 1/html>"
      };
      const template2: TemplateWritable = Object.assign({}, template1, {
        description: "Newer Template",
        html: "<html>Updated HTML for Template 2</html>"
      });
      const template3: TemplateWritable = Object.assign({}, template1, {
        description: "Newer Template",
        html: "<html>Updated HTML for Template 3</html>"
      });

      const templatesApi = new TemplatesApi(config);
      await Promise.all([
        templatesApi.create(template1),
        templatesApi.create(template2),
        templatesApi.create(template3),
      ])
        .then((creationResults) => {
          if (creationResults.length !== 3) {
            fail();
          }
          createdTemplates = createdTemplates.concat(creationResults);
        })
        .catch((err) => {
          fail(err);
        });
    });

    afterAll(async () => {
      const templatesApi = new TemplatesApi(config);
      const deleteOperations: Promise<unknown>[] = [];
      for (const template of createdTemplates) {
        deleteOperations.push(templatesApi.delete(template.id as string));
      }
      await Promise.all(deleteOperations);
    });

    it("exists", () => {
      const templatesApi = new TemplatesApi(config);
      expect(templatesApi.list).toBeDefined();
      expect(typeof templatesApi.list).toEqual("function");
    });

    it("lists templates", async () => {
      const response = await new TemplatesApi(config).list();
      expect(response?.data).toBeDefined();
      const templateList = response?.data || [];
      expect(templateList.length).toBeGreaterThan(0);
    });

    it("lists templates given before or after params", async () => {
      // ToDo:
      // list responses should map the before and after tokens for the consumer
      const response = await new TemplatesApi(config).list();
      expect(response.next_url).toBeDefined();
      const after: string = (response as { next_url: string }).next_url
        .slice(
          (response as { next_url: string }).next_url.lastIndexOf("after=")
        )
        .split("=")[1];

      const responseAfter = await new TemplatesApi(config).list(
        10,
        undefined,
        after
      );
      expect(responseAfter?.data).toBeDefined();
      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();

      const firstPage: Template[] = responseAfter?.data || [];
      expect(firstPage.length).toBeGreaterThan(0);

      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();
      const before: string = (
        responseAfter as { previous_url: string }
      ).previous_url
        .slice(
          (responseAfter as { previous_url: string }).previous_url.lastIndexOf(
            "before="
          )
        )
        .split("=")[1];

      const responseBefore = await new TemplatesApi(config).list(10, before);
      expect(responseBefore?.data).toBeDefined();
      const previousPage: Template[] = responseBefore?.data || [];
      expect(previousPage.length).toBeGreaterThan(0);
    });
  });
});
