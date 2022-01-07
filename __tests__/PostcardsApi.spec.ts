import { Configuration } from "../configuration";

import {
  Postcard,
  PostcardEditable,
  CountryExtended,
  MailType,
} from "../models";
import { PostcardsApi } from "../api";

describe("postcardsApi", () => {
  jest.setTimeout(60000); // 60 seconds

  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  let postcardsApi: PostcardsApi;

  const dummyPostcard: PostcardEditable = {
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
      address_country: "US",
    },
    front:
      "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
    back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
  };

  it("Postcard API can be instantiated", () => {
    postcardsApi = new PostcardsApi(config);
    expect(postcardsApi).toBeDefined();
    expect(typeof postcardsApi).toEqual("object");
    expect(postcardsApi).toBeInstanceOf(PostcardsApi);
  });

  describe("performs single-Postcard operations", () => {
    it("all individual Postcard functions exists", () => {
      expect(postcardsApi.create).toBeDefined();
      expect(typeof postcardsApi.create).toEqual("function");

      expect(postcardsApi.get).toBeDefined();
      expect(typeof postcardsApi.get).toEqual("function");

      expect(postcardsApi.list).toBeDefined();
      expect(typeof postcardsApi.list).toEqual("function");

      expect(postcardsApi.cancel).toBeDefined();
      expect(typeof postcardsApi.cancel).toEqual("function");
    });

    it("creates, retrieves, and deletes a postcard", async () => {
      const postcard = await postcardsApi.create(dummyPostcard);
      expect(postcard?.id).toBeDefined();
      if (postcard?.id) {
        const retrievedPostcard = await postcardsApi.get(
            postcard.id
        );
        expect(retrievedPostcard).toBeDefined();
        const deletedPostcard = await postcardsApi.cancel(postcard.id);
        expect(deletedPostcard?.deleted).toBeTruthy();
      } else {
        throw new Error("postcard ID should be defined upon creation");
      }
    });
  });

  describe("list postcards", () => {
    let nextUrl = "";
    let previousUrl = "";
    let postcardList: Postcard[] = [];
    beforeAll(async () => {
      // ensure there are at least 3 cards present, to test pagination
      const postcard1: PostcardEditable = {
        to: {
            name: "LAURENS LOBSTER",
            address_line1: "180 Berry St",
            address_line2: "# 6100",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: CountryExtended.Us,
          },
          from: {
            name: "LABHRAS LOBSTER",
            address_line1: "210 King St",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: "US",
          },
          front:
            "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
          back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
      };
      const postcard2: PostcardEditable = {
        to: {
            name: "LAURENT LOBSTER",
            address_line1: "210 King St",
            address_line2: "# 6100",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: CountryExtended.Us,
          },
          from: {
            name: "LAVRENTIOS LOBSTER",
            address_line1: "210 King St",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: "US",
          },
          front:
            "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
          back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
      };
      const postcard3: PostcardEditable = {
        to: {
            name: "LORENZO LOBSTER",
            address_line1: "210 King St",
            address_line2: "# 6100",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: CountryExtended.Us,
          },
          from: {
            name: "VAVRINEC LOBSTER",
            address_line1: "210 King St",
            address_city: "San Francisco",
            address_state: "CA",
            address_zip: "94107",
            address_country: "US",
          },
          front:
            "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
          back: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf",
      };
      const c1 = await postcardsApi.create(postcard1);
      const c2 = await postcardsApi.create(postcard2);
      const c3 = await postcardsApi.create(postcard3);

      const response = await postcardsApi.list();
      if (response && response.next_url) {
        nextUrl = response.next_url.slice(
          response.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await postcardsApi.list(10, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        } else {
            throw new Error("response must be defined and have a valid previous_url");
        }
      } else {
            throw new Error("response must be defined and have a valid next_url");
      }
    });

    it("exists", () => {
      expect(postcardsApi.list).toBeDefined();
      expect(typeof postcardsApi.list).toEqual("function");
    });

    it("lists postcards", async () => {
      const response = await postcardsApi.list();
      expect(response?.data).toBeDefined();
      postcardList = response?.data || [];
      expect(postcardList.length).toBeGreaterThan(0);
    });

    it("lists cards given an after param", async () => {
      const responseAfter = await postcardsApi.list(10, undefined, nextUrl);
      expect(responseAfter?.data).toBeDefined();
      const postcardList2: Postcard[] = responseAfter?.data || [];
      expect(postcardList2.length).toBeGreaterThan(0);
    });

    it("lists cards given a before param", async () => {
      const responseBefore = await postcardsApi.list(10, previousUrl);
      expect(responseBefore?.data).toBeDefined();
      const postcardList3: Postcard[] = responseBefore?.data || [];
      expect(postcardList3.length).toBeGreaterThan(0);
    });
  });

});
