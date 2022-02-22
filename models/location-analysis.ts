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
 * A nested object containing a breakdown of the analysis of a reverse geocoded location.
 * @export
 * @class LocationAnalysis
 */
export class LocationAnalysis {
  constructor(input?: any) {
    if (typeof input?.latitude !== "undefined") {
      this.latitude = input.latitude;
    }
    if (typeof input?.longitude !== "undefined") {
      this.longitude = input.longitude;
    }
    if (typeof input?.distance !== "undefined") {
      this.distance = input.distance;
    }
  }

  /**
   * A positive or negative decimal indicating the geographic latitude of the address.
   * @type {number}
   * @memberof LocationAnalysis
   */
  "latitude"?: number | null;

  /**
   * A positive or negative decimal indicating the geographic longitude of the address.
   * @type {number}
   * @memberof LocationAnalysis
   */
  "longitude"?: number | null;

  /**
   * The distance from the input location to this exact zip code in miles.
   * @type {number}
   * @memberof LocationAnalysis
   */
  "distance"?: number;
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
