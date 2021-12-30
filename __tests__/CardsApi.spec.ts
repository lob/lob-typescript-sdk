import { Configuration } from "../configuration";

import {
  Card,
  CardEditable,
  CardUpdatable,
  CardEditableSizeEnum,
} from "../models";
import { CardsApi } from "../api";

describe("CardsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  it("Card API can be instantiated", () => {
    const cardsApi = new CardsApi(config);
    expect(cardsApi).toBeDefined();
    expect(typeof cardsApi).toEqual("object");
    expect(cardsApi).toBeInstanceOf(CardsApi);
  });

  it("all individual Card functions exists", () => {
    const cardsApi = new CardsApi(config);
    expect(cardsApi.cardCreate).toBeDefined();
    expect(typeof cardsApi.cardCreate).toEqual("function");

    expect(cardsApi.cardRetrieve).toBeDefined();
    expect(typeof cardsApi.cardRetrieve).toEqual("function");

    expect(cardsApi.cardUpdate).toBeDefined();
    expect(typeof cardsApi.cardUpdate).toEqual("function");

    expect(cardsApi.cardDelete).toBeDefined();
    expect(typeof cardsApi.cardDelete).toEqual("function");
  });

  describe("performs single-Card operations", () => {
    const cardCreate: CardEditable = {
      description: "Test card",
      front:
          "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
      back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
      size: CardEditableSizeEnum._2125x3375,
    };

    it("creates, updates, retrieves, and deletes a card", async () => {
      const cardsApi = new CardsApi(config);
      // Create
      const createdCard = await new CardsApi(config).cardCreate(cardCreate);
      expect(createdCard?.id).toBeDefined();
      expect(createdCard?.description).toEqual(cardCreate.description);

      // Get
      const retrievedCard = await cardsApi.cardRetrieve(createdCard.id as string);
      expect(retrievedCard).toBeDefined();
      expect(retrievedCard?.id).toEqual(createdCard?.id);

      // Update
      const updates: CardUpdatable = {
        description: "updated card",
      };
      const updatedCard = await cardsApi.cardUpdate(retrievedCard.id as string, updates);
      expect(updatedCard).toBeDefined();
      expect(updatedCard?.description).toEqual("updated card");

      // Delete
      const deletedCard = await cardsApi.cardDelete(updatedCard.id as string);
      expect(deletedCard?.deleted).toBeTruthy();
    });
  });

  describe("list Cards", () => {
    let createdCards: Card[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 cards present, to test pagination
      const card1: CardEditable = {
        description: "Card 1",
        front:
          "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        size: CardEditableSizeEnum._2125x3375,
      };
      const card2: CardEditable = Object.assign({}, card1, { description: "Card 2" });
      const card3: CardEditable = Object.assign({}, card1, { description: "Card 3" });

      const cardsApi = new CardsApi(config);
      await Promise.all([
          cardsApi.cardCreate(card1),
          cardsApi.cardCreate(card2),
          cardsApi.cardCreate(card3)
        ]
      ).then((creationResults) => {
        if (creationResults.length !== 3) {
          fail();
        }
        createdCards = createdCards.concat(creationResults);
      }).catch((err) => {
        fail(err);
      });
    });

    afterAll(async () => {
      const cardsApi = new CardsApi(config);
      const cardDeleteOperations: Promise<unknown>[] = [];
      for (const card of createdCards) {
        cardDeleteOperations.push(cardsApi.cardDelete(card.id as string))
      }
      await Promise.all(cardDeleteOperations);
    });

    it("exists", () => {
      const cardsApi = new CardsApi(config);
      expect(cardsApi.cardsList).toBeDefined();
      expect(typeof cardsApi.cardsList).toEqual("function");
    });

    it("lists cards", async () => {
      const response = await new CardsApi(config).cardsList();
      expect(response?.data).toBeDefined();
      const cardList = response?.data || [];
      expect(cardList.length).toBeGreaterThan(0);
    });

    it("lists cards given before or after params", async () => {
      // ToDo:
      // list responses should map the before and after tokens for the consumer
      const response = await new CardsApi(config).cardsList();
      expect(response.next_url).toBeDefined();
      const after: string = (response as { next_url: string }).next_url.slice(
          (response as { next_url: string }).next_url.lastIndexOf("after=")
      ).split("=")[1];

      const responseAfter = await new CardsApi(config).cardsList(10, undefined, after);
      expect(responseAfter?.data).toBeDefined();
      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();

      const firstPage: Card[] = responseAfter?.data || [];
      expect(firstPage.length).toBeGreaterThan(0);

      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();
      const before: string = (responseAfter as { previous_url: string }).previous_url.slice(
          (responseAfter as { previous_url: string }).previous_url.lastIndexOf("before=")
      ).split("=")[1];

      const responseBefore = await new CardsApi(config).cardsList(10, before);
      expect(responseBefore?.data).toBeDefined();
      const previousPage: Card[] = responseBefore?.data || [];
      expect(previousPage.length).toBeGreaterThan(0);
    });
  });
});
