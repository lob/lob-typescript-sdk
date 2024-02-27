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

import { Address } from "./address";
import { LetterCustomEnvelope } from "./letter-custom-envelope";
import { LtrUseType } from "./ltr-use-type";
import { MailType } from "./mail-type";
import { Thumbnail } from "./thumbnail";
import { TrackingEventNormal } from "./tracking-event-normal";

/**
 *
 * @export
 * @class Letter
 */
export class Letter {
  constructor(input?: any) {
    if (typeof input?.to !== "undefined") {
      this.to = input.to;
    }
    if (typeof input?.from !== "undefined") {
      this.from = input.from;
    }
    if (typeof input?.carrier !== "undefined") {
      this.carrier = input.carrier;
    }
    if (typeof input?.thumbnails !== "undefined") {
      this.thumbnails = input.thumbnails;
    }
    if (typeof input?.expected_delivery_date !== "undefined") {
      this.expected_delivery_date = input.expected_delivery_date;
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
    if (typeof input?.id !== "undefined") {
      this.id = input.id;
    }
    if (typeof input?.template_id !== "undefined") {
      this.template_id = input.template_id;
    }
    if (typeof input?.template_version_id !== "undefined") {
      this.template_version_id = input.template_version_id;
    }
    if (typeof input?.url !== "undefined") {
      this.url = input.url;
    }
    if (typeof input?.object !== "undefined") {
      this.object = input.object;
    }
    if (typeof input?.description !== "undefined") {
      this.description = input.description;
    }
    if (typeof input?.metadata !== "undefined") {
      this.metadata = input.metadata;
    }
    if (typeof input?.merge_variables !== "undefined") {
      this.merge_variables = input.merge_variables;
    }
    if (typeof input?.send_date !== "undefined") {
      this.send_date = input.send_date;
    }
    if (typeof input?.extra_service !== "undefined") {
      this.extra_service = input.extra_service;
    }
    if (typeof input?.tracking_number !== "undefined") {
      this.tracking_number = input.tracking_number;
    }
    if (typeof input?.tracking_events !== "undefined") {
      this.tracking_events = input.tracking_events;
    }
    if (typeof input?.return_address !== "undefined") {
      this.return_address = input.return_address;
    }
    if (typeof input?.mail_type !== "undefined") {
      this.mail_type = input.mail_type;
    }
    if (typeof input?.color !== "undefined") {
      this.color = input.color;
    }
    if (typeof input?.double_sided !== "undefined") {
      this.double_sided = input.double_sided;
    }
    if (typeof input?.address_placement !== "undefined") {
      this.address_placement = input.address_placement;
    }
    if (typeof input?.return_envelope !== "undefined") {
      this.return_envelope = input.return_envelope;
    }
    if (typeof input?.perforated_page !== "undefined") {
      this.perforated_page = input.perforated_page;
    }
    if (typeof input?.custom_envelope !== "undefined") {
      this.custom_envelope = input.custom_envelope;
    }
    if (typeof input?.campaign_id !== "undefined") {
      this.campaign_id = input.campaign_id;
    }
    if (typeof input?.use_type !== "undefined") {
      this.use_type = input.use_type;
    }
  }

  /**
   *
   * @type {Address}
   * @memberof Letter
   */
  "to": Address;

  /**
   *
   * @type {Address}
   * @memberof Letter
   */
  "from": Address;

  /**
   *
   * @type {string}
   * @memberof Letter
   */
  "carrier"?: LetterCarrierEnum;

  /**
   *
   * @type {Array<Thumbnail>}
   * @memberof Letter
   */
  "thumbnails"?: Array<Thumbnail>;

  /**
   * A date in YYYY-MM-DD format of the mailpiece\'s expected delivery date based on its `send_date`.
   * @type {string}
   * @memberof Letter
   */
  "expected_delivery_date"?: string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was created.
   * @type {string}
   * @memberof Letter
   */
  "date_created": string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was last modified.
   * @type {string}
   * @memberof Letter
   */
  "date_modified": string;

  /**
   * Only returned if the resource has been successfully deleted.
   * @type {boolean}
   * @memberof Letter
   */
  "deleted"?: boolean;

  /**
   * Unique identifier prefixed with `ltr_`.
   * @type {string}
   * @memberof Letter
   */
  private "_id": string;
  public get id() {
    return this._id;
  }
  public set id(newValue: string) {
    if (newValue && !/^ltr_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid id provided");
    }
    this._id = newValue;
  }

  /**
   * Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).
   * @type {string}
   * @memberof Letter
   */
  private "_template_id"?: string;
  public get template_id() {
    return (this._template_id || undefined) as string;
  }
  public set template_id(newValue: string) {
    if (newValue && !/^tmpl_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid template_id provided");
    }
    this._template_id = newValue;
  }

  /**
   * Unique identifier prefixed with `vrsn_`.
   * @type {string}
   * @memberof Letter
   */
  private "_template_version_id"?: string;
  public get template_version_id() {
    return (this._template_version_id || undefined) as string;
  }
  public set template_version_id(newValue: string) {
    if (newValue && !/^vrsn_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid template_version_id provided");
    }
    this._template_version_id = newValue;
  }

  /**
   * A [signed link](#section/Asset-URLs) served over HTTPS. The link returned will expire in 30 days to prevent mis-sharing. Each time a GET request is initiated, a new signed URL will be generated.
   * @type {string}
   * @memberof Letter
   */
  private "_url"?: string;
  public get url() {
    return (this._url || undefined) as string;
  }
  public set url(newValue: string) {
    if (
      newValue &&
      !/^https:\/\/lob-assets.com\/(letters|postcards|bank-accounts|checks|self-mailers|cards)\/[a-z]{3,4}_[a-z0-9]{15,16}(_signature)?(\.pdf|_thumb_[a-z]+_[0-9]+\.png|\.png)\?(version=[a-z0-9]*&)expires=[0-9]{10}&signature=[a-zA-Z0-9-_]+/.test(
        newValue
      )
    ) {
      throw new Error("Invalid url provided");
    }
    this._url = newValue;
  }

  /**
   *
   * @type {string}
   * @memberof Letter
   */
  "object": LetterObjectEnum;

  /**
   * An internal description that identifies this resource. Must be no longer than 255 characters.
   * @type {string}
   * @memberof Letter
   */
  "description"?: string | null;

  /**
   * Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. \'{\"customer_id\" : \"NEWYORK2015\"}\' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.
   * @type {{ [key: string]: string; }}
   * @memberof Letter
   */
  "metadata"?: { [key: string]: string };

  /**
   * You can input a merge variable payload object to your template to render dynamic content. For example, if you have a template like: `{{variable_name}}`, pass in `{\"variable_name\": \"Harry\"}` to render `Harry`. `merge_variables` must be an object. Any type of value is accepted as long as the object is valid JSON; you can use `strings`, `numbers`, `booleans`, `arrays`, `objects`, or `null`. The max length of the object is 25,000 characters. If you call `JSON.stringify` on your object, it can be no longer than 25,000 characters. Your variable names cannot contain any whitespace or any of the following special characters: `!`, `\"`, `#`, `%`, `&`, `\'`, `(`, `)`, `*`, `+`, `,`, `/`, `;`, `<`, `=`, `>`, `@`, `[`, `\\`, `]`, `^`, `` ` ``, `{`, `|`, `}`, `~`. More instructions can be found in [our guide to using html and merge variables](https://lob.com/resources/guides/general/using-html-and-merge-variables). Depending on your [Merge Variable strictness](https://dashboard.lob.com/#/settings/account) setting, if you define variables in your HTML but do not pass them here, you will either receive an error or the variable will render as an empty string.
   * @type {object}
   * @memberof Letter
   */
  "merge_variables"?: object | null;

  /**
   * A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. Setting a send date overrides the default [cancellation window](#section/Cancellation-Windows) applied to the mailpiece. Until the `send_date` has passed, the mailpiece can be canceled. If a date in the format `2017-11-01` is passed, it will evaluate to midnight UTC of that date (`2017-11-01T00:00:00.000Z`). If a datetime is passed, that exact time will be used. A `send_date` passed with no time zone will default to UTC, while a `send_date` passed with a time zone will be converted to UTC.
   * @type {string}
   * @memberof Letter
   */
  "send_date"?: string;

  /**
   * Add an extra service to your letter. See [pricing](https://www.lob.com/pricing/print-mail#compare) for extra costs incurred.
   * @type {string}
   * @memberof Letter
   */
  "extra_service"?: string;

  /**
   * The tracking number, if applicable, will appear here when it becomes available. Dummy tracking numbers are not created in test mode.
   * @type {string}
   * @memberof Letter
   */
  "tracking_number"?: string | null;

  /**
   * Tracking events are not populated for registered or regular (no extra service) letters.
   * @type {Array<TrackingEventNormal>}
   * @memberof Letter
   */
  "tracking_events"?: Array<TrackingEventNormal>;

  /**
   * Specifies the address the return envelope will be sent back to. This is an optional argument that is available if an account is signed up for the return envelope tracking beta, and has `return_envelope`, and `perforated_page` fields populated in the API request.
   * @type {any}
   * @memberof Letter
   */

  "return_address"?: string | Models.AddressEditable | null;

  /**
   *
   * @type {MailType}
   * @memberof Letter
   */
  "mail_type"?: MailType;

  /**
   * Set this key to `true` if you would like to print in color. Set to `false` if you would like to print in black and white.
   * @type {boolean}
   * @memberof Letter
   */
  "color"?: boolean;

  /**
   * Set this attribute to `true` for double sided printing, or `false` for for single sided printing. Defaults to `true`.
   * @type {boolean}
   * @memberof Letter
   */
  "double_sided"?: boolean;

  /**
   * Specifies the location of the address information that will show through the double-window envelope.
   * @type {string}
   * @memberof Letter
   */
  "address_placement"?: LetterAddressPlacementEnum;

  /**
   *
   * @type {any}
   * @memberof Letter
   */

  "return_envelope": boolean | Models.ReturnEnvelope | null;

  /**
   * Required if `return_envelope` is `true`. The number of the page that should be perforated for use with the return envelope. Must be greater than or equal to `1`. The blank page added by `address_placement=insert_blank_page` will be ignored when considering the perforated page number. To see how perforation will impact your letter design, view our [perforation guide](https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/letter_perf_template.pdf).
   * @type {number}
   * @memberof Letter
   */
  "perforated_page"?: number | null;

  /**
   *
   * @type {LetterCustomEnvelope}
   * @memberof Letter
   */
  "custom_envelope"?: LetterCustomEnvelope | null;

  /**
   * The unique ID of the associated campaign if the resource was generated from a campaign.
   * @type {string}
   * @memberof Letter
   */
  "campaign_id"?: string | null;

  /**
   *
   * @type {LtrUseType}
   * @memberof Letter
   */
  "use_type": LtrUseType | null;

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
export enum LetterCarrierEnum {
  Usps = "USPS",
}
/**
 * @export
 * @enum {string}
 */
export enum LetterObjectEnum {
  Letter = "letter",
}
/**
 * @export
 * @enum {string}
 */
export enum LetterAddressPlacementEnum {
  TopFirstPage = "top_first_page",
  InsertBlankPage = "insert_blank_page",
  BottomFirstPageCenter = "bottom_first_page_center",
  BottomFirstPage = "bottom_first_page",
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
