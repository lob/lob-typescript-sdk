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
exports.LobConfidenceScoreLevelEnum = exports.LobConfidenceScore = void 0;
/**
 * Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households.
 * @export
 * @class LobConfidenceScore
 */
var LobConfidenceScore = /** @class */ (function () {
  function LobConfidenceScore(input) {
    if (
      typeof (input === null || input === void 0 ? void 0 : input.score) !==
      "undefined"
    ) {
      this.score = input.score;
    }
    if (
      typeof (input === null || input === void 0 ? void 0 : input.level) !==
      "undefined"
    ) {
      this.level = input.level;
    }
  }
  return LobConfidenceScore;
})();
exports.LobConfidenceScore = LobConfidenceScore;
/**
 * @export
 * @enum {string}
 */
var LobConfidenceScoreLevelEnum;
(function (LobConfidenceScoreLevelEnum) {
  LobConfidenceScoreLevelEnum["High"] = "high";
  LobConfidenceScoreLevelEnum["Medium"] = "medium";
  LobConfidenceScoreLevelEnum["Low"] = "low";
  LobConfidenceScoreLevelEnum["Empty"] = "";
})(
  (LobConfidenceScoreLevelEnum =
    exports.LobConfidenceScoreLevelEnum ||
    (exports.LobConfidenceScoreLevelEnum = {}))
);
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
