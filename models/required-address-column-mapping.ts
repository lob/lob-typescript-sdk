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

import * as Models from "./index";

/**
 * The mapping of column headers in your file to Lob-required fields for the resource created. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#required-columns-2\" target=\"_blank\">Campaign Audience Guide</a> for additional details.
 * @export
 * @class RequiredAddressColumnMapping
 */
export class RequiredAddressColumnMapping {
  constructor(input?: any) {
    if (typeof input?.name !== "undefined") {
      this.name = input.name;
    }
    if (typeof input?.address_line1 !== "undefined") {
      this.address_line1 = input.address_line1;
    }
    if (typeof input?.address_city !== "undefined") {
      this.address_city = input.address_city;
    }
    if (typeof input?.address_state !== "undefined") {
      this.address_state = input.address_state;
    }
    if (typeof input?.address_zip !== "undefined") {
      this.address_zip = input.address_zip;
    }
  }

  /**
   * The column header from the csv file that should be mapped to the required field `name`
   * @type {string}
   * @memberof RequiredAddressColumnMapping
   */
  "name": string | null;

  /**
   * The column header from the csv file that should be mapped to the required field `address_line1`
   * @type {string}
   * @memberof RequiredAddressColumnMapping
   */
  "address_line1": string | null;

  /**
   * The column header from the csv file that should be mapped to the required field `address_city`
   * @type {string}
   * @memberof RequiredAddressColumnMapping
   */
  "address_city": string | null;

  /**
   * The column header from the csv file that should be mapped to the required field `address_state`
   * @type {string}
   * @memberof RequiredAddressColumnMapping
   */
  "address_state": string | null;

  /**
   * The column header from the csv file that should be mapped to the required field `address_zip`
   * @type {string}
   * @memberof RequiredAddressColumnMapping
   */
  "address_zip": string | null;

  public toJSON() {
    let out = {};
    for (const [key, value] of Object.entries(this)) {
      out = Object.assign({}, out, {
        [key[0] === "_" ? key.substr(1, key.length) : key]: value,
      });
    }
    return out;
  }
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
