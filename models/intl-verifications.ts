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

import { IntlVerificationOrError } from './intl-verification-or-error';

/**
 * 
 * @export
 * @class IntlVerifications
 */
export class IntlVerifications {
    constructor(input?: any) {
        if (typeof input?.addresses !== "undefined") {
            this.addresses = input.addresses;
        }
        if (typeof input?.errors !== "undefined") {
            this.errors = input.errors;
        }
    }

    /**
     * 
     * @type {Array<IntlVerificationOrError>}
     * @memberof IntlVerifications
     */


    private '_addresses'?: Models.IntlVerification[];
    private '_error_addresses'?: Models.BulkError[];
    public set addresses(items: (Models.IntlVerification[] | Models.BulkError[])) {
        if (!this._addresses) {
            this._addresses = [];
        }
        if (!this._error_addresses) {
            this._error_addresses = [];
        }
        for (const item of items) {
            if ((item as Models.IntlVerification).id) {
                this._addresses.push(new Models.IntlVerification(item));
            }
            if ((item as Models.BulkError).error) {
                this._error_addresses.push(new Models.BulkError(item));
            }
        }
    }
    public get addresses() {
        return this._addresses || [];
    }
    public get errorAddresses() {
        return this._error_addresses || [];
    }

    
    /**
     * Indicates whether any errors occurred during the verification process.
     * @type {boolean}
     * @memberof IntlVerifications
     */
    'errors': boolean;



    
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

