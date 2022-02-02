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
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.USVerificationsApi =
  exports.USVerificationsApiFp =
  exports.USVerificationsApiAxiosParamCreator =
    void 0;
var axios_1 = __importDefault(require("axios"));
// Some imports not used depending on template conditions
// @ts-ignore
var common_1 = require("../common");
// @ts-ignore
var base_1 = require("../base");
// @ts-ignore
var models_1 = require("../models");
// @ts-ignore
var models_2 = require("../models");
/**
 * USVerificationsApi - axios parameter creator
 * @export
 */
var USVerificationsApiAxiosParamCreator = function (configuration) {
  var _this = this;
  return {
    /**
     * Verify a list of US or US territory addresses with a live API key.
     * @summary verifyBulk
     * @param {MultipleComponentsList} multipleComponentsList
     * @param {'upper' | 'proper'} [_case] Casing of the verified address. Possible values are &#x60;upper&#x60; and &#x60;proper&#x60; for uppercased (e.g. \&quot;PO BOX\&quot;) and proper-cased (e.g. \&quot;PO Box\&quot;), respectively.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkUsVerifications: function (multipleComponentsList, _case, options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(_this, void 0, void 0, function () {
        var localVarPath,
          localVarUrlObj,
          baseOptions,
          localVarRequestOptions,
          localVarHeaderParameter,
          localVarQueryParameter,
          headersFromBaseOptions;
        return __generator(this, function (_a) {
          // verify required parameter 'multipleComponentsList' is not null or undefined
          (0,
          common_1.assertParamExists)("bulkUsVerifications", "multipleComponentsList", multipleComponentsList);
          localVarPath = "/bulk/us_verifications";
          localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          localVarRequestOptions = __assign(
            __assign({ method: "POST" }, baseOptions),
            options
          );
          localVarHeaderParameter = {};
          localVarQueryParameter = {};
          // authentication basicAuth required
          // http basic authentication required
          (0,
          common_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
          if (_case !== undefined) {
            localVarQueryParameter["case"] = _case;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
          headersFromBaseOptions =
            baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = __assign(
            __assign(
              __assign({}, localVarHeaderParameter),
              headersFromBaseOptions
            ),
            options.headers
          );
          localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(
            multipleComponentsList,
            localVarRequestOptions,
            configuration
          );
          return [
            2 /*return*/,
            {
              url: (0, common_1.toPathString)(localVarUrlObj),
              options: localVarRequestOptions,
            },
          ];
        });
      });
    },
    /**
     * Verify a US or US territory address with a live API key.
     * @summary verifySingle
     * @param {UsVerificationsWritable} usVerificationsWritable
     * @param {'upper' | 'proper'} [_case] Casing of the verified address. Possible values are &#x60;upper&#x60; and &#x60;proper&#x60; for uppercased (e.g. \&quot;PO BOX\&quot;) and proper-cased (e.g. \&quot;PO Box\&quot;), respectively.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    usVerification: function (usVerificationsWritable, _case, options) {
      if (options === void 0) {
        options = {};
      }
      return __awaiter(_this, void 0, void 0, function () {
        var localVarPath,
          localVarUrlObj,
          baseOptions,
          localVarRequestOptions,
          localVarHeaderParameter,
          localVarQueryParameter,
          headersFromBaseOptions;
        return __generator(this, function (_a) {
          // verify required parameter 'usVerificationsWritable' is not null or undefined
          (0,
          common_1.assertParamExists)("usVerification", "usVerificationsWritable", usVerificationsWritable);
          localVarPath = "/us_verifications";
          localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          localVarRequestOptions = __assign(
            __assign({ method: "POST" }, baseOptions),
            options
          );
          localVarHeaderParameter = {};
          localVarQueryParameter = {};
          // authentication basicAuth required
          // http basic authentication required
          (0,
          common_1.setBasicAuthToObject)(localVarRequestOptions, configuration);
          if (_case !== undefined) {
            localVarQueryParameter["case"] = _case;
          }
          localVarHeaderParameter["Content-Type"] = "application/json";
          (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
          headersFromBaseOptions =
            baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = __assign(
            __assign(
              __assign({}, localVarHeaderParameter),
              headersFromBaseOptions
            ),
            options.headers
          );
          localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(
            usVerificationsWritable,
            localVarRequestOptions,
            configuration
          );
          return [
            2 /*return*/,
            {
              url: (0, common_1.toPathString)(localVarUrlObj),
              options: localVarRequestOptions,
            },
          ];
        });
      });
    },
  };
};
exports.USVerificationsApiAxiosParamCreator =
  USVerificationsApiAxiosParamCreator;
/**
 * USVerificationsApi - functional programming interface
 * @export
 */
