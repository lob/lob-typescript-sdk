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
 * @class UploadFile
 */
export class UploadFile {
  constructor(input?: any) {
    if (typeof input?.message !== "undefined") {
      this.message = input.message;
    }
    if (typeof input?.filename !== "undefined") {
      this.filename = input.filename;
    }
  }

  /**
   *
   * @type {string}
   * @memberof UploadFile
   */
  "message": UploadFileMessageEnum;

  /**
   *
   * @type {string}
   * @memberof UploadFile
   */
  "filename": string;

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
export enum UploadFileMessageEnum {
  FileUploadedSuccessfully = "File uploaded successfully",
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
