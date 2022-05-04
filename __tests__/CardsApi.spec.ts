import {
  Card,
  CardEditable,
  CardUpdatable,
  CardEditableSizeEnum,
} from "../models";
import { CardsApi } from "../api";
import { CONFIG_FOR_INTEGRATION, FILE_LOCATION } from "./testFixtures";

describe("CardsApi", () => {
  it("Card API can be instantiated", () => {
    const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
    expect(cardsApi).toBeDefined();
    expect(typeof cardsApi).toEqual("object");
    expect(cardsApi).toBeInstanceOf(CardsApi);
  });

  it("all individual Card functions exists", () => {
    const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
    expect(cardsApi.create).toBeDefined();
    expect(typeof cardsApi.create).toEqual("function");

    expect(cardsApi.get).toBeDefined();
    expect(typeof cardsApi.get).toEqual("function");

    expect(cardsApi.update).toBeDefined();
    expect(typeof cardsApi.update).toEqual("function");

    expect(cardsApi.delete).toBeDefined();
    expect(typeof cardsApi.delete).toEqual("function");
  });

  describe("performs single-Card operations", () => {
    const create = new CardEditable({
      description: "Test card",
      front: FILE_LOCATION,
      back: FILE_LOCATION,
      size: CardEditableSizeEnum._2125x3375,
    });

    it("creates, updates, retrieves, and deletes a card", async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
      // Create
      const createdCard = await new CardsApi(CONFIG_FOR_INTEGRATION).create(
        create
      );
      expect(createdCard.id).toBeDefined();
      expect(createdCard.description).toEqual(create.description);

      // Get
      const retrievedCard = await cardsApi.get(createdCard.id as string);
      expect(retrievedCard).toBeDefined();
      expect(retrievedCard.id).toEqual(createdCard.id);

      // Update
      const updates = new CardUpdatable({
        description: "updated card",
      });
      const updatedCard = await cardsApi.update(
        retrievedCard.id as string,
        updates
      );
      expect(updatedCard).toBeDefined();
      expect(updatedCard.description).toEqual("updated card");

      // Delete
      const deletedCard = await cardsApi.delete(updatedCard.id as string);
      expect(deletedCard.deleted).toBeTruthy();
    });
  });

  describe("list Cards", () => {
    let createdCards: Card[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 cards present, to test pagination
      const card1 = new CardEditable({
        description: "Card 1",
        front: FILE_LOCATION,
        back: FILE_LOCATION,
        size: CardEditableSizeEnum._2125x3375,
      });
      const card2: CardEditable = Object.assign({}, card1, {
        description: "Card 2",
      });
      const card3: CardEditable = Object.assign({}, card1, {
        description: "Card 3",
      });

      const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
      await Promise.all([
        cardsApi.create(card1),
        cardsApi.create(card2),
        cardsApi.create(card3),
      ])
        .then((creationResults) => {
          if (creationResults.length !== 3) {
            fail();
          }
          createdCards = createdCards.concat(creationResults);
        })
        .catch((err) => {
          fail(err);
        });
    });

    afterAll(async () => {
      const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
      const deleteOperations: Promise<unknown>[] = [];
      for (const card of createdCards) {
        deleteOperations.push(cardsApi.delete(card.id as string));
      }
      await Promise.all(deleteOperations);
    });

    it("exists", () => {
      const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
      expect(cardsApi.list).toBeDefined();
      expect(typeof cardsApi.list).toEqual("function");
    });

    it("lists cards", async () => {
      const response = await new CardsApi(CONFIG_FOR_INTEGRATION).list();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });

    it("lists cards given before or after params", async () => {
      const response = await new CardsApi(CONFIG_FOR_INTEGRATION).list();
      expect(response.next_url).toBeDefined();
      const after: string = (response as { next_url: string }).next_url
        .slice(
          (response as { next_url: string }).next_url.lastIndexOf("after=")
        )
        .split("=")[1];

      const responseAfter = await new CardsApi(CONFIG_FOR_INTEGRATION).list(
        10,
        undefined,
        after
      );
      expect(responseAfter.data).toBeDefined();
      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();

      const firstPage: Card[] = responseAfter.data || [];
      expect(firstPage.length).toBeGreaterThan(0);

      expect(responseAfter.previous_url).toBeDefined();
      expect(responseAfter.previous_url).not.toBeNull();
      const before: string = (
        responseAfter as { previous_url: string }
      ).previous_url
        .slice(
          (responseAfter as { previous_url: string }).previous_url.lastIndexOf(
            "before="
          )
        )
        .split("=")[1];

      const responseBefore = await new CardsApi(CONFIG_FOR_INTEGRATION).list(
        10,
        before
      );
      expect(responseBefore.data).toBeDefined();
      const previousPage: Card[] = responseBefore.data || [];
      expect(previousPage.length).toBeGreaterThan(0);
    });
  });
});
