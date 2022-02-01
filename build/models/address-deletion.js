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
exports.AddressDeletionObjectEnum = exports.AddressDeletion = void 0;
/**
 * Object returned upon deleting an address
 * @export
 * @class AddressDeletion
 */
var AddressDeletion = /** @class */ (function () {
  function AddressDeletion(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.id) !==
      "undefined"
    ) {
      this.id = input.id;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.deleted) !==
      "undefined"
    ) {
      this.deleted = input.deleted;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.object) !==
      "undefined"
    ) {
      this.object = input.object;
    }
  }
  Object.defineProperty(AddressDeletion.prototype, "id", {
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
  return AddressDeletion;
})();
exports.AddressDeletion = AddressDeletion;
/**
 * @export
 * @enum {string}
 */
var AddressDeletionObjectEnum;
(function (AddressDeletionObjectEnum) {
  AddressDeletionObjectEnum["AddressDeleted"] = "address_deleted";
})(
  (AddressDeletionObjectEnum =
    exports.AddressDeletionObjectEnum ||
    (exports.AddressDeletionObjectEnum = {}))
);
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
