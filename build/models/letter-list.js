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
exports.LetterList = void 0;
/**
 *
 * @export
 * @class LetterList
 */
var LetterList = /** @class */ (function () {
  function LetterList(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.data) !==
      "undefined"
    ) {
      this.data = input.data;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.object) !==
      "undefined"
    ) {
      this.object = input.object;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.next_url) !==
      "undefined"
    ) {
      this.next_url = input.next_url;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.previous_url) !== "undefined"
    ) {
      this.previous_url = input.previous_url;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.count) !==
      "undefined"
    ) {
      this.count = input.count;
    }
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.total_count) !== "undefined"
    ) {
      this.total_count = input.total_count;
    }
  }
  Object.defineProperty(LetterList.prototype, "nextPageToken", {
    get: function () {
      var _a;
      if (!this.next_url) {
        return undefined;
      }
      return (_a = this.next_url
        .split("?")[1]
        .split("&")
        .find(function (raw) {
          return raw.includes("after=");
        })) === null || _a === void 0
        ? void 0
        : _a.split("=")[1];
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(LetterList.prototype, "previousPageToken", {
    get: function () {
      var _a;
      if (!this.previous_url) {
        return undefined;
      }
      return (_a = this.previous_url
        .split("?")[1]
        .split("&")
        .find(function (raw) {
          return raw.includes("before=");
        })) === null || _a === void 0
        ? void 0
        : _a.split("=")[1];
    },
    enumerable: false,
    configurable: true,
  });
  return LetterList;
})();
exports.LetterList = LetterList;
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
