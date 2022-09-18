import {
  AddressEditable,
  CreativePatch,
  CreativeWritable,
  PostcardDetailsWritable,
} from "../models";
import { CreativesApi } from "../api/creatives-api";

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

describe("CreativesApi", () => {
  it("Creatives API can be instantiated", () => {
    const creativesApi = new CreativesApi(CONFIG_FOR_UNIT);
    expect(creativesApi).toBeDefined();
    expect(typeof creativesApi).toEqual("object");
    expect(creativesApi).toBeInstanceOf(CreativesApi);
  });

  describe("create", () => {
    const creativeWritableMock = new CreativeWritable({
      from: new AddressEditable(),
      campaign_id: "cmp_fakeId",
      resource_type: "postcard",
      details: new PostcardDetailsWritable(),
      front: "tmpl_fakeId",
      back: "tmpl_fakeId",
    });

    it("exists", async () => {
      const creativesApi = new CreativesApi(CONFIG_FOR_UNIT);
      expect(creativesApi.create).toBeDefined();
      expect(typeof creativesApi.create).toEqual("function");
    });

    it("creates a creative", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "crv_fakeId" },
      }));

      const creative = await new CreativesApi(CONFIG_FOR_UNIT).create(
        creativeWritableMock
      );
      expect(creative).toBeDefined();
      expect(creative.id).toEqual("crv_fakeId");
    });

    it("includes custom headers while it creates a creative", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "crv_fakeId" },
      }));

      const creativesApi = await new CreativesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(creativeWritableMock);
      expect(creativesApi).toBeDefined();
      expect(creativesApi.id).toEqual("crv_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          creativeWritableMock
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
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          creativeWritableMock
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
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          creativeWritableMock
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
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).create(
          creativeWritableMock
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const creativesApi = new CreativesApi(CONFIG_FOR_UNIT);
      expect(creativesApi.get).toBeDefined();
      expect(typeof creativesApi.get).toEqual("function");
    });

    it("gets creatives for a creative id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "crv_fakeId" },
      }));

      const creatives = await new CreativesApi(CONFIG_FOR_UNIT).get(
        "crv_fakeId"
      );
      expect(creatives).toBeDefined();
      expect(creatives.id).toEqual("crv_fakeId");
    });

    it("includes custom headers while it gets a creative for a creative id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "crv_fakeId" },
      }));

      const creatives = await new CreativesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("crv_fakeId");
      expect(creatives).toBeDefined();
      expect(creatives.id).toEqual("crv_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "crv_fakeId"
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
        await new CreativesApi(CONFIG_FOR_UNIT).get("crv_fakeId");
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
        await new CreativesApi(CONFIG_FOR_UNIT).get("crv_fakeId");
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
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "crv_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const creativeUpdatable = new CreativePatch({
      description: "creative updated",
    });

    it("exists", async () => {
      const creativesApi = new CreativesApi(CONFIG_FOR_UNIT);
      expect(creativesApi.update).toBeDefined();
      expect(typeof creativesApi.update).toEqual("function");
    });

    it("updates creative for a creative id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "crv_fakeId" },
      }));

      const creatives = await new CreativesApi(CONFIG_FOR_UNIT).update(
        "crv_fakeId",
        creativeUpdatable
      );
      expect(creatives).toBeDefined();
      expect(creatives.id).toEqual("crv_fakeId");
    });

    it("includes custom headers while it updates a creative for a creative id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "crv_fakeId" },
      }));

      const creatives = await new CreativesApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update("crv_fakeId", creativeUpdatable);
      expect(creatives).toBeDefined();
      expect(creatives.id).toEqual("crv_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "crv_fakeId",
          creativeUpdatable
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
        await new CreativesApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).update(
          "crv_fakeId",
          creativeUpdatable
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
