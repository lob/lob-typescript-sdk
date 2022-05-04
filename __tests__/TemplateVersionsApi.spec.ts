import {
  Template,
  TemplateVersion,
  TemplateWritable,
  TemplateVersionWritable,
  TemplateVersionUpdatable,
  EngineHtml,
} from "../models";
import { TemplateVersionsApi, TemplatesApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("TemplateVersionsApi", () => {
  it("Template API can be instantiated", () => {
    const templateVersionsApi = new TemplateVersionsApi(CONFIG_FOR_INTEGRATION);
    expect(templateVersionsApi).toBeDefined();
    expect(typeof templateVersionsApi).toEqual("object");
    expect(templateVersionsApi).toBeInstanceOf(TemplateVersionsApi);
  });

  it("all individual Template Versions functions exists", () => {
    const templateVersionsApi = new TemplateVersionsApi(CONFIG_FOR_INTEGRATION);
    expect(templateVersionsApi.create).toBeDefined();
    expect(typeof templateVersionsApi.create).toEqual("function");

    expect(templateVersionsApi.get).toBeDefined();
    expect(typeof templateVersionsApi.get).toEqual("function");

    expect(templateVersionsApi.update).toBeDefined();
    expect(typeof templateVersionsApi.update).toEqual("function");

    expect(templateVersionsApi.delete).toBeDefined();
    expect(typeof templateVersionsApi.delete).toEqual("function");
  });

  describe("performs template version operations", () => {
    let dummyTemplate: Template;
    beforeAll(async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
      const editableTemplate = new TemplateWritable({
        description: "Newer Template",
        html: "<html>Updated HTML for Template 1/html>",
      });
      dummyTemplate = await templatesApi.create(editableTemplate);

      if (!dummyTemplate.id) {
        throw new Error("Unable to create required data");
      }
    });

    const templateVersionWrite = new TemplateVersionWritable({
      description: "New Template Version Template",
      html: "<html>Updated HTML for {{name}}</html>",
    });

    it("creates, updates, retrieves, and deletes a template", async () => {
      const templateVersionsApi = new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      );
      // Create
      const createdTemplateVersion = await new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      ).create(dummyTemplate.id as string, templateVersionWrite);
      expect(createdTemplateVersion?.id).toBeDefined();
      expect(createdTemplateVersion?.description).toEqual(
        templateVersionWrite.description
      );

      // Get
      const retrievedTemplateVersion = await templateVersionsApi.get(
        dummyTemplate.id as string,
        createdTemplateVersion.id as string
      );
      expect(retrievedTemplateVersion).toBeDefined();
      expect(retrievedTemplateVersion?.id).toEqual(createdTemplateVersion?.id);

      // Update
      const updatedVersion = new TemplateVersionUpdatable({
        description: "updated template",
        engine: EngineHtml.Handlebars,
      });
      const updatedTemplateVersion = await templateVersionsApi.update(
        dummyTemplate.id as string,
        createdTemplateVersion.id as string,
        updatedVersion
      );
      expect(updatedTemplateVersion).toBeDefined();
      expect(updatedTemplateVersion?.description).toEqual("updated template");

      // Delete
      const deletedTemplateVersion = await templateVersionsApi.delete(
        dummyTemplate.id as string,
        updatedTemplateVersion.id as string
      );
      expect(deletedTemplateVersion?.deleted).toBeTruthy();
    });
  });

  describe("list templates", () => {
    let createdTemplateVersions: TemplateVersion[] = [];
    let dummyTemplate: Template;
    const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);

    beforeAll(async () => {
      const editableTemplate = new TemplateWritable({
        description: "Newer Template",
        html: "<html>Updated HTML for Template 1/html>",
      });
      dummyTemplate = await templatesApi.create(editableTemplate);

      if (!dummyTemplate.id) {
        throw new Error("Unable to create required data");
      }
      // ensure there are at least 3 templates present, to test pagination
      const templateVersion1 = new TemplateVersionWritable({
        description: "Newer Template",
        html: "<html>Updated HTML for Template 1/html>",
      });
      const templateVersion2 = new TemplateVersionWritable(
        Object.assign({}, templateVersion1, {
          description: "Newer Template",
          html: "<html>Updated HTML for Template 2</html>",
        })
      );
      const templateVersion3 = new TemplateVersionWritable(
        Object.assign({}, templateVersion1, {
          description: "Newer Template",
          html: "<html>Updated HTML for Template 3</html>",
        })
      );

      const templateVersionsApi = new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      );
      await Promise.all([
        templateVersionsApi.create(
          dummyTemplate.id as string,
          templateVersion1
        ),
        templateVersionsApi.create(
          dummyTemplate.id as string,
          templateVersion2
        ),
        templateVersionsApi.create(
          dummyTemplate.id as string,
          templateVersion3
        ),
      ])
        .then((creationResults) => {
          if (creationResults.length !== 3) {
            fail();
          }
          createdTemplateVersions =
            createdTemplateVersions.concat(creationResults);
        })
        .catch((err) => {
          fail(err);
        });
    });

    afterAll(async () => {
      const templateVersionsApi = new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      );
      const deleteOperations: Promise<unknown>[] = [];
      for (const templateVersion of createdTemplateVersions) {
        deleteOperations.push(
          templateVersionsApi.delete(
            dummyTemplate.id as string,
            templateVersion.id as string
          )
        );
      }
      templatesApi.delete(dummyTemplate.id as string);
      await Promise.all(deleteOperations);
    });

    it("exists", () => {
      const templateVersionsApi = new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      );
      expect(templateVersionsApi.list).toBeDefined();
      expect(typeof templateVersionsApi.list).toEqual("function");
    });

    it("lists template versions", async () => {
      const response = await new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      ).list(dummyTemplate.id as string);
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });

    it("lists template versions given before or after params", async () => {
      // ToDo:
      // list responses should map the before and after tokens for the consumer
      const response = await new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      ).list(dummyTemplate.id as string, 3);
      expect(response.next_url).toBeDefined();
      const after: string = (response as { next_url: string }).next_url
        .slice(
          (response as { next_url: string }).next_url.lastIndexOf("after=")
        )
        .split("=")[1];

      const responseAfter = await new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      ).list(dummyTemplate.id as string, 10, undefined, after);
      expect(responseAfter?.data).toBeDefined();
      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();

      const firstPage: TemplateVersion[] = responseAfter?.data || [];
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

      const responseBefore = await new TemplateVersionsApi(
        CONFIG_FOR_INTEGRATION
      ).list(dummyTemplate.id as string, 10, before);
      expect(responseBefore?.data).toBeDefined();
      const previousPage: TemplateVersion[] = responseBefore?.data || [];
      expect(previousPage.length).toBeGreaterThan(0);
    });
  });
});
