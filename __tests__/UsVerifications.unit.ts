import { Configuration } from "../configuration";

import {
  UsVerificationsWritable,
  MultipleComponentsList,
  CountryExtended,
  UsVerificationDeliverabilityEnum,
} from "../models";
import { USVerificationsApi } from "../api";
import { fail } from "./testUtilities";

// Axios Mock
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("USVerificationsApi", () => {
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

  it("can be instantiated", () => {
    const verificationApi = new USVerificationsApi(config);
    expect(verificationApi).toBeDefined();
    expect(typeof verificationApi).toEqual("object");
    expect(verificationApi).toBeInstanceOf(USVerificationsApi);
  });

  it("can be instantiated with base options", () => {
    const verificationApi = new USVerificationsApi(configWithBaseOptions);
    expect(verificationApi).toBeDefined();
    expect(typeof verificationApi).toEqual("object");
    expect(verificationApi).toBeInstanceOf(USVerificationsApi);
  });

  describe("verifySingle", () => {
    const verification: UsVerificationsWritable = {
      primary_line: "370 WATER ST",
      zip_code: "07090",
    };

    it("exists", () => {
      const verificationApi = new USVerificationsApi(config);
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
        await new USVerificationsApi(config).verifySingle(verification);
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
        await new USVerificationsApi(config).verifySingle(verification);
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
        await new USVerificationsApi(config).verifySingle(verification);
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
        await new USVerificationsApi(config).verifySingle(verification);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
      }));

      const response = await new USVerificationsApi(config).verifySingle(
        verification
      );
      expect(response).toBeDefined();
      expect(response.deliverability).toEqual(
        UsVerificationDeliverabilityEnum.Deliverable
      );
    });

    it("includes custom headers while it verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
      }));

      const response = await new USVerificationsApi(
        configWithBaseOptions
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

      const response = await new USVerificationsApi(config).verifySingle(
        verification,
        "upper"
      );
      expect(response).toBeDefined();
      expect(response.deliverability).toEqual(
        UsVerificationDeliverabilityEnum.Deliverable
      );
    });
  });

  describe("verifyBulk", () => {
    const verification: MultipleComponentsList = {
      addresses: [
        {
          primary_line: "370 WATER ST",
          zip_code: CountryExtended.Ca,
        },
        {
          primary_line: "012 PLACEHOLDER ST",
          zip_code: "F0O 8A2",
        },
      ],
    };

    it("exists", () => {
      const verificationApi = new USVerificationsApi(config);
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
        await new USVerificationsApi(config).verifyBulk(verification);
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
        await new USVerificationsApi(config).verifyBulk(verification);
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
        await new USVerificationsApi(config).verifyBulk(verification);
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
        await new USVerificationsApi(config).verifyBulk(verification);
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a list of international addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
            { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
          ],
        },
      }));
      const response = await new USVerificationsApi(config).verifyBulk(
        verification
      );
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(2);
    });

    it("includes custom headers while it verifies a list of international addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
            { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
          ],
        },
      }));

      const response = await new USVerificationsApi(
        configWithBaseOptions
      ).verifyBulk(verification);
      expect(response.addresses?.length).toEqual(2);
    });

    it("verifies a list of international addresses with a provided case", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
            { deliverability: UsVerificationDeliverabilityEnum.Deliverable },
          ],
        },
      }));
      const response = await new USVerificationsApi(config).verifyBulk(
        verification,
        "proper"
      );
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(2);
    });
  });
});
