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
import FormData = require("form-data");
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
import { Address } from "../models";
// @ts-ignore
import { AddressDeletion } from "../models";
// @ts-ignore
import { AddressEditable } from "../models";
// @ts-ignore
import { AddressList } from "../models";
// @ts-ignore
import { LobError } from "../models";
/**
 * AddressesApi - axios parameter creator
 * @export
 */
export const AddressesApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Creates a new address given information
     * @summary create
     * @param {AddressEditable} addressEditable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addressCreate: async (
      addressEditable: AddressEditable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'addressEditable' is not null or undefined
      assertParamExists("addressCreate", "addressEditable", addressEditable);

      const localVarPath = `/addresses`;
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
        addressEditable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Deletes the details of an existing address.
     * @summary delete
     * @param {string} adrId id of the address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addressDelete: async (
      adrId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'adrId' is not null or undefined
      assertParamExists("addressDelete", "adrId", adrId);

      const localVarPath = `/addresses/{adr_id}`.replace(
        `{${"adr_id"}}`,
        encodeURIComponent(String(adrId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves the details of an existing address.
     * @summary get
     * @param {string} adrId id of the address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addressRetrieve: async (
      adrId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'adrId' is not null or undefined
      assertParamExists("addressRetrieve", "adrId", adrId);

      const localVarPath = `/addresses/{adr_id}`.replace(
        `{${"adr_id"}}`,
        encodeURIComponent(String(adrId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of your addresses.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
     * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addressesList: async (
      limit?: number,
      before?: string,
      after?: string,
      include?: Array<string>,
      dateCreated?: { [key: string]: string },
      metadata?: { [key: string]: string },
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/addresses`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      if (limit !== undefined) {
        localVarQueryParameter["limit"] = limit;
      }

      if (before !== undefined) {
        localVarQueryParameter["before"] = before;
      }

      if (after !== undefined) {
        localVarQueryParameter["after"] = after;
      }

      if (include) {
        localVarQueryParameter["include"] = valueToString(include);
      }

      if (dateCreated !== undefined) {
        localVarQueryParameter["date_created"] = valueToString(dateCreated);
      }

      if (metadata !== undefined) {
        localVarQueryParameter["metadata"] = valueToString(metadata);
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AddressesApi - functional programming interface
 * @export
 */
export const AddressesApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    AddressesApiAxiosParamCreator(configuration);
  return {
    /**
     * Creates a new address given information
     * @summary create
     * @param {AddressEditable} addressEditable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addressCreate(
      addressEditable: AddressEditable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Address>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addressCreate(
        addressEditable,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Deletes the details of an existing address.
     * @summary delete
     * @param {string} adrId id of the address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addressDelete(
      adrId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<AddressDeletion>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addressDelete(
        adrId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Retrieves the details of an existing address.
     * @summary get
     * @param {string} adrId id of the address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addressRetrieve(
      adrId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Address>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addressRetrieve(
        adrId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Returns a list of your addresses.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
     * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addressesList(
      limit?: number,
      before?: string,
      after?: string,
      include?: Array<string>,
      dateCreated?: { [key: string]: string },
      metadata?: { [key: string]: string },
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AddressList>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addressesList(
        limit,
        before,
        after,
        include,
        dateCreated,
        metadata,
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
 * AddressesApi - object-oriented interface
 * @export
 * @class AddressesApi
 * @extends {BaseAPI}
 */
export class AddressesApi extends BaseAPI {
  /**
   * Creates a new address given information
   * @summary create
   * @param {AddressEditable} addressEditable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AddressesApi
   */
  public create(
    addressEditable: AddressEditable,
    options?: AxiosRequestConfig
  ) {
    return AddressesApiFp(this.configuration)
      .addressCreate(addressEditable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Address(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Deletes the details of an existing address.
   * @summary delete
   * @param {string} adrId id of the address
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AddressesApi
   */
  public delete(adrId: string, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration)
      .addressDelete(adrId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new AddressDeletion(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Retrieves the details of an existing address.
   * @summary get
   * @param {string} adrId id of the address
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AddressesApi
   */
  public get(adrId: string, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration)
      .addressRetrieve(adrId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Address(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Returns a list of your addresses.
   * @summary list
   * @param {number} [limit] How many results to return.
   * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
   * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
   * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
   * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
   * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AddressesApi
   */
  public list(
    limit?: number,
    before?: string,
    after?: string,
    include?: Array<string>,
    dateCreated?: { [key: string]: string },
    metadata?: { [key: string]: string },
    options?: AxiosRequestConfig
  ) {
    return AddressesApiFp(this.configuration)
      .addressesList(
        limit,
        before,
        after,
        include,
        dateCreated,
        metadata,
        options
      )
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new AddressList(response.data);
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
