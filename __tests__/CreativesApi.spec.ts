import {
  CreativePatch,
  CreativeWritable,
  AddressEditable,
  CampaignWritable,
  CmpScheduleType,
  PostcardDetailsWritable,
  TemplateWritable,
} from "../models";
import { CreativesApi } from "../api/creatives-api";
import { CampaignsApi } from "../api/campaigns-api";
import { TemplatesApi } from "../api/templates-api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("CreativesApi", () => {
  jest.setTimeout(1000 * 60);

  it("Creative API can be instantiated", () => {
    const creativesApi = new CreativesApi(CONFIG_FOR_INTEGRATION);
    expect(creativesApi).toBeDefined();
    expect(typeof creativesApi).toEqual("object");
    expect(creativesApi).toBeInstanceOf(CreativesApi);
  });

  it("all individual Creative functions exists", () => {
    const creativesApi = new CreativesApi(CONFIG_FOR_INTEGRATION);
    expect(creativesApi.create).toBeDefined();
    expect(typeof creativesApi.create).toEqual("function");

    expect(creativesApi.get).toBeDefined();
    expect(typeof creativesApi.get).toEqual("function");

    expect(creativesApi.update).toBeDefined();
    expect(typeof creativesApi.update).toEqual("function");
  });

  describe("performs single-Creative operations", () => {
    let cmp_id: string;
    let tmpl_id: string;
    let creativeWrite: CreativeWritable;
    let campaignsApi: CampaignsApi;
    let templatesApi: TemplatesApi;

    beforeAll(async () => {
      const from = new AddressEditable({
        name: "FESTER",
        address_line1: "001 CEMETERY LN",
        address_line2: "SUITE 666",
        address_city: "WESTFIELD",
        address_state: "NJ",
        address_zip: "07000",
      });

      campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
      const campaignWrite = new CampaignWritable({
        name: "TS Creative Integration Test Campaign",
        schedule_type: CmpScheduleType.Immediate,
      });
      const createdCampaign = await campaignsApi.create(campaignWrite);
      cmp_id = createdCampaign.id;

      templatesApi = new TemplatesApi(CONFIG_FOR_INTEGRATION);
      const templateWritable = new TemplateWritable({
        description: "TS Creative Integration Test Template",
        html: "<html>Updated HTML for template 1</html>",
      });
      const createdTemplate = await templatesApi.create(templateWritable);
      tmpl_id = createdTemplate.id;

      creativeWrite = new CreativeWritable({
        from: from,
        campaign_id: cmp_id,
        resource_type: "postcard",
        details: new PostcardDetailsWritable(),
        front: createdTemplate.id,
        back: createdTemplate.id,
      });
    });

    it("creates, updates, and retrieves a creative", async () => {
      const creativesApi = new CreativesApi(CONFIG_FOR_INTEGRATION);
      // Create
      const createdCreative = await creativesApi.create(creativeWrite);
      expect(createdCreative.id).toBeDefined();

      // Get
      const retrievedCreative = await creativesApi.get(
        createdCreative.id as string
      );
      expect(retrievedCreative).toBeDefined();
      expect(retrievedCreative.id).toEqual(createdCreative.id);

      // Update
      const updates = new CreativePatch({
        description: "Updated TS Integration Test Creative",
      });
      const updatedCreative = await creativesApi.update(
        retrievedCreative.id as string,
        updates
      );
      expect(updatedCreative).toBeDefined();
      expect(updatedCreative.description).toEqual(
        "Updated TS Integration Test Creative"
      );
    });

    afterAll(async () => {
      const deleteOperations: Promise<unknown>[] = [];
      deleteOperations.push(campaignsApi.delete(cmp_id));
      deleteOperations.push(templatesApi.delete(tmpl_id));
      await Promise.all(deleteOperations);
    });
  });
});
