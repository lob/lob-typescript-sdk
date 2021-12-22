import { Configuration } from "../configuration";

import {
  Card,
  CardEditable,
  CardUpdatable,
  CardsApi,
  CardEditableSizeEnum,
} from "../api";

describe("CardsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  let cardsApi: CardsApi;

  const cardCreate: CardEditable = {
    description: "Test card",
    front:
      "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
    back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
    size: CardEditableSizeEnum._2125x3375,
  };

  it("Card API can be instantiated", () => {
    cardsApi = new CardsApi(config);
    expect(cardsApi).toBeDefined();
    expect(typeof cardsApi).toEqual("object");
    expect(cardsApi).toBeInstanceOf(CardsApi);
  });

  describe("performs single-Card operations", () => {
    it("all individual Card functions exists", () => {
      expect(cardsApi.cardCreate).toBeDefined();
      expect(typeof cardsApi.cardCreate).toEqual("function");

      expect(cardsApi.cardRetrieve).toBeDefined();
      expect(typeof cardsApi.cardRetrieve).toEqual("function");

      expect(cardsApi.cardUpdate).toBeDefined();
      expect(typeof cardsApi.cardUpdate).toEqual("function");

      expect(cardsApi.cardDelete).toBeDefined();
      expect(typeof cardsApi.cardDelete).toEqual("function");
    });

    // TODO: put this into async
    it("creates, updates, retrieves, and deletes a card", async () => {
      const card = await cardsApi.cardCreate(cardCreate);
      expect(card?.id).toBeDefined();
      if (card?.id) {
        const retrievedCard = await cardsApi.cardRetrieve(card.id);
        expect(retrievedCard).toBeDefined();
        const updates: CardUpdatable = {
          description: "updated card",
        };
        const updatedCard = await cardsApi.cardUpdate(card.id, updates);
        expect(updatedCard).toBeDefined();
        expect(updatedCard?.description).toEqual("updated card");
        const deletedCard = await cardsApi.cardDelete(card.id);
        expect(deletedCard?.deleted).toBeTruthy();
      } else {
        throw new Error("card ID should be defined upon creation");
    }
    });
  });

  describe("list Cards", () => {
    let nextUrl = "";
    let previousUrl = "";
    let cardList: Card[] = [];
    beforeAll(async () => {
      // ensure there are at least 3 cards present, to test pagination
      const card1: CardEditable = {
        description: "Card 1",
        front:
          "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        size: CardEditableSizeEnum._2125x3375,
      };
      const card2: CardEditable = {
        description: "Card 2",
        front:
          "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        size: CardEditableSizeEnum._2125x3375,
      };
      const card3: CardEditable = {
        description: "Card 2",
        front:
          "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
        size: CardEditableSizeEnum._2125x3375,
      };
      const c1 = await cardsApi.cardCreate(card1);
      const c2 = await cardsApi.cardCreate(card2);
      const c3 = await cardsApi.cardCreate(card3);

      const response = await cardsApi.cardsList();
      if (response && response.next_url) {
        nextUrl = response?.next_url.slice(
          response?.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await cardsApi.cardsList(10, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        } else {
          throw new Error("list should not be empty, and should contain a valid previous_url field")
        }
      } else {
        throw new Error("list should not be empty, and should contain a valid next_url field")
      }
    });

    it("exists", () => {
      expect(cardsApi.cardsList).toBeDefined();
      expect(typeof cardsApi.cardsList).toEqual("function");
    });

    it("lists cards", async () => {
      const response = await cardsApi.cardsList();
      expect(response?.data).toBeDefined();
      cardList = response?.data || [];
      expect(cardList.length).toBeGreaterThan(0);
    });

    it("lists cards given an after param", async () => {
      const responseAfter = await cardsApi.cardsList(10, undefined, nextUrl);
      expect(responseAfter?.data).toBeDefined();
      const cardList2: Card[] = responseAfter?.data || [];
      expect(cardList2.length).toBeGreaterThan(0);
    });

    it("lists cards given a before param", async () => {
      const responseBefore = await cardsApi.cardsList(10, previousUrl);
      expect(responseBefore?.data).toBeDefined();
      const cardList3: Card[] = responseBefore?.data || [];
      expect(cardList3.length).toBeGreaterThan(0);
    });
  });
});