var USVerificationsApiFp = function (configuration) {
  var localVarAxiosParamCreator = (0,
  exports.USVerificationsApiAxiosParamCreator)(configuration);
  return {
    /**
     * Verify a list of US or US territory addresses with a live API key.
     * @summary verifyBulk
     * @param {MultipleComponentsList} multipleComponentsList
     * @param {'upper' | 'proper'} [_case] Casing of the verified address. Possible values are &#x60;upper&#x60; and &#x60;proper&#x60; for uppercased (e.g. \&quot;PO BOX\&quot;) and proper-cased (e.g. \&quot;PO Box\&quot;), respectively.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkUsVerifications: function (multipleComponentsList, _case, options) {
      return __awaiter(this, void 0, void 0, function () {
        var localVarAxiosArgs;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                localVarAxiosParamCreator.bulkUsVerifications(
                  multipleComponentsList,
                  _case,
                  options
                ),
              ];
            case 1:
              localVarAxiosArgs = _a.sent();
              return [
                2 /*return*/,
                (0, common_1.createRequestFunction)(
                  localVarAxiosArgs,
                  axios_1.default,
                  base_1.BASE_PATH,
                  configuration
                ),
              ];
          }
        });
      });
    },
    /**
     * Verify a US or US territory address with a live API key.
     * @summary verifySingle
     * @param {UsVerificationsWritable} usVerificationsWritable
     * @param {'upper' | 'proper'} [_case] Casing of the verified address. Possible values are &#x60;upper&#x60; and &#x60;proper&#x60; for uppercased (e.g. \&quot;PO BOX\&quot;) and proper-cased (e.g. \&quot;PO Box\&quot;), respectively.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    usVerification: function (usVerificationsWritable, _case, options) {
      return __awaiter(this, void 0, void 0, function () {
        var localVarAxiosArgs;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                localVarAxiosParamCreator.usVerification(
                  usVerificationsWritable,
                  _case,
                  options
                ),
              ];
            case 1:
              localVarAxiosArgs = _a.sent();
              return [
                2 /*return*/,
                (0, common_1.createRequestFunction)(
                  localVarAxiosArgs,
                  axios_1.default,
                  base_1.BASE_PATH,
                  configuration
                ),
              ];
          }
        });
      });
    },
  };
};
exports.USVerificationsApiFp = USVerificationsApiFp;
/**
 * USVerificationsApi - object-oriented interface
 * @export
 * @class USVerificationsApi
 * @extends {BaseAPI}
 */
var USVerificationsApi = /** @class */ (function (_super) {
  __extends(USVerificationsApi, _super);
  function USVerificationsApi() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Verify a list of US or US territory addresses with a live API key.
   * @summary verifyBulk
   * @param {MultipleComponentsList} multipleComponentsList
   * @param {'upper' | 'proper'} [_case] Casing of the verified address. Possible values are &#x60;upper&#x60; and &#x60;proper&#x60; for uppercased (e.g. \&quot;PO BOX\&quot;) and proper-cased (e.g. \&quot;PO Box\&quot;), respectively.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof USVerificationsApi
   */
  USVerificationsApi.prototype.verifyBulk = function (
    multipleComponentsList,
    _case,
    options
  ) {
    var _this = this;
    return (0, exports.USVerificationsApiFp)(this.configuration)
      .bulkUsVerifications(multipleComponentsList, _case, options)
      .then(function (request) {
        return request(_this.axios, _this.basePath);
      })
      .then(function (response) {
        return new models_2.UsVerifications(response.data);
      })
      .catch(function (error) {
        var _a, _b, _c;
        if (
          (_c =
            (_b =
              (_a = error.response) === null || _a === void 0
                ? void 0
                : _a.data) === null || _b === void 0
              ? void 0
              : _b.error) === null || _c === void 0
            ? void 0
            : _c.message
        ) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  };
  /**
   * Verify a US or US territory address with a live API key.
   * @summary verifySingle
   * @param {UsVerificationsWritable} usVerificationsWritable
   * @param {'upper' | 'proper'} [_case] Casing of the verified address. Possible values are &#x60;upper&#x60; and &#x60;proper&#x60; for uppercased (e.g. \&quot;PO BOX\&quot;) and proper-cased (e.g. \&quot;PO Box\&quot;), respectively.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof USVerificationsApi
   */
  USVerificationsApi.prototype.verifySingle = function (
    usVerificationsWritable,
    _case,
    options
  ) {
    var _this = this;
    return (0, exports.USVerificationsApiFp)(this.configuration)
      .usVerification(usVerificationsWritable, _case, options)
      .then(function (request) {
        return request(_this.axios, _this.basePath);
      })
      .then(function (response) {
        return new models_1.UsVerification(response.data);
      })
      .catch(function (error) {
        var _a, _b, _c;
        if (
          (_c =
            (_b =
              (_a = error.response) === null || _a === void 0
                ? void 0
                : _a.data) === null || _b === void 0
              ? void 0
              : _b.error) === null || _c === void 0
            ? void 0
            : _c.message
        ) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  };
  return USVerificationsApi;
})(base_1.BaseAPI);
exports.USVerificationsApi = USVerificationsApi;
/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
