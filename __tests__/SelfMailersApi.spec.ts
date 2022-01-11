import { Configuration } from "../configuration";

import {
  SelfMailer,
  SelfMailerEditable,
  CountryExtended,
  MailType,
} from "../models";
import { SelfMailersApi } from "../api";

describe("smApi", () => {
  jest.setTimeout(60000); // 60 seconds

  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  let smApi: SelfMailersApi;

  const dummySelfMailer: SelfMailerEditable = {
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
    inside:
      "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
    outside:
      "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
  };

  it("SelfMailer API can be instantiated", () => {
    smApi = new SelfMailersApi(config);
    expect(smApi).toBeDefined();
    expect(typeof smApi).toEqual("object");
    expect(smApi).toBeInstanceOf(SelfMailersApi);
  });

  describe("performs single-SelfMailer operations", () => {
    it("all individual SelfMailer functions exists", () => {
      expect(smApi.create).toBeDefined();
      expect(typeof smApi.create).toEqual("function");

      expect(smApi.get).toBeDefined();
      expect(typeof smApi.get).toEqual("function");

      expect(smApi.list).toBeDefined();
      expect(typeof smApi.list).toEqual("function");

      expect(smApi.delete).toBeDefined();
      expect(typeof smApi.delete).toEqual("function");
    });

    it("creates, retrieves, and deletes a selfMailer", async () => {
      const selfMailer = await smApi.create(dummySelfMailer);
      expect(selfMailer?.id).toBeDefined();
      if (selfMailer?.id) {
        const retrievedSelfMailer = await smApi.get(selfMailer.id);
        expect(retrievedSelfMailer).toBeDefined();
        const deletedSelfMailer = await smApi.delete(selfMailer.id);
        expect(deletedSelfMailer?.deleted).toBeTruthy();
      } else {
        throw new Error("self-mailer ID should be defined upon creation");
      }
    });
  });

  describe("list self-mailers", () => {
    let nextUrl = "";
    let previousUrl = "";
    let selfMailerList: SelfMailer[] = [];
    beforeAll(async () => {
      // ensure there are at least 3 cards present, to test pagination
      const sfm1: SelfMailerEditable = {
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
          address_country: CountryExtended.Us,
        },
        inside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
        outside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
      };
      const sfm2: SelfMailerEditable = {
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
          address_country: CountryExtended.Us,
        },
        inside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
        outside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
      };
      const sfm3: SelfMailerEditable = {
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
          address_country: CountryExtended.Us,
        },
        inside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
        outside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
      };
      const c1 = await smApi.create(sfm1);
      const c2 = await smApi.create(sfm2);
      const c3 = await smApi.create(sfm3);

      const response = await smApi.list();
      if (response && response.next_url) {
        nextUrl = response.next_url.slice(
          response.next_url.lastIndexOf("after=") + 6
        );
        const responseAfter = await smApi.list(10, undefined, nextUrl);
        if (responseAfter && responseAfter.previous_url) {
          previousUrl = responseAfter.previous_url.slice(
            responseAfter.previous_url.lastIndexOf("before=") + 7
          );
        } else {
          throw new Error(
            "response must be defined and have a valid previous_url"
          );
        }
      } else {
        throw new Error("response must be defined and have a valid next_url");
      }
    });

    it("exists", () => {
      expect(smApi.list).toBeDefined();
      expect(typeof smApi.list).toEqual("function");
    });

    it("lists self-mailers", async () => {
      const response = await smApi.list();
      expect(response?.data).toBeDefined();
      selfMailerList = response?.data || [];
      expect(selfMailerList.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given an after param", async () => {
      const responseAfter = await smApi.list(10, undefined, nextUrl);
      expect(responseAfter?.data).toBeDefined();
      const selfMailerList2: SelfMailer[] = responseAfter?.data || [];
      expect(selfMailerList2.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given a before param", async () => {
      const responseBefore = await smApi.list(10, previousUrl);
      expect(responseBefore?.data).toBeDefined();
      const selfMailerList3: SelfMailer[] = responseBefore?.data || [];
      expect(selfMailerList3.length).toBeGreaterThan(0);
    });
  });
});
