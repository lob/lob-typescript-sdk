import { Configuration } from "../configuration";

import { ChecksApi } from "../api/checks-api";
import { CheckEditable } from "../models/check-editable";
import { Check } from "../models/check";

describe("ChecksApi", () => {
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_KEY,
  });

  it("Checks API can be instantiated", () => {
    const checksApi = new ChecksApi(config);
    expect(checksApi).toBeDefined();
    expect(typeof checksApi).toEqual("object");
    expect(checksApi).toBeInstanceOf(ChecksApi);
  });

  it("all individual Check functions exists", () => {
    const checksApi = new ChecksApi(config);
    expect(checksApi.Cancel).toBeDefined();
    expect(typeof checksApi.Cancel).toEqual("function");

    expect(checksApi.Create).toBeDefined();
    expect(typeof checksApi.Create).toEqual("function");

    expect(checksApi.List).toBeDefined();
    expect(typeof checksApi.List).toEqual("function");

    expect(checksApi.Retrieve).toBeDefined();
    expect(typeof checksApi.Retrieve).toEqual("function");
  });

  describe("performs single-Check operations", () => {
    const createCheck: CheckEditable = {
      description: "updated check",
      from: "fake from",
      bank_account: "fake account",
      amount: 100,
    };

    it("creates, retrieves, cancels, and lists a check", async () => {
      const checksApi = new ChecksApi(config);
      // Create
      const createdCheck = await new ChecksApi(config).Create(createCheck);
      expect(createdCheck?.id).toBeDefined();
      expect(createdCheck?.description).toEqual(createCheck.description);

      // Retrieve
      const retrievedCheck = await checksApi.Retrieve(createdCheck.id as string);
      expect(retrievedCheck).toBeDefined();
      expect(retrievedCheck?.id).toEqual(createdCheck?.id);

      // Cancel
      const cancelledCheck = await checksApi.Cancel(createdCheck.id as string);
      expect(cancelledCheck).toBeDefined();
      expect(cancelledCheck?.id).toEqual(createdCheck?.id);

      // List
      const updates: CheckEditable = {
        description: "updated check",
        from: "fake from",
        to: "fake to",
        bank_account: "fake account",
        amount: 100,
      };
      const updatedCheck = await checksApi.List(
        1
      );
      expect(updatedCheck).toBeDefined();
    });
  });

  describe("list checks", () => {
    let createdChecks: Check[] = [];

    beforeAll(async () => {
      // ensure there are at least 3 checks present, to test pagination
      const check1: CheckEditable = {
        description: "check 1",
        from: "fake from 1",
        to: "fake to 1",
        bank_account: "fake account 1",
        amount: 100,
      };
      const check2: CheckEditable = Object.assign({}, check1, {
        description: "Check 2",
        from: "fake from 2",
        to: "fake to 2",
        bank_account: "fake account 2",
        amount: 200,
      });
      const check3: CheckEditable = Object.assign({}, check1, {
        description: "Check 3",
        from: "fake from 3",
        to: "fake to 3",
        bank_account: "fake account 3",
        amount: 300,
      });

      const checksApi = new ChecksApi(config);
      await Promise.all([
        checksApi.Create(check1),
        checksApi.Create(check2),
        checksApi.Create(check3),
      ])
        .then((creationResults) => {
          expect(creationResults.length).toEqual(3);
          createdChecks = createdChecks.concat(creationResults);
        })
        .catch((err) => {
          throw err;
        });
    });

    it("exists", () => {
      const checksApi = new ChecksApi(config);
      expect(checksApi.List).toBeDefined();
      expect(typeof checksApi.List).toEqual("function");
    });

    it("lists checks", async () => {
      const response = await new ChecksApi(config).List();
      expect(response?.data).toBeDefined();
      const bgList = response?.data || [];
      expect(bgList.length).toBeGreaterThan(0);
    });
  });
});
