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

import { EngineHtml } from "./engine-html";

/**
 *
 * @export
 * @class TemplateVersionUpdatable
 */
export class TemplateVersionUpdatable {
  constructor(input?: any) {
    if (typeof input?.description !== "undefined") {
      this.description = input.description;
    }
    if (typeof input?.engine !== "undefined") {
      this.engine = input.engine;
    }
  }

  /**
   * An internal description that identifies this resource. Must be no longer than 255 characters.
   * @type {string}
   * @memberof TemplateVersionUpdatable
   */
  "description"?: string | null;

  /**
   *
   * @type {EngineHtml}
   * @memberof TemplateVersionUpdatable
   */
  "engine"?: EngineHtml | null;

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
