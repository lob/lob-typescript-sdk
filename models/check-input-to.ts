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


import { InlineAddressUs } from './inline-address-us';

/**
 * 
 * @export
 * @interface CheckInputTo
 */
export class CheckInputTo {
    /**
     * Must either be an address ID or an inline object with correct address parameters. Checks cannot be sent internationally (`address_country` must be `US`). The total string of the sum of `address_line1` and `address_line2` must be no longer than 50 characters combined. If an object is used, an address will be created, corrected, and standardized for free whenever possible using our US Address Verification engine, and returned back with an ID. Depending on your [Print & Mail Edition](https://dashboard.lob.com/#/settings/editions), addresses may also be run through [National Change of Address (NCOA)](https://lob.com/docs#ncoa). If an address used does not meet your account’s [US Mail Strictness Setting](https://dashboard.lob.com/#/settings/account), the request will fail. [More about verification of mailing addresses](https://www.lob.com/guides#mailing_addresses)
     * @type {string | InlineAddressUs}
     * @memberof CheckInputTo
     */
    'to'?: string | InlineAddressUs;
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

