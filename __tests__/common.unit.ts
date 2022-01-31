import { Configuration } from "../configuration";
import { RequestArgs } from "../base";

import {
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
  valueToString,
} from "../common";

import { fail } from "./testUtilities";

import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn().mockImplementation(async (args) => ({ data: "blah" })),
}));

describe("assertParamExists", () => {
  it("exists", () => {
    expect(assertParamExists).toBeDefined();
    expect(typeof assertParamExists).toEqual("function");
  });

  it("does not throw when provided", () => {
    assertParamExists("name for log", "param", "value");
  });

  it("throws with null value", () => {
    try {
      assertParamExists("name for log", "param", null as unknown as string);
      fail("should have thrown");
    } catch (err: any) {
      expect(err.message).toContain(
        "Required parameter param was null or undefined when calling"
      );
      expect(err.message).toContain("name for log");
    }
  });

  it("throws with an undefined value", () => {
    try {
      assertParamExists(
        "name for log",
        "param",
        undefined as unknown as string
      );
      fail("should have thrown");
    } catch (err: any) {
      expect(err.message).toContain(
        "Required parameter param was null or undefined when calling"
      );
      expect(err.message).toContain("name for log");
    }
  });
});

describe("setApiKeyToObject", () => {
  it("exists", () => {
    expect(setApiKeyToObject).toBeDefined();
    expect(typeof setApiKeyToObject).toEqual("function");
  });

  it("does nothing when there is no config", async () => {
    const obj = {};
    await setApiKeyToObject(obj, "newKey", {} as Configuration);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("does nothing when api key is not a function", async () => {
    const obj = {} as { newKey: string };
    const conf = { apiKey: "huh?" } as Configuration;
    await setApiKeyToObject(obj, "newKey", conf as Configuration);
    expect(Object.keys(obj).length).toEqual(1);
    expect(obj.newKey).toEqual("huh?");
  });

  it("runs the apiKey fn and assigns the value", async () => {
    const obj = {} as { newKey: string };
    const conf = {
      apiKey: jest.fn().mockImplementation(async () => "valueFromFn"),
    } as unknown as Configuration;
    await setApiKeyToObject(obj, "newKey", conf as Configuration);
    expect(Object.keys(obj).length).toEqual(1);
    expect(obj.newKey).toEqual("valueFromFn");
    expect(conf.apiKey).toHaveBeenCalledTimes(1);
  });
});

describe("setBasicAuthToObject", () => {
  it("exists", () => {
    expect(setBasicAuthToObject).toBeDefined();
    expect(typeof setBasicAuthToObject).toEqual("function");
  });

  it("does nothing when Config is omitted", () => {
    const obj = {};
    setBasicAuthToObject(obj);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("does nothing when Config is empty", () => {
    const obj = {};
    setBasicAuthToObject(obj, {} as Configuration);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("applies user name", () => {
    const obj = {} as { auth: { username: string; password: string } };
    setBasicAuthToObject(obj, { username: "user name" } as Configuration);
    expect(obj.auth.username).toEqual("user name");
    expect(obj.auth.password).toBeUndefined();
  });

  it("applies password", () => {
    const obj = {} as { auth: { username: string; password: string } };
    setBasicAuthToObject(obj, { password: "bad password" } as Configuration);
    expect(obj.auth.username).toBeUndefined();
    expect(obj.auth.password).toEqual("bad password");
  });

  it("applies a user name and password", () => {
    const obj = {} as { auth: { username: string; password: string } };
    setBasicAuthToObject(obj, {
      username: "user name",
      password: "bad password",
    } as Configuration);
    expect(obj.auth.username).toEqual("user name");
    expect(obj.auth.password).toEqual("bad password");
  });
});

describe("setBearerAuthToObject", () => {
  it("exists", () => {
    expect(setBearerAuthToObject).toBeDefined();
    expect(typeof setBearerAuthToObject).toEqual("function");
  });

  it("does nothing when Config is omitted", async () => {
    const obj = {};
    await setBearerAuthToObject(obj);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("does nothing when Config is empty", async () => {
    const obj = {};
    await setBearerAuthToObject(obj, {} as Configuration);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("sets the access token when provided as a getter function", async () => {
    const obj = {} as { Authorization: string };
    const conf = {
      accessToken: jest.fn().mockImplementation(async () => "fake token"),
    } as unknown as Configuration;
    await setBearerAuthToObject(obj, conf);

    expect(conf.accessToken).toHaveBeenCalledTimes(1);
    expect(obj.Authorization).toBeDefined();
    expect(obj.Authorization).toContain("Bearer");
    expect(obj.Authorization).toContain("fake token");
  });

  it("sets the access token when provided as a value", async () => {
    const obj = {} as { Authorization: string };
    await setBearerAuthToObject(obj, {
      accessToken: "fake token",
    } as Configuration);

    expect(obj.Authorization).toBeDefined();
    expect(obj.Authorization).toContain("Bearer");
    expect(obj.Authorization).toContain("fake token");
  });
});

describe("setOAuthToObject", () => {
  it("exists", () => {
    expect(setOAuthToObject).toBeDefined();
    expect(typeof setOAuthToObject).toEqual("function");
  });

  it("does nothing when Config is omitted", async () => {
    const obj = {};
    await setOAuthToObject(obj, "name", []);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("does nothing when Config is empty", async () => {
    const obj = {};
    await setOAuthToObject(obj, "name", [], {} as Configuration);
    expect(Object.keys(obj).length).toEqual(0);
  });

  it("sets the access token when provided as a getter function", async () => {
    const obj = {} as { Authorization: string };
    const conf = {
      accessToken: jest
        .fn()
        .mockImplementation(async (name: string, scopes: string[]) => {
          expect(name).toEqual("fake name");
          expect(scopes.length).toEqual(1);
          expect(scopes[0]).toEqual("fake scope");
          return "fake token";
        }),
    } as unknown as Configuration;
    await setOAuthToObject(obj, "fake name", ["fake scope"], conf);

    expect(conf.accessToken).toHaveBeenCalledTimes(1);
    expect(obj.Authorization).toBeDefined();
    expect(obj.Authorization).toContain("Bearer");
    expect(obj.Authorization).toContain("fake token");
  });

  it("sets the access token when provided as a value", async () => {
    const obj = {} as { Authorization: string };
    await setOAuthToObject(obj, "fake name", ["fake scope"], {
      accessToken: "fake token",
    } as Configuration);

    expect(obj.Authorization).toBeDefined();
    expect(obj.Authorization).toContain("Bearer");
    expect(obj.Authorization).toContain("fake token");
  });
});

describe("setSearchParams", () => {
  it("exists", () => {
    expect(setSearchParams).toBeDefined();
    expect(typeof setSearchParams).toEqual("function");
  });

  it("sets a blank search when no inputs are provided", () => {
    const url = {} as URL;
    setSearchParams(url);
    expect(url.search).toEqual("");
  });

  it("sets a search query from an object", () => {
    const url = {} as URL;
    setSearchParams(url, { key: "value" });
    expect(url.search).toEqual("key=value");
  });

  it("sets a search query from an object with multiple properties", () => {
    const url = {} as URL;
    setSearchParams(url, { key1: "value1", key2: "value2" });
    expect(url.search).toEqual("key1=value1&key2=value2");
  });

  it("sets a search query from multiple objects with properties", () => {
    const url = {} as URL;
    setSearchParams(
      url,
      { key1: "value1", key2: "value2" },
      { key3: "value3" }
    );
    expect(url.search).toEqual("key1=value1&key2=value2&key3=value3");
  });

  it("sets a search query from multiple objects with properties", () => {
    const url = {} as URL;
    setSearchParams(url, { key1: ["value1", "value2"] }, { key2: "value3" });
    expect(url.search).toEqual("key1=value1&key1=value2&key2=value3");
  });
});

describe("serializeDataIfNeeded", () => {
  it("exists", () => {
    expect(serializeDataIfNeeded).toBeDefined();
    expect(typeof serializeDataIfNeeded).toEqual("function");
  });

  it("serializes objects", () => {
    const result = serializeDataIfNeeded({ test: "value" }, null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual('{"test":"value"}');
  });

  it("serializes numbers", () => {
    const result = serializeDataIfNeeded(1, null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("1");
  });

  it("serializes strings", () => {
    const result = serializeDataIfNeeded("test string", null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("test string");
  });

  it("serializes empty strings", () => {
    const result = serializeDataIfNeeded("", null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("");
  });

  it("serializes undefined", () => {
    const result = serializeDataIfNeeded(undefined, null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("{}");
  });

  it("serializes null", () => {
    const result = serializeDataIfNeeded(null, null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("null");
  });

  it("serializes boolean false", () => {
    const result = serializeDataIfNeeded(false, null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("false");
  });

  it("serializes boolean true", () => {
    const result = serializeDataIfNeeded(true, null);
    expect(typeof result).toEqual("string");
    expect(result).toEqual("true");
  });

  it("serializes objects ", () => {
    const result = serializeDataIfNeeded(
      { test: "value" },
      { headers: { "Content-Type": "fake content type" } },
      {
        isJsonMime: (mime: string): boolean => {
          expect(mime).toEqual("fake content type");
          return true;
        },
      } as Configuration
    );
    expect(typeof result).toEqual("string");
    expect(result).toEqual('{"test":"value"}');
  });
});

describe("toPathString", () => {
  it("exists", () => {
    expect(toPathString).toBeDefined();
    expect(typeof toPathString).toEqual("function");
  });

  it("returns a correctly formed string", () => {
    const pathname = "pathName:";
    const search = "search:";
    const hash = "hash";
    const result = toPathString({ pathname, search, hash } as URL);

    expect(result).toContain(pathname);
    expect(result).toContain(search);
    expect(result).toContain(hash);
  });
});

describe("createRequestFunction", () => {
  const fakeUrl = "fake base url";

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("exists", () => {
    expect(createRequestFunction).toBeDefined();
    expect(typeof createRequestFunction).toEqual("function");
  });

  it("forms a request promise", async () => {
    axiosRequest.mockImplementationOnce(async (requestArgs) => {
      expect(requestArgs.url).toContain(fakeUrl);
      return { response: "value" };
    });

    const res = createRequestFunction({} as RequestArgs, axios, fakeUrl);
    expect(axiosRequest).toHaveBeenCalledTimes(0);
    const result = (await res()) as { response: string };
    expect(axiosRequest).toHaveBeenCalledTimes(1);
    expect(result.response).toEqual("value");
  });

  it("forms a request promise with more complex options", async () => {
    const fakePath = "/path";
    const config = { basePath: "https://configured.fake.com" } as Configuration;
    axiosRequest.mockImplementationOnce(async (requestArgs) => {
      expect(requestArgs.url).toContain(config.basePath);
      expect(requestArgs.url).toContain(fakePath);
      expect(requestArgs.data).toEqual({ fake: "data" });
      expect(requestArgs.method).toEqual("POST");
      expect(requestArgs.headers.Authorization).toEqual("fake auth");
      return { response: "value" };
    });

    const requestArgs: RequestArgs = {
      url: fakePath,
      options: {
        method: "POST",
        data: { fake: "data" },
        headers: { Authorization: "fake auth" },
      },
    };

    const res = createRequestFunction(requestArgs, axios, fakeUrl, config);
    expect(axiosRequest).toHaveBeenCalledTimes(0);
    const result = (await res()) as { response: string };
    expect(axiosRequest).toHaveBeenCalledTimes(1);
    expect(result.response).toEqual("value");
  });
});

describe("valueToString", () => {
  it("exists", () => {
    expect(valueToString).toBeDefined();
    expect(typeof valueToString).toEqual("function");
  });

  it("converts a simple array", () => {
    const result = valueToString(["test"]);
    expect(result).toEqual('["test"]');
  });

  it("converts a complex array", () => {
    const result = valueToString([{ test: "value" }]);
    expect(result).toEqual('[{"test":"value"}]');
  });

  it("converts an object", () => {
    const result = valueToString({ test: "value" });
    expect(result).toEqual('{"test":"value"}');
  });

  it("converts a function", () => {
    const result = valueToString(() => 1);
    expect(result).toEqual("function () { return 1; }");
  });
});
