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


import { MultipleComponents } from './multiple-components';

/**
 * 
 * @export
 * @interface MultipleComponentsList
 */
export class MultipleComponentsList {
    constructor(input?: any) {
        if (typeof input?.addresses !== "undefined") {
            this.addresses = input.addresses;
        }
    }

    /**
     * 
     * @type {Array<MultipleComponents>}
     * @memberof MultipleComponentsList
     */
    'addresses'?: Array<MultipleComponents>;
    
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

