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
exports.SortBy1SendDateEnum =
  exports.SortBy1DateCreatedEnum =
  exports.SortBy1 =
    void 0;
/**
 *
 * @export
 * @class SortBy1
 */
var SortBy1 = /** @class */ (function () {
  function SortBy1(input) {
    if (
      typeof (input === null || input === void 0
        ? void 0
        : input.date_created) !== "undefined"
    ) {
      this.date_created = input.date_created;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.send_date) !==
      "undefined"
    ) {
      this.send_date = input.send_date;
    }
  }
  return SortBy1;
})();
exports.SortBy1 = SortBy1;
/**
 * @export
 * @enum {string}
 */
var SortBy1DateCreatedEnum;
(function (SortBy1DateCreatedEnum) {
  SortBy1DateCreatedEnum["Asc"] = "asc";
  SortBy1DateCreatedEnum["Desc"] = "desc";
})(
  (SortBy1DateCreatedEnum =
    exports.SortBy1DateCreatedEnum || (exports.SortBy1DateCreatedEnum = {}))
);
/**
 * @export
 * @enum {string}
 */
var SortBy1SendDateEnum;
(function (SortBy1SendDateEnum) {
  SortBy1SendDateEnum["Asc"] = "asc";
  SortBy1SendDateEnum["Desc"] = "desc";
})(
  (SortBy1SendDateEnum =
    exports.SortBy1SendDateEnum || (exports.SortBy1SendDateEnum = {}))
);
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
