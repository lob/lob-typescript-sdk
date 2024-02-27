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
import { LobError } from "../models";
// @ts-ignore
import { MailType } from "../models";
// @ts-ignore
import { SnapPack } from "../models";
// @ts-ignore
import { SnapPackDeletion } from "../models";
// @ts-ignore
import { SnapPackEditable } from "../models";
// @ts-ignore
import { SnapPackList } from "../models";
// @ts-ignore
import { SnapPackSize } from "../models";
/**
 * SnapPacksApi - axios parameter creator
 * @export
 */
export const SnapPacksApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Creates a new snap_pack given information
     * @summary create
     * @param {SnapPackEditable} snapPackEditable
     * @param {string} [idempotencyKey] A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our [implementation guide](https://www.lob.com/guides#idempotent_request).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    snapPackCreate: async (
      snapPackEditable: SnapPackEditable,
      idempotencyKey?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'snapPackEditable' is not null or undefined
      assertParamExists("snapPackCreate", "snapPackEditable", snapPackEditable);

      const localVarPath = `/snap_packs`;
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

      if (idempotencyKey !== undefined && idempotencyKey !== null) {
        localVarHeaderParameter["Idempotency-Key"] = String(idempotencyKey);
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
        snapPackEditable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Completely removes a snap pack from production. This can only be done if the snap pack\'s `send_date` has not yet passed.
     * @summary delete
     * @param {string} snpId id of the snap_pack
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    snapPackDelete: async (
      snpId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'snpId' is not null or undefined
      assertParamExists("snapPackDelete", "snpId", snpId);

      const localVarPath = `/snap_packs/{snp_id}`.replace(
        `{${"snp_id"}}`,
        encodeURIComponent(String(snpId))
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
     * Retrieves the details of an existing snap_pack. You need only supply the unique snap_pack identifier that was returned upon snap_pack creation.
     * @summary get
     * @param {string} snpId id of the snap_pack
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    snapPackRetrieve: async (
      snpId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'snpId' is not null or undefined
      assertParamExists("snapPackRetrieve", "snpId", snpId);

      const localVarPath = `/snap_packs/{snp_id}`.replace(
        `{${"snp_id"}}`,
        encodeURIComponent(String(snpId))
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
     * Returns a list of your Snap Packs. The snap packs are returned sorted by creation date, with the most recently created snap packs appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
     * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
     * @param {Array<SnapPackSize>} [size] The Snap Pack sizes to be returned.
     * @param {boolean} [scheduled] * &#x60;true&#x60; - only return orders (past or future) where &#x60;send_date&#x60; is greater than &#x60;date_created&#x60; * &#x60;false&#x60; - only return orders where &#x60;send_date&#x60; is equal to &#x60;date_created&#x60;
     * @param {{ [key: string]: string; }} [sendDate] Filter by date sent.
     * @param {MailType} [mailType] A string designating the mail postage type: * &#x60;usps_first_class&#x60; - (default) * &#x60;usps_standard&#x60; - a [cheaper option](https://lob.com/pricing/print-mail#compare) which is less predictable and takes longer to deliver. &#x60;usps_standard&#x60; cannot be used with &#x60;4x6&#x60; postcards or for any postcards sent outside of the United States.
     * @param {object} [sortBy] Sorts items by ascending or descending dates. Use either &#x60;date_created&#x60; or &#x60;send_date&#x60;, not both.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    snapPacksList: async (
      limit?: number,
      before?: string,
      after?: string,
      include?: Array<string>,
      dateCreated?: { [key: string]: string },
      metadata?: { [key: string]: string },
      size?: Array<SnapPackSize>,
      scheduled?: boolean,
      sendDate?: { [key: string]: string },
      mailType?: MailType,
      sortBy?: object,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/snap_packs`;
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

      if (size) {
        localVarQueryParameter["size"] = valueToString(size);
      }

      if (scheduled !== undefined) {
        localVarQueryParameter["scheduled"] = scheduled;
      }

      if (sendDate !== undefined) {
        localVarQueryParameter["send_date"] = valueToString(sendDate);
      }

      if (mailType !== undefined) {
        localVarQueryParameter["mail_type"] = valueToString(mailType);
      }

      if (sortBy !== undefined) {
        localVarQueryParameter["sort_by"] = valueToString(sortBy);
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
 * SnapPacksApi - functional programming interface
 * @export
 */
export const SnapPacksApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    SnapPacksApiAxiosParamCreator(configuration);
  return {
    /**
     * Creates a new snap_pack given information
     * @summary create
     * @param {SnapPackEditable} snapPackEditable
     * @param {string} [idempotencyKey] A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our [implementation guide](https://www.lob.com/guides#idempotent_request).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async snapPackCreate(
      snapPackEditable: SnapPackEditable,
      idempotencyKey?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<SnapPack>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.snapPackCreate(
        snapPackEditable,
        idempotencyKey,
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
     * Completely removes a snap pack from production. This can only be done if the snap pack\'s `send_date` has not yet passed.
     * @summary delete
     * @param {string} snpId id of the snap_pack
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async snapPackDelete(
      snpId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<SnapPackDeletion>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.snapPackDelete(
        snpId,
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
     * Retrieves the details of an existing snap_pack. You need only supply the unique snap_pack identifier that was returned upon snap_pack creation.
     * @summary get
     * @param {string} snpId id of the snap_pack
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async snapPackRetrieve(
      snpId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<SnapPack>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.snapPackRetrieve(snpId, options);
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Returns a list of your Snap Packs. The snap packs are returned sorted by creation date, with the most recently created snap packs appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
     * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
     * @param {Array<SnapPackSize>} [size] The Snap Pack sizes to be returned.
     * @param {boolean} [scheduled] * &#x60;true&#x60; - only return orders (past or future) where &#x60;send_date&#x60; is greater than &#x60;date_created&#x60; * &#x60;false&#x60; - only return orders where &#x60;send_date&#x60; is equal to &#x60;date_created&#x60;
     * @param {{ [key: string]: string; }} [sendDate] Filter by date sent.
     * @param {MailType} [mailType] A string designating the mail postage type: * &#x60;usps_first_class&#x60; - (default) * &#x60;usps_standard&#x60; - a [cheaper option](https://lob.com/pricing/print-mail#compare) which is less predictable and takes longer to deliver. &#x60;usps_standard&#x60; cannot be used with &#x60;4x6&#x60; postcards or for any postcards sent outside of the United States.
     * @param {object} [sortBy] Sorts items by ascending or descending dates. Use either &#x60;date_created&#x60; or &#x60;send_date&#x60;, not both.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async snapPacksList(
      limit?: number,
      before?: string,
      after?: string,
      include?: Array<string>,
      dateCreated?: { [key: string]: string },
      metadata?: { [key: string]: string },
      size?: Array<SnapPackSize>,
      scheduled?: boolean,
      sendDate?: { [key: string]: string },
      mailType?: MailType,
      sortBy?: object,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<SnapPackList>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.snapPacksList(
        limit,
        before,
        after,
        include,
        dateCreated,
        metadata,
        size,
        scheduled,
        sendDate,
        mailType,
        sortBy,
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
 * SnapPacksApi - object-oriented interface
 * @export
 * @class SnapPacksApi
 * @extends {BaseAPI}
 */
export class SnapPacksApi extends BaseAPI {
  /**
   * Creates a new snap_pack given information
   * @summary create
   * @param {SnapPackEditable} snapPackEditable
   * @param {string} [idempotencyKey] A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our [implementation guide](https://www.lob.com/guides#idempotent_request).
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SnapPacksApi
   */
  public create(
    snapPackEditable: SnapPackEditable,
    idempotencyKey?: string,
    options?: AxiosRequestConfig
  ) {
    return SnapPacksApiFp(this.configuration)
      .snapPackCreate(snapPackEditable, idempotencyKey, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new SnapPack(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Completely removes a snap pack from production. This can only be done if the snap pack\'s `send_date` has not yet passed.
   * @summary delete
   * @param {string} snpId id of the snap_pack
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SnapPacksApi
   */
  public delete(snpId: string, options?: AxiosRequestConfig) {
    return SnapPacksApiFp(this.configuration)
      .snapPackDelete(snpId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new SnapPackDeletion(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Retrieves the details of an existing snap_pack. You need only supply the unique snap_pack identifier that was returned upon snap_pack creation.
   * @summary get
   * @param {string} snpId id of the snap_pack
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SnapPacksApi
   */
  public get(snpId: string, options?: AxiosRequestConfig) {
    return SnapPacksApiFp(this.configuration)
      .snapPackRetrieve(snpId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new SnapPack(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Returns a list of your Snap Packs. The snap packs are returned sorted by creation date, with the most recently created snap packs appearing first.
   * @summary list
   * @param {number} [limit] How many results to return.
   * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
   * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
   * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
   * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
   * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
   * @param {Array<SnapPackSize>} [size] The Snap Pack sizes to be returned.
   * @param {boolean} [scheduled] * &#x60;true&#x60; - only return orders (past or future) where &#x60;send_date&#x60; is greater than &#x60;date_created&#x60; * &#x60;false&#x60; - only return orders where &#x60;send_date&#x60; is equal to &#x60;date_created&#x60;
   * @param {{ [key: string]: string; }} [sendDate] Filter by date sent.
   * @param {MailType} [mailType] A string designating the mail postage type: * &#x60;usps_first_class&#x60; - (default) * &#x60;usps_standard&#x60; - a [cheaper option](https://lob.com/pricing/print-mail#compare) which is less predictable and takes longer to deliver. &#x60;usps_standard&#x60; cannot be used with &#x60;4x6&#x60; postcards or for any postcards sent outside of the United States.
   * @param {object} [sortBy] Sorts items by ascending or descending dates. Use either &#x60;date_created&#x60; or &#x60;send_date&#x60;, not both.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SnapPacksApi
   */
  public list(
    limit?: number,
    before?: string,
    after?: string,
    include?: Array<string>,
    dateCreated?: { [key: string]: string },
    metadata?: { [key: string]: string },
    size?: Array<SnapPackSize>,
    scheduled?: boolean,
    sendDate?: { [key: string]: string },
    mailType?: MailType,
    sortBy?: object,
    options?: AxiosRequestConfig
  ) {
    return SnapPacksApiFp(this.configuration)
      .snapPacksList(
        limit,
        before,
        after,
        include,
        dateCreated,
        metadata,
        size,
        scheduled,
        sendDate,
        mailType,
        sortBy,
        options
      )
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new SnapPackList(response.data);
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
