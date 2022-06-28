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
 * @class BillingGroup
 */
export class BillingGroup {
  constructor(input?: any) {
    if (typeof input?.description !== "undefined") {
      this.description = input.description;
    }
    if (typeof input?.name !== "undefined") {
      this.name = input.name;
    }
    if (typeof input?.id !== "undefined") {
      this.id = input.id;
    }
    if (typeof input?.date_created !== "undefined") {
      this.date_created = input.date_created;
    }
    if (typeof input?.date_modified !== "undefined") {
      this.date_modified = input.date_modified;
    }
    if (typeof input?.object !== "undefined") {
      this.object = input.object;
    }
  }

  /**
   * Description of the billing group.
   * @type {string}
   * @memberof BillingGroup
   */
  "description"?: string;

  /**
   * Name of the billing group.
   * @type {string}
   * @memberof BillingGroup
   */
  "name"?: string;

  /**
   * Unique identifier prefixed with `bg_`.
   * @type {string}
   * @memberof BillingGroup
   */
  private "_id"?: string;
  public get id() {
    return (this._id || undefined) as string;
  }
  public set id(newValue: string) {
    if (newValue && !/^bg_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid id provided");
    }
    this._id = newValue;
  }

  /**
   * A timestamp in ISO 8601 format of the date the resource was created.
   * @type {string}
   * @memberof BillingGroup
   */
  "date_created"?: string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was last modified.
   * @type {string}
   * @memberof BillingGroup
   */
  "date_modified"?: string;

  /**
   * Value is resource type.
   * @type {string}
   * @memberof BillingGroup
   */
  "object"?: BillingGroupObjectEnum;

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
 * @export
 * @enum {string}
 */
export enum BillingGroupObjectEnum {
  BillingGroup = "billing_group",
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
