import {
  IntlVerificationWritable,
  CountryExtended,
  IntlVerificationsPayload,
  IntlVerificationStatusEnum,
} from "../models";
import { IntlVerificationsApi } from "../api";
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

describe("IntlVerificationsApi", () => {
  it("can be instantiated", () => {
    const intlvApi = new IntlVerificationsApi(CONFIG_FOR_UNIT);
    expect(intlvApi).toBeDefined();
    expect(typeof intlvApi).toEqual("object");
    expect(intlvApi).toBeInstanceOf(IntlVerificationsApi);
  });

  it("can be instantiated with base options", () => {
    const intlvApi = new IntlVerificationsApi(
      CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
    );
    expect(intlvApi).toBeDefined();
    expect(typeof intlvApi).toEqual("object");
    expect(intlvApi).toBeInstanceOf(IntlVerificationsApi);
  });

  describe("verifySingle", () => {
    const verification: IntlVerificationWritable = {
      primary_line: "370 WATER ST",
      postal_code: "C1N 1C4",
      country: CountryExtended.Ca,
    };

    it("exists", () => {
      const intlvApi = new IntlVerificationsApi(CONFIG_FOR_UNIT);
      expect(intlvApi.verifySingle).toBeDefined();
      expect(typeof intlvApi.verifySingle).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
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
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
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
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
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
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifySingle(
          verification
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { status: IntlVerificationStatusEnum.Lf1 },
      }));

      const response = await new IntlVerificationsApi(
        CONFIG_FOR_UNIT
      ).verifySingle(verification);
      expect(response.status).toBeDefined();
      expect(response.status).toEqual(IntlVerificationStatusEnum.Lf1);
    });

    it("includes custom headers while it verifies a single international address", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { status: IntlVerificationStatusEnum.Lf1 },
      }));

      const response = await new IntlVerificationsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).verifySingle(verification);
      expect(response.status).toBeDefined();
      expect(response.status).toEqual(IntlVerificationStatusEnum.Lf1);
    });

    it("verifies a single international address with xLang", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: { status: IntlVerificationStatusEnum.Lf1 },
      }));

      const response = await new IntlVerificationsApi(
        CONFIG_FOR_UNIT
      ).verifySingle(verification, "native");
      expect(response.status).toBeDefined();
      expect(response.status).toEqual(IntlVerificationStatusEnum.Lf1);
    });
  });

  describe("verifyBulk", () => {
    const verification: IntlVerificationsPayload = {
      addresses: [
        {
          primary_line: "370 WATER ST",
          postal_code: "C1N 1C4",
          country: CountryExtended.Ca,
        },
        {
          primary_line: "012 PLACEHOLDER ST",
          postal_code: "F0O 8A2",
          country: CountryExtended.Ca,
        },
      ],
    };

    it("exists", () => {
      const intlvApi = new IntlVerificationsApi(CONFIG_FOR_UNIT);
      expect(intlvApi.verifyBulk).toBeDefined();
      expect(typeof intlvApi.verifyBulk).toEqual("function");
    });

    it("handles errors returned by the api", async () => {
      axiosRequest.mockImplementationOnce(async () => {
        throw {
          message: "error",
          response: { data: { error: { message: "error reported by API" } } },
        };
      });

      try {
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(
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
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(
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
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(
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
        await new IntlVerificationsApi(CONFIG_FOR_UNIT).verifyBulk(
          verification
        );
        fail("Should throw");
      } catch (err: any) {
        expect(err.message).toEqual("Unknown Error");
      }
    });

    it("verifies a list of international addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            { id: "intl_ver_fakeId", status: IntlVerificationStatusEnum.Lf1 },
            { id: "intl_ver_fakeId", status: IntlVerificationStatusEnum.Lf1 },
          ],
        },
      }));
      const response = await new IntlVerificationsApi(
        CONFIG_FOR_UNIT
      ).verifyBulk(verification);
      expect(response).toBeDefined();
      expect(response.addresses?.length).toEqual(2);
    });

    it("includes custom headers while it verifies a list of international addresses", async () => {
      axiosRequest.mockImplementationOnce(async () => ({
        data: {
          addresses: [
            { id: "intl_ver_fakeId", status: IntlVerificationStatusEnum.Lf1 },
            { id: "intl_ver_fakeId", status: IntlVerificationStatusEnum.Lf1 }
          ],
        },
      }));

      const response = await new IntlVerificationsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      ).verifyBulk(verification);
      expect(response.addresses?.length).toEqual(2);
    });
  });
});
