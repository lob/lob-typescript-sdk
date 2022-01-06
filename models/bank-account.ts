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



/**
 * 
 * @export
 * @interface BankAccount
 */
export interface BankAccount {
    /**
     * An internal description that identifies this resource. Must be no longer than 255 characters. 
     * @type {string}
     * @memberof BankAccount
     */
    'description'?: string | null;
    /**
     * Must be a [valid US routing number](https://www.frbservices.org/index.html).
     * @type {string}
     * @memberof BankAccount
     */
    'routing_number'?: string;
    /**
     * 
     * @type {string}
     * @memberof BankAccount
     */
    'account_number'?: string;
    /**
     * The type of entity that holds the account.
     * @type {string}
     * @memberof BankAccount
     */
    'account_type'?: BankAccountAccountTypeEnum;
    /**
     * The signatory associated with your account. This name will be printed on checks created with this bank account. If you prefer to use a custom signature image on your checks instead, please create your bank account from the [Dashboard](https://dashboard.lob.com/#/login).
     * @type {string}
     * @memberof BankAccount
     */
    'signatory'?: string;
    /**
     * Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. \'{\"customer_id\" : \"NEWYORK2015\"}\' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.
     * @type {{ [key: string]: string; }}
     * @memberof BankAccount
     */
    'metadata'?: { [key: string]: string; };
    /**
     * Unique identifier prefixed with `bank_`.
     * @type {string}
     * @memberof BankAccount
     */
    'id'?: string;
    /**
     * A signed link to the signature image. will be generated.
     * @type {string}
     * @memberof BankAccount
     */
    'signature_url'?: string | null;
    /**
     * The name of the bank based on the provided routing number, e.g. `JPMORGAN CHASE BANK`.
     * @type {string}
     * @memberof BankAccount
     */
    'bank_name'?: string;
    /**
     * A bank account must be verified before a check can be created.
     * @type {boolean}
     * @memberof BankAccount
     */
    'verified'?: boolean;
    /**
     * A timestamp in ISO 8601 format of the date the resource was created.
     * @type {string}
     * @memberof BankAccount
     */
    'date_created'?: string;
    /**
     * A timestamp in ISO 8601 format of the date the resource was last modified.
     * @type {string}
     * @memberof BankAccount
     */
    'date_modified'?: string;
    /**
     * Only returned if the resource has been successfully deleted.
     * @type {boolean}
     * @memberof BankAccount
     */
    'deleted'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BankAccount
     */
    'object'?: BankAccountObjectEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum BankAccountAccountTypeEnum {
    Company = 'company',
    Individual = 'individual'
}
/**
    * @export
    * @enum {string}
    */
export enum BankAccountObjectEnum {
    BankAccount = 'bank_account'
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

