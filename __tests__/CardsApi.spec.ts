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
    expect(cardsApi).toEqual(
      expect.objectContaining({
        create: expect.any(Function),
        get: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
      })
    );
  });

  it("all individual Card functions exists", () => {
    const cardsApi = new CardsApi(CONFIG_FOR_INTEGRATION);
    expect(cardsApi).toEqual(
      expect.objectContaining({
        create: expect.any(Function),
        get: expect.any(Function),
        update: expect.any(Function),
        delete: expect.any(Function),
      })
    );
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
      const createdCard = await cardsApi.create(create);
      expect(createdCard).toEqual(
        expect.objectContaining({
          id: expect.any(String),
        })
      );

      // Get
      const retrievedCard = await cardsApi.get(createdCard.id as string);
      expect(retrievedCard).toEqual(
        expect.objectContaining({
          id: createdCard.id,
        })
      );

      // Update
      const updates = new CardUpdatable({
        description: "updated card",
      });
      const updatedCard = await cardsApi.update(
        retrievedCard.id as string,
        updates
      );
      expect(updatedCard).toEqual(
        expect.objectContaining({
          description: "updated card",
        })
      );

      // Delete
      const deletedCard = await cardsApi.delete(updatedCard.id as string);
      expect(deletedCard).toEqual(
        expect.objectContaining({
          deleted: true,
        })
      );
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
      expect(cardsApi).toEqual(
        expect.objectContaining({
          list: expect.any(Function),
        })
      );
    });

    it("lists cards", async () => {
      const response = await new CardsApi(CONFIG_FOR_INTEGRATION).list();
      expect(response).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/^card_[a-zA-Z0-9]+$/),
              description: expect.any(String),
              size: expect.stringMatching(/^(3\.375x2\.125|2\.125x3\.375)$/),
              date_created: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              date_modified: expect.stringMatching(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
              ),
              object: "card",
            }),
          ]),
        })
      );

      if (response.next_url) {
        const url = new URL(response.next_url);
        const after: string = url.searchParams.get("after") || "";

        const responseAfter = await new CardsApi(CONFIG_FOR_INTEGRATION).list(
          3,
          undefined,
          after
        );
        expect(responseAfter).toEqual(
          expect.objectContaining({
            data: expect.arrayContaining([
              expect.objectContaining({
                id: expect.stringMatching(/^card_[a-zA-Z0-9]+$/),
                description: expect.any(String),
                size: expect.stringMatching(/^(3\.375x2\.125|2\.125x3\.375)$/),
                date_created: expect.stringMatching(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                ),
                date_modified: expect.stringMatching(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                ),
                object: "card",
              }),
            ]),
            previous_url: expect.any(String),
          })
        );

        const firstPage: Card[] = responseAfter.data || [];
        expect(firstPage.length).toBeGreaterThan(0);

        if (responseAfter.previous_url) {
          const url = new URL(responseAfter.previous_url);
          const before: string = url.searchParams.get("before") || "";

          const responseBefore = await new CardsApi(
            CONFIG_FOR_INTEGRATION
          ).list(3, before);
          expect(responseBefore).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.stringMatching(/^card_[a-zA-Z0-9]+$/),
                  description: expect.any(String),
                  size: expect.stringMatching(
                    /^(3\.375x2\.125|2\.125x3\.375)$/
                  ),
                  date_created: expect.stringMatching(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                  ),
                  date_modified: expect.stringMatching(
                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
                  ),
                  object: "card",
                }),
              ]),
            })
          );
          const previousPage: Card[] = responseBefore.data || [];
          expect(previousPage.length).toBeGreaterThan(0);
        }
      } else {
        // If no pagination, just verify the API works
        expect(response.data?.length).toBeGreaterThan(0);
      }
    });
  });
});
