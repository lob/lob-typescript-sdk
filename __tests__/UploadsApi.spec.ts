import {
  Campaign,
  CampaignWritable,
  CampaignUpdatable,
  CmpScheduleType,
  UploadWritable,
  ExportModel,
  ExportModelTypeEnum,
  UploadUpdatable,
  UploadState,
  Upload,
} from "../models";
import { UploadsApi } from "../api/uploads-api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";
import { CampaignsApi } from "../api/campaigns-api";
import FormData from "form-data";
import { createReadStream } from "fs";
import { assert } from "console";

describe("UploadsApi", () => {
  jest.setTimeout(1000 * 60);

  it("Uploads API can be instantiated", () => {
    const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
    expect(uploadsApi).toBeDefined();
    expect(typeof uploadsApi).toEqual("object");
    expect(uploadsApi).toBeInstanceOf(UploadsApi);
  });

  it("all individual Uploads functions exists", () => {
    const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);
    expect(uploadsApi.create_export).toBeDefined();
    expect(typeof uploadsApi.create_export).toEqual("function");

    expect(uploadsApi.create).toBeDefined();
    expect(typeof uploadsApi.create).toEqual("function");

    expect(uploadsApi.delete).toBeDefined();
    expect(typeof uploadsApi.delete).toEqual("function");

    expect(uploadsApi.get_export).toBeDefined();
    expect(typeof uploadsApi.get_export).toEqual("function");

    expect(uploadsApi.get).toBeDefined();
    expect(typeof uploadsApi.get).toEqual("function");

    expect(uploadsApi.list).toBeDefined();
    expect(typeof uploadsApi.list).toEqual("function");

    expect(uploadsApi.update).toBeDefined();
    expect(typeof uploadsApi.update).toEqual("function");

    expect(uploadsApi.upload_file).toBeDefined();
    expect(typeof uploadsApi.upload_file).toEqual("function");
  });

  describe("performs single-uploads operations", () => {
    ``;
    let createdCampaign: Campaign;
    let uploadWrite: UploadWritable;
    let createdUpload: Upload;

    beforeAll(async () => {
      try {
        const campaignsApi = new CampaignsApi(CONFIG_FOR_INTEGRATION);

        const campaignWrite = new CampaignWritable({
          name:
            "TS Integration Test Campaign for uploads on day " +
            Date.now().toString(),
          schedule_type: CmpScheduleType.Immediate,
        });
        createdCampaign = await campaignsApi.create(campaignWrite);

        expect(createdCampaign.id).toBeDefined();
      } catch (err: any) {
        console.error(err.message);
      }

      uploadWrite = new UploadWritable({
        campaignId: createdCampaign.id,
        columnMapping: {
          name: "recipient",
          address_line1: "primary_line",
          address_line2: "secondary_line",
          address_city: "city",
          address_state: "state",
          addess_zip: "zip_code",
          metadata: "metadata",
        },
      });
    });

    const exportModel = new ExportModel({
      type: ExportModelTypeEnum.All,
    });

    it("creates, updates, retrieves, and deletes an upload", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_INTEGRATION);

      //create upload

      const file = createReadStream("lobster-family.csv");
      const data = new FormData();
      data.append("file", file);

      const createdUpload = await uploadsApi.create(uploadWrite, {
        data,
      });
      expect(createdUpload.id).toBeDefined();

      //create export
      const createdExport = await uploadsApi.create_export(
        createdUpload.id,
        exportModel
      );
      expect(createdExport).toBeDefined();

      // //get upload
      const fetchedUpload = await uploadsApi.get(createdUpload.id);
      expect(fetchedUpload).toBeDefined();
      expect(fetchedUpload.id).toEqual(createdUpload.id);

      //get export
      const fetchedExport = await uploadsApi.get_export(
        createdUpload.id,
        createdExport.exportId
      );
      expect(fetchedExport).toBeDefined();
      expect(fetchedExport.id).toEqual(createdExport.exportId);
      expect(fetchedExport.uploadId).toEqual(createdUpload.id);

      // //list uploads
      const listOfUploads = await uploadsApi.list(createdCampaign.id);
      expect(listOfUploads).toBeDefined();
      expect(listOfUploads.length).toBeGreaterThan(0);
    });
  });
});
