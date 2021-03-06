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

import { CountryExtendedExpanded } from "./country-extended-expanded";

/**
 *
 * @export
 * @class Address
 */
export class Address {
  constructor(input?: any) {
    if (typeof input?.id !== "undefined") {
      this.id = input.id;
    }
    if (typeof input?.description !== "undefined") {
      this.description = input.description;
    }
    if (typeof input?.name !== "undefined") {
      this.name = input.name;
    }
    if (typeof input?.company !== "undefined") {
      this.company = input.company;
    }
    if (typeof input?.phone !== "undefined") {
      this.phone = input.phone;
    }
    if (typeof input?.email !== "undefined") {
      this.email = input.email;
    }
    if (typeof input?.metadata !== "undefined") {
      this.metadata = input.metadata;
    }
    if (typeof input?.address_line1 !== "undefined") {
      this.address_line1 = input.address_line1;
    }
    if (typeof input?.address_line2 !== "undefined") {
      this.address_line2 = input.address_line2;
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
    if (typeof input?.address_country !== "undefined") {
      this.address_country = input.address_country;
    }
    if (typeof input?.object !== "undefined") {
      this.object = input.object;
    }
    if (typeof input?.date_created !== "undefined") {
      this.date_created = input.date_created;
    }
    if (typeof input?.date_modified !== "undefined") {
      this.date_modified = input.date_modified;
    }
    if (typeof input?.deleted !== "undefined") {
      this.deleted = input.deleted;
    }
    if (typeof input?.recipient_moved !== "undefined") {
      this.recipient_moved = input.recipient_moved;
    }
  }

  /**
   * Unique identifier prefixed with `adr_`.
   * @type {string}
   * @memberof Address
   */
  private "_id"?: string;
  public get id() {
    return (this._id || undefined) as string;
  }
  public set id(newValue: string) {
    if (newValue && !/^adr_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid id provided");
    }
    this._id = newValue;
  }

  /**
   * An internal description that identifies this resource. Must be no longer than 255 characters.
   * @type {string}
   * @memberof Address
   */
  "description"?: string | null;

  /**
   * name associated with address
   * @type {string}
   * @memberof Address
   */
  "name"?: string | null;

  /**
   * Either `name` or `company` is required, you may also add both.
   * @type {string}
   * @memberof Address
   */
  "company"?: string | null;

  /**
   * Must be no longer than 40 characters.
   * @type {string}
   * @memberof Address
   */
  "phone"?: string | null;

  /**
   * Must be no longer than 100 characters.
   * @type {string}
   * @memberof Address
   */
  "email"?: string | null;

  /**
   * Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. \'{\"customer_id\" : \"NEWYORK2015\"}\' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.
   * @type {{ [key: string]: string; }}
   * @memberof Address
   */
  "metadata"?: { [key: string]: string };

  /**
   *
   * @type {string}
   * @memberof Address
   */
  "address_line1"?: string;

  /**
   *
   * @type {string}
   * @memberof Address
   */
  "address_line2"?: string | null;

  /**
   *
   * @type {string}
   * @memberof Address
   */
  "address_city"?: string;

  /**
   * 2 letter state short-name code
   * @type {string}
   * @memberof Address
   */
  private "_address_state"?: string;
  public get address_state() {
    return (this._address_state || undefined) as string;
  }
  public set address_state(newValue: string) {
    if (newValue && !/^[a-zA-Z]{2}$/.test(newValue)) {
      throw new Error("Invalid address_state provided");
    }
    this._address_state = newValue;
  }

  /**
   * Must follow the ZIP format of `12345` or ZIP+4 format of `12345-1234`.
   * @type {string}
   * @memberof Address
   */
  private "_address_zip"?: string;
  public get address_zip() {
    return (this._address_zip || undefined) as string;
  }
  public set address_zip(newValue: string) {
    if (newValue && !/^\d{5}(-\d{4})?$/.test(newValue)) {
      throw new Error("Invalid address_zip provided");
    }
    this._address_zip = newValue;
  }

  /**
   *
   * @type {CountryExtendedExpanded}
   * @memberof Address
   */
  "address_country"?: CountryExtendedExpanded;

  /**
   *
   * @type {string}
   * @memberof Address
   */
  "object"?: AddressObjectEnum;

  /**
   * A timestamp in ISO 8601 format of the date the resource was created.
   * @type {string}
   * @memberof Address
   */
  "date_created"?: string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was last modified.
   * @type {string}
   * @memberof Address
   */
  "date_modified"?: string;

  /**
   * Only returned if the resource has been successfully deleted.
   * @type {boolean}
   * @memberof Address
   */
  "deleted"?: boolean;

  /**
   * Only returned for accounts on certain <a href=\"https://dashboard.lob.com/#/settings/editions\">Print &amp; Mail Editions</a>. Value is `true` if the address was altered because the recipient filed for a <a href=\"#ncoa\">National Change of Address (NCOA)</a>, `false` if the NCOA check was run but no altered address was found, and `null` if the NCOA check was not run. The NCOA check does not happen for non-US addresses, for non-deliverable US addresses, or for addresses created before the NCOA feature was added to your account.
   * @type {boolean}
   * @memberof Address
   */
  "recipient_moved"?: boolean | null;

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
export enum AddressObjectEnum {
  Address = "address",
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
