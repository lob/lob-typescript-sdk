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

import { IntlSuggestions } from './intl-suggestions';

/**
 * 
 * @export
 * @class IntlAutocompletions
 */
export class IntlAutocompletions {
    constructor(input?: any) {
        if (typeof input?.id !== "undefined") {
            this.id = input.id;
        }
        if (typeof input?.suggestions !== "undefined") {
            this.suggestions = input.suggestions;
        }
    }

    /**
     * Unique identifier prefixed with `intl_auto_`.
     * @type {string}
     * @memberof IntlAutocompletions
     */
    private '_id'?: string;
    public get id() { return (this._id || undefined) as string; }
    public set id(newValue: string) {
        if(newValue && !/^intl_auto_[a-zA-Z0-9]+$/.test(newValue)) {
            throw new Error("Invalid id provided");
        }
        this._id = newValue;
    }



    
    /**
     * An array of objects representing suggested addresses. 
     * @type {Array<IntlSuggestions>}
     * @memberof IntlAutocompletions
     */
    'suggestions'?: Array<IntlSuggestions>;



    
    public toJSON() {
        let out = {};
        for (const [key, value] of Object.entries(this)) {
            out = Object.assign({}, out, { [key[0] === '_' ? key.substr(1, key.length) : key]: value});
        }
        return out;
    }
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

