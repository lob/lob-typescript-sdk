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
exports.ZipLookupCity = void 0;
/**
 *
 * @export
 * @class ZipLookupCity
 */
var ZipLookupCity = /** @class */ (function () {
  function ZipLookupCity(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.city) !==
      "undefined"
    ) {
      this.city = input.city;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.state) !==
      "undefined"
    ) {
      this.state = input.state;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.county) !==
      "undefined"
    ) {
      this.county = input.county;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.county_fips) !== "undefined"
    ) {
      this.county_fips = input.county_fips;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.preferred) !==
      "undefined"
    ) {
      this.preferred = input.preferred;
    }
  }
  Object.defineProperty(ZipLookupCity.prototype, "county_fips", {
    get: function () {
      return this._county_fips || undefined;
    },
    set: function (newValue) {
      if (newValue && !/\d{5}/.test(newValue)) {
        throw new Error("Invalid county_fips provided");
      }
      this._county_fips = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  return ZipLookupCity;
})();
exports.ZipLookupCity = ZipLookupCity;
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
