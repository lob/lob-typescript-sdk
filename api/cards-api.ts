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
import { Card } from "../models";
// @ts-ignore
import { CardDeletion } from "../models";
// @ts-ignore
import { CardEditable } from "../models";
// @ts-ignore
import { CardList } from "../models";
// @ts-ignore
import { CardUpdatable } from "../models";
// @ts-ignore
import { LobError } from "../models";
/**
 * CardsApi - axios parameter creator
 * @export
 */
export const CardsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Creates a new card given information
     * @summary create
     * @param {CardEditable} cardEditable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCreate: async (
      cardEditable: CardEditable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cardEditable' is not null or undefined
      assertParamExists("cardCreate", "cardEditable", cardEditable);

      const localVarPath = `/cards`;
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
        cardEditable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete an existing card. You need only supply the unique identifier that was returned upon card creation.
     * @summary delete
     * @param {string} cardId id of the card
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardDelete: async (
      cardId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cardId' is not null or undefined
      assertParamExists("cardDelete", "cardId", cardId);

      const localVarPath = `/cards/{card_id}`.replace(
        `{${"card_id"}}`,
        encodeURIComponent(String(cardId))
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
     * Retrieves the details of an existing card. You need only supply the unique customer identifier that was returned upon card creation.
     * @summary get
     * @param {string} cardId id of the card
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardRetrieve: async (
      cardId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cardId' is not null or undefined
      assertParamExists("cardRetrieve", "cardId", cardId);

      const localVarPath = `/cards/{card_id}`.replace(
        `{${"card_id"}}`,
        encodeURIComponent(String(cardId))
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
     * Update the details of an existing card. You need only supply the unique identifier that was returned upon card creation.
     * @summary update
     * @param {string} cardId id of the card
     * @param {CardUpdatable} cardUpdatable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardUpdate: async (
      cardId: string,
      cardUpdatable: CardUpdatable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'cardId' is not null or undefined
      assertParamExists("cardUpdate", "cardId", cardId);
      // verify required parameter 'cardUpdatable' is not null or undefined
      assertParamExists("cardUpdate", "cardUpdatable", cardUpdatable);

      const localVarPath = `/cards/{card_id}`.replace(
        `{${"card_id"}}`,
        encodeURIComponent(String(cardId))
      );
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
        cardUpdatable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of your cards. The cards are returned sorted by creation date, with the most recently created addresses appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardsList: async (
      limit?: number,
      before?: string,
      after?: string,
      include?: Array<string>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/cards`;
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
 * CardsApi - functional programming interface
 * @export
 */
export const CardsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = CardsApiAxiosParamCreator(configuration);
  return {
    /**
     * Creates a new card given information
     * @summary create
     * @param {CardEditable} cardEditable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cardCreate(
      cardEditable: CardEditable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Card>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cardCreate(
        cardEditable,
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
     * Delete an existing card. You need only supply the unique identifier that was returned upon card creation.
     * @summary delete
     * @param {string} cardId id of the card
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cardDelete(
      cardId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CardDeletion>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cardDelete(
        cardId,
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
     * Retrieves the details of an existing card. You need only supply the unique customer identifier that was returned upon card creation.
     * @summary get
     * @param {string} cardId id of the card
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cardRetrieve(
      cardId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Card>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cardRetrieve(
        cardId,
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
     * Update the details of an existing card. You need only supply the unique identifier that was returned upon card creation.
     * @summary update
     * @param {string} cardId id of the card
     * @param {CardUpdatable} cardUpdatable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cardUpdate(
      cardId: string,
      cardUpdatable: CardUpdatable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Card>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cardUpdate(
        cardId,
        cardUpdatable,
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
     * Returns a list of your cards. The cards are returned sorted by creation date, with the most recently created addresses appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cardsList(
      limit?: number,
      before?: string,
      after?: string,
      include?: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CardList>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cardsList(
        limit,
        before,
        after,
        include,
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
 * CardsApi - object-oriented interface
 * @export
 * @class CardsApi
 * @extends {BaseAPI}
 */
export class CardsApi extends BaseAPI {
  /**
   * Creates a new card given information
   * @summary create
   * @param {CardEditable} cardEditable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardsApi
   */
  public create(cardEditable: CardEditable, options?: AxiosRequestConfig) {
    return CardsApiFp(this.configuration)
      .cardCreate(cardEditable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Card(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Delete an existing card. You need only supply the unique identifier that was returned upon card creation.
   * @summary delete
   * @param {string} cardId id of the card
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardsApi
   */
  public delete(cardId: string, options?: AxiosRequestConfig) {
    return CardsApiFp(this.configuration)
      .cardDelete(cardId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new CardDeletion(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Retrieves the details of an existing card. You need only supply the unique customer identifier that was returned upon card creation.
   * @summary get
   * @param {string} cardId id of the card
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardsApi
   */
  public get(cardId: string, options?: AxiosRequestConfig) {
    return CardsApiFp(this.configuration)
      .cardRetrieve(cardId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Card(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Update the details of an existing card. You need only supply the unique identifier that was returned upon card creation.
   * @summary update
   * @param {string} cardId id of the card
   * @param {CardUpdatable} cardUpdatable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardsApi
   */
  public update(
    cardId: string,
    cardUpdatable: CardUpdatable,
    options?: AxiosRequestConfig
  ) {
    return CardsApiFp(this.configuration)
      .cardUpdate(cardId, cardUpdatable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Card(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Returns a list of your cards. The cards are returned sorted by creation date, with the most recently created addresses appearing first.
   * @summary list
   * @param {number} [limit] How many results to return.
   * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response.
   * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response.
   * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardsApi
   */
  public list(
    limit?: number,
    before?: string,
    after?: string,
    include?: Array<string>,
    options?: AxiosRequestConfig
  ) {
    return CardsApiFp(this.configuration)
      .cardsList(limit, before, after, include, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new CardList(response.data);
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
