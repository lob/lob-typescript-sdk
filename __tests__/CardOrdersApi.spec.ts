import { Configuration } from "../configuration";

import {
  Card,
  CardEditable,
  CardEditableSizeEnum
} from "../models";
import { CardsApi, CardOrdersApi } from "../api";
import { CardOrderEditable } from "..";

describe("CardOrdersApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  const dummyCardOrder: CardOrderEditable = {
    quantity: 10000,
  };

  const dummyCardOrder2: CardOrderEditable = {
    quantity: 10001,
  };

  const dummyCardOrder3: CardOrderEditable = {
    quantity: 10002,
  };

  const editableCard: CardEditable = {
    description: "Test card",
    front:
      "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
    back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf",
    size: CardEditableSizeEnum._2125x3375,
  };

  it("Card API can be instantiated", () => {
    const cardOrdersApi = new CardOrdersApi(config);
    expect(cardOrdersApi).toBeDefined();
    expect(typeof cardOrdersApi).toEqual("object");
    expect(cardOrdersApi).toBeInstanceOf(CardOrdersApi);
  });

  describe("performs single-Card operations", () => {
    let dummyCard: Card;

    beforeAll(async () => {
      const cardsApi = new CardsApi(config);
      const cardOrdersApi = new CardOrdersApi(config);
      dummyCard = await cardsApi.cardCreate(editableCard);

      if (!dummyCard.id) {
        throw new Error('Unable to create required data');
      }

      await cardOrdersApi.cardOrderCreate(
          dummyCard.id,
          dummyCardOrder
      );
      await cardOrdersApi.cardOrderCreate(
          dummyCard.id,
          dummyCardOrder2
      );
      await cardOrdersApi.cardOrderCreate(
          dummyCard.id,
          dummyCardOrder3
      );
    });

    it("all individual Card functions exists", () => {
      const cardOrdersApi = new CardOrdersApi(config);
      expect(cardOrdersApi.cardOrderCreate).toBeDefined();
      expect(typeof cardOrdersApi.cardOrderCreate).toEqual("function");

      expect(cardOrdersApi.cardOrdersRetrieve).toBeDefined();
      expect(typeof cardOrdersApi.cardOrdersRetrieve).toEqual("function");
    });

    it("creates and retrieves card orders associated with a card", async () => {
      const cardOrdersApi = new CardOrdersApi(config);
      const dummyCardId = dummyCard.id || "nope";

      const retrievedCardOrders = await cardOrdersApi.cardOrdersRetrieve(
        dummyCardId
      );
      expect(retrievedCardOrders).toBeDefined();
    });
  });
});
