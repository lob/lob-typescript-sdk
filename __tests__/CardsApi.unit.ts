import { Configuration } from "../configuration";

import {
  CardEditable,
  CardEditableSizeEnum
} from "../models";
import { CardsApi } from "../api";

import axios from "axios";

import { fail } from "./testUtilities";

const axiosRequest: jest.Mock = axios.request as jest.Mock;

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("CardsApi", () => {
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
    const cardsApi = new CardsApi(config);
    expect(cardsApi).toBeDefined();
    expect(typeof cardsApi).toEqual("object");
    expect(cardsApi).toBeInstanceOf(CardsApi);
  });

  describe("cardCreate", () => {
    const cardEditableMock: CardEditable = {
      front: 'fake front',
      back: 'fake back',
      size: CardEditableSizeEnum._2125x3375,
      description: 'fake description'
    };

    it("exists", async () => {
      const cardsApi = new CardsApi(config);
      expect(cardsApi.cardCreate).toBeDefined();
      expect(typeof cardsApi.cardCreate).toEqual("function");
    });

    it("creates a card", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake card id" }
      }));

      const card = await new CardsApi(config).cardCreate(cardEditableMock);
      expect(card).toBeDefined();
      expect(card.id).toEqual("fake card id");
    });

    it("includes custom headers while it creates a card", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "fake card id" }
      }));

      const cardsApi = await new CardsApi(configWithBaseOptions).cardCreate(cardEditableMock);
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.id).toEqual("fake card id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });
      const cardUpdatable = {
        description: "card updated"
      };

      try {
        await new CardsApi(configWithBaseOptions).cardCreate(cardEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });
      const cardUpdatable = {
        description: "card updated"
      };

      try {
        await new CardsApi(configWithBaseOptions).cardCreate(cardEditableMock);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("cardRetrieve", () => {
    it("exists", async () => {
      const cardrsApi = new CardsApi(config);
      expect(cardrsApi.cardRetrieve).toBeDefined();
      expect(typeof cardrsApi.cardRetrieve).toEqual("function");
    });

    it("gets cards for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));

        const cards = await new CardsApi(config).cardRetrieve("fake id");
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("includes custom headers while it gets a card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));


        const cards = await new CardsApi(configWithBaseOptions).cardRetrieve("fake id");
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new CardsApi(configWithBaseOptions).cardRetrieve("fake id");
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
        await new CardsApi(configWithBaseOptions).cardRetrieve("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("cardDelete", () => {
    it("exists", async () => {
      const cardrsApi = new CardsApi(config);
      expect(cardrsApi.cardDelete).toBeDefined();
      expect(typeof cardrsApi.cardDelete).toEqual("function");
    });

    it("deletes card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));

        const cards = await new CardsApi(config).cardDelete("fake id");
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("includes custom headers while it deletes a card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));


        const cards = await new CardsApi(configWithBaseOptions).cardDelete("fake id");
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new CardsApi(configWithBaseOptions).cardDelete("fake id");
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
        await new CardsApi(configWithBaseOptions).cardDelete("fake id");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("cardUpdate", () => {
    const cardUpdatable = {
      description: "card updated"
    };

    it("exists", async () => {
      const cardrsApi = new CardsApi(config);
      expect(cardrsApi.cardUpdate).toBeDefined();
      expect(typeof cardrsApi.cardUpdate).toEqual("function");
    });

    it("updates card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));

        const cards = await new CardsApi(config).cardUpdate("fake id", cardUpdatable);
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("includes custom headers while it updates a card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));

        const cards = await new CardsApi(configWithBaseOptions).cardUpdate("fake id", cardUpdatable);
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new CardsApi(configWithBaseOptions).cardUpdate("fake id", cardUpdatable);
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
        await new CardsApi(configWithBaseOptions).cardUpdate("fake id", cardUpdatable);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
  
    describe("cardUpdate", () => {
    const cardUpdatable = {
      description: "card updated"
    };

    it("exists", async () => {
      const cardrsApi = new CardsApi(config);
      expect(cardrsApi.cardUpdate).toBeDefined();
      expect(typeof cardrsApi.cardUpdate).toEqual("function");
    });

    it("updates card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));

        const cards = await new CardsApi(config).cardUpdate("fake id", cardUpdatable);
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("includes custom headers while it updates a card for a card id", async () => {
        axiosRequest.mockImplementationOnce(async () => ({
            data: { id: "fake card id" }
        }));

        const cards = await new CardsApi(configWithBaseOptions).cardUpdate("fake id", cardUpdatable);
        expect(cards).toBeDefined();
        expect(cards?.id).toEqual("fake card id");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new CardsApi(configWithBaseOptions).cardUpdate("fake id", cardUpdatable);
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
        await new CardsApi(configWithBaseOptions).cardUpdate("fake id", cardUpdatable);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("cardsList", () => {
    it("exists", async () => {
      const cardsApi = new CardsApi(config);
      expect(cardsApi.cardsList).toBeDefined();
      expect(typeof cardsApi.cardsList).toEqual("function");
    });

    it("gets all cards when no limit is provided", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card id" }, { id: "another fake card id" } ] }
      }));

      const cardsApi = await new CardsApi(config).cardsList();
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(2);
    });
    
    it("should handle the limit", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card id" } ] }
      }));

      const cardsApi = await new CardsApi(config).cardsList(1);
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("should handle before pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card id" } ] }
      }));

      const cardsApi = await new CardsApi(config).cardsList(1, "fake");
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("should handle the after pagination", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card id" } ] }
      }));

      const cardsApi = await new CardsApi(config).cardsList(1, "fake", "id");
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("should handle the sortBy correctly", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [ { id: "fake card id" } ] }
      }));

      const cardsApi = await new CardsApi(config).cardsList(1, "fake", "id", { id: "asc" } );
      expect(cardsApi).toBeDefined();
      expect(cardsApi?.data?.length).toEqual(1);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } }}
        };
      });

      try {
        await new CardsApi(configWithBaseOptions). cardsList();
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
        await new CardsApi(configWithBaseOptions).cardsList();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });
});
