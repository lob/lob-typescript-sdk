import {
  LetterEditable,
  LetterEditableExtraServiceEnum,
  CountryExtended,
} from "../models";
import { LettersApi } from "../api";
import {
  ADDRESSES_EDITABLE,
  CONFIG_FOR_INTEGRATION,
  FILE_LOCATION_8X11,
} from "./testFixtures";

describe("CardsApi", () => {
  let lettersApi: LettersApi;

  it("Letter API can be instantiated", () => {
    lettersApi = new LettersApi(CONFIG_FOR_INTEGRATION);
    expect(lettersApi).toBeDefined();
    expect(typeof lettersApi).toEqual("object");
    expect(lettersApi).toBeInstanceOf(LettersApi);
  });

  describe("performs single-Letter operations", () => {
    it("all individual Letter functions exists", () => {
      expect(lettersApi.create).toBeDefined();
      expect(typeof lettersApi.create).toEqual("function");

      expect(lettersApi.get).toBeDefined();
      expect(typeof lettersApi.get).toEqual("function");

      expect(lettersApi.cancel).toBeDefined();
      expect(typeof lettersApi.cancel).toEqual("function");
    });

    it("creates, retrieves, and cancels a CERTIFIED letter", async () => {
      const certifiedLetter = new LetterEditable({
        to: ADDRESSES_EDITABLE[0],
        from: ADDRESSES_EDITABLE[0],
        color: true,
        extra_service: LetterEditableExtraServiceEnum.Certified,
        file: FILE_LOCATION_8X11,
      });

      const letter = await lettersApi.create(certifiedLetter);
      expect(letter.id).toBeDefined();
      expect(letter.extra_service).toEqual("certified");
      if (letter.id) {
        const retrievedLetter = await lettersApi.get(letter.id);
        expect(retrievedLetter).toBeDefined();
        const cancelledLetter = await lettersApi.cancel(letter.id);
        expect(cancelledLetter.deleted).toBeTruthy();
      } else {
        throw new Error("letter ID should be defined upon creation");
      }
    });

    it("creates, retrieves, and cancels a REGISTERED letter", async () => {
      const registeredLetter = new LetterEditable({
        to: ADDRESSES_EDITABLE[0],
        from: ADDRESSES_EDITABLE[0],
        color: true,
        extra_service: LetterEditableExtraServiceEnum.Registered,
        file: FILE_LOCATION_8X11,
      });
      const letter = await lettersApi.create(registeredLetter);
      expect(letter.id).toBeDefined();
      expect(letter.extra_service).toEqual("registered");
      if (letter.id) {
        const retrievedLetter = await lettersApi.get(letter.id);
        expect(retrievedLetter).toBeDefined();
        const cancelledLetter = await lettersApi.cancel(letter.id);
        expect(cancelledLetter.deleted).toBeTruthy();
      } else {
        throw new Error("letter ID should be defined upon creation");
      }
    });

    it("creates, retrieves, and cancels a letter with NO EXTRA SERVICES", async () => {
      const registeredLetter = new LetterEditable({
        to: ADDRESSES_EDITABLE[0],
        from: ADDRESSES_EDITABLE[0],
        color: true,
        file: FILE_LOCATION_8X11,
      });
      const letter = await lettersApi.create(registeredLetter);
      expect(letter.id).toBeDefined();
      expect(letter.extra_service).toBeFalsy();
      if (letter.id) {
        const retrievedLetter = await lettersApi.get(letter.id);
        expect(retrievedLetter).toBeDefined();
        const cancelledLetter = await lettersApi.cancel(letter.id);
        expect(cancelledLetter.deleted).toBeTruthy();
      } else {
        throw new Error("letter ID should be defined upon creation");
      }
    });
  });
});
