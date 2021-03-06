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
exports.CardEditableSizeEnum = exports.CardEditable = void 0;
/**
 *
 * @export
 * @class CardEditable
 */
var CardEditable = /** @class */ (function () {
  function CardEditable(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.front) !==
      "undefined"
    ) {
      this.front = input.front;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.back) !==
      "undefined"
    ) {
      this.back = input.back;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.size) !==
      "undefined"
    ) {
      this.size = input.size;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.description) !== "undefined"
    ) {
      this.description = input.description;
    }
  }
  return CardEditable;
})();
exports.CardEditable = CardEditable;
/**
 * @export
 * @enum {string}
 */
var CardEditableSizeEnum;
(function (CardEditableSizeEnum) {
  CardEditableSizeEnum["_3375x2125"] = "3.375x2.125";
  CardEditableSizeEnum["_2125x3375"] = "2.125x3.375";
})(
  (CardEditableSizeEnum =
    exports.CardEditableSizeEnum || (exports.CardEditableSizeEnum = {}))
);
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
