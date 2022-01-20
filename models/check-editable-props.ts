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


import { AddressDomestic } from './address-domestic';
import { CheckBottom } from './check-bottom';
import { SendDate } from './send-date';

/**
 * 
 * @export
 * @class CheckEditableProps
 */
export class CheckEditableProps {
    constructor(input?: any) {
        if (typeof input?.from !== "undefined") {
            this.from = input.from;
        }
        if (typeof input?.to !== "undefined") {
            this.to = input.to;
        }
        if (typeof input?.bank_account !== "undefined") {
            this.bank_account = input.bank_account;
        }
        if (typeof input?.amount !== "undefined") {
            this.amount = input.amount;
        }
        if (typeof input?.logo !== "undefined") {
            this.logo = input.logo;
        }
        if (typeof input?.check_bottom !== "undefined") {
            this.check_bottom = input.check_bottom;
        }
        if (typeof input?.attachment !== "undefined") {
            this.attachment = input.attachment;
        }
        if (typeof input?.description !== "undefined") {
            this.description = input.description;
        }
        if (typeof input?.metadata !== "undefined") {
            this.metadata = input.metadata;
        }
        if (typeof input?.merge_variables !== "undefined") {
            this.merge_variables = input.merge_variables;
        }
        if (typeof input?.send_date !== "undefined") {
            this.send_date = input.send_date;
        }
        if (typeof input?.mail_type !== "undefined") {
            this.mail_type = input.mail_type;
        }
        if (typeof input?.memo !== "undefined") {
            this.memo = input.memo;
        }
        if (typeof input?.check_number !== "undefined") {
            this.check_number = input.check_number;
        }
        if (typeof input?.message !== "undefined") {
            this.message = input.message;
        }
        if (typeof input?.billing_group_id !== "undefined") {
            this.billing_group_id = input.billing_group_id;
        }
    }

    /**
     * Required if `to` address is international. Must either be an address ID or an inline object with correct address parameters.
     * @type {string | AddressDomestic}
     * @memberof CheckEditableProps
     */
    'from'?: string | AddressDomestic;
    
    /**
     * Required if `to` address is international. Must either be an address ID or an inline object with correct address parameters.
     * @type {string | AddressDomestic}
     * @memberof CheckEditableProps
     */
    'to'?: string | AddressDomestic;
    
    /**
     * 
     * @type {string}
     * @memberof CheckEditableProps
     */
    'bank_account'?: string | null;
    
    /**
     * The payment amount to be sent in US dollars. Amounts will be rounded to two decimal places.
     * @type {number}
     * @memberof CheckEditableProps
     */
    'amount'?: number;
    
    /**
     * Accepts a remote URL or local file upload to an image to print (in grayscale) in the upper-left corner of your check. Image requirements:    * RGB or CMYK    * square    * minimum size: 100px x 100px    * transparent backgrond    * `png` or `jpg`
     * @type {string}
     * @memberof CheckEditableProps
     */
    'logo'?: string;
    
    /**
     * 
     * @type {CheckBottom}
     * @memberof CheckEditableProps
     */
    'check_bottom'?: CheckBottom;
    
    /**
     * A document to include with the check.  Notes: - HTML merge variables should not include delimiting whitespace. - All pages of PDF, PNG, and JPGs must be sized at 8.5\"x11\" at 300 DPI, while supplied HTML will be rendered and trimmed to as many 8.5\"x11\" pages as necessary. - If a PDF is provided, it must be 6 pages or fewer. - The attachment will be printed double-sided in black & white and will be included in the envelope after the check page. - Please follow these [design guidelines](https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/check_attachment_template.pdf).  See [pricing](https://lob.com/pricing/print-mail#compare) for extra costs incurred. Need more help? Consult our [HTML examples](#section/HTML-Examples).
     * @type {string}
     * @memberof CheckEditableProps
     */
    'attachment'?: string;
    
    /**
     * An internal description that identifies this resource. Must be no longer than 255 characters. 
     * @type {string}
     * @memberof CheckEditableProps
     */
    'description'?: string | null;
    
    /**
     * Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. \'{\"customer_id\" : \"NEWYORK2015\"}\' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.
     * @type {{ [key: string]: string; }}
     * @memberof CheckEditableProps
     */
    'metadata'?: { [key: string]: string; };
    
    /**
     * You can input a merge variable payload object to your template to render dynamic content. For example, if you have a template like: `{{variable_name}}`, pass in `{\"variable_name\": \"Harry\"}` to render `Harry`. `merge_variables` must be an object. Any type of value is accepted as long as the object is valid JSON; you can use `strings`, `numbers`, `booleans`, `arrays`, `objects`, or `null`. The max length of the object is 25,000 characters. If you call `JSON.stringify` on your object, it can be no longer than 25,000 characters. Your variable names cannot contain any whitespace or any of the following special characters: `!`, `\"`, `#`, `%`, `&`, `\'`, `(`, `)`, `*`, `+`, `,`, `/`, `;`, `<`, `=`, `>`, `@`, `[`, `\\`, `]`, `^`, `` ` ``, `{`, `|`, `}`, `~`. More instructions can be found in [our guide to using html and merge variables](https://lob.com/resources/guides/general/using-html-and-merge-variables). Depending on your [Merge Variable strictness](https://dashboard.lob.com/#/settings/account) setting, if you define variables in your HTML but do not pass them here, you will either receive an error or the variable will render as an empty string.
     * @type {object}
     * @memberof CheckEditableProps
     */
    'merge_variables'?: object | null;
    
    /**
     * 
     * @type {SendDate}
     * @memberof CheckEditableProps
     */
    'send_date'?: SendDate;
    
    /**
     * Checks must be sent `usps_first_class`
     * @type {string}
     * @memberof CheckEditableProps
     */
    'mail_type'?: CheckEditablePropsMailTypeEnum;
    
    /**
     * Text to include on the memo line of the check.
     * @type {string}
     * @memberof CheckEditableProps
     */
    'memo'?: string | null;
    
    /**
     * An integer that designates the check number. If `check_number` is not provided, checks created from a new `bank_account` will start at `10000` and increment with each check created with the `bank_account`. A provided `check_number` overrides the defaults. Subsequent checks created with the same `bank_account` will increment from the provided check number.
     * @type {number}
     * @memberof CheckEditableProps
     */
    'check_number'?: number;
    
    /**
     * Max of 400 characters to be included at the bottom of the check page.
     * @type {string}
     * @memberof CheckEditableProps
     */
    'message'?: string;
    
    /**
     * An optional string with the billing group ID to tag your usage with. Is used for billing purposes. Requires special activation to use. See [Billing Group API](https://lob.github.io/lob-openapi/#tag/Billing-Groups) for more information.
     * @type {string}
     * @memberof CheckEditableProps
     */
    'billing_group_id'?: string;
    
}

/**
    * @export
    * @enum {string}
    */
export enum CheckEditablePropsMailTypeEnum {
    UspsFirstClass = 'usps_first_class'
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

