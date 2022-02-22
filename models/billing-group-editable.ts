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
 * @class BillingGroupEditable
 */
export class BillingGroupEditable {
  constructor(input?: any) {
    if (typeof input?.description !== "undefined") {
      this.description = input.description;
    }
    if (typeof input?.name !== "undefined") {
      this.name = input.name;
    }
  }

  /**
   * Description of the billing group.
   * @type {string}
   * @memberof BillingGroupEditable
   */
  "description"?: string;

  /**
   * Name of the billing group.
   * @type {string}
   * @memberof BillingGroupEditable
   */
  "name"?: string;
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
