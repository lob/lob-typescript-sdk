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
import { Template } from '../models';
// @ts-ignore
import { TemplateDeletion } from '../models';
// @ts-ignore
import { TemplateList } from '../models';
// @ts-ignore
import { TemplateUpdate } from '../models';
// @ts-ignore
import { TemplateWritable } from '../models';
/**
 * TemplatesApi - axios parameter creator
 * @export
 */
export const TemplatesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a new template for use with the Print & Mail API. In Live mode, you can only have as many non-deleted templates as allotted in your current [Print & Mail Edition](https://dashboard.lob.com/#/settings/editions). If you attempt to create a template past your limit, you will receive a `403` error. There is no limit in Test mode.
         * @summary create
         * @param {TemplateWritable} templateWritable 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTemplate: async (templateWritable: TemplateWritable, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'templateWritable' is not null or undefined
            assertParamExists('createTemplate', 'templateWritable', templateWritable)
            const localVarPath = `/templates`;
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(templateWritable, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Permanently deletes a template.
         * @summary delete
         * @param {string} tmplId id of the template
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        templateDelete: async (tmplId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tmplId' is not null or undefined
            assertParamExists('templateDelete', 'tmplId', tmplId)
            const localVarPath = `/templates/{tmpl_id}`
                .replace(`{${"tmpl_id"}}`, encodeURIComponent(String(tmplId)));
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
         * Retrieves the details of an existing template.
         * @summary get
         * @param {string} tmplId id of the template
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        templateRetrieve: async (tmplId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tmplId' is not null or undefined
            assertParamExists('templateRetrieve', 'tmplId', tmplId)
            const localVarPath = `/templates/{tmpl_id}`
                .replace(`{${"tmpl_id"}}`, encodeURIComponent(String(tmplId)));
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
         * Updates the description and/or published version of the template with the given id.
         * @summary update
         * @param {string} tmplId id of the template
         * @param {TemplateUpdate} templateUpdate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        templateUpdate: async (tmplId: string, templateUpdate: TemplateUpdate, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tmplId' is not null or undefined
            assertParamExists('templateUpdate', 'tmplId', tmplId)
            // verify required parameter 'templateUpdate' is not null or undefined
            assertParamExists('templateUpdate', 'templateUpdate', templateUpdate)
            const localVarPath = `/templates/{tmpl_id}`
                .replace(`{${"tmpl_id"}}`, encodeURIComponent(String(tmplId)));
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(templateUpdate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a list of your templates. The templates are returned sorted by creation date, with the most recently created templates appearing first.
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
        templatesList: async (limit?: number, before?: string, after?: string, include?: Array<string>, dateCreated?: { [key: string]: string; }, metadata?: { [key: string]: string; }, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/templates`;
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
 * TemplatesApi - functional programming interface
 * @export
 */
export const TemplatesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TemplatesApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a new template for use with the Print & Mail API. In Live mode, you can only have as many non-deleted templates as allotted in your current [Print & Mail Edition](https://dashboard.lob.com/#/settings/editions). If you attempt to create a template past your limit, you will receive a `403` error. There is no limit in Test mode.
         * @summary create
         * @param {TemplateWritable} templateWritable 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTemplate(templateWritable: TemplateWritable, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Template>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createTemplate(templateWritable, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Permanently deletes a template.
         * @summary delete
         * @param {string} tmplId id of the template
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async templateDelete(tmplId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TemplateDeletion>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.templateDelete(tmplId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the details of an existing template.
         * @summary get
         * @param {string} tmplId id of the template
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async templateRetrieve(tmplId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Template>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.templateRetrieve(tmplId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates the description and/or published version of the template with the given id.
         * @summary update
         * @param {string} tmplId id of the template
         * @param {TemplateUpdate} templateUpdate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async templateUpdate(tmplId: string, templateUpdate: TemplateUpdate, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Template>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.templateUpdate(tmplId, templateUpdate, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of your templates. The templates are returned sorted by creation date, with the most recently created templates appearing first.
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
        async templatesList(limit?: number, before?: string, after?: string, include?: Array<string>, dateCreated?: { [key: string]: string; }, metadata?: { [key: string]: string; }, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TemplateList>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.templatesList(limit, before, after, include, dateCreated, metadata, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TemplatesApi - object-oriented interface
 * @export
 * @class TemplatesApi
 * @extends {BaseAPI}
 */
export class TemplatesApi extends BaseAPI {
    /**
     * Creates a new template for use with the Print & Mail API. In Live mode, you can only have as many non-deleted templates as allotted in your current [Print & Mail Edition](https://dashboard.lob.com/#/settings/editions). If you attempt to create a template past your limit, you will receive a `403` error. There is no limit in Test mode.
     * @summary create
     * @param {TemplateWritable} templateWritable 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public create(templateWritable: TemplateWritable, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).createTemplate(templateWritable, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Permanently deletes a template.
     * @summary delete
     * @param {string} tmplId id of the template
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public delete(tmplId: string, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).templateDelete(tmplId, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Retrieves the details of an existing template.
     * @summary get
     * @param {string} tmplId id of the template
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public get(tmplId: string, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).templateRetrieve(tmplId, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Updates the description and/or published version of the template with the given id.
     * @summary update
     * @param {string} tmplId id of the template
     * @param {TemplateUpdate} templateUpdate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public update(tmplId: string, templateUpdate: TemplateUpdate, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).templateUpdate(tmplId, templateUpdate, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
            if (error.response?.data?.error?.message) {
                error.message = error.response.data.error.message;
            }
            throw error;
          });
    }

    /**
     * Returns a list of your templates. The templates are returned sorted by creation date, with the most recently created templates appearing first.
     * @summary list
     * @param {number} [limit] How many results to return.
     * @param {string} [before] A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the &#x60;previous_url&#x60; field in the return response. 
     * @param {string} [after] A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the &#x60;next_url&#x60; field in the return response. 
     * @param {Array<string>} [include] Request that the response include the total count by specifying &#x60;include[]&#x3D;total_count&#x60;. 
     * @param {{ [key: string]: string; }} [dateCreated] Filter by date created.
     * @param {{ [key: string]: string; }} [metadata] Filter by metadata key-value pair&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TemplatesApi
     */
    public list(limit?: number, before?: string, after?: string, include?: Array<string>, dateCreated?: { [key: string]: string; }, metadata?: { [key: string]: string; }, options?: AxiosRequestConfig) {
        return TemplatesApiFp(this.configuration).templatesList(limit, before, after, include, dateCreated, metadata, options).then((request) => request(this.axios, this.basePath)).then(function (response) { return response.data }).catch(error => {
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

