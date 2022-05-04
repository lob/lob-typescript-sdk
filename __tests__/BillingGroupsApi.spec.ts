import { BillingGroup, BillingGroupEditable } from "../models";
import { BillingGroupsApi } from "../api";
import { CONFIG_FOR_INTEGRATION } from "./testFixtures";

describe("BillingGroupsApi", () => {
  it("Billing Groups API can be instantiated", () => {
    const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
    expect(billingGroupsApi).toBeDefined();
    expect(typeof billingGroupsApi).toEqual("object");
    expect(billingGroupsApi).toBeInstanceOf(BillingGroupsApi);
  });

  it("all individual BillingGroup functions exists", () => {
    const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
    expect(billingGroupsApi.create).toBeDefined();
    expect(typeof billingGroupsApi.create).toEqual("function");

    expect(billingGroupsApi.get).toBeDefined();
    expect(typeof billingGroupsApi.get).toEqual("function");

    expect(billingGroupsApi.update).toBeDefined();
    expect(typeof billingGroupsApi.update).toEqual("function");
  });

  describe("performs single-BillingGroup operations", () => {
    const createBg = new BillingGroupEditable({
      description: "Test Billing Group Created",
      name: "TestBillingGroup1",
    });

    it("creates, updates, and gets a billing group", async () => {
      const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
      // Create
      const createdBg = await new BillingGroupsApi(
        CONFIG_FOR_INTEGRATION
      ).create(createBg);
      expect(createdBg.id).toBeDefined();
      expect(createdBg.description).toEqual(createBg.description);

      // Get
      const retrievedBg = await billingGroupsApi.get(createdBg.id as string);
      expect(retrievedBg).toBeDefined();
      expect(retrievedBg.id).toEqual(createdBg.id);

      // Update
      const updates = new BillingGroupEditable({
        description: "updated billing group",
        name: "UpdatedBGName",
      });
      const updatedBg = await billingGroupsApi.update(
        retrievedBg.id as string,
        updates
      );
      expect(updatedBg).toBeDefined();
      expect(updatedBg.description).toEqual("updated billing group");
    });
  });

  describe("list billing groups", () => {
    let createdBillingGroups: BillingGroup[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 billing groups present, to test pagination
      const bg1 = new BillingGroupEditable({
        description: "Billing Group 1",
        name: "TestBillingGroup1",
      });
      const bg2 = new BillingGroupEditable(Object.assign({}, bg1, {
        description: "Billing Group 2",
        name: "TestBillingGroup2",
      }));
      const bg3 = new BillingGroupEditable(Object.assign({}, bg1, {
        description: "Billing Group 3",
        name: "TestBillingGroup2",
      }));

      const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
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
      const billingGroupsApi = new BillingGroupsApi(CONFIG_FOR_INTEGRATION);
      expect(billingGroupsApi.list).toBeDefined();
      expect(typeof billingGroupsApi.list).toEqual("function");
    });

    it("lists billing groups", async () => {
      const response = await new BillingGroupsApi(
        CONFIG_FOR_INTEGRATION
      ).list();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });
  });
});
