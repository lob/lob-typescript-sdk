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
 * @class UsVerifications
 */
export class UsVerifications {
  constructor(input?: any) {
    if (typeof input?.addresses !== "undefined") {
      this.addresses = input.addresses;
    }
    if (typeof input?.errors !== "undefined") {
      this.errors = input.errors;
    }
  }

  /**
   *
   * @type {Array}
   * @memberof UsVerifications
   */

  private "_addresses"?: Models.UsVerification[];
  private "_error_addresses"?: Models.LobError[];
  public set addresses(items: Models.UsVerification[] | Models.LobError[]) {
    if (!this._addresses) {
      this._addresses = [];
    }
    if (!this._error_addresses) {
      this._error_addresses = [];
    }
    for (const item of items) {
      if ((item as Models.UsVerification).id) {
        this._addresses.push(new Models.UsVerification(item));
      }
      if ((item as Models.LobError).status_code) {
        this._error_addresses.push(new Models.LobError(item));
      }
    }
  }
  public get addresses() {
    return this._addresses || [];
  }
  public get errorAddresses() {
    return this._error_addresses || [];
  }

  /**
   * Indicates whether any errors occurred during the verification process.
   * @type {boolean}
   * @memberof UsVerifications
   */
  "errors"?: boolean;
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
