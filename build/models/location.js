"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
/**
 *
 * @export
 * @class Location
 */
var Location = /** @class */ (function () {
  function Location(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.latitude) !==
      "undefined"
    ) {
      this.latitude = input.latitude;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.longitude) !==
      "undefined"
    ) {
      this.longitude = input.longitude;
    }
  }
  return Location;
})();
exports.Location = Location;
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
