import { Configuration } from "../configuration";

import { BillingGroup, BillingGroupEditable } from "../models";
import { BillingGroupsApi } from "../api";

describe("BillingGroupsApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  it("Billing Groups API can be instantiated", () => {
    const billingGroupsApi = new BillingGroupsApi(config);
    expect(billingGroupsApi).toBeDefined();
    expect(typeof billingGroupsApi).toEqual("object");
    expect(billingGroupsApi).toBeInstanceOf(BillingGroupsApi);
  });

  it("all individual BillingGroup functions exists", () => {
    const billingGroupsApi = new BillingGroupsApi(config);
    expect(billingGroupsApi.create).toBeDefined();
    expect(typeof billingGroupsApi.create).toEqual("function");

    expect(billingGroupsApi.get).toBeDefined();
    expect(typeof billingGroupsApi.get).toEqual("function");

    expect(billingGroupsApi.update).toBeDefined();
    expect(typeof billingGroupsApi.update).toEqual("function");
  });

  describe("performs single-BillingGroup operations", () => {
    const createBg: BillingGroupEditable = {
      description: "Test Billing Group Created",
      name: "TestBillingGroup1",
    };

    it("creates, updates, and gets a billing group", async () => {
      const billingGroupsApi = new BillingGroupsApi(config);
      // Create
      const createdBg = await new BillingGroupsApi(config).create(createBg);
      expect(createdBg?.id).toBeDefined();
      expect(createdBg?.description).toEqual(createBg.description);

      // Get
      const retrievedBg = await billingGroupsApi.get(createdBg.id as string);
      expect(retrievedBg).toBeDefined();
      expect(retrievedBg?.id).toEqual(createdBg?.id);

      // Update
      const updates: BillingGroupEditable = {
        description: "updated billing group",
        name: "UpdatedBGName",
      };
      const updatedBg = await billingGroupsApi.update(
        retrievedBg.id as string,
        updates
      );
      expect(updatedBg).toBeDefined();
      expect(updatedBg?.description).toEqual("updated billing group");
    });
  });

  describe("list billing groups", () => {
    let createdBillingGroups: BillingGroup[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 billing groups present, to test pagination
      const bg1: BillingGroupEditable = {
        description: "Billing Group 1",
        name: "TestBillingGroup1",
      };
      const bg2: BillingGroupEditable = Object.assign({}, bg1, {
        description: "Billing Group 2",
        name: "TestBillingGroup2",
      });
      const bg3: BillingGroupEditable = Object.assign({}, bg1, {
        description: "Billing Group 3",
        name: "TestBillingGroup2",
      });

      const billingGroupsApi = new BillingGroupsApi(config);
      await Promise.all([
        billingGroupsApi.create(bg1),
        billingGroupsApi.create(bg2),
        billingGroupsApi.create(bg3),
      ])
        .then((creationResults) => {
          expect(creationResults.length).toEqual(3);
          createdBillingGroups = createdBillingGroups.concat(creationResults);
        })
        .catch((err) => {
          throw err;
        });
    });

    it("exists", () => {
      const billingGroupsApi = new BillingGroupsApi(config);
      expect(billingGroupsApi.list).toBeDefined();
      expect(typeof billingGroupsApi.list).toEqual("function");
    });

    it("lists billing groups", async () => {
      const response = await new BillingGroupsApi(config).list();
      expect(response?.data).toBeDefined();
      const bgList = response?.data || [];
      expect(bgList.length).toBeGreaterThan(0);
    });
  });
});
