import { SelfMailer, SelfMailerEditable, CountryExtended } from "../models";
import { SelfMailersApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("smApi", () => {
  jest.setTimeout(60000); // 60 seconds

  const dummySelfMailer: SelfMailerEditable = {
    to: {
      company: "Gothic home (old)",
      address_line1: "001 CEMETARY LN",
      address_line2: "# 000",
      address_city: "WESTFIELD",
      address_state: "NJ",
      address_zip: "07000",
      address_country: CountryExtended.Us,
    },
    from: {
      company: "Gothic home (new)",
      address_line1: "1313 CEMETARY LN",
      address_line2: "# 000",
      address_city: "WESTFIELD",
      address_state: "NJ",
      address_zip: "07000",
      address_country: CountryExtended.Us,
    },
    inside:
      "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
    outside:
      "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
  };

  it("SelfMailer API can be instantiated", () => {
    const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);
    expect(smApi).toBeDefined();
    expect(typeof smApi).toEqual("object");
    expect(smApi).toBeInstanceOf(SelfMailersApi);
  });

  describe("performs single-SelfMailer operations", () => {
    it("all individual SelfMailer functions exists", () => {
      const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);
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
      const selfMailer = await new SelfMailersApi(
        CONFIG_FOR_INTEGRATION
      ).create(dummySelfMailer);
      expect(selfMailer?.id).toBeDefined();
      if (selfMailer?.id) {
        const retrievedSelfMailer = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).get(selfMailer.id);
        expect(retrievedSelfMailer).toBeDefined();
        const deletedSelfMailer = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).delete(selfMailer.id);
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
      const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);
      // ensure there are at least 3 cards present, to test pagination
      const sfm1: SelfMailerEditable = {
        to: {
          name: "FESTER",
          address_line1: "001 CEMETERY LN",
          address_line2: "# 000",
          address_city: "WESTFIELD",
          address_state: "NJ",
          address_zip: "07000",
          address_country: CountryExtended.Us,
        },
        from: {
          name: "MORTICIA ADDAMS",
          address_line1: "1212 CEMETERY LN",
          address_city: "WESTFIELD",
          address_state: "NJ",
          address_zip: "07000",
          address_country: CountryExtended.Us,
        },
        inside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
        outside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
      };
      const sfm2: SelfMailerEditable = {
        to: {
          name: "COUSIN ITT",
          address_line1: "1515 CEMETERY LN",
          address_line2: "# 000",
          address_city: "WESTFIELD",
          address_state: "NJ",
          address_zip: "07000",
          address_country: CountryExtended.Us,
        },
        from: {
          name: "PUGSLEY",
          address_line1: "1313 CEMETERY LN",
          address_city: "WESTFIELD",
          address_state: "NJ",
          address_zip: "07000",
          address_country: CountryExtended.Us,
        },
        inside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf",
        outside:
          "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_outside.pdf",
      };
      const sfm3: SelfMailerEditable = {
        to: {
          name: "WEDNESDAY ADDAMS",
          address_line1: "1313 CEMETERY LN",
          address_line2: "# 000",
          address_city: "WESTFIELD",
          address_state: "NJ",
          address_zip: "07000",
          address_country: CountryExtended.Us,
        },
        from: {
          name: "GORDON CRAVEN",
          address_line1: "1313 CEMETERY LN",
          address_city: "WESTFIELD",
          address_state: "NJ",
          address_zip: "07000",
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
      expect(new SelfMailersApi(CONFIG_FOR_INTEGRATION).list).toBeDefined();
      expect(typeof new SelfMailersApi(CONFIG_FOR_INTEGRATION).list).toEqual(
        "function"
      );
    });

    it("lists self-mailers", async () => {
      const response = await new SelfMailersApi(CONFIG_FOR_INTEGRATION).list();
      expect(response?.data).toBeDefined();
      selfMailerList = response?.data || [];
      expect(selfMailerList.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given an after param", async () => {
      const responseAfter = await new SelfMailersApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, undefined, nextUrl);
      expect(responseAfter?.data).toBeDefined();
      const selfMailerList2: SelfMailer[] = responseAfter?.data || [];
      expect(selfMailerList2.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given a before param", async () => {
      const responseBefore = await new SelfMailersApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, previousUrl);
      expect(responseBefore?.data).toBeDefined();
      const selfMailerList3: SelfMailer[] = responseBefore?.data || [];
      expect(selfMailerList3.length).toBeGreaterThan(0);
    });
  });
});
