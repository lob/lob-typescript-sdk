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

import { CountryExtended } from "./country-extended";

/**
 *
 * @export
 * @class IntlAutocompletionsWritable
 */
export class IntlAutocompletionsWritable {
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
    if (typeof input?.country !== "undefined") {
      this.country = input.country;
    }
  }

  /**
   * Only accepts numbers and street names in an alphanumeric format.
   * @type {string}
   * @memberof IntlAutocompletionsWritable
   */
  "address_prefix": string;

  /**
   * An optional city input used to filter suggestions. Case insensitive and does not match partial abbreviations.
   * @type {string}
   * @memberof IntlAutocompletionsWritable
   */
  "city"?: string;

  /**
   * An optional state input used to filter suggestions. Case insensitive and does not match partial abbreviations.
   * @type {string}
   * @memberof IntlAutocompletionsWritable
   */
  "state"?: string;

  /**
   * An optional Zip Code input used to filter suggestions. Matches partial entries.
   * @type {string}
   * @memberof IntlAutocompletionsWritable
   */
  "zip_code"?: string;

  /**
   *
   * @type {CountryExtended}
   * @memberof IntlAutocompletionsWritable
   */
  "country": CountryExtended;

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
