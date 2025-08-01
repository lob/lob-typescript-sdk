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
    expect(campaignsApi).toBeDefined();
    expect(typeof campaignsApi).toEqual("object");
    expect(campaignsApi).toBeInstanceOf(CampaignsApi);
  });

  it("all individual Campaign functions exists", () => {
    const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
    expect(campaignsApi.create).toBeDefined();
    expect(typeof campaignsApi.create).toEqual("function");

    expect(campaignsApi.list).toBeDefined();
    expect(typeof campaignsApi.list).toEqual("function");

    expect(campaignsApi.get).toBeDefined();
    expect(typeof campaignsApi.get).toEqual("function");

    expect(campaignsApi.update).toBeDefined();
    expect(typeof campaignsApi.update).toEqual("function");

    expect(campaignsApi.delete).toBeDefined();
    expect(typeof campaignsApi.delete).toEqual("function");
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
      expect(createdCampaign.id).toBeDefined();

      // Get
      const retrievedCampaign = await campaignsApi.get(
        createdCampaign.id as string
      );
      expect(retrievedCampaign).toBeDefined();
      expect(retrievedCampaign.id).toEqual(createdCampaign.id);

      // Update
      const updates = new CampaignUpdatable({
        description: "TS Integration Test Updated Campaign",
      });
      const updatedCampaign = await campaignsApi.update(
        retrievedCampaign.id as string,
        updates
      );
      expect(updatedCampaign).toBeDefined();
      expect(updatedCampaign.description).toEqual(
        "TS Integration Test Updated Campaign"
      );

      // Delete
      const deletedCampaign = await campaignsApi.delete(
        updatedCampaign.id as string
      );
      expect(deletedCampaign.deleted).toBeTruthy();
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
      expect(campaignsApi.list).toBeDefined();
      expect(typeof campaignsApi.list).toEqual("function");
    });

    it("lists campaigns", async () => {
      const response = await new CampaignsApi(CONFIG_FOR_INTEGRATION).list();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });

    it("lists campaigns given include param", async () => {
      const response = await new CampaignsApi(CONFIG_FOR_INTEGRATION).list(
        undefined,
        ["total_count"]
      );
      expect(response.data).toBeDefined();
      expect(response.total_count).toBeDefined();
    });

    it("lists campaigns given before or after params", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      const response = await campaignsApi.list();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);

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
        expect(responseAfter.data).toBeDefined();
        expect(responseAfter.previous_url).toBeDefined();
        expect(responseAfter.previous_url).not.toBeNull();

        expect(responseAfter.data?.length).toBeGreaterThan(0);

        if (responseAfter.previous_url) {
          const before: string = responseAfter.previous_url
            .slice(responseAfter.previous_url.lastIndexOf("before="))
            .split("=")[1];

          const responseBefore = await campaignsApi.list(3, undefined, before);
          expect(responseBefore.data).toBeDefined();
          expect(responseBefore.data?.length).toBeGreaterThan(0);
        }
      } else {
        // If no pagination, just verify the API works
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });
  });
});
