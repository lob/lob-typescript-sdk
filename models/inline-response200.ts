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
 * Lob uses RESTful HTTP response codes to indicate success or failure of an API request. In general, 2xx indicates success, 4xx indicate an input error, and 5xx indicates an error on Lob\'s end.
 * @export
 * @class InlineResponse200
 */
export class InlineResponse200 {
  constructor(input?: any) {
    if (typeof input?.id !== "undefined") {
      this.id = input.id;
    }
    if (typeof input?.deleted !== "undefined") {
      this.deleted = input.deleted;
    }
  }

  /**
   * Unique identifier prefixed with `cmp_`.
   * @type {string}
   * @memberof InlineResponse200
   */
  private "_id"?: string;
  public get id() {
    return (this._id || undefined) as string;
  }
  public set id(newValue: string) {
    if (newValue && !/^cmp_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid id provided");
    }
    this._id = newValue;
  }

  /**
   * True if the resource has been successfully deleted.
   * @type {boolean}
   * @memberof InlineResponse200
   */
  "deleted"?: boolean;

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
