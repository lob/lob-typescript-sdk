import { MultiLineAddress } from "../models";
import { IdentityValidationApi } from "../api/identity-validation-api";
import { fail } from "./testUtilities";
import {
  CONFIG_FOR_UNIT,
  CONFIG_WITH_BASE_OPTIONS_FOR_UNIT,
} from "./testFixtures";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("IdentityValidationApi", () => {
  it("can be instantiated", () => {
    const intlApi = new IdentityValidationApi(CONFIG_FOR_UNIT);
    expect(intlApi).toBeDefined();
    expect(typeof intlApi).toEqual("object");
    expect(intlApi).toBeInstanceOf(IdentityValidationApi);
  });

  it("can be instantiated with base options", () => {
    const intlApi = new IdentityValidationApi(
      CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
    );
    expect(intlApi).toBeDefined();
    expect(typeof intlApi).toEqual("object");
    expect(intlApi).toBeInstanceOf(IdentityValidationApi);
  });

  describe("validate", () => {
    const multilineAddress = new MultiLineAddress({
      recipient: "Lob.com",
      primary_line: "210 King St",
      city: "San Francisco",
      state: "CA",
      zip_code: "94107",
    });

    it("exists", () => {
      const intlApi = new IdentityValidationApi(CONFIG_FOR_UNIT);
      expect(intlApi.validate).toBeDefined();
      expect(typeof intlApi.validate).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new IdentityValidationApi(CONFIG_FOR_UNIT).validate(
          multilineAddress
        );
      } catch (err: any) {
        expect(err.message).toEqual("error reported by API");
      }
    });

    it("handles errors returned by the api with missing response.data", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: {},
        };
      });

      try {
        await new IdentityValidationApi(CONFIG_FOR_UNIT).validate(
          multilineAddress
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors returned by the api with missing response.data.error", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: {} },
        };
      });

      try {
        await new IdentityValidationApi(CONFIG_FOR_UNIT).validate(
          multilineAddress
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });

    it("handles errors in making the request", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw new Error("Unknown Error");
      });

      try {
        await new IdentityValidationApi(CONFIG_FOR_UNIT).validate(
          multilineAddress
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("validates whether a given name is associated with an address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "id_validation_fakeId" },
      }));

      const response = await new IdentityValidationApi(
        CONFIG_FOR_UNIT
      ).validate(multilineAddress);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual("id_validation_fakeId");
    });

    it("includes custom headers while it validates", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { id: "id_validation_fakeId" },
      }));

      const response = await new IdentityValidationApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).validate(multilineAddress);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual("id_validation_fakeId");
    });
  });
});
