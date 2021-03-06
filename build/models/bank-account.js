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
exports.BankAccountObjectEnum =
  exports.BankAccountAccountTypeEnum =
  exports.BankAccount =
    void 0;
/**
 *
 * @export
 * @class BankAccount
 */
var BankAccount = /** @class */ (function () {
  function BankAccount(input) {
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.description) !== "undefined"
    ) {
      this.description = input.description;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.routing_number) !== "undefined"
    ) {
      this.routing_number = input.routing_number;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.account_number) !== "undefined"
    ) {
      this.account_number = input.account_number;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.account_type) !== "undefined"
    ) {
      this.account_type = input.account_type;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.signatory) !==
      "undefined"
    ) {
      this.signatory = input.signatory;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.metadata) !==
      "undefined"
    ) {
      this.metadata = input.metadata;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.id) !==
      "undefined"
    ) {
      this.id = input.id;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.signature_url) !== "undefined"
    ) {
      this.signature_url = input.signature_url;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.bank_name) !==
      "undefined"
    ) {
      this.bank_name = input.bank_name;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.verified) !==
      "undefined"
    ) {
      this.verified = input.verified;
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
      typeof (input === null || input === void 0 ? void 0 : input.object) !==
      "undefined"
    ) {
      this.object = input.object;
    }
  }
  Object.defineProperty(BankAccount.prototype, "id", {
    get: function () {
      return this._id || undefined;
    },
    set: function (newValue) {
      if (newValue && !/^bank_[a-zA-Z0-9]+$/.test(newValue)) {
        throw new Error("Invalid id provided");
      }
      this._id = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(BankAccount.prototype, "signature_url", {
    get: function () {
      return this._signature_url || null || undefined;
    },
    set: function (newValue) {
      if (
        newValue &&
        !/^https:\/\/lob-assets\.com\/(letters|postcards|bank-accounts|checks|self-mailers|cards)\/[a-z]{3,4}_[a-z0-9]{15,16}(\.pdf|_thumb_[a-z]+_[0-9]+\.png)\?(version=[a-z0-9-]*&)?expires=[0-9]{10}&signature=[a-zA-Z0-9-_]+$/.test(
          newValue
        )
      ) {
        throw new Error("Invalid signature_url provided");
      }
      this._signature_url = newValue;
    },
    enumerable: false,
    configurable: true,
  });
  return BankAccount;
})();
exports.BankAccount = BankAccount;
/**
 * @export
 * @enum {string}
 */
var BankAccountAccountTypeEnum;
(function (BankAccountAccountTypeEnum) {
  BankAccountAccountTypeEnum["Company"] = "company";
  BankAccountAccountTypeEnum["Individual"] = "individual";
})(
  (BankAccountAccountTypeEnum =
    exports.BankAccountAccountTypeEnum ||
    (exports.BankAccountAccountTypeEnum = {}))
);
/**
 * @export
 * @enum {string}
 */
var BankAccountObjectEnum;
(function (BankAccountObjectEnum) {
  BankAccountObjectEnum["BankAccount"] = "bank_account";
})(
  (BankAccountObjectEnum =
    exports.BankAccountObjectEnum || (exports.BankAccountObjectEnum = {}))
);
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
