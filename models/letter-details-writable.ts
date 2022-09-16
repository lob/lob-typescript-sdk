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


import * as Models from './index';

import { MailType } from './mail-type';

/**
 * Properties that the letters in your Creative should have.
 * @export
 * @class LetterDetailsWritable
 */
export class LetterDetailsWritable {
    constructor(input?: any) {
        if (typeof input?.address_placement !== "undefined") {
            this.address_placement = input.address_placement;
        }
        if (typeof input?.cards !== "undefined") {
            this.cards = input.cards;
        }
        if (typeof input?.color !== "undefined") {
            this.color = input.color;
        }
        if (typeof input?.double_sided !== "undefined") {
            this.double_sided = input.double_sided;
        }
        if (typeof input?.extra_service !== "undefined") {
            this.extra_service = input.extra_service;
        }
        if (typeof input?.mail_type !== "undefined") {
            this.mail_type = input.mail_type;
        }
        if (typeof input?.return_envelope !== "undefined") {
            this.return_envelope = input.return_envelope;
        }
        if (typeof input?.custom_envelope !== "undefined") {
            this.custom_envelope = input.custom_envelope;
        }
    }

    /**
     * Specifies the location of the address information that will show through the double-window envelope. 
     * @type {string}
     * @memberof LetterDetailsWritable
     */
    'address_placement'?: LetterDetailsWritableAddressPlacementEnum;



    
    /**
     * A single-element array containing an existing card id in a string format. See [cards](#tag/Cards) for more information.
     * @type {Array<string>}
     * @memberof LetterDetailsWritable
     */
    'cards': Array<string> | null;



    
    /**
     * Set this key to `true` if you would like to print in color. Set to `false` if you would like to print in black and white.
     * @type {boolean}
     * @memberof LetterDetailsWritable
     */
    'color': boolean;



    
    /**
     * Set this attribute to `true` for double sided printing, or `false` for for single sided printing. Defaults to `true`.
     * @type {boolean}
     * @memberof LetterDetailsWritable
     */
    'double_sided'?: boolean;



    
    /**
     * Add an extra service to your letter.
     * @type {string}
     * @memberof LetterDetailsWritable
     */
    'extra_service'?: string;



    
    /**
     * 
     * @type {MailType}
     * @memberof LetterDetailsWritable
     */
    'mail_type'?: MailType;



    
    /**
     * 
     * @type {boolean}
     * @memberof LetterDetailsWritable
     */
    'return_envelope'?: boolean;



    
    /**
     * Accepts an envelope ID for any customized envelope with available inventory.
     * @type {string}
     * @memberof LetterDetailsWritable
     */
    private '_custom_envelope'?: string | null;
    public get custom_envelope() { return (this._custom_envelope || null || undefined) as string; }
    public set custom_envelope(newValue: string | null) {
        if(newValue && !/^env_[a-zA-Z0-9]+$/.test(newValue)) {
            throw new Error("Invalid custom_envelope provided");
        }
        this._custom_envelope = newValue;
    }



    
    public toJSON() {
        let out = {};
        for (const [key, value] of Object.entries(this)) {
            out = Object.assign({}, out, { [key[0] === '_' ? key.substr(1, key.length) : key]: value});
        }
        return out;
    }
}

/**
    * @export
    * @enum {string}
    */
export enum LetterDetailsWritableAddressPlacementEnum {
    TopFirstPage = 'top_first_page',
    InsertBlankPage = 'insert_blank_page',
    BottomFirstPageCenter = 'bottom_first_page_center',
    BottomFirstPage = 'bottom_first_page'
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

