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
 * @class TrackingEventNormal
 */
export class TrackingEventNormal {
  constructor(input?: any) {
    if (typeof input?.type !== "undefined") {
      this.type = input.type;
    }
    if (typeof input?.name !== "undefined") {
      this.name = input.name;
    }
    if (typeof input?.details !== "undefined") {
      this.details = input.details;
    }
    if (typeof input?.location !== "undefined") {
      this.location = input.location;
    }
    if (typeof input?.id !== "undefined") {
      this.id = input.id;
    }
    if (typeof input?.time !== "undefined") {
      this.time = input.time;
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
   * non-Certified postcards, self mailers, letters, and checks
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "type"?: TrackingEventNormalTypeEnum;

  /**
   * Name of tracking event (for normal postcards, self mailers, letters, and checks):    * `In Transit` - The mailpiece is being processed at the entry/origin facility.    * `In Local Area` - The mailpiece is being processed at the destination facility.    * `Processed for Delivery` - The mailpiece has been greenlit for     delivery at the recipient\'s nearest postal facility. The mailpiece     should reach the mailbox within 1 business day of this tracking     event.    * `Re-Routed` - The mailpiece is re-routed due to recipient change of     address, address errors, or USPS relabeling of barcode/ID tag     area.    * `Returned to Sender` - The mailpiece is being returned to sender due     to barcode, ID tag area, or address errors.    * `Mailed` - The mailpiece has been handed off to and accepted by USPS     and is en route. [More about     Mailed.](https://support.lob.com/hc/en-us/articles/360001724400-What-does-a-Mailed-tracking-event-mean-)     Note this data is only available in Enterprise editions of     Lob. [Contact Sales](https://lob.com/support/contact#contact) if     you want access to this feature.  [More about tracking](https://support.lob.com/hc/en-us/articles/115000097404-Can-I-track-my-mail-)
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "name"?: TrackingEventNormalNameEnum;

  /**
   * Will be `null` for `type=normal` events
   * @type {object}
   * @memberof TrackingEventNormal
   */
  "details"?: TrackingEventNormalDetailsEnum;

  /**
   * The zip code in which the scan event occurred. Null for `Mailed` events.
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "location"?: string | null;

  /**
   * Unique identifier prefixed with `evnt_`.
   * @type {string}
   * @memberof TrackingEventNormal
   */
  private "_id"?: string;
  public get id() {
    return (this._id || undefined) as string;
  }
  public set id(newValue: string) {
    if (newValue && !/^evnt_[a-zA-Z0-9]+$/.test(newValue)) {
      throw new Error("Invalid id provided");
    }
    this._id = newValue;
  }

  /**
   * A timestamp in ISO 8601 format of the date USPS registered the event.
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "time"?: string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was created.
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "date_created"?: string;

  /**
   * A timestamp in ISO 8601 format of the date the resource was last modified.
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "date_modified"?: string;

  /**
   *
   * @type {string}
   * @memberof TrackingEventNormal
   */
  "object"?: TrackingEventNormalObjectEnum;

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
export enum TrackingEventNormalTypeEnum {
  Normal = "normal",
}
/**
 * @export
 * @enum {string}
 */
export enum TrackingEventNormalNameEnum {
  InTransit = "In Transit",
  InLocalArea = "In Local Area",
  ProcessedForDelivery = "Processed for Delivery",
  ReRouted = "Re-Routed",
  ReturnedToSender = "Returned to Sender",
  Mailed = "Mailed",
}
/**
 * @export
 * @enum {string}
 */
export enum TrackingEventNormalDetailsEnum {
  Null = "null",
}
/**
 * @export
 * @enum {string}
 */
export enum TrackingEventNormalObjectEnum {
  TrackingEvent = "tracking_event",
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
