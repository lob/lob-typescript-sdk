import {
  CampaignUpdatable,
  CampaignWritable,
  CmpScheduleType,
} from "../models";
import { CampaignsApi } from "../api/campaigns-api";

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

describe("CampaignsApi", () => {
  it("Campaigns API can be instantiated", () => {
    const campaignsApi = new CampaignsApi(CONFIG_FOR_UNIT);
    expect(campaignsApi).toBeDefined();
    expect(typeof campaignsApi).toEqual("object");
    expect(campaignsApi).toBeInstanceOf(CampaignsApi);
  });

  describe("create", () => {
    const campaignWritableMock = new CampaignWritable({
      name: "TS Unit Test Campaign",
      schedule_type: CmpScheduleType.Immediate,
    });

    it("exists", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_UNIT);
      expect(campaignsApi.create).toBeDefined();
      expect(typeof campaignsApi.create).toEqual("function");
    });

    it("creates a campaign", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaign = await new CampaignsApi(CONFIG_FOR_UNIT).create(
        campaignWritableMock
      );
      expect(campaign).toBeDefined();
      expect(campaign.id).toEqual("cmp_fakeId");
    });

    it("includes custom headers while it creates a campaign", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaignsApi = await new CampaignsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(campaignWritableMock);
      expect(campaignsApi).toBeDefined();
      expect(campaignsApi.id).toEqual("cmp_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          campaignWritableMock
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          campaignWritableMock
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          campaignWritableMock
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          campaignWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_UNIT);
      expect(campaignsApi.get).toBeDefined();
      expect(typeof campaignsApi.get).toEqual("function");
    });

    it("gets campaigns for a campaign id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaigns = await new CampaignsApi(CONFIG_FOR_UNIT).get(
        "cmp_fakeId"
      );
      expect(campaigns).toBeDefined();
      expect(campaigns.id).toEqual("cmp_fakeId");
    });

    it("includes custom headers while it gets a campaign for a campaign id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaigns = await new CampaignsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("cmp_fakeId");
      expect(campaigns).toBeDefined();
      expect(campaigns.id).toEqual("cmp_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "cmp_fakeId"
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
        await new CampaignsApi(CONFIG_FOR_UNIT).get("cmp_fakeId");
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
        await new CampaignsApi(CONFIG_FOR_UNIT).get("cmp_fakeId");
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "cmp_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_UNIT);
      expect(campaignsApi.delete).toBeDefined();
      expect(typeof campaignsApi.delete).toEqual("function");
    });

    it("deletes campaign for a campaign id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaigns = await new CampaignsApi(CONFIG_FOR_UNIT).delete(
        "cmp_fakeId"
      );
      expect(campaigns).toBeDefined();
      expect(campaigns.id).toEqual("cmp_fakeId");
    });

    it("includes custom headers while it deletes a campaign for a campaign id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaigns = await new CampaignsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).delete("cmp_fakeId");
      expect(campaigns).toBeDefined();
      expect(campaigns.id).toEqual("cmp_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete(
          "cmp_fakeId"
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
        await new CampaignsApi(CONFIG_FOR_UNIT).delete("cmp_fakeId");
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
        await new CampaignsApi(CONFIG_FOR_UNIT).delete("cmp_fakeId");
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).delete(
          "cmp_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const campaignUpdatable = new CampaignUpdatable({
      description: "TS Unit Test Updated Campaign",
    });

    it("exists", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_UNIT);
      expect(campaignsApi.update).toBeDefined();
      expect(typeof campaignsApi.update).toEqual("function");
    });

    it("updates campaign for a campaign id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaigns = await new CampaignsApi(CONFIG_FOR_UNIT).update(
        "cmp_fakeId",
        campaignUpdatable
      );
      expect(campaigns).toBeDefined();
      expect(campaigns.id).toEqual("cmp_fakeId");
    });

    it("includes custom headers while it updates a campaign for a campaign id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "cmp_fakeId" },
      }));

      const campaigns = await new CampaignsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update("cmp_fakeId", campaignUpdatable);
      expect(campaigns).toBeDefined();
      expect(campaigns.id).toEqual("cmp_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "cmp_fakeId",
          campaignUpdatable
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "cmp_fakeId",
          campaignUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const campaignsApi = new CampaignsApi(CONFIG_FOR_UNIT);
      expect(campaignsApi.list).toBeDefined();
      expect(typeof campaignsApi.list).toEqual("function");
    });

    it("gets all campaigns when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "cmp_fakeId" }, { id: "another cmp_fakeId" }],
        },
      }));

      const campaigns = await new CampaignsApi(CONFIG_FOR_UNIT).list();
      expect(campaigns).toBeDefined();
      expect(campaigns.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "cmp_fakeId" }] },
      }));

      const campaigns = await new CampaignsApi(CONFIG_FOR_UNIT).list(1);
      expect(campaigns).toBeDefined();
      expect(campaigns.data?.length).toEqual(1);
    });

    it("should handle the include parameter", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "cmp_fakeId" }],
          total_count: 1,
        },
      }));

      const campaignsApi = await new CampaignsApi(CONFIG_FOR_UNIT).list(
        1, // limit
        ["total_count"] // include
      );
      expect(campaignsApi).toBeDefined();
      expect(campaignsApi.data?.length).toBeLessThanOrEqual(1);
      expect(campaignsApi.total_count).toBeDefined();
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "cmp_fakeId" }] },
      }));

      const campaigns = await new CampaignsApi(CONFIG_FOR_UNIT).list(
        1, // limit
        undefined, // include
        "before" // before
      );
      expect(campaigns).toBeDefined();
      expect(campaigns.data?.length).toBeLessThanOrEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "cmp_fakeId" }] },
      }));

      const campaignsApi = await new CampaignsApi(CONFIG_FOR_UNIT).list(
        1, // limit
        undefined, // include
        undefined, // before
        "after" // after
      );
      expect(campaignsApi).toBeDefined();
      expect(campaignsApi.data?.length).toBeLessThanOrEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
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
        await new CampaignsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
