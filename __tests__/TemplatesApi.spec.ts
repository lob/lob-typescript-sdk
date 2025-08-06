import { Template, TemplateWritable, TemplateUpdate } from "../models";
import { TemplatesApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("TemplatesApi", () => {
  jest.setTimeout(1000 * 60);

  it("Template API can be instantiated", () => {
    const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
    expect(templatesApi).toEqual(
      expect.objectContaining({
        create: expect.any(Function),
        get: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
      })
    );
  });

  it("all individual Template functions exists", () => {
    const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
    expect(templatesApi).toEqual(
      expect.objectContaining({
        create: expect.any(Function),
        get: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
      })
    );
  });

  describe("performs single-Template operations", () => {
    const templateWrite = new TemplateWritable({
      description: "Newer Template",
      html: "<html>Updated HTML for {{name}}</html>",
    });

    it("creates, updates, retrieves, and deletes a template", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
      // Create
      const createdTemplate = await templatesApi.create(templateWrite);
      expect(createdTemplate).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          description: templateWrite.description,
        })
      );

      // Get
      const retrievedTemplate = await templatesApi.get(
        createdTemplate.id as string
      );
      expect(retrievedTemplate).toEqual(
        expect.objectContaining({
          id: createdTemplate.id,
        })
      );

      // Update
      const updates = new TemplateUpdate({
        description: "updated template",
        published_version: retrievedTemplate.published_version?.id as string,
      });
      const updatedTemplate = await templatesApi.update(
        retrievedTemplate.id as string,
        updates
      );
      expect(updatedTemplate).toEqual(
        expect.objectContaining({
          description: "updated template",
        })
      );

      // Delete
      const deletedTemplate = await templatesApi.delete(
        updatedTemplate.id as string
      );
      expect(deletedTemplate).toEqual(
        expect.objectContaining({
          deleted: true,
        })
      );
    });
  });

  describe("list templates", () => {
    let createdTemplates: Template[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 templates present, to test pagination
      const template1 = new TemplateWritable({
        description: "Newer Template",
        html: "<html>Updated HTML for Template 1/html>",
      });
      const template2 = new TemplateWritable(
        Object.assign({}, template1, {
          description: "Newer Template",
          html: "<html>Updated HTML for Template 2</html>",
        })
      );
      const template3 = new TemplateWritable(
        Object.assign({}, template1, {
          description: "Newer Template",
          html: "<html>Updated HTML for Template 3</html>",
        })
      );

      const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
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
      const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
      const deleteOperations: Promise<unknown>[] = [];
      for (const template of createdTemplates) {
        deleteOperations.push(templatesApi.delete(template.id as string));
      }
      await Promise.all(deleteOperations);
    });

    it("exists", () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
      expect(templatesApi).toEqual(
        expect.objectContaining({
          list: expect.any(Function),
        })
      );
    });

    it("lists templates", async () => {
      const response = await new TemplatesApi(CONFIG_FOR_INTEGRATION).list();
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^tmpl_[a-zA-Z0-9]+$/),
              description: expect.any(String),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "template",
            }),
          ]),
        })
      );
    });

    it("lists templates given before or after params", async () => {
      const templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
      const response = await templatesApi.list();
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^tmpl_[a-zA-Z0-9]+$/),
              description: expect.any(String),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "template",
            }),
          ]),
        })
      );

      if (response.next_url) {
        const after: string = response.next_url
          .slice(response.next_url.lastIndexOf("after="))
          .split("=")[1];

        const responseAfter = await templatesApi.list(3, undefined, after);
        expect(responseAfter).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              expect.objectContaining({
                id: expect.stringMatching(/^tmpl_[a-zA-Z0-9]+$/),
                description: expect.any(String),
                date_created: expect.stringMatching(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                ),
                date_modified: expect.stringMatching(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                ),
                object: "template",
              }),
            ]),
            previous_url: expect.any(String),
          })
        );

        expect(responseAfter.data?.length).toBeGreaterThan(0);

        if (responseAfter.previous_url) {
          const before: string = responseAfter.previous_url
            .slice(responseAfter.previous_url.lastIndexOf("before="))
            .split("=")[1];

          const responseBefore = await templatesApi.list(3, before);
          expect(responseBefore).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.stringMatching(/^tmpl_[a-zA-Z0-9]+$/),
                  description: expect.any(String),
                  date_created: expect.stringMatching(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                  ),
                  date_modified: expect.stringMatching(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                  ),
                  object: "template",
                }),
              ]),
            })
          );
          expect(responseBefore.data?.length).toBeGreaterThan(0);
        }
      } else {
        // If no pagination, just verify the API works
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });
  });
});
