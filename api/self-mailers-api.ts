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


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction, valueToString } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { LobError } from '../models';
// @ts-ignore
import { MailType } from '../models';
// @ts-ignore
import { SelfMailer } from '../models';
// @ts-ignore
import { SelfMailerDeletion } from '../models';
// @ts-ignore
import { SelfMailerEditable } from '../models';
// @ts-ignore
import { SelfMailerList } from '../models';
// @ts-ignore
import { SelfMailerSize } from '../models';
// @ts-ignore
import { SendDate } from '../models';
/**
 * SelfMailersApi - axios parameter creator
 * @export
 */
export const SelfMailersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a new self_mailer given information
         * @summary create
         * @param {SelfMailerEditable} selfMailerEditable 
         * @param {string} [idempotencyKey] A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our [implementation guide](https://www.lob.com/guides#idempotent_request). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        selfMailerCreate: async (selfMailerEditable: SelfMailerEditable, idempotencyKey?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'selfMailerEditable' is not null or undefined
            assertParamExists('selfMailerCreate', 'selfMailerEditable', selfMailerEditable)
            const localVarPath = `/self_mailers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            if (idempotencyKey !== undefined && idempotencyKey !== null) {
                localVarHeaderParameter['Idempotency-Key'] = String(idempotencyKey);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(selfMailerEditable, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Completely removes a self mailer from production. This can only be done if the self mailer\'s `send_date` has not yet passed.
         * @summary delete
         * @param {string} sfmId id of the self_mailer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        selfMailerDelete: async (sfmId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'sfmId' is not null or undefined
            assertParamExists('selfMailerDelete', 'sfmId', sfmId)
            const localVarPath = `/self_mailers/{sfm_id}`
                .replace(`{${"sfm_id"}}`, encodeURIComponent(String(sfmId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves the details of an existing self_mailer. You need only supply the unique self_mailer identifier that was returned upon self_mailer creation.
         * @summary get
         * @param {string} sfmId id of the self_mailer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        selfMailerRetrieve: async (sfmId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'sfmId' is not null or undefined
            assertParamExists('selfMailerRetrieve', 'sfmId', sfmId)
            const localVarPath = `/self_mailers/{sfm_id}`
                .replace(`{${"sfm_id"}}`, encodeURIComponent(String(sfmId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a list of your self_mailers. The self_mailers are returned sorted by creation date, with the most recently created self_mailers appearing first.
         * @summary list
         * @param {number} [limit] How many results to return.
         * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response. 
         * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response. 
         * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;. 
         * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
         * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
         * @param {SelfMailerSize} [size] The self mailer sizes to be returned.
         * @param {boolean} [scheduled] * &#x60;true&#x60; - only return orders (past or future) where &#x60;send_date&#x60; is greater than &#x60;date_created&#x60; * &#x60;false&#x60; - only return orders where &#x60;send_date&#x60; is equal to &#x60;date_created&#x60; 
         * @param {SendDate} [sendDate] Filter by ISO-8601 date or datetime, e.g. &#x60;{ gt: \&#39;2012-01-01\&#39;, lt: \&#39;2012-01-31T12:34:56Z\&#39; }&#x60; where &#x60;gt&#x60; is &gt;, &#x60;lt&#x60; is &lt;, &#x60;gte&#x60; is ≥, and &#x60;lte&#x60; is ≤. 
         * @param {MailType} [mailType] A string designating the mail postage type: * &#x60;usps_first_class&#x60; - (default) * &#x60;usps_standard&#x60; - a [cheaper option](https://lob.com/pricing/print-mail#compare) which is less predictable and takes longer to deliver. &#x60;usps_standard&#x60; cannot be used with &#x60;4x6&#x60; postcards or for any postcards sent outside of the United States. 
         * @param {object} [sortBy] Sorts items by ascending or descending dates. Use either &#x60;date_created&#x60; or &#x60;send_date&#x60;, not both. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        selfMailersList: async (limit?: number, before?: string, after?: string, include?: Array<string>, dateCreated?: { [key: string]: string; }, metadata?: { [key: string]: string; }, size?: SelfMailerSize, scheduled?: boolean, sendDate?: SendDate, mailType?: MailType, sortBy?: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/self_mailers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (before !== undefined) {
                localVarQueryParameter['before'] = before;
            }

            if (after !== undefined) {
                localVarQueryParameter['after'] = after;
            }

            if (include) {
                localVarQueryParameter['include'] = valueToString(include);
            }

            if (dateCreated !== undefined) {
                localVarQueryParameter['date_created'] = valueToString(dateCreated);
            }

            if (metadata !== undefined) {
                localVarQueryParameter['metadata'] = valueToString(metadata);
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = valueToString(size);
            }

            if (scheduled !== undefined) {
                localVarQueryParameter['scheduled'] = scheduled;
            }

            if (sendDate !== undefined) {
                localVarQueryParameter['send_date'] = valueToString(sendDate);
            }

            if (mailType !== undefined) {
                localVarQueryParameter['mail_type'] = valueToString(mailType);
            }

            if (sortBy !== undefined) {
                localVarQueryParameter['sort_by'] = valueToString(sortBy);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SelfMailersApi - functional programming interface
 * @export
 */
export const SelfMailersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SelfMailersApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a new self_mailer given information
         * @summary create
         * @param {SelfMailerEditable} selfMailerEditable 
         * @param {string} [idempotencyKey] A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our [implementation guide](https://www.lob.com/guides#idempotent_request). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async selfMailerCreate(selfMailerEditable: SelfMailerEditable, idempotencyKey?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SelfMailer>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.selfMailerCreate(selfMailerEditable, idempotencyKey, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Completely removes a self mailer from production. This can only be done if the self mailer\'s `send_date` has not yet passed.
         * @summary delete
         * @param {string} sfmId id of the self_mailer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async selfMailerDelete(sfmId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SelfMailerDeletion>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.selfMailerDelete(sfmId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the details of an existing self_mailer. You need only supply the unique self_mailer identifier that was returned upon self_mailer creation.
         * @summary get
         * @param {string} sfmId id of the self_mailer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async selfMailerRetrieve(sfmId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SelfMailer>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.selfMailerRetrieve(sfmId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of your self_mailers. The self_mailers are returned sorted by creation date, with the most recently created self_mailers appearing first.
         * @summary list
         * @param {number} [limit] How many results to return.
         * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response. 
         * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response. 
         * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;. 
         * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
         * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
         * @param {SelfMailerSize} [size] The self mailer sizes to be returned.
         * @param {boolean} [scheduled] * &#x60;true&#x60; - only return orders (past or future) where &#x60;send_date&#x60; is greater than &#x60;date_created&#x60; * &#x60;false&#x60; - only return orders where &#x60;send_date&#x60; is equal to &#x60;date_created&#x60; 
         * @param {SendDate} [sendDate] Filter by ISO-8601 date or datetime, e.g. &#x60;{ gt: \&#39;2012-01-01\&#39;, lt: \&#39;2012-01-31T12:34:56Z\&#39; }&#x60; where &#x60;gt&#x60; is &gt;, &#x60;lt&#x60; is &lt;, &#x60;gte&#x60; is ≥, and &#x60;lte&#x60; is ≤. 
         * @param {MailType} [mailType] A string designating the mail postage type: * &#x60;usps_first_class&#x60; - (default) * &#x60;usps_standard&#x60; - a [cheaper option](https://lob.com/pricing/print-mail#compare) which is less predictable and takes longer to deliver. &#x60;usps_standard&#x60; cannot be used with &#x60;4x6&#x60; postcards or for any postcards sent outside of the United States. 
         * @param {object} [sortBy] Sorts items by ascending or descending dates. Use either &#x60;date_created&#x60; or &#x60;send_date&#x60;, not both. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async selfMailersList(limit?: number, before?: string, after?: string, include?: Array<string>, dateCreated?: { [key: string]: string; }, metadata?: { [key: string]: string; }, size?: SelfMailerSize, scheduled?: boolean, sendDate?: SendDate, mailType?: MailType, sortBy?: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SelfMailerList>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.selfMailersList(limit, before, after, include, dateCreated, metadata, size, scheduled, sendDate, mailType, sortBy, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SelfMailersApi - object-oriented interface
 * @export
 * @class SelfMailersApi
 * @extends {BaseAPI}
 */
export class SelfMailersApi extends BaseAPI {
    /**
     * Creates a new self_mailer given information
     * @summary create
     * @param {SelfMailerEditable} selfMailerEditable 
     * @param {string} [idempotencyKey] A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our [implementation guide](https://www.lob.com/guides#idempotent_request). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SelfMailersApi
     */
    public create(selfMailerEditable: SelfMailerEditable, idempotencyKey?: string, options?: AxiosRequestConfig) {
        return SelfMailersApiFp(this.configuration).selfMailerCreate(selfMailerEditable, idempotencyKey, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Completely removes a self mailer from production. This can only be done if the self mailer\'s `send_date` has not yet passed.
     * @summary delete
     * @param {string} sfmId id of the self_mailer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SelfMailersApi
     */
    public delete(sfmId: string, options?: AxiosRequestConfig) {
        return SelfMailersApiFp(this.configuration).selfMailerDelete(sfmId, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Retrieves the details of an existing self_mailer. You need only supply the unique self_mailer identifier that was returned upon self_mailer creation.
     * @summary get
     * @param {string} sfmId id of the self_mailer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SelfMailersApi
     */
    public get(sfmId: string, options?: AxiosRequestConfig) {
        return SelfMailersApiFp(this.configuration).selfMailerRetrieve(sfmId, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Returns a list of your self_mailers. The self_mailers are returned sorted by creation date, with the most recently created self_mailers appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response. 
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response. 
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;. 
     * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
     * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
     * @param {SelfMailerSize} [size] The self mailer sizes to be returned.
     * @param {boolean} [scheduled] * &#x60;true&#x60; - only return orders (past or future) where &#x60;send_date&#x60; is greater than &#x60;date_created&#x60; * &#x60;false&#x60; - only return orders where &#x60;send_date&#x60; is equal to &#x60;date_created&#x60; 
     * @param {SendDate} [sendDate] Filter by ISO-8601 date or datetime, e.g. &#x60;{ gt: \&#39;2012-01-01\&#39;, lt: \&#39;2012-01-31T12:34:56Z\&#39; }&#x60; where &#x60;gt&#x60; is &gt;, &#x60;lt&#x60; is &lt;, &#x60;gte&#x60; is ≥, and &#x60;lte&#x60; is ≤. 
     * @param {MailType} [mailType] A string designating the mail postage type: * &#x60;usps_first_class&#x60; - (default) * &#x60;usps_standard&#x60; - a [cheaper option](https://lob.com/pricing/print-mail#compare) which is less predictable and takes longer to deliver. &#x60;usps_standard&#x60; cannot be used with &#x60;4x6&#x60; postcards or for any postcards sent outside of the United States. 
     * @param {object} [sortBy] Sorts items by ascending or descending dates. Use either &#x60;date_created&#x60; or &#x60;send_date&#x60;, not both. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SelfMailersApi
     */
    public list(limit?: number, before?: string, after?: string, include?: Array<string>, dateCreated?: { [key: string]: string; }, metadata?: { [key: string]: string; }, size?: SelfMailerSize, scheduled?: boolean, sendDate?: SendDate, mailType?: MailType, sortBy?: object, options?: AxiosRequestConfig) {
        return SelfMailersApiFp(this.configuration).selfMailersList(limit, before, after, include, dateCreated, metadata, size, scheduled, sendDate, mailType, sortBy, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
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

