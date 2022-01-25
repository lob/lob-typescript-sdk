import { Configuration } from "../configuration";

import {
  BankAccountVerify,
  BankAccountWritable,
  BankTypeEnum,
} from "../models";
import { BankAccountsApi } from "../api/bank-accounts-api";

import { fail } from "./testUtilities";
import {DATE_FILTER} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("BankAccountsApi", () => {
  const config: Configuration = new Configuration({
    username: "Totally Fake Key",
  });
  const configWithBaseOptions = new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  it("BankAccounts API can be instantiated", () => {
    const bankAccountsApi = new BankAccountsApi(config);
    expect(bankAccountsApi).toBeDefined();
    expect(typeof bankAccountsApi).toEqual("object");
    expect(bankAccountsApi).toBeInstanceOf(BankAccountsApi);
  });

  it("BankAccounts API can be instantiated with base options", () => {
    const bankAccountsApi = new BankAccountsApi(configWithBaseOptions);
    expect(bankAccountsApi).toBeDefined();
    expect(typeof bankAccountsApi).toEqual("object");
    expect(bankAccountsApi).toBeInstanceOf(BankAccountsApi);
  });

  describe("create", () => {
    const create: BankAccountWritable = {
      routing_number: "fake routing",
      account_number: "fake account",
      account_type: BankTypeEnum.Individual,
      signatory: "fake signatory",
    };

    it("exists", () => {
      const bankAccountsApi = new BankAccountsApi(config);
      expect(bankAccountsApi.create).toBeDefined();
      expect(typeof bankAccountsApi.create).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BankAccountsApi(config).create(create);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new BankAccountsApi(config).create(create);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("creates a new bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bank_fakeId" },
      }));

      const bankAccount = await new BankAccountsApi(config).create(create);
      expect(bankAccount).toBeDefined();
      expect(bankAccount?.id).toBeDefined();
    });

    it("includes custom headers while it creates a new bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bank_fakeId" },
      }));

      const bankAccount = await new BankAccountsApi(
        configWithBaseOptions
      ).create(create);
      expect(bankAccount).toBeDefined();
      expect(bankAccount?.id).toBeDefined();
    });
  });

  describe("delete", () => {
    it("exists", () => {
      const bankAccountsApi = new BankAccountsApi(config);
      expect(bankAccountsApi.delete).toBeDefined();
      expect(typeof bankAccountsApi.delete).toEqual("function");
    });

    it("deletes a bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "bank_fakeId",
          deleted: true,
        },
      }));
      const bankAccount = await new BankAccountsApi(config).delete("bank_fakeId");
      expect(bankAccount?.deleted).toEqual(true);
    });

    it("includes custom headers while it deletes a bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          id: "bank_fakeId",
          deleted: true,
        },
      }));
      const bankAccount = await new BankAccountsApi(
        configWithBaseOptions
      ).delete("bank_fakeId");
      expect(bankAccount?.deleted).toEqual(true);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BankAccountsApi(config).delete("bank_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new BankAccountsApi(config).delete("bank_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("get", () => {
    it("exists", () => {
      const bankAccountsApi = new BankAccountsApi(config);
      expect(bankAccountsApi.get).toBeDefined();
      expect(typeof bankAccountsApi.get).toEqual("function");
    });

    it("retrieves a bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bank_fakeId2" },
      }));

      const bankAccount = await new BankAccountsApi(config).get("bank_fakeId");
      expect(bankAccount?.id).toEqual("bank_fakeId2");
    });

    it("includes custom headers while it retrieves a bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bank_fakeId2" },
      }));

      const bankAccount = await new BankAccountsApi(configWithBaseOptions).get(
        "bank_fakeId"
      );
      expect(bankAccount?.id).toEqual("bank_fakeId2");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BankAccountsApi(config).get("bank_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new BankAccountsApi(config).get("bank_fakeId");
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("verify", () => {
    it("exists", () => {
      const bankAccountsApi = new BankAccountsApi(config);
      expect(bankAccountsApi.verify).toBeDefined();
      expect(typeof bankAccountsApi.verify).toEqual("function");
    });

    it("verifies a bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bank_fakeId" },
      }));

      const verify: BankAccountVerify = {
        amounts: [1, 2],
      };
      const bankAccount = await new BankAccountsApi(config).verify(
        "an id",
        verify
      );
      expect(bankAccount).toBeDefined();
      expect(bankAccount?.id).toEqual("bank_fakeId");
    });

    it("includes custom headers while verifies a bank account", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "bank_fakeId" },
      }));

      const verify: BankAccountVerify = {
        amounts: [1, 2],
      };
      const bankAccount = await new BankAccountsApi(
        configWithBaseOptions
      ).verify("an id", verify);
      expect(bankAccount).toBeDefined();
      expect(bankAccount?.id).toEqual("bank_fakeId");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        const verify: BankAccountVerify = {
          amounts: [1, 2],
        };
        await new BankAccountsApi(config).verify("an id", verify);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        const verify: BankAccountVerify = {
          amounts: [1, 2],
        };
        await new BankAccountsApi(config).verify("an id", verify);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });
  });

  describe("list", () => {
    it("exists", () => {
      const bankAccountsApi = new BankAccountsApi(config);
      expect(bankAccountsApi.list).toBeDefined();
      expect(typeof bankAccountsApi.list).toEqual("function");
    });

    it("lists bankAccount", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new BankAccountsApi(config).list();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("includes custom headers while it lists bankAccounts", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
      }));

      const response = await new BankAccountsApi(configWithBaseOptions).list();
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new BankAccountsApi(config).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new BankAccountsApi(config).list();
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("lists bankAccounts with a limit parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(10);
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists bankAccounts with a before parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("before=before");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(
        undefined,
        "before"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists bankAccounts with an after parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(
        undefined,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists bankAccounts with an include parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("include=%5B%22this%22%5D");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(
        undefined,
        undefined,
        undefined,
        ["this"]
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists bankAccounts with a dateCreated parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "date_created=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
          DATE_FILTER
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists bankAccounts with a metadata parameter", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual(
          "metadata=%7B%22what%22%3A%22this%22%7D"
        );
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { what: "this" }
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });

    it("lists bankAccounts with multiple parameters", async () => {
      axiosRequest.mockImplementationOnce(async (request) => {
        expect(request.url.split("?")[1]).toEqual("limit=10&after=after");
        return {
          data: { data: [{ id: "fake 1" }, { id: "fake 2" }] },
        };
      });

      const response = await new BankAccountsApi(config).list(
        10,
        undefined,
        "after"
      );
      expect(response).toBeDefined();
      expect(response?.data).toBeDefined();
      expect(response?.data?.length).toEqual(2);
    });
  });
});
