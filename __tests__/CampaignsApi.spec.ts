import {
  Campaign,
  CampaignWritable,
  CampaignUpdatable,
  CmpScheduleType,
} from "../models";
import { CampaignsApi } from "../api/campaigns-api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("CampaignsApi", () => {
  jest.setTimeout(1000 * 60);

  it("Campaign API can be instantiated", () => {
    const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
    expect(campaignsApi).toEqual(
      expect.objectContaining({
        create: expect.any(Function),
        list: expect.any(Function),
        get: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
      })
    );
  });

  it("all individual Campaign functions exists", () => {
    const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
    expect(campaignsApi).toEqual(
      expect.objectContaining({
        create: expect.any(Function),
        list: expect.any(Function),
        get: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
      })
    );
  });

  describe("performs single-Campaign operations", () => {
    const campaignWrite = new CampaignWritable({
      name: "TS Integration Test Campaign " + Date.now().toString(),
      schedule_type: CmpScheduleType.Immediate,
    });

    it("creates, updates, retrieves, and deletes a campaign", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      // Create
      const createdCampaign = await campaignsApi.create(campaignWrite);
      expect(createdCampaign).toEqual(
        expect.objectContaining({
          id: expect.any(String),
        })
      );

      // Get
      const retrievedCampaign = await campaignsApi.get(
        createdCampaign.id as string
      );
      expect(retrievedCampaign).toEqual(
        expect.objectContaining({
          id: createdCampaign.id,
        })
      );

      // Update
      const updates = new CampaignUpdatable({
        name: "updated campaign",
      });
      const updatedCampaign = await campaignsApi.update(
        retrievedCampaign.id as string,
        updates
      );
      expect(updatedCampaign).toEqual(
        expect.objectContaining({
          name: "updated campaign",
        })
      );

      // Delete
      const deletedCampaign = await campaignsApi.delete(
        updatedCampaign.id as string
      );
      expect(deletedCampaign).toEqual(
        expect.objectContaining({
          deleted: true,
        })
      );
    });
  });

  describe("list campaigns", () => {
    let createdCampaigns: Campaign[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 campaigns present, to test pagination
      const campaign1 = new CampaignWritable({
        name: "TS Integration Test Campaign 1 " + Date.now().toString(),
        schedule_type: CmpScheduleType.Immediate,
      });
      const campaign2 = new CampaignWritable(
        Object.assign({}, campaign1, {
          name: "TS Integration Test Campaign 2 " + Date.now().toString(),
          schedule_type: CmpScheduleType.Immediate,
        })
      );
      const campaign3 = new CampaignWritable(
        Object.assign({}, campaign1, {
          name: "TS Integration Test Campaign 3 " + Date.now().toString(),
          schedule_type: CmpScheduleType.Immediate,
        })
      );

      const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      await Promise.all([
        campaignsApi.create(campaign1),
        campaignsApi.create(campaign2),
        campaignsApi.create(campaign3),
      ])
        .then((creationResults) => {
          if (creationResults.length !== 3) {
            fail();
          }
          createdCampaigns = createdCampaigns.concat(creationResults);
        })
        .catch((err) => {
          fail(err);
        });
    });

    afterAll(async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      const deleteOperations: Promise<unknown>[] = [];
      for (const campaign of createdCampaigns) {
        deleteOperations.push(campaignsApi.delete(campaign.id as string));
      }
      await Promise.all(deleteOperations);
    });

    it("exists", () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      expect(campaignsApi).toEqual(
        expect.objectContaining({
          list: expect.any(Function),
        })
      );
    });

    it("lists campaigns", async () => {
      const response = await new CampaignsApi(CONFIG_FOR_INTEGRATION).list();
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^cmp_[a-zA-Z0-9]+$/),
              name: expect.any(String),
              schedule_type: expect.stringMatching(/^(immediate|scheduled)$/),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "campaign",
            }),
          ]),
        })
      );
    });

    it("lists campaigns given include param", async () => {
      const response = await new CampaignsApi(CONFIG_FOR_INTEGRATION).list(
        undefined,
        ["total_count"]
      );
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^cmp_[a-zA-Z0-9]+$/),
              name: expect.any(String),
              schedule_type: expect.stringMatching(/^(immediate|scheduled)$/),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "campaign",
            }),
          ]),
          total_count: expect.any(Number),
        })
      );
    });

    it("lists campaigns given before or after params", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      const response = await campaignsApi.list();
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^cmp_[a-zA-Z0-9]+$/),
              name: expect.any(String),
              schedule_type: expect.stringMatching(/^(immediate|scheduled)$/),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "campaign",
            }),
          ]),
        })
      );

      if (response.next_url) {
        const after: string = response.next_url
          .slice(response.next_url.lastIndexOf("after="))
          .split("=")[1];

        const responseAfter = await campaignsApi.list(
          3,
          undefined,
          undefined,
          after
        );
        expect(responseAfter).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              expect.objectContaining({
                id: expect.stringMatching(/^cmp_[a-zA-Z0-9]+$/),
                name: expect.any(String),
                schedule_type: expect.stringMatching(/^(immediate|scheduled)$/),
                date_created: expect.stringMatching(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                ),
                date_modified: expect.stringMatching(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                ),
                object: "campaign",
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

          const responseBefore = await campaignsApi.list(3, undefined, before);
          expect(responseBefore).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.stringMatching(/^cmp_[a-zA-Z0-9]+$/),
                  name: expect.any(String),
                  schedule_type: expect.stringMatching(
                    /^(immediate|scheduled)$/
                  ),
                  date_created: expect.stringMatching(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                  ),
                  date_modified: expect.stringMatching(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                  ),
                  object: "campaign",
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
