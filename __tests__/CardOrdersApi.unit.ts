import { Configuration } from "../configuration";

import {
  Card,
  CardEditable,
  CardEditableSizeEnum,
  CardOrder
} from "../models";
import { CardsApi, CardOrdersApi } from "../api";
import { CardOrderEditable } from "..";

import axios from "axios";

import {debugLog, fail} from "./testUtilities";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("CardOrdersApi", () => {
  const config: Configuration = new Configuration({
    username: "Totally Fake Key",
  });
  const configWithBaseOptions = new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });

  it("Card API can be instantiated", () => {
    const cardOrdersApi = new CardOrdersApi(config);
    expect(cardOrdersApi).toBeDefined();
    expect(typeof cardOrdersApi).toEqual("object");
    expect(cardOrdersApi).toBeInstanceOf(CardOrdersApi);
  });

  describe("cardOrderCreate", () => {
    const cardForCreate: CardOrderEditable = {
      quantity: 200
    };

    it("exists", async () => {
      const cardOrdersApi = new CardOrdersApi(config);
      expect(cardOrdersApi.cardOrderCreate).toBeDefined();
      expect(typeof cardOrdersApi.cardOrderCreate).toEqual("function");
    });

    it("creates a card order", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake order id" }
      }));

      const cardOrder = await new CardOrdersApi(config).cardOrderCreate("fake id", cardForCreate);
      expect(cardOrder).toBeDefined();
      expect(cardOrder?.id).toEqual("fake order id");
    });

    it("includes custom headers while it creates a card order", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake order id" }
      }));

      const cardOrder = await new CardOrdersApi(configWithBaseOptions).cardOrderCreate("fake id", cardForCreate);
      expect(cardOrder).toBeDefined();
      expect(cardOrder?.id).toEqual("fake order id");
    });
  });

  describe("cardOrderRetrieve", () => {
    it("exists", async () => {
      const cardOrdersApi = new CardOrdersApi(config);
      expect(cardOrdersApi.cardOrdersRetrieve).toBeDefined();
      expect(typeof cardOrdersApi.cardOrdersRetrieve).toEqual("function");
    });

    it("gets card orders for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card order id" } ] }
      }));

      const cardOrders = await new CardOrdersApi(config).cardOrdersRetrieve("fake id");
      expect(cardOrders).toBeDefined();
      expect(cardOrders?.data?.length).toEqual(1);
    });

    it("includes custom headers while it gets card orders for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card order id" } ] }
      }));

      const cardOrders = await new CardOrdersApi(configWithBaseOptions).cardOrdersRetrieve("fake id");
      expect(cardOrders).toBeDefined();
      expect(cardOrders?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new CardOrdersApi(configWithBaseOptions).cardOrdersRetrieve("fake id");
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
        await new CardOrdersApi(configWithBaseOptions).cardOrdersRetrieve("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
