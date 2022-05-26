  import { USVerificationsApi } from "../api"
  
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
  
  


 describe("USVerificationsApi", () => {
    it("can be instantiated", () => {
      const verificationApi = new USVerificationsApi(CONFIG_FOR_UNIT);
      expect(verificationApi).toBeDefined();
      expect(typeof verificationApi).toEqual("object");
      expect(verificationApi).toBeInstanceOf(USVerificationsApi);
    });
  
    it("can be instantiated with base options", () => {
      const verificationApi = new USVerificationsApi(
        CONFIG_WITH_BASE_OPTIONS_FOR_UNIT
      );
      expect(verificationApi).toBeDefined();
      expect(typeof verificationApi).toEqual("object");
      expect(verificationApi).toBeInstanceOf(USVerificationsApi);
    });
  
    describe("UsCsvVerificationsResponse", () => {
      it("exists", () => {
        const verificationApi = new USVerificationsApi(CONFIG_FOR_UNIT);
        expect(verificationApi.UsCsvVerificationsResponse).toBeDefined();
        expect(typeof verificationApi.UsCsvVerificationsResponse).toEqual("function");
      });
  
      it("handles errors returned by the api", async () => {
        axiosRequest.mockImplementation(async () => {
         
          throw {
            message: "error",
            response: { data: { error: { message: "error" } } },
          };
        });
  
        try {
          await new USVerificationsApi(CONFIG_FOR_UNIT).UsCsvVerificationsResponse(1, 2, 3, 4, 5, 6);
        } catch (err: any) {
          expect(err.message).toEqual("error");
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
          await new USVerificationsApi(CONFIG_FOR_UNIT).UsCsvVerificationsResponse(undefined);
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
          await new USVerificationsApi(CONFIG_FOR_UNIT).UsCsvVerificationsResponse(
            undefined
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
          await new USVerificationsApi(CONFIG_FOR_UNIT).UsCsvVerificationsResponse(
            undefined
          );
          fail("Should throw");
        } catch (err: any) {
          expect(err.message).toEqual("Unknown Error");
        }
      });

  
      
    });
});