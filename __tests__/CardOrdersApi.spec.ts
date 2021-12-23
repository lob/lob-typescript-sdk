import { Configuration } from "../configuration";

import {
  Card,
  CardEditable,
  CardEditableSizeEnum,
  CardOrder
} from "../models";
import { CardsApi, CardOrdersApi } from "../api";
import { CardOrderEditable } from "..";

describe("CardOrdersApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  let cardOrdersApi: CardOrdersApi;

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
    cardOrdersApi = new CardOrdersApi(config);
    expect(cardOrdersApi).toBeDefined();
    expect(typeof cardOrdersApi).toEqual("object");
    expect(cardOrdersApi).toBeInstanceOf(CardOrdersApi);
  });

  describe("performs single-Card operations", () => {
    it("all individual Card functions exists", () => {
      expect(cardOrdersApi.cardOrderCreate).toBeDefined();
      expect(typeof cardOrdersApi.cardOrderCreate).toEqual("function");

      expect(cardOrdersApi.cardOrdersRetrieve).toBeDefined();
      expect(typeof cardOrdersApi.cardOrdersRetrieve).toEqual("function");
    });

    // TODO: put this into async
    it("creates and retrieves card orders associated with a card", async () => {
      const config: Configuration = new Configuration({
        username: process.env.LOB_API_KEY,
      });
      let cardsApi = new CardsApi(config);
      const dummyCard = await cardsApi.cardCreate(editableCard);
      if (dummyCard?.id) {
        const co1 = await cardOrdersApi.cardOrderCreate(
          dummyCard.id,
          dummyCardOrder
        );
        console.log("RESULT OF FIRST DUMMY CARD ORDER: ", co1);
        const co2 = await cardOrdersApi.cardOrderCreate(
          dummyCard.id,
          dummyCardOrder2
        );
        console.log("RESULT OF SECOND DUMMY CARD ORDER: ", co2);
        const co3 = await cardOrdersApi.cardOrderCreate(
          dummyCard.id,
          dummyCardOrder3
        );
        console.log("RESULT OF THIRD DUMMY CARD ORDER: ", co3);
        const retrievedCardOrders = await cardOrdersApi.cardOrdersRetrieve(
          dummyCard.id
        );
        expect(retrievedCardOrders).toBeDefined();
        console.log("RETRIEVED CARD ORDERS: ", retrievedCardOrders);
      } else {
        throw new Error("card ID should be defined upon creation");
      }
    });
  });
});
