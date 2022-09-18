import { UploadUpdatable, UploadWritable, ExportModel } from "../models";
import { UploadsApi } from "../api/uploads-api";

import { fail } from "./testUtilities";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("UploadsApi", () => {
  it("Uploads API can be instantiated", () => {
    const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
    expect(uploadsApi).toBeDefined();
    expect(typeof uploadsApi).toEqual("object");
    expect(uploadsApi).toBeInstanceOf(UploadsApi);
  });

  describe("create", () => {
    const uploadWritableMock = new UploadWritable({
      campaignId: "cmp_fakeId",
      columnMapping: {
        name: "name",
        address_line1: "address_line1",
        address_line2: "address_line2",
        address_city: "address_city",
        address_state: "address_state",
        address_zip: "address_zip",
      },
    });

    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.create_upload).toBeDefined();
      expect(typeof uploadsApi.create_upload).toEqual("function");
    });

    it("creates an upload", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      const upload = await new UploadsApi(CONFIG_FOR_UNIT).create_upload(
        uploadWritableMock
      );
      expect(upload).toBeDefined();
      expect(upload.id).toEqual("upl_fakeId");
    });

    it("includes custom headers while it creates an upload", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      const uploadsApi = await new UploadsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create_upload(uploadWritableMock);
      expect(uploadsApi).toBeDefined();
      expect(uploadsApi.id).toEqual("upl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_upload(
          uploadWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_upload(
          uploadWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_upload(
          uploadWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_upload(
          uploadWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.get_upload).toBeDefined();
      expect(typeof uploadsApi.get_upload).toEqual("function");
    });

    it("gets uploads for an upload id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      const uploads = await new UploadsApi(CONFIG_FOR_UNIT).get_upload(
        "upl_fakeId"
      );
      expect(uploads).toBeDefined();
      expect(uploads.id).toEqual("upl_fakeId");
    });

    it("includes custom headers while it gets an upload for an upload id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      const uploads = await new UploadsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get_upload("upl_fakeId");
      expect(uploads).toBeDefined();
      expect(uploads.id).toEqual("upl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get_upload(
          "upl_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new UploadsApi(CONFIG_FOR_UNIT).get_upload("upl_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new UploadsApi(CONFIG_FOR_UNIT).get_upload("upl_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get_upload(
          "upl_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.delete_upload).toBeDefined();
      expect(typeof uploadsApi.delete_upload).toEqual("function");
    });

    it("deletes upload for an upload id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      await new UploadsApi(CONFIG_FOR_UNIT).delete_upload("upl_fakeId");
    });

    it("includes custom headers while it deletes an upload for an upload id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete_upload(
        "upl_fakeId"
      );
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete_upload(
          "upl_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new UploadsApi(CONFIG_FOR_UNIT).delete_upload("upl_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new UploadsApi(CONFIG_FOR_UNIT).delete_upload("upl_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete_upload(
          "upl_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const uploadUpdatable = new UploadUpdatable({
      columnMapping: {
        name: "name",
        address_line1: "address_line2",
        address_line2: "address_line1",
        address_city: "address_state",
        address_state: "address_city",
        address_zip: "address_zip",
      },
    });

    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.update_upload).toBeDefined();
      expect(typeof uploadsApi.update_upload).toEqual("function");
    });

    it("updates upload for an upload id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      const uploads = await new UploadsApi(CONFIG_FOR_UNIT).update_upload(
        "upl_fakeId",
        uploadUpdatable
      );
      expect(uploads).toBeDefined();
      expect(uploads.id).toEqual("upl_fakeId");
    });

    it("includes custom headers while it updates an upload for an upload id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "upl_fakeId" },
      }));

      const uploads = await new UploadsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update_upload("upl_fakeId", uploadUpdatable);
      expect(uploads).toBeDefined();
      expect(uploads.id).toEqual("upl_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update_upload(
          "upl_fakeId",
          uploadUpdatable
        );
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
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update_upload(
          "upl_fakeId",
          uploadUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.list_upload).toBeDefined();
      expect(typeof uploadsApi.list_upload).toEqual("function");
    });

    it("lists uploads", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: [{ id: "upl_fakeId" }, { id: "another upl_fakeId" }],
      }));

      const uploads = await new UploadsApi(CONFIG_FOR_UNIT).list_upload();
      expect(uploads).toBeDefined();
      expect(uploads.length).toBeGreaterThanOrEqual(0);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list_upload();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list_upload();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list_upload();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list_upload();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("create export", () => {
    const exportModel = new ExportModel({
      type: "all",
    });

    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.create_export).toBeDefined();
      expect(typeof uploadsApi.create_export).toEqual("function");
    });

    it("creates an export", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { exportId: "ex_fakeId" },
      }));

      const created_export = await new UploadsApi(
        CONFIG_FOR_UNIT
      ).create_export("upl_fakeId", exportModel);
      expect(created_export).toBeDefined();
      expect(created_export.exportId).toEqual("ex_fakeId");
    });

    it("includes custom headers while it creates an export", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { exportId: "ex_fakeId" },
      }));

      const created_export = await new UploadsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create_export("upl_fakeId", exportModel);
      expect(created_export).toBeDefined();
      expect(created_export.exportId).toEqual("ex_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_export(
          "upl_fakeId",
          exportModel
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_export(
          "upl_fakeId",
          exportModel
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_export(
          "upl_fakeId",
          exportModel
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create_export(
          "upl_id",
          exportModel
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("retrieve export", () => {
    it("exists", async () => {
      const uploadsApi = new UploadsApi(CONFIG_FOR_UNIT);
      expect(uploadsApi.get_export).toBeDefined();
      expect(typeof uploadsApi.get_export).toEqual("function");
    });

    it("retrieves an upload", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "ex_fakeId" },
      }));

      const retrieved_export = await new UploadsApi(CONFIG_FOR_UNIT).get_export(
        "upl_fakeId",
        "ex_fakeId"
      );
      expect(retrieved_export).toBeDefined();
      expect(retrieved_export.id).toEqual("ex_fakeId");
    });

    it("includes custom headers while it creates an upload", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "ex_fakeId" },
      }));

      const retrieved_export = await new UploadsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get_export("upl_fakeId", "ex_fakeId");
      expect(retrieved_export).toBeDefined();
      expect(retrieved_export.id).toEqual("ex_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get_export(
          "upl_fakeId",
          "ex_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get_export(
          "upl_fakeId",
          "ex_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get_export(
          "upl_fakeId",
          "ex_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new UploadsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get_export(
          "upl_id",
          "ex_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
