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
import { Campaign } from "../models";
// @ts-ignore
import { CampaignUpdatable } from "../models";
// @ts-ignore
import { CampaignWritable } from "../models";
// @ts-ignore
import { CampaignsList } from "../models";
// @ts-ignore
import { InlineResponse200 } from "../models";
// @ts-ignore
import { LobError } from "../models";
/**
 * CampaignsApi - axios parameter creator
 * @export
 */
export const CampaignsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Creates a new campaign with the provided properties. See how to launch your first campaign [here](https://help.lob.com/best-practices/launching-your-first-campaign).
     * @summary create
     * @param {CampaignWritable} campaignWritable
     * @param {'native' | 'match'} [xLangOutput] * &#x60;native&#x60; - Translate response to the native language of the country in the request * &#x60;match&#x60; - match the response to the language in the request  Default response is in English.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    campaignCreate: async (
      campaignWritable: CampaignWritable,
      xLangOutput?: "native" | "match",
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'campaignWritable' is not null or undefined
      assertParamExists("campaignCreate", "campaignWritable", campaignWritable);
      const localVarPath = `/campaigns`;
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

      if (xLangOutput !== undefined && xLangOutput !== null) {
        localVarHeaderParameter["x-lang-output"] = String(xLangOutput);
      }

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
        campaignWritable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete an existing campaign. You need only supply the unique identifier that was returned upon campaign creation. Deleting a campaign also deletes any associated mail pieces that have been created but not sent. A campaign\'s `send_date` matches its associated mail pieces\' `send_date`s.
     * @summary delete
     * @param {string} cmpId id of the campaign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    campaignDelete: async (
      cmpId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cmpId' is not null or undefined
      assertParamExists("campaignDelete", "cmpId", cmpId);
      const localVarPath = `/campaigns/{cmp_id}`.replace(
        `{${"cmp_id"}}`,
        encodeURIComponent(String(cmpId))
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
     * Retrieves the details of an existing campaign. You need only supply the unique campaign identifier that was returned upon campaign creation.
     * @summary get
     * @param {string} cmpId id of the campaign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    campaignRetrieve: async (
      cmpId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cmpId' is not null or undefined
      assertParamExists("campaignRetrieve", "cmpId", cmpId);
      const localVarPath = `/campaigns/{cmp_id}`.replace(
        `{${"cmp_id"}}`,
        encodeURIComponent(String(cmpId))
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
     * Update the details of an existing campaign. You need only supply the unique identifier that was returned upon campaign creation.
     * @summary update
     * @param {string} cmpId id of the campaign
     * @param {CampaignUpdatable} campaignUpdatable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    campaignUpdate: async (
      cmpId: string,
      campaignUpdatable: CampaignUpdatable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cmpId' is not null or undefined
      assertParamExists("campaignUpdate", "cmpId", cmpId);
      // verify required parameter 'campaignUpdatable' is not null or undefined
      assertParamExists(
        "campaignUpdate",
        "campaignUpdatable",
        campaignUpdatable
      );
      const localVarPath = `/campaigns/{cmp_id}`.replace(
        `{${"cmp_id"}}`,
        encodeURIComponent(String(cmpId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "PATCH",
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
        campaignUpdatable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of your campaigns. The campaigns are returned sorted by creation date, with the most recently created campaigns appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    campaignsList: async (
      limit?: number,
      include?: Array<string>,
      before?: string,
      after?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/campaigns`;
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

      if (include) {
        localVarQueryParameter["include"] = valueToString(include);
      }

      if (before !== undefined) {
        localVarQueryParameter["before"] = before;
      }

      if (after !== undefined) {
        localVarQueryParameter["after"] = after;
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
 * CampaignsApi - functional programming interface
 * @export
 */
export const CampaignsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    CampaignsApiAxiosParamCreator(configuration);
  return {
    /**
     * Creates a new campaign with the provided properties. See how to launch your first campaign [here](https://help.lob.com/best-practices/launching-your-first-campaign).
     * @summary create
     * @param {CampaignWritable} campaignWritable
     * @param {'native' | 'match'} [xLangOutput] * &#x60;native&#x60; - Translate response to the native language of the country in the request * &#x60;match&#x60; - match the response to the language in the request  Default response is in English.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async campaignCreate(
      campaignWritable: CampaignWritable,
      xLangOutput?: "native" | "match",
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Campaign>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.campaignCreate(
        campaignWritable,
        xLangOutput,
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
     * Delete an existing campaign. You need only supply the unique identifier that was returned upon campaign creation. Deleting a campaign also deletes any associated mail pieces that have been created but not sent. A campaign\'s `send_date` matches its associated mail pieces\' `send_date`s.
     * @summary delete
     * @param {string} cmpId id of the campaign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async campaignDelete(
      cmpId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<InlineResponse200>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.campaignDelete(
        cmpId,
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
     * Retrieves the details of an existing campaign. You need only supply the unique campaign identifier that was returned upon campaign creation.
     * @summary get
     * @param {string} cmpId id of the campaign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async campaignRetrieve(
      cmpId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Campaign>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.campaignRetrieve(cmpId, options);
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Update the details of an existing campaign. You need only supply the unique identifier that was returned upon campaign creation.
     * @summary update
     * @param {string} cmpId id of the campaign
     * @param {CampaignUpdatable} campaignUpdatable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async campaignUpdate(
      cmpId: string,
      campaignUpdatable: CampaignUpdatable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Campaign>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.campaignUpdate(
        cmpId,
        campaignUpdatable,
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
     * Returns a list of your campaigns. The campaigns are returned sorted by creation date, with the most recently created campaigns appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async campaignsList(
      limit?: number,
      include?: Array<string>,
      before?: string,
      after?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CampaignsList>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.campaignsList(
        limit,
        include,
        before,
        after,
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
 * CampaignsApi - object-oriented interface
 * @export
 * @class CampaignsApi
 * @extends {BaseAPI}
 */
export class CampaignsApi extends BaseAPI {
  /**
   * Creates a new campaign with the provided properties. See how to launch your first campaign [here](https://help.lob.com/best-practices/launching-your-first-campaign).
   * @summary create
   * @param {CampaignWritable} campaignWritable
   * @param {'native' | 'match'} [xLangOutput] * &#x60;native&#x60; - Translate response to the native language of the country in the request * &#x60;match&#x60; - match the response to the language in the request  Default response is in English.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CampaignsApi
   */
  public create(
    campaignWritable: CampaignWritable,
    xLangOutput?: "native" | "match",
    options?: AxiosRequestConfig
  ) {
    return CampaignsApiFp(this.configuration)
      .campaignCreate(campaignWritable, xLangOutput, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Campaign(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Delete an existing campaign. You need only supply the unique identifier that was returned upon campaign creation. Deleting a campaign also deletes any associated mail pieces that have been created but not sent. A campaign\'s `send_date` matches its associated mail pieces\' `send_date`s.
   * @summary delete
   * @param {string} cmpId id of the campaign
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CampaignsApi
   */
  public delete(cmpId: string, options?: AxiosRequestConfig) {
    return CampaignsApiFp(this.configuration)
      .campaignDelete(cmpId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new InlineResponse200(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Retrieves the details of an existing campaign. You need only supply the unique campaign identifier that was returned upon campaign creation.
   * @summary get
   * @param {string} cmpId id of the campaign
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CampaignsApi
   */
  public get(cmpId: string, options?: AxiosRequestConfig) {
    return CampaignsApiFp(this.configuration)
      .campaignRetrieve(cmpId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Campaign(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Update the details of an existing campaign. You need only supply the unique identifier that was returned upon campaign creation.
   * @summary update
   * @param {string} cmpId id of the campaign
   * @param {CampaignUpdatable} campaignUpdatable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CampaignsApi
   */
  public update(
    cmpId: string,
    campaignUpdatable: CampaignUpdatable,
    options?: AxiosRequestConfig
  ) {
    return CampaignsApiFp(this.configuration)
      .campaignUpdate(cmpId, campaignUpdatable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Campaign(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Returns a list of your campaigns. The campaigns are returned sorted by creation date, with the most recently created campaigns appearing first.
   * @summary list
   * @param {number} [limit] How many results to return.
   * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
   * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
   * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CampaignsApi
   */
  public list(
    limit?: number,
    include?: Array<string>,
    before?: string,
    after?: string,
    options?: AxiosRequestConfig
  ) {
    return CampaignsApiFp(this.configuration)
      .campaignsList(limit, include, before, after, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new CampaignsList(response.data);
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
