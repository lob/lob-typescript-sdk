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



/**
 * 
 * @export
 * @class UsAutocompletionsWritable
 */
export class UsAutocompletionsWritable {
    constructor(input?: any) {
        if (typeof input?.address_prefix !== "undefined") {
            this.address_prefix = input.address_prefix;
        }
        if (typeof input?.city !== "undefined") {
            this.city = input.city;
        }
        if (typeof input?.state !== "undefined") {
            this.state = input.state;
        }
        if (typeof input?.zip_code !== "undefined") {
            this.zip_code = input.zip_code;
        }
        if (typeof input?.geo_ip_sort !== "undefined") {
            this.geo_ip_sort = input.geo_ip_sort;
        }
    }

    /**
     * Only accepts numbers and street names in an alphanumeric format. 
     * @type {string}
     * @memberof UsAutocompletionsWritable
     */
    'address_prefix'?: string;
    
    /**
     * An optional city input used to filter suggestions. Case insensitive and does not match partial abbreviations. 
     * @type {string}
     * @memberof UsAutocompletionsWritable
     */
    'city'?: string;
    
    /**
     * An optional state input used to filter suggestions. Case insensitive and does not match partial abbreviations. 
     * @type {string}
     * @memberof UsAutocompletionsWritable
     */
    'state'?: string;
    
    /**
     * An optional ZIP Code input used to filter suggestions. Matches partial entries. 
     * @type {string}
     * @memberof UsAutocompletionsWritable
     */
    'zip_code'?: string;
    
    /**
     * If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. 
     * @type {boolean}
     * @memberof UsAutocompletionsWritable
     */
    'geo_ip_sort'?: boolean;
    
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

