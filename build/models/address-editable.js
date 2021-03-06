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
exports.AddressEditable = void 0;
/**
 *
 * @export
 * @class AddressEditable
 */
var AddressEditable = /** @class */ (function () {
  function AddressEditable(input) {
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.address_line1) !== "undefined"
    ) {
      this.address_line1 = input.address_line1;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.address_line2) !== "undefined"
    ) {
      this.address_line2 = input.address_line2;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.address_city) !== "undefined"
    ) {
      this.address_city = input.address_city;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.address_state) !== "undefined"
    ) {
      this.address_state = input.address_state;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.address_zip) !== "undefined"
    ) {
      this.address_zip = input.address_zip;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.address_country) !== "undefined"
    ) {
      this.address_country = input.address_country;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.description) !== "undefined"
    ) {
      this.description = input.description;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.name) !==
      "undefined"
    ) {
      this.name = input.name;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.company) !==
      "undefined"
    ) {
      this.company = input.company;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.phone) !==
      "undefined"
    ) {
      this.phone = input.phone;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.email) !==
      "undefined"
    ) {
      this.email = input.email;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.metadata) !==
      "undefined"
    ) {
      this.metadata = input.metadata;
    }
  }
  return AddressEditable;
})();
exports.AddressEditable = AddressEditable;
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
