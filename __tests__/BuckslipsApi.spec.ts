import {
  CONFIG_FOR_INTEGRATION,
  FILE_LOCATION,
  FILE_LOCATION_4X6,
  FILE_LOCATION_6X18,
} from "./testFixtures";
import { BuckslipsApi } from "../api/buckslips-api";
import {
  Buckslip,
  BuckslipEditable,
  BuckslipEditableSizeEnum,
} from "../models";
import FormData from "form-data";
import fs from "fs";
import { create } from "domain";

describe("BuckSlipsApi", () => {
  it("Buckslips API can be instantiated", () => {
    const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
    expect(buckslipsApi).toBeDefined();
    expect(typeof buckslipsApi).toEqual("object");
    expect(buckslipsApi).toBeInstanceOf(BuckslipsApi);
  });

  it("all individual Buckslips functions exists", () => {
    const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
    expect(buckslipsApi.create).toBeDefined();
    expect(typeof buckslipsApi.create).toEqual("function");

    expect(buckslipsApi.get).toBeDefined();
    expect(typeof buckslipsApi.get).toEqual("function");

    expect(buckslipsApi.update).toBeDefined();
    expect(typeof buckslipsApi.update).toEqual("function");

    expect(buckslipsApi.delete).toBeDefined();
    expect(typeof buckslipsApi.delete).toEqual("function");
  });

  describe("performs single-buckslips operations", () => {
    const createBe = new BuckslipEditable({
      description: "Test Buckslip",
      front: 'lobster.pdf"',
      back: FILE_LOCATION_6X18,
      size: BuckslipEditableSizeEnum._875x375,
    });

    it("creates, updates, and gets a buckslip", async () => {
      const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
      // Create
      let data = new FormData();
      data.append("front", fs.createReadStream("lobster.pdf"));
      data.append("description", "Test Buckslip");

      const createdBe = await buckslipsApi.create(createBe, { data });
      expect(createdBe.id).toBeDefined();
      expect(createdBe.description).toEqual(createBe.description);

      // Get
      const retrievedBe = await buckslipsApi.get(createdBe.id as string);
      expect(retrievedBe).toBeDefined();
      expect(retrievedBe.id).toEqual(createdBe.id);

      // Update
      const updates = new BuckslipEditable({
        description: "updated buckslip",
      });
      const updatedBe = await buckslipsApi.update(
        retrievedBe.id as string,
        updates
      );
      expect(updatedBe).toBeDefined();
      expect(updatedBe.description).toEqual("updated buckslip");
    });
  });

  describe("list buckslips", () => {
    it("exists", () => {
      const buckslipsApi = new BuckslipsApi(CONFIG_FOR_INTEGRATION);
      expect(buckslipsApi.List).toBeDefined();
      expect(typeof buckslipsApi.List).toEqual("function");
    });

    it("lists buckslips", async () => {
      const response = await new BuckslipsApi(CONFIG_FOR_INTEGRATION).List();
      expect(response.data).toBeDefined();
      expect(response.data?.length).toBeGreaterThan(0);
    });
  });
});
