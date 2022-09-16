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
 *
 * @export
 * @class MultiLineAddress
 */
export class MultiLineAddress {
  constructor(input?: any) {
    if (typeof input?.recipient !== "undefined") {
      this.recipient = input.recipient;
    }
    if (typeof input?.company !== "undefined") {
      this.company = input.company;
    }
    if (typeof input?.primary_line !== "undefined") {
      this.primary_line = input.primary_line;
    }
    if (typeof input?.secondary_line !== "undefined") {
      this.secondary_line = input.secondary_line;
    }
    if (typeof input?.urbanization !== "undefined") {
      this.urbanization = input.urbanization;
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
  }

  /**
   * The intended recipient, typically a person\'s or firm\'s name.
   * @type {string}
   * @memberof MultiLineAddress
   */
  "recipient"?: string | null;

  /**
   * Either `name` or `company` is required, you may also add both.
   * @type {string}
   * @memberof MultiLineAddress
   */
  "company"?: string | null;

  /**
   * The primary delivery line (usually the street address) of the address. Combination of the following applicable `components`: * `primary_number` * `street_predirection` * `street_name` * `street_suffix` * `street_postdirection` * `secondary_designator` * `secondary_number` * `pmb_designator` * `pmb_number`
   * @type {string}
   * @memberof MultiLineAddress
   */
  "primary_line": string;

  /**
   * The secondary delivery line of the address. This field is typically empty but may contain information if `primary_line` is too long.
   * @type {string}
   * @memberof MultiLineAddress
   */
  "secondary_line"?: string;

  /**
   * Only present for addresses in Puerto Rico. An urbanization refers to an area, sector, or development within a city. See [USPS documentation](https://pe.usps.com/text/pub28/28api_008.htm#:~:text=I51.,-4%20Urbanizations&text=In%20Puerto%20Rico%2C%20identical%20street,placed%20before%20the%20urbanization%20name.) for clarification.
   * @type {string}
   * @memberof MultiLineAddress
   */
  "urbanization"?: string;

  /**
   *
   * @type {string}
   * @memberof MultiLineAddress
   */
  "city"?: string;

  /**
   * The <a href=\"https://en.wikipedia.org/wiki/ISO_3166-2:US\" target=\"_blank\">ISO 3166-2</a> two letter code or subdivision name for the state. `city` and `state` are required if no `zip_code` is passed.
   * @type {string}
   * @memberof MultiLineAddress
   */
  "state"?: string;

  /**
   * Required if `city` and `state` are not passed in. If included, must be formatted as a US ZIP or ZIP+4 (e.g. `94107`, `941072282`, `94107-2282`).
   * @type {string}
   * @memberof MultiLineAddress
   */
  private "_zip_code"?: string;
  public get zip_code() {
    return (this._zip_code || undefined) as string;
  }
  public set zip_code(newValue: string) {
    if (newValue && !/^\d{5}((-)?\d{4})?$/.test(newValue)) {
      throw new Error("Invalid zip_code provided");
    }
    this._zip_code = newValue;
  }

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
