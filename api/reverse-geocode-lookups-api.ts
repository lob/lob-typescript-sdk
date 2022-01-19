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
import { Location } from '../models';
// @ts-ignore
import { ModelError } from '../models';
// @ts-ignore
import { ReverseGeocode } from '../models';
/**
 * ReverseGeocodeLookupsApi - axios parameter creator
 * @export
 */
export const ReverseGeocodeLookupsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Reverse geocode a valid US location with a live API key.
         * @summary lookup
         * @param {Location} location 
         * @param {number} [size] Determines the number of locations returned. Possible values are between 1 and 50 and any number higher will be rounded down to 50. Default size is a list of 5 reverse geocoded locations.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reverseGeocodeLookup: async (location: Location, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'location' is not null or undefined
            assertParamExists('reverseGeocodeLookup', 'location', location)
            const localVarPath = `/us_reverse_geocode_lookups`;
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

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(location, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReverseGeocodeLookupsApi - functional programming interface
 * @export
 */
export const ReverseGeocodeLookupsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReverseGeocodeLookupsApiAxiosParamCreator(configuration)
    return {
        /**
         * Reverse geocode a valid US location with a live API key.
         * @summary lookup
         * @param {Location} location 
         * @param {number} [size] Determines the number of locations returned. Possible values are between 1 and 50 and any number higher will be rounded down to 50. Default size is a list of 5 reverse geocoded locations.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reverseGeocodeLookup(location: Location, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ReverseGeocode>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reverseGeocodeLookup(location, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ReverseGeocodeLookupsApi - object-oriented interface
 * @export
 * @class ReverseGeocodeLookupsApi
 * @extends {BaseAPI}
 */
export class ReverseGeocodeLookupsApi extends BaseAPI {
    /**
     * Reverse geocode a valid US location with a live API key.
     * @summary lookup
     * @param {Location} location 
     * @param {number} [size] Determines the number of locations returned. Possible values are between 1 and 50 and any number higher will be rounded down to 50. Default size is a list of 5 reverse geocoded locations.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReverseGeocodeLookupsApi
     */
    public lookup(location: Location, size?: number, options?: AxiosRequestConfig) {
        return ReverseGeocodeLookupsApiFp(this.configuration).reverseGeocodeLookup(location, size, options).then((request) => request(this.axios, this.basePath))
            .then(function (response) {
                return new ReverseGeocode(response.data);
            }).catch(error => {
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

