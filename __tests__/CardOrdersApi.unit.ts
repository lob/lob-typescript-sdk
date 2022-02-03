import { CardOrdersApi } from "../api";
import { CardOrderEditable } from "..";

import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";
const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("CardOrdersApi", () => {
  it("Card API can be instantiated", () => {
    const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_UNIT);
    expect(cardOrdersApi).toBeDefined();
    expect(typeof cardOrdersApi).toEqual("object");
    expect(cardOrdersApi).toBeInstanceOf(CardOrdersApi);
  });

  describe("create", () => {
    const cardForCreate: CardOrderEditable = {
      quantity: 200,
    };

    it("exists", async () => {
      const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_UNIT);
      expect(cardOrdersApi.create).toBeDefined();
      expect(typeof cardOrdersApi.create).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "card_fakeId",
          cardForCreate
        );
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
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "card_fakeId",
          cardForCreate
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
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "card_fakeId",
          cardForCreate
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
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "card_fakeId",
          cardForCreate
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates a card order", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "co_fakeId" },
      }));

      const cardOrder = await new CardOrdersApi(CONFIG_FOR_UNIT).create(
        "card_fakeId",
        cardForCreate
      );
      expect(cardOrder).toBeDefined();
      expect(cardOrder.id).toEqual("co_fakeId");
    });

    it("includes custom headers while it creates a card order", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "co_fakeId" },
      }));

      const cardOrder = await new CardOrdersApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create("card_fakeId", cardForCreate);
      expect(cardOrder).toBeDefined();
      expect(cardOrder.id).toEqual("co_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "co_fakeId",
          cardForCreate
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
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "co_fakeId",
          cardForCreate
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
        await new CardOrdersApi(CONFIG_FOR_UNIT).create(
          "co_fakeId",
          cardForCreate
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("cardOrderGet", () => {
    it("exists", async () => {
      const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_UNIT);
      expect(cardOrdersApi.get).toBeDefined();
      expect(typeof cardOrdersApi.get).toEqual("function");
    });

    it("gets card orders for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "co_fakeId" }] },
      }));

      const cardOrders = await new CardOrdersApi(CONFIG_FOR_UNIT).get(
        "co_fakeId"
      );
      expect(cardOrders).toBeDefined();
      expect(cardOrders.data?.length).toEqual(1);
    });

    it("includes custom headers while it gets card orders for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "co_fakeId" }] },
      }));

      const cardOrders = await new CardOrdersApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).get("co_fakeId");
      expect(cardOrders).toBeDefined();
      expect(cardOrders.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardOrdersApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "co_fakeId"
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
        await new CardOrdersApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
          "co_fakeId"
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
