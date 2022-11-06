// import {
//   Card,
//   CardEditable,
//   CardEditableSizeEnum,
//   CardOrderEditable,
// } from "../models";
// import { CardsApi, CardOrdersApi } from "../api";
// import { CONFIG_FOR_INTEGRATION, FILE_LOCATION } from "./testFixtures";

describe.skip("CardOrdersApi", () => {
  it("skips test", () => {
    console.log("skips until campaigns are stable");
  });
  // const dummyCardOrder = new CardOrderEditable({
  //   quantity: 10000,
  // });

  // const dummyCardOrder2 = new CardOrderEditable({
  //   quantity: 10001,
  // });

  // const dummyCardOrder3 = new CardOrderEditable({
  //   quantity: 10002,
  // });

  // const editableCard = new CardEditable({
  //   description: "Test card",
  //   front: FILE_LOCATION,
  //   back: FILE_LOCATION,
  //   size: CardEditableSizeEnum._2125x3375,
  // });

  // it("Card API can be instantiated", () => {
  //   const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_INTEGRATION);
  //   expect(cardOrdersApi).toBeDefined();
  //   expect(typeof cardOrdersApi).toEqual("object");
  //   expect(cardOrdersApi).toBeInstanceOf(CardOrdersApi);
  // });

  // describe("performs card order operations", () => {
  //   let dummyCard: Card;

  //   beforeAll(async () => {
  //     const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
  //     const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_INTEGRATION);
  //     dummyCard = await cardsApi.create(editableCard);

  //     if (!dummyCard.id) {
  //       throw new Error("Unable to create required data");
  //     }

  //     await cardOrdersApi.create(dummyCard.id, dummyCardOrder);
  //     await cardOrdersApi.create(dummyCard.id, dummyCardOrder2);
  //     await cardOrdersApi.create(dummyCard.id, dummyCardOrder3);
  //   });

  //   it("all individual Card Orders functions exists", () => {
  //     const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_INTEGRATION);
  //     expect(cardOrdersApi.create).toBeDefined();
  //     expect(typeof cardOrdersApi.create).toEqual("function");

  //     expect(cardOrdersApi.get).toBeDefined();
  //     expect(typeof cardOrdersApi.get).toEqual("function");
  //   });

  //   it("creates and retrieves card orders associated with a card", async () => {
  //     const cardOrdersApi = new CardOrdersApi(CONFIG_FOR_INTEGRATION);
  //     const dummyCardId = dummyCard.id || "nope";

  //     const retrievedCardOrders = await cardOrdersApi.get(dummyCardId);
  //     expect(retrievedCardOrders).toBeDefined();
  //   });
  // });
});
