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

import { CampaignCreative } from "./campaign-creative";
import { CmpScheduleType } from "./cmp-schedule-type";
import { CmpUseType } from "./cmp-use-type";

/**
 *
 * @export
 * @class Campaign
 */
export class Campaign {
  constructor(input?: any) {
    if (typeof input?.billing_group_id !== "undefined") {
      this.billing_group_id = input.billing_group_id;
    }
    if (typeof input?.name !== "undefined") {
      this.name = input.name;
    }
    if (typeof input?.description !== "undefined") {
      this.description = input.description;
    }
    if (typeof input?.schedule_type !== "undefined") {
      this.schedule_type = input.schedule_type;
    }
    if (typeof input?.target_delivery_date !== "undefined") {
      this.target_delivery_date = input.target_delivery_date;
    }
    if (typeof input?.send_date !== "undefined") {
      this.send_date = input.send_date;
    }
    if (typeof input?.cancel_window_campaign_minutes !== "undefined") {
      this.cancel_window_campaign_minutes =
        input.cancel_window_campaign_minutes;
    }
    if (typeof input?.metadata !== "undefined") {
      this.metadata = input.metadata;
    }
    if (typeof input?.use_type !== "undefined") {
      this.use_type = input.use_type;
    }
    if (typeof input?.auto_cancel_if_ncoa !== "undefined") {
      this.auto_cancel_if_ncoa = input.auto_cancel_if_ncoa;
    }
    if (typeof input?.id !== "undefined") {
      this.id = input.id;
    }
    if (typeof input?.account_id !== "undefined") {
      this.account_id = input.account_id;
    }
    if (typeof input?.is_draft !== "undefined") {
      this.is_draft = input.is_draft;
    }
    if (typeof input?.creatives !== "undefined") {
      this.creatives = input.creatives;
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
    if (typeof input?.object !== "undefined") {
      this.object = input.object;
    }
  }

  /**
   * Unique identifier prefixed with `bg_`.
   * @type {string}
   * @memberof Campaign
   */
  private "_billing_group_id"?: string | null;
  public get billing_group_id() {
    return (this._billing_group_id || null || undefined) as string;
  }
  public set billing_group_id(newValue: string | null) {
    if (newValue && !/^bg_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid billing_group_id provided");
    }
    this._billing_group_id = newValue;
  }

  /**
   * Name of the campaign.
   * @type {string}
   * @memberof Campaign
   */
  "name": string;

  /**
   * An internal description that identifies this resource. Must be no longer than 255 characters.
   * @type {string}
   * @memberof Campaign
   */
  "description"?: string | null;

  /**
   *
   * @type {CmpScheduleType}
   * @memberof Campaign
   */
  "schedule_type": CmpScheduleType;

  /**
   * If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.
   * @type {string}
   * @memberof Campaign
   */
  "target_delivery_date"?: string | null;

  /**
   * If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.
   * @type {string}
   * @memberof Campaign
   */
  "send_date"?: string | null;

  /**
   * A window, in minutes, within which the campaign can be canceled.
   * @type {number}
   * @memberof Campaign
   */
  "cancel_window_campaign_minutes"?: number | null;

  /**
   * Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. \'{\"customer_id\" : \"NEWYORK2015\"}\' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.
   * @type {{ [key: string]: string; }}
   * @memberof Campaign
   */
  "metadata"?: { [key: string]: string };

  /**
   *
   * @type {CmpUseType}
   * @memberof Campaign
   */
  "use_type": CmpUseType | null;

  /**
   * Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.
   * @type {boolean}
   * @memberof Campaign
   */
  "auto_cancel_if_ncoa": boolean;

  /**
   * Unique identifier prefixed with `cmp_`.
   * @type {string}
   * @memberof Campaign
   */
  private "_id": string;
  public get id() {
    return this._id;
  }
  public set id(newValue: string) {
    if (newValue && !/^cmp_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid id provided");
    }
    this._id = newValue;
  }

  /**
   * Account ID that this campaign is associated with.
   * @type {string}
   * @memberof Campaign
   */
  "account_id"?: string;

  /**
   * Whether or not the campaign is still a draft.
   * @type {boolean}
   * @memberof Campaign
   */
  "is_draft": boolean;

  /**
   * An array of creatives that have been associated with this campaign.
   * @type {Array<CampaignCreative>}
   * @memberof Campaign
   */
  "creatives": Array<CampaignCreative>;

  /**
   * A timestamp in ISO 8601 format of the date the resource was created.
   * @type {string}
   * @memberof Campaign
   */
  "date_created": string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was last modified.
   * @type {string}
   * @memberof Campaign
   */
  "date_modified": string;

  /**
   * Only returned if the resource has been successfully deleted.
   * @type {boolean}
   * @memberof Campaign
   */
  "deleted"?: boolean;

  /**
   * Value is resource type.
   * @type {string}
   * @memberof Campaign
   */
  "object": CampaignObjectEnum;

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
export enum CampaignObjectEnum {
  Campaign = "campaign",
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
