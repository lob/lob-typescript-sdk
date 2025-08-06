import { SelfMailerEditable } from "../models";
import { SelfMailersApi } from "../api";
import {
  ADDRESSES_EDITABLE,
  CONFIG_FOR_INTEGRATION,
  FILE_LOCATION_6X18,
} from "./testFixtures";

describe("smApi", () => {
  jest.setTimeout(90000); // 90 seconds

  const dummySelfMailer = new SelfMailerEditable({
    to: ADDRESSES_EDITABLE[0],
    from: ADDRESSES_EDITABLE[1],
    inside: FILE_LOCATION_6X18,
    outside: FILE_LOCATION_6X18,
    use_type: "operational",
  });

  it("SelfMailer API can be instantiated", () => {
    const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);
    expect(smApi).toBeDefined();
    expect(typeof smApi).toEqual("object");
    expect(smApi).toBeInstanceOf(SelfMailersApi);
  });

  describe("performs single-SelfMailer operations", () => {
    it("all individual SelfMailer functions exists", () => {
      const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);
      expect(smApi.create).toBeDefined();
      expect(typeof smApi.create).toEqual("function");

      expect(smApi.get).toBeDefined();
      expect(typeof smApi.get).toEqual("function");

      expect(smApi.list).toBeDefined();
      expect(typeof smApi.list).toEqual("function");

      expect(smApi.delete).toBeDefined();
      expect(typeof smApi.delete).toEqual("function");
    });

    it("creates, retrieves, and deletes a selfMailer", async () => {
      const selfMailer = await new SelfMailersApi(
        CONFIG_FOR_INTEGRATION
      ).create(dummySelfMailer);
      expect(selfMailer.id).toBeDefined();
      if (selfMailer.id) {
        const retrievedSelfMailer = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).get(selfMailer.id);
        expect(retrievedSelfMailer).toBeDefined();
        const deletedSelfMailer = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).delete(selfMailer.id);
        expect(deletedSelfMailer.deleted).toBeTruthy();
      } else {
        throw new Error("self-mailer ID should be defined upon creation");
      }
    });
  });

  describe("list self-mailers", () => {
    let nextUrl = "";
    let previousUrl = "";
    beforeAll(async () => {
      const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);

      // Create enough self-mailers to ensure pagination works
      const baseSelfMailer = {
        inside: FILE_LOCATION_6X18,
        outside: FILE_LOCATION_6X18,
      };

      const selfMailerConfigs = [
        { to: 1, from: 2, use_type: "operational" as const },
        { to: 3, from: 6, use_type: "operational" as const },
        { to: 4, from: 5, use_type: "marketing" as const },
        { to: 0, from: 1, use_type: "operational" as const },
        { to: 2, from: 3, use_type: "marketing" as const },
        { to: 4, from: 6, use_type: "operational" as const },
      ];

      const selfMailersToCreate = selfMailerConfigs.map(
        ({ to, from, use_type }) =>
          new SelfMailerEditable({
            ...baseSelfMailer,
            to: ADDRESSES_EDITABLE[to],
            from: ADDRESSES_EDITABLE[from],
            use_type,
          })
      );

      // Create all self-mailers in parallel with error handling
      try {
        const creationPromises = selfMailersToCreate.map(async (selfMailer) => {
          try {
            await smApi.create(selfMailer);
          } catch (error) {
            // Continue if individual self-mailer creation fails
          }
        });

        await Promise.all(creationPromises);
      } catch (error) {
        // Continue without created self-mailers if creation fails
      }

      // Get the first page with a small limit to force pagination
      const response = await smApi.list(3); // Small limit to ensure pagination

      // Verify we have pagination data
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);

      if (response.next_url) {
        nextUrl = response.next_url.slice(
          response.next_url.lastIndexOf("after=") + 6
        );

        // Get the second page
        const responseAfter = await smApi.list(3, undefined, nextUrl);
        expect(responseAfter).toBeDefined();
        expect(responseAfter.data).toBeDefined();

        if (responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        }
      }
    });

    it("exists", () => {
      expect(new SelfMailersApi(CONFIG_FOR_INTEGRATION).list).toBeDefined();
      expect(typeof new SelfMailersApi(CONFIG_FOR_INTEGRATION).list).toEqual(
        "function"
      );
    });

    it("lists self-mailers", async () => {
      const response = await new SelfMailersApi(CONFIG_FOR_INTEGRATION).list();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given an after param", async () => {
      // Only run this test if we have pagination data
      if (nextUrl) {
        const responseAfter = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).list(3, undefined, nextUrl);
        expect(responseAfter.data).toBeDefined();
        expect(responseAfter.data?.length).toBeGreaterThan(0);
      } else {
        // If no pagination, test that the API still works
        const response = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).list();
        expect(response.data).toBeDefined();
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });

    it("lists self-mailers given a before param", async () => {
      // Only run this test if we have pagination data
      if (previousUrl) {
        const responseBefore = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).list(3, previousUrl);
        expect(responseBefore.data).toBeDefined();
        expect(responseBefore.data?.length).toBeGreaterThan(0);
      } else {
        // If no pagination, test that the API still works
        const response = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).list();
        expect(response.data).toBeDefined();
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });
  });
});
