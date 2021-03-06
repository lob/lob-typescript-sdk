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
exports.AddressObjectEnum = exports.Address = void 0;
/**
 *
 * @export
 * @class Address
 */
var Address = /** @class */ (function () {
  function Address(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.id) !==
      "undefined"
    ) {
      this.id = input.id;
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
      typeof (input === null || input === void 0 ? void 0 : input.object) !==
      "undefined"
    ) {
      this.object = input.object;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.date_created) !== "undefined"
    ) {
      this.date_created = input.date_created;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.date_modified) !== "undefined"
    ) {
      this.date_modified = input.date_modified;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.deleted) !==
      "undefined"
    ) {
      this.deleted = input.deleted;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.recipient_moved) !== "undefined"
    ) {
      this.recipient_moved = input.recipient_moved;
    }
  }
  Object.defineProperty(Address.prototype, "id", {
    get: function () {
      return this._id || undefined;
    },
    set: function (newValue) {
      if (newValue && !/^adr_[a-zA-Z0-9]+$/.test(newValue)) {
        throw new Error("Invalid id provided");
      }
      this._id = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Address.prototype, "address_state", {
    get: function () {
      return this._address_state || undefined;
    },
    set: function (newValue) {
      if (newValue && !/^[a-zA-Z]{2}$/.test(newValue)) {
        throw new Error("Invalid address_state provided");
      }
      this._address_state = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Address.prototype, "address_zip", {
    get: function () {
      return this._address_zip || undefined;
    },
    set: function (newValue) {
      if (newValue && !/^\d{5}(-\d{4})?$/.test(newValue)) {
        throw new Error("Invalid address_zip provided");
      }
      this._address_zip = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  return Address;
})();
exports.Address = Address;
/**
 * @export
 * @enum {string}
 */
var AddressObjectEnum;
(function (AddressObjectEnum) {
  AddressObjectEnum["Address"] = "address";
})(
  (AddressObjectEnum =
    exports.AddressObjectEnum || (exports.AddressObjectEnum = {}))
);
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
