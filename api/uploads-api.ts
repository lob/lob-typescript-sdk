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

import globalAxios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../configuration";
import FormData = require("form-data");
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
  valueToString,
} from "../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
// @ts-ignore
import { Export } from "../models";
// @ts-ignore
import { ExportModel } from "../models";
// @ts-ignore
import { HTTPValidationError } from "../models";
// @ts-ignore
import { LobError } from "../models";
// @ts-ignore
import { Upload } from "../models";
// @ts-ignore
import { UploadCreateExport } from "../models";
// @ts-ignore
import { UploadFile } from "../models";
// @ts-ignore
import { UploadList } from "../models";
// @ts-ignore
import { UploadUpdatable } from "../models";
// @ts-ignore
import { UploadWritable } from "../models";
/**
 * UploadsApi - axios parameter creator
 * @export
 */
export const UploadsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Retrieves the details of an existing export. You need only supply the unique export identifier that was returned upon export creation. If you try retrieving an export immediately after creating one (i.e., before we\'re done processing the export), you will get back an export object with `state = in_progress`.
     * @summary get_export
     * @param {string} uplId ID of the upload
     * @param {string} exId ID of the export
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exportRetrieve: async (
      uplId: string,
      exId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uplId' is not null or undefined
      assertParamExists("exportRetrieve", "uplId", uplId);
      // verify required parameter 'exId' is not null or undefined
      assertParamExists("exportRetrieve", "exId", exId);
      const localVarPath = `/uploads/{upl_id}/exports/{ex_id}`
        .replace(`{${"upl_id"}}`, encodeURIComponent(String(uplId)))
        .replace(`{${"ex_id"}}`, encodeURIComponent(String(exId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Creates a new upload with the provided properties.
     * @summary create_upload
     * @param {UploadWritable} uploadWritable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadCreate: async (
      uploadWritable: UploadWritable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uploadWritable' is not null or undefined
      assertParamExists("uploadCreate", "uploadWritable", uploadWritable);
      const localVarPath = `/uploads`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        uploadWritable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete an existing upload. You need only supply the unique identifier that was returned upon upload creation.
     * @summary delete_upload
     * @param {string} uplId id of the upload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadDelete: async (
      uplId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uplId' is not null or undefined
      assertParamExists("uploadDelete", "uplId", uplId);
      const localVarPath = `/uploads/{upl_id}`.replace(
        `{${"upl_id"}}`,
        encodeURIComponent(String(uplId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Campaign Exports can help you understand exactly which records in a campaign could not be created. By initiating and retrieving an export, you will get row-by-row errors for your campaign. For a step-by-step walkthrough of creating a campaign and exporting failures, see our [Campaigns Guide](https://help.lob.com/best-practices/launching-your-first-campaign).  Create an export file associated with an upload.
     * @summary create_export
     * @param {string} uplId ID of the upload
     * @param {ExportModel} exportModel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadExportCreate: async (
      uplId: string,
      exportModel: ExportModel,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uplId' is not null or undefined
      assertParamExists("uploadExportCreate", "uplId", uplId);
      // verify required parameter 'exportModel' is not null or undefined
      assertParamExists("uploadExportCreate", "exportModel", exportModel);
      const localVarPath = `/uploads/{upl_id}/exports`.replace(
        `{${"upl_id"}}`,
        encodeURIComponent(String(uplId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        exportModel,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Upload an [audience file](https://help.lob.com/best-practices/campaign-audience-guide) and associate it with an upload.
     * @summary upload_file
     * @param {string} uplId ID of the upload
     * @param {any} file
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadFileCreate: async (
      uplId: string,
      file: any,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uplId' is not null or undefined
      assertParamExists("uploadFileCreate", "uplId", uplId);
      // verify required parameter 'file' is not null or undefined
      assertParamExists("uploadFileCreate", "file", file);
      const localVarPath = `/uploads/{upl_id}/file`.replace(
        `{${"upl_id"}}`,
        encodeURIComponent(String(uplId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;
      const localVarFormParams = new ((configuration &&
        configuration.formDataCtor) ||
        FormData)();

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      if (file !== undefined) {
        localVarFormParams.append(
          "file",
          new Blob([JSON.stringify(file)], { type: "application/json" })
        );
      }

      localVarHeaderParameter["Content-Type"] = "multipart/form-data";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = localVarFormParams;

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves the details of an existing upload. You need only supply the unique upload identifier that was returned upon upload creation.
     * @summary get_upload
     * @param {string} uplId id of the upload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadRetrieve: async (
      uplId: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uplId' is not null or undefined
      assertParamExists("uploadRetrieve", "uplId", uplId);
      const localVarPath = `/uploads/{upl_id}`.replace(
        `{${"upl_id"}}`,
        encodeURIComponent(String(uplId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Update the details of an existing upload. You need only supply the unique identifier that was returned upon upload creation.
     * @summary update_upload
     * @param {string} uplId id of the upload
     * @param {UploadUpdatable} uploadUpdatable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadUpdate: async (
      uplId: string,
      uploadUpdatable: UploadUpdatable,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'uplId' is not null or undefined
      assertParamExists("uploadUpdate", "uplId", uplId);
      // verify required parameter 'uploadUpdatable' is not null or undefined
      assertParamExists("uploadUpdate", "uploadUpdatable", uploadUpdatable);
      const localVarPath = `/uploads/{upl_id}`.replace(
        `{${"upl_id"}}`,
        encodeURIComponent(String(uplId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "PATCH",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        uploadUpdatable,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of your uploads. Optionally, filter uploads by campaign.
     * @summary list_upload
     * @param {string} [campaignId] id of the campaign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadsList: async (
      campaignId?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/uploads`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication basicAuth required
      // http basic authentication required
      setBasicAuthToObject(localVarRequestOptions, configuration);

      if (campaignId !== undefined) {
        localVarQueryParameter["campaignId"] = campaignId;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * UploadsApi - functional programming interface
 * @export
 */
export const UploadsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = UploadsApiAxiosParamCreator(configuration);
  return {
    /**
     * Retrieves the details of an existing export. You need only supply the unique export identifier that was returned upon export creation. If you try retrieving an export immediately after creating one (i.e., before we\'re done processing the export), you will get back an export object with `state = in_progress`.
     * @summary get_export
     * @param {string} uplId ID of the upload
     * @param {string} exId ID of the export
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async exportRetrieve(
      uplId: string,
      exId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Export>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.exportRetrieve(
        uplId,
        exId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Creates a new upload with the provided properties.
     * @summary create_upload
     * @param {UploadWritable} uploadWritable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadCreate(
      uploadWritable: UploadWritable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Upload>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.uploadCreate(
        uploadWritable,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Delete an existing upload. You need only supply the unique identifier that was returned upon upload creation.
     * @summary delete_upload
     * @param {string} uplId id of the upload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadDelete(
      uplId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.uploadDelete(
        uplId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Campaign Exports can help you understand exactly which records in a campaign could not be created. By initiating and retrieving an export, you will get row-by-row errors for your campaign. For a step-by-step walkthrough of creating a campaign and exporting failures, see our [Campaigns Guide](https://help.lob.com/best-practices/launching-your-first-campaign).  Create an export file associated with an upload.
     * @summary create_export
     * @param {string} uplId ID of the upload
     * @param {ExportModel} exportModel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadExportCreate(
      uplId: string,
      exportModel: ExportModel,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<UploadCreateExport>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.uploadExportCreate(
          uplId,
          exportModel,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Upload an [audience file](https://help.lob.com/best-practices/campaign-audience-guide) and associate it with an upload.
     * @summary upload_file
     * @param {string} uplId ID of the upload
     * @param {any} file
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadFileCreate(
      uplId: string,
      file: any,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<UploadFile>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.uploadFileCreate(uplId, file, options);
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Retrieves the details of an existing upload. You need only supply the unique upload identifier that was returned upon upload creation.
     * @summary get_upload
     * @param {string} uplId id of the upload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadRetrieve(
      uplId: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Upload>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.uploadRetrieve(
        uplId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Update the details of an existing upload. You need only supply the unique identifier that was returned upon upload creation.
     * @summary update_upload
     * @param {string} uplId id of the upload
     * @param {UploadUpdatable} uploadUpdatable
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadUpdate(
      uplId: string,
      uploadUpdatable: UploadUpdatable,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Upload>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.uploadUpdate(
        uplId,
        uploadUpdatable,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Returns a list of your uploads. Optionally, filter uploads by campaign.
     * @summary list_upload
     * @param {string} [campaignId] id of the campaign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadsList(
      campaignId?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<UploadList>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.uploadsList(
        campaignId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * UploadsApi - object-oriented interface
 * @export
 * @class UploadsApi
 * @extends {BaseAPI}
 */
export class UploadsApi extends BaseAPI {
  /**
   * Retrieves the details of an existing export. You need only supply the unique export identifier that was returned upon export creation. If you try retrieving an export immediately after creating one (i.e., before we\'re done processing the export), you will get back an export object with `state = in_progress`.
   * @summary get_export
   * @param {string} uplId ID of the upload
   * @param {string} exId ID of the export
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public get_export(uplId: string, exId: string, options?: AxiosRequestConfig) {
    return UploadsApiFp(this.configuration)
      .exportRetrieve(uplId, exId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Export(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Creates a new upload with the provided properties.
   * @summary create_upload
   * @param {UploadWritable} uploadWritable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public create_upload(
    uploadWritable: UploadWritable,
    options?: AxiosRequestConfig
  ) {
    return UploadsApiFp(this.configuration)
      .uploadCreate(uploadWritable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Upload(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Delete an existing upload. You need only supply the unique identifier that was returned upon upload creation.
   * @summary delete_upload
   * @param {string} uplId id of the upload
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public delete_upload(uplId: string, options?: AxiosRequestConfig) {
    return UploadsApiFp(this.configuration)
      .uploadDelete(uplId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new response.data();
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Campaign Exports can help you understand exactly which records in a campaign could not be created. By initiating and retrieving an export, you will get row-by-row errors for your campaign. For a step-by-step walkthrough of creating a campaign and exporting failures, see our [Campaigns Guide](https://help.lob.com/best-practices/launching-your-first-campaign).  Create an export file associated with an upload.
   * @summary create_export
   * @param {string} uplId ID of the upload
   * @param {ExportModel} exportModel
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public create_export(
    uplId: string,
    exportModel: ExportModel,
    options?: AxiosRequestConfig
  ) {
    return UploadsApiFp(this.configuration)
      .uploadExportCreate(uplId, exportModel, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new UploadCreateExport(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Upload an [audience file](https://help.lob.com/best-practices/campaign-audience-guide) and associate it with an upload.
   * @summary upload_file
   * @param {string} uplId ID of the upload
   * @param {any} file
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public upload_file(uplId: string, file: any, options?: AxiosRequestConfig) {
    return UploadsApiFp(this.configuration)
      .uploadFileCreate(uplId, file, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new UploadFile(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Retrieves the details of an existing upload. You need only supply the unique upload identifier that was returned upon upload creation.
   * @summary get_upload
   * @param {string} uplId id of the upload
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public get_upload(uplId: string, options?: AxiosRequestConfig) {
    return UploadsApiFp(this.configuration)
      .uploadRetrieve(uplId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Upload(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Update the details of an existing upload. You need only supply the unique identifier that was returned upon upload creation.
   * @summary update_upload
   * @param {string} uplId id of the upload
   * @param {UploadUpdatable} uploadUpdatable
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public update_upload(
    uplId: string,
    uploadUpdatable: UploadUpdatable,
    options?: AxiosRequestConfig
  ) {
    return UploadsApiFp(this.configuration)
      .uploadUpdate(uplId, uploadUpdatable, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new Upload(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }

  /**
   * Returns a list of your uploads. Optionally, filter uploads by campaign.
   * @summary list_upload
   * @param {string} [campaignId] id of the campaign
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadsApi
   */
  public list_upload(campaignId?: string, options?: AxiosRequestConfig) {
    return UploadsApiFp(this.configuration)
      .uploadsList(campaignId, options)
      .then((request) => request(this.axios, this.basePath))
      .then(function (response) {
        return new UploadList(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.error?.message) {
          error.message = error.response.data.error.message;
        }
        throw error;
      });
  }
}

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
