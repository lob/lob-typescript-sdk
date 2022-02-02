
import { BaseAPI, RequiredError } from "../base";

import { fail } from "./testUtilities";

import axios from "axios";
import {Configuration} from "../configuration";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn().mockImplementation(async (args) => ({ data: "blah" })),
}));

describe("baseApi", () => {
  it("exists", () => {
    expect(BaseAPI).toBeDefined();
    expect(typeof BaseAPI).toEqual("function");
  });

  it("can be instantiated", () => {
    const api = new BaseAPI();
    expect(api).toBeDefined();
  });

  it("can be instantiated with a config", () => {
    const config = new Configuration();
    const api = new BaseAPI(config);
    expect(api).toBeDefined();
  });

  it("can be instantiated with a config that defines a base path", () => {
    const config = new Configuration();
    config.basePath = "fakePath";
    const api = new BaseAPI(config);
    expect(api).toBeDefined();
  });
});

describe("RequiredError", () => {
  it("exists", () => {
    expect(RequiredError).toBeDefined();
    expect(typeof RequiredError).toEqual("function");
  });

  it("can be instantiated", () => {
    const reqError = new RequiredError("fake field");
    expect(reqError).toBeDefined();
  });

  it("can be instantiated with a message", () => {
    const reqError = new RequiredError("fake field", "fake message");
    expect(reqError).toBeDefined();
  });
});