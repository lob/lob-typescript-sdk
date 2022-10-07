import {
  Upload,
  UploadWritable,
  UploadUpdatable,
  CampaignWritable,
  CmpScheduleType,
  ExportModel,
} from "../models";
import { UploadsApi } from "../api/uploads-api";
import { CampaignsApi } from "../api/campaigns-api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";
import { fail } from "./testUtilities";

describe("UploadsApi", () => {
  jest.setTimeout(1000 * 60);

  it("Upload API can be instantiated", () => {
    const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
    expect(uploadsApi).toBeDefined();
    expect(typeof uploadsApi).toEqual("object");
    expect(uploadsApi).toBeInstanceOf(UploadsApi);
  });

  it("all individual Upload functions exists", () => {
    const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
    expect(uploadsApi.create_upload).toBeDefined();
    expect(typeof uploadsApi.create_upload).toEqual("function");

    expect(uploadsApi.get_upload).toBeDefined();
    expect(typeof uploadsApi.get_upload).toEqual("function");

    expect(uploadsApi.update_upload).toBeDefined();
    expect(typeof uploadsApi.update_upload).toEqual("function");

    expect(uploadsApi.delete_upload).toBeDefined();
    expect(typeof uploadsApi.delete_upload).toEqual("function");

    expect(uploadsApi.list_upload).toBeDefined();
    expect(typeof uploadsApi.list_upload).toEqual("function");

    expect(uploadsApi.upload_file).toBeDefined();
    expect(typeof uploadsApi.upload_file).toEqual("function");

    expect(uploadsApi.create_export).toBeDefined();
    expect(typeof uploadsApi.create_export).toEqual("function");

    expect(uploadsApi.get_export).toBeDefined();
    expect(typeof uploadsApi.get_export).toEqual("function");
  });

  const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);
  let cmp_id: string;

  beforeAll(async () => {
    const campaignWrite = new CampaignWritable({
      name: "TS Uploads Integration Test Campaign",
      schedule_type: CmpScheduleType.Immediate,
    });

    const createdCampaign = await campaignsApi.create(campaignWrite);
    cmp_id = createdCampaign.id;
  });

  afterAll(async () => {
    await campaignsApi.delete(cmp_id);
  });

  describe("performs single-Upload operations", () => {
    it("creates, updates, retrieves, and deletes an upload", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);

      const uploadWrite = new UploadWritable({
        campaignId: cmp_id,
        columnMapping: {
          name: "name",
          address_line1: "address_line1",
          address_line2: "address_line2",
          address_city: "address_city",
          address_state: "address_state",
          address_zip: "address_zip",
        },
      });

      // Create
      const createdUpload = await uploadsApi.create_upload(uploadWrite);
      expect(createdUpload.id).toBeDefined();

      // Get
      const retrievedUpload = await uploadsApi.get_upload(
        createdUpload.id as string
      );
      expect(retrievedUpload).toBeDefined();
      expect(retrievedUpload.id).toEqual(createdUpload.id);

      // Update
      const newMapping = {
        name: "name",
        address_line1: "address_line2",
        address_line2: "address_line1",
        address_city: "address_state",
        address_state: "address_city",
        address_zip: "address_zip",
      };

      const updates = new UploadUpdatable({
        columnMapping: newMapping,
      });
      const updatedUpload = await uploadsApi.update_upload(
        retrievedUpload.id as string,
        updates
      );
      expect(updatedUpload).toBeDefined();
      expect(updatedUpload.columnMapping).toEqual(newMapping);

      // Delete
      await uploadsApi.delete_upload(updatedUpload.id as string);
    });
  });

  describe("list uploads", () => {
    let createdUploads: Upload[] = [];

    beforeAll(async () => {
      const column_mapping = {
        name: "name",
        address_line1: "address_line1",
        address_line2: "address_line2",
        address_city: "address_city",
        address_state: "address_state",
        address_zip: "address_zip",
      };

      const upload1 = new UploadWritable({
        campaignId: cmp_id,
        columnMapping: column_mapping,
      });
      const upload2 = new UploadWritable(
        Object.assign({}, upload1, {
          campaignId: cmp_id,
          columnMapping: column_mapping,
        })
      );
      const upload3 = new UploadWritable(
        Object.assign({}, upload1, {
          campaignId: cmp_id,
          columnMapping: column_mapping,
        })
      );

      const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
      await Promise.all([
        uploadsApi.create_upload(upload1),
        uploadsApi.create_upload(upload2),
        uploadsApi.create_upload(upload3),
      ])
        .then((creationResults) => {
          if (creationResults.length !== 3) {
            fail();
          }
          createdUploads = createdUploads.concat(creationResults);
        })
        .catch((err) => {
          fail(err);
        });
    });

    afterAll(async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
      const deleteOperations: Promise<unknown>[] = [];
      for (const upload of createdUploads) {
        deleteOperations.push(uploadsApi.delete_upload(upload.id as string));
      }
      await Promise.all(deleteOperations);
    });

    it("exists", () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
      expect(uploadsApi.list_upload).toBeDefined();
      expect(typeof uploadsApi.list_upload).toEqual("function");
    });

    it("lists uploads", async () => {
      const response = await new UploadsApi(
        CONFIG_FOR_INTEGRATION
      ).list_upload();
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });
  });

  describe("exports", () => {
    let upl_id: string;
    const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);

    beforeAll(async () => {
      const column_mapping = {
        name: "name",
        address_line1: "address_line1",
        address_line2: "address_line2",
        address_city: "address_city",
        address_state: "address_state",
        address_zip: "address_zip",
      };

      const upload = new UploadWritable({
        campaignId: cmp_id,
        columnMapping: column_mapping,
      });

      const createdUpload = await uploadsApi.create_upload(upload);
      upl_id = createdUpload.id;
    });

    afterAll(async () => {
      uploadsApi.delete_upload(upl_id);
    });

    it("exists", () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
      expect(uploadsApi.create_export).toBeDefined();
      expect(typeof uploadsApi.create_export).toEqual("function");

      expect(uploadsApi.get_export).toBeDefined();
      expect(typeof uploadsApi.get_export).toEqual("function");
    });

    it("create and retrieves export", async () => {
      // create
      const createdExport = await new UploadsApi(
        CONFIG_FOR_INTEGRATION
      ).create_export(
        upl_id,
        new ExportModel({
          type: "all",
        })
      );
      expect(createdExport.exportId).toBeDefined();

      // retrieve
      const retrievedExport = await new UploadsApi(
        CONFIG_FOR_INTEGRATION
      ).get_export(upl_id, createdExport.exportId);

      expect(retrievedExport.id).toBeDefined();
      expect(retrievedExport.id).toEqual(createdExport.exportId);
    });
  });
});
