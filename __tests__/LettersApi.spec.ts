import { Configuration } from "../configuration";

import {
  Letter,
  LetterEditable,
  LetterEditableExtraServiceEnum,
  CountryExtended,
  LetterEditableAddressPlacementEnum,
  MailType,
} from "../models";
import { LettersApi } from "../api";

describe("CardsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  let lettersApi: LettersApi;

  const certifiedLetter: LetterEditable = {
    to: {
      company: "Lob (old)",
      address_line1: "210 King St",
      address_line2: "# 6100",
      address_city: "San Francisco",
      address_state: "CA",
      address_zip: "94107",
      address_country: CountryExtended.Us,
    },
    from: {
      company: "Lob (new)",
      address_line1: "210 King St",
      address_city: "San Francisco",
      address_state: "CA",
      address_zip: "94107",
      address_country: CountryExtended.Us,
    },
    color: true,
    extra_service: LetterEditableExtraServiceEnum.Certified,
    file: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/us_letter_1pg.pdf",
  };

  it("Letter API can be instantiated", () => {
    lettersApi = new LettersApi(config);
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
      const letter = await lettersApi.create(certifiedLetter);
      expect(letter?.id).toBeDefined();
      expect(letter?.extra_service).toEqual("certified");
      if (letter?.id) {
        const retrievedLetter = await lettersApi.get(letter.id);
        expect(retrievedLetter).toBeDefined();
        const cancelledLetter = await lettersApi.cancel(letter.id);
        expect(cancelledLetter?.deleted).toBeTruthy();
      } else {
        throw new Error("letter ID should be defined upon creation");
      }
    });

    it("creates, retrieves, and cancels a REGISTERED letter", async () => {
      const registeredLetter: LetterEditable = {
        to: {
          company: "Lob (old)",
          address_line1: "210 King St",
          address_line2: "# 6100",
          address_city: "San Francisco",
          address_state: "CA",
          address_zip: "94107",
          address_country: CountryExtended.Us,
        },
        from: {
          company: "Lob (new)",
          address_line1: "210 King St",
          address_city: "San Francisco",
          address_state: "CA",
          address_zip: "94107",
          address_country: CountryExtended.Us,
        },
        color: true,
        extra_service: LetterEditableExtraServiceEnum.Registered,
        file: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/us_letter_1pg.pdf",
      };
      const letter = await lettersApi.create(registeredLetter);
      expect(letter?.id).toBeDefined();
      expect(letter?.extra_service).toEqual("registered");
      if (letter?.id) {
        const retrievedLetter = await lettersApi.get(letter.id);
        expect(retrievedLetter).toBeDefined();
        const cancelledLetter = await lettersApi.cancel(letter.id);
        expect(cancelledLetter?.deleted).toBeTruthy();
      } else {
        throw new Error("letter ID should be defined upon creation");
      }
    });

    it("creates, retrieves, and cancels a letter with NO EXTRA SERVICES", async () => {
      const registeredLetter: LetterEditable = {
        to: {
          company: "Lob (old)",
          address_line1: "210 King St",
          address_line2: "# 6100",
          address_city: "San Francisco",
          address_state: "CA",
          address_zip: "94107",
          address_country: CountryExtended.Us,
        },
        from: {
          company: "Lob (new)",
          address_line1: "210 King St",
          address_city: "San Francisco",
          address_state: "CA",
          address_zip: "94107",
          address_country: CountryExtended.Us,
        },
        color: true,
        file: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/us_letter_1pg.pdf",
      };
      const letter = await lettersApi.create(registeredLetter);
      expect(letter?.id).toBeDefined();
      expect(letter?.extra_service).toBeFalsy();
      if (letter?.id) {
        const retrievedLetter = await lettersApi.get(letter.id);
        expect(retrievedLetter).toBeDefined();
        const cancelledLetter = await lettersApi.cancel(letter.id);
        expect(cancelledLetter?.deleted).toBeTruthy();
      } else {
        throw new Error("letter ID should be defined upon creation");
      }
    });
  });
});
