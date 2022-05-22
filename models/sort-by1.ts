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


import * as Models from './index';


/**
 * 
 * @export
 * @class SortBy1
 */
export class SortBy1 {
    constructor(input?: any) {
        if (typeof input?.date_created !== "undefined") {
            this.date_created = input.date_created;
        }
        if (typeof input?.send_date !== "undefined") {
            this.send_date = input.send_date;
        }
    }

    /**
     * 
     * @type {string}
     * @memberof SortBy1
     */
    'date_created'?: SortBy1DateCreatedEnum;



    
    /**
     * 
     * @type {string}
     * @memberof SortBy1
     */
    'send_date'?: SortBy1SendDateEnum;



    
    public toJSON() {
        let out = {};
        for (const [key, value] of Object.entries(this)) {
            out = Object.assign({}, out, { [key[0] === '_' ? key.substr(1, key.length) : key]: value});
        }
        return out;
    }
}

/**
    * @export
    * @enum {string}
    */
export enum SortBy1DateCreatedEnum {
    Asc = 'asc',
    Desc = 'desc'
}
/**
    * @export
    * @enum {string}
    */
export enum SortBy1SendDateEnum {
    Asc = 'asc',
    Desc = 'desc'
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

