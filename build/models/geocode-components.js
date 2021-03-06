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
exports.GeocodeComponents = void 0;
/**
 * A nested object containing a breakdown of each component of a reverse geocoded response.
 * @export
 * @class GeocodeComponents
 */
var GeocodeComponents = /** @class */ (function () {
  function GeocodeComponents(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.zip_code) !==
      "undefined"
    ) {
      this.zip_code = input.zip_code;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.zip_code_plus_4) !== "undefined"
    ) {
      this.zip_code_plus_4 = input.zip_code_plus_4;
    }
  }
  Object.defineProperty(GeocodeComponents.prototype, "zip_code", {
    get: function () {
      return this._zip_code || undefined;
    },
    set: function (newValue) {
      if (newValue && !/^\d{5}$/.test(newValue)) {
        throw new Error("Invalid zip_code provided");
      }
      this._zip_code = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(GeocodeComponents.prototype, "zip_code_plus_4", {
    get: function () {
      return this._zip_code_plus_4 || undefined;
    },
    set: function (newValue) {
      if (newValue && !/^\d{4}$/.test(newValue)) {
        throw new Error("Invalid zip_code_plus_4 provided");
      }
      this._zip_code_plus_4 = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  return GeocodeComponents;
})();
exports.GeocodeComponents = GeocodeComponents;
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
