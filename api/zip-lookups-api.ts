/* tslint:disable */
/* eslint-disable */
/**
 * Lob
 * The Lob API is organized around REST. Our API is designed to have predictable, resource-oriented URLs and uses HTTP response codes to indicate any API errors. <p> Looking for our [previous documentation](https://lob.github.io/legacy-docs/)?
 *
 * The version of the OpenAPI document: 1.3.0
 * Contact: lob-openapi@lob.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import globalAxios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
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
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
// @ts-ignore
import { LobError } from "../models";
// @ts-ignore
import { Zip } from "../models";
// @ts-ignore
import { ZipEditable } from "../models";
/**
 * ZipLookupsApi - axios parameter creator
 * @export
 */
export const ZipLookupsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Returns information about a ZIP code
     * @summary lookup
     * @param {ZipEditable} zipEditable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    zipLookup: async (
      zipEditable: ZipEditable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'zipEditable' is not null or undefined
      assertParamExists("zipLookup", "zipEditable", zipEditable);
      const localVarPath = `/us_zip_lookups`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        zipEditable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * ZipLookupsApi - functional programming interface
 * @export
 */
export const ZipLookupsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    ZipLookupsApiAxiosParamCreator(configuration);
  return {
    /**
     * Returns information about a ZIP code
     * @summary lookup
     * @param {ZipEditable} zipEditable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async zipLookup(
      zipEditable: ZipEditable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Zip>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.zipLookup(
        zipEditable,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * ZipLookupsApi - object-oriented interface
 * @export
 * @class ZipLookupsApi
 * @extends {BaseAPI}
 */
export class ZipLookupsApi extends BaseAPI {
  /**
   * Returns information about a ZIP code
   * @summary lookup
   * @param {ZipEditable} zipEditable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ZipLookupsApi
   */
  public lookup(zipEditable: ZipEditable, options?: AxiosRequestConfig) {
    return ZipLookupsApiFp(this.configuration)
      .zipLookup(zipEditable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Zip(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
