import {
  UsVerificationsWritable,
  MultipleComponentsList,
  CountryExtended,
  UsVerificationDeliverabilityEnum,
  IntlVerificationStatusEnum,
  MultipleComponents,
} from "../models";
import { UsVerificationsApi } from "../api";

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

describe("UsVerificationsApi", () => {
  it("can be instantiated", () => {
    const verificationApi = new UsVerificationsApi(CONFIG_FOR_UNIT);
    expect(verificationApi).toBeDefined();
    expect(typeof verificationApi).toEqual("object");
    expect(verificationApi).toBeInstanceOf(UsVerificationsApi);
  });

  it("can be instantiated with base options", () => {
    const verificationApi = new UsVerificationsApi(
      CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
    );
    expect(verificationApi).toBeDefined();
    expect(typeof verificationApi).toEqual("object");
    expect(verificationApi).toBeInstanceOf(UsVerificationsApi);
  });

  describe("verifySingle", () => {
    const verification = new UsVerificationsWritable({
      primary_line: "370 WATER ST",
      zip_code: "07090",
    });

    it("exists", () => {
      const verificationApi = new UsVerificationsApi(CONFIG_FOR_UNIT);
      expect(verificationApi.verifySingle).toBeDefined();
      expect(typeof verificationApi.verifySingle).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
          verification
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
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
          verification
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
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
          verification
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
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
          verification
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
      }));

      const response = await new UsVerificationsApi(
        CONFIG_FOR_UNIT
      ).verifySingle(verification);
      expect(response).toBeDefined();
      expect(response.deliverability).toEqual(
        UsVerificationDeliverabilityEnum.Deliverable
      );
    });

    it("includes custom headers while it verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
      }));

      const response = await new UsVerificationsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).verifySingle(verification);
      expect(response).toBeDefined();
      expect(response.deliverability).toEqual(
        UsVerificationDeliverabilityEnum.Deliverable
      );
    });

    it("verifies a single international address with a provided case", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
      }));

      const response = await new UsVerificationsApi(
        CONFIG_FOR_UNIT
      ).verifySingle(verification, "upper");
      expect(response).toBeDefined();
      expect(response.deliverability).toEqual(
        UsVerificationDeliverabilityEnum.Deliverable
      );
    });
  });

  describe("verifyBulk", () => {
    const verification = new MultipleComponentsList({
      addresses: [
        new MultipleComponents({
          primary_line: "370 WATER ST",
          zip_code: "12345",
        }),
        new MultipleComponents({
          primary_line: "012 PLACEHOLDER ST",
          zip_code: "12345",
        }),
      ],
    });

    it("exists", () => {
      const verificationApi = new UsVerificationsApi(CONFIG_FOR_UNIT);
      expect(verificationApi.verifyBulk).toBeDefined();
      expect(typeof verificationApi.verifyBulk).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(verification);
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
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(verification);
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
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(verification);
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
        await new UsVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(verification);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a list of international addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            {
              id: "us_ver_fakeId",
              deliverability: UsVerificationDeliverabilityEnum.Deliverable,
            },
            {
              id: "us_ver_fakeId",
              deliverability: UsVerificationDeliverabilityEnum.Deliverable,
            },
          ],
        },
      }));
      const response = await new UsVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(
        verification
      );
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(2);
    });

    it("includes custom headers while it verifies a list of international addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            {
              id: "us_ver_fakeId",
              deliverability: UsVerificationDeliverabilityEnum.Deliverable,
            },
            {
              id: "us_ver_fakeId",
              deliverability: UsVerificationDeliverabilityEnum.Deliverable,
            },
          ],
        },
      }));

      const response = await new UsVerificationsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).verifyBulk(verification);
      expect(response.addresses?.length).toEqual(2);
    });

    it("verifies a list of international addresses with a provided case", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            {
              id: "us_ver_fakeId",
              deliverability: UsVerificationDeliverabilityEnum.Deliverable,
            },
            {
              id: "us_ver_fakeId",
              deliverability: UsVerificationDeliverabilityEnum.Deliverable,
            },
          ],
        },
      }));
      const response = await new UsVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(
        verification,
        "proper"
      );
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(2);
    });
  });
});
