import { CardEditable, CardEditableSizeEnum } from "../models";
import { CardsApi } from "../api";

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

describe("CardsApi", () => {
  it("Card API can be instantiated", () => {
    const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
    expect(cardsApi).toBeDefined();
    expect(typeof cardsApi).toEqual("object");
    expect(cardsApi).toBeInstanceOf(CardsApi);
  });

  describe("create", () => {
    const cardEditableMock: CardEditable = {
      front: "fake front",
      back: "fake back",
      size: CardEditableSizeEnum._2125x3375,
      description: "fake description",
    };

    it("exists", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
      expect(cardsApi.create).toBeDefined();
      expect(typeof cardsApi.create).toEqual("function");
    });

    it("creates a card", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const card = await new CardsApi(CONFIG_FOR_UNIT).create(cardEditableMock);
      expect(card).toBeDefined();
      expect(card.id).toEqual("card_fakeId");
    });

    it("includes custom headers while it creates a card", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cardsApi = await new CardsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).create(cardEditableMock);
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.id).toEqual("card_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardsApi(CONFIG_FOR_UNIT).create(cardEditableMock);
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
        await new CardsApi(CONFIG_FOR_UNIT).create(cardEditableMock);
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
        await new CardsApi(CONFIG_FOR_UNIT).create(cardEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });
      const cardUpdatable = {
        description: "card updated",
      };

      try {
        await new CardsApi(CONFIG_FOR_UNIT).create(cardEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
      expect(cardsApi.get).toBeDefined();
      expect(typeof cardsApi.get).toEqual("function");
    });

    it("gets cards for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(CONFIG_FOR_UNIT).get("fake id");
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("includes custom headers while it gets a card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(CONFIG_WITH_BASE_OPTIONS_FOR_UNIT).get(
        "fake id"
      );
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardsApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new CardsApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new CardsApi(CONFIG_FOR_UNIT).get("fake id");
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
        await new CardsApi(CONFIG_FOR_UNIT).get("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("delete", () => {
    it("exists", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
      expect(cardsApi.delete).toBeDefined();
      expect(typeof cardsApi.delete).toEqual("function");
    });

    it("deletes card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(CONFIG_FOR_UNIT).delete("fake id");
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("includes custom headers while it deletes a card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).delete("fake id");
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardsApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new CardsApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new CardsApi(CONFIG_FOR_UNIT).delete("fake id");
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
        await new CardsApi(CONFIG_FOR_UNIT).delete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const cardUpdatable = {
      description: "card updated",
    };

    it("exists", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
      expect(cardsApi.update).toBeDefined();
      expect(typeof cardsApi.update).toEqual("function");
    });

    it("updates card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(CONFIG_FOR_UNIT).update(
        "fake id",
        cardUpdatable
      );
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("includes custom headers while it updates a card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update("fake id", cardUpdatable);
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardsApi(CONFIG_FOR_UNIT).update("fake id", cardUpdatable);
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
        await new CardsApi(CONFIG_FOR_UNIT).update("fake id", cardUpdatable);
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
        await new CardsApi(CONFIG_FOR_UNIT).update("fake id", cardUpdatable);
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
        await new CardsApi(CONFIG_FOR_UNIT).update("fake id", cardUpdatable);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("update", () => {
    const cardUpdatable = {
      description: "card updated",
    };

    it("exists", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
      expect(cardsApi.update).toBeDefined();
      expect(typeof cardsApi.update).toEqual("function");
    });

    it("updates card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(CONFIG_FOR_UNIT).update(
        "fake id",
        cardUpdatable
      );
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("includes custom headers while it updates a card for a card id", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "card_fakeId" },
      }));

      const cards = await new CardsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).update("fake id", cardUpdatable);
      expect(cards).toBeDefined();
      expect(cards?.id).toEqual("card_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardsApi(CONFIG_FOR_UNIT).update("fake id", cardUpdatable);
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
        await new CardsApi(CONFIG_FOR_UNIT).update("fake id", cardUpdatable);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_UNIT);
      expect(cardsApi.list).toBeDefined();
      expect(typeof cardsApi.list).toEqual("function");
    });

    it("gets all cards when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          data: [{ id: "card_fakeId" }, { id: "another card_fakeId" }],
        },
      }));

      const cardsApi = await new CardsApi(CONFIG_FOR_UNIT).list();
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(2);
    });

    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "card_fakeId" }] },
      }));

      const cardsApi = await new CardsApi(CONFIG_FOR_UNIT).list(1);
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "card_fakeId" }] },
      }));

      const cardsApi = await new CardsApi(CONFIG_FOR_UNIT).list(1, "fake");
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "card_fakeId" }] },
      }));

      const cardsApi = await new CardsApi(CONFIG_FOR_UNIT).list(
        1,
        "fake",
        "id"
      );
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "card_fakeId" }] },
      }));

      const cardsApi = await new CardsApi(CONFIG_FOR_UNIT).list(
        1,
        "fake",
        "id",
        {
          id: "asc",
        }
      );
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new CardsApi(CONFIG_FOR_UNIT).list();
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
        await new CardsApi(CONFIG_FOR_UNIT).list();
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
        await new CardsApi(CONFIG_FOR_UNIT).list();
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
        await new CardsApi(CONFIG_FOR_UNIT).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
