import { SelfMailerEditable, SfmUseType } from "../models";
import { SelfMailersApi } from "../api";
import {
  ADDRESSES_EDITABLE,
  CONFIG_FOR_INTEGRATION,
  FILE_LOCATION_6X18,
} from "./testFixtures";

describe("smApi", () => {
  jest.setTimeout(90000); // 90 seconds

  const dummySelfMailer = new SelfMailerEditable({
    to: ADDRESSES_EDITABLE[0],
    from: ADDRESSES_EDITABLE[1],
    inside: FILE_LOCATION_6X18,
    outside: FILE_LOCATION_6X18,
    use_type: SfmUseType.Operational,
  });

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
      expect(selfMailer.id).toBeDefined();
      if (selfMailer.id) {
        const retrievedSelfMailer = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).get(selfMailer.id);
        expect(retrievedSelfMailer).toBeDefined();
        const deletedSelfMailer = await new SelfMailersApi(
          CONFIG_FOR_INTEGRATION
        ).delete(selfMailer.id);
        expect(deletedSelfMailer.deleted).toBeTruthy();
      } else {
        throw new Error("self-mailer ID should be defined upon creation");
      }
    });
  });

  describe("list self-mailers", () => {
    let nextUrl = "";
    let previousUrl = "";
    beforeAll(async () => {
      const smApi = new SelfMailersApi(CONFIG_FOR_INTEGRATION);
      // ensure there are at least 3 cards present, to test pagination
      const sfm1 = new SelfMailerEditable({
        to: ADDRESSES_EDITABLE[1],
        from: ADDRESSES_EDITABLE[2],
        inside: FILE_LOCATION_6X18,
        outside: FILE_LOCATION_6X18,
        use_type: SfmUseType.Operational,
      });
      const sfm2 = new SelfMailerEditable({
        to: ADDRESSES_EDITABLE[3],
        from: ADDRESSES_EDITABLE[6],
        inside: FILE_LOCATION_6X18,
        outside: FILE_LOCATION_6X18,
        use_type: SfmUseType.Operational,
      });
      const sfm3 = new SelfMailerEditable({
        to: ADDRESSES_EDITABLE[4],
        from: ADDRESSES_EDITABLE[5],
        inside: FILE_LOCATION_6X18,
        outside: FILE_LOCATION_6X18,
        use_type: SfmUseType.Operational,
      });
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
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given an after param", async () => {
      const responseAfter = await new SelfMailersApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, undefined, nextUrl);
      expect(responseAfter.data).toBeDefined();
      expect(responseAfter.data?.length).toBeGreaterThan(0);
    });

    it("lists self-mailers given a before param", async () => {
      const responseBefore = await new SelfMailersApi(
        CONFIG_FOR_INTEGRATION
      ).list(10, previousUrl);
      expect(responseBefore.data).toBeDefined();
      expect(responseBefore.data?.length).toBeGreaterThan(0);
    });
  });
});
