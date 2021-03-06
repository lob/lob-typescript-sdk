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
exports.PostcardTypes = void 0;
/**
 * Unique identifier referring to status of postcard
 * @export
 * @enum {string}
 */
var PostcardTypes;
(function (PostcardTypes) {
  PostcardTypes["Created"] = "postcard.created";
  PostcardTypes["RenderedPdf"] = "postcard.rendered_pdf";
  PostcardTypes["RenderedThumbnails"] = "postcard.rendered_thumbnails";
  PostcardTypes["Deleted"] = "postcard.deleted";
  PostcardTypes["Mailed"] = "postcard.mailed";
  PostcardTypes["InTransit"] = "postcard.in_transit";
  PostcardTypes["InLocalArea"] = "postcard.in_local_area";
  PostcardTypes["ProcessedForDelivery"] = "postcard.processed_for_delivery";
  PostcardTypes["ReRouted"] = "postcard.re-routed";
  PostcardTypes["ReturnedToSender"] = "postcard.returned_to_sender";
})((PostcardTypes = exports.PostcardTypes || (exports.PostcardTypes = {})));
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
