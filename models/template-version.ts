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

import { EngineHtml } from './engine-html';

/**
 * 
 * @export
 * @class TemplateVersion
 */
export class TemplateVersion {
    constructor(input?: any) {
        if (typeof input?.id !== "undefined") {
            this.id = input.id;
        }
        if (typeof input?.description !== "undefined") {
            this.description = input.description;
        }
        if (typeof input?.html !== "undefined") {
            this.html = input.html;
        }
        if (typeof input?.engine !== "undefined") {
            this.engine = input.engine;
        }
        if (typeof input?.suggest_json_editor !== "undefined") {
            this.suggest_json_editor = input.suggest_json_editor;
        }
        if (typeof input?.merge_variables !== "undefined") {
            this.merge_variables = input.merge_variables;
        }
        if (typeof input?.date_created !== "undefined") {
            this.date_created = input.date_created;
        }
        if (typeof input?.date_modified !== "undefined") {
            this.date_modified = input.date_modified;
        }
        if (typeof input?.deleted !== "undefined") {
            this.deleted = input.deleted;
        }
        if (typeof input?.object !== "undefined") {
            this.object = input.object;
        }
    }

    /**
     * Unique identifier prefixed with `vrsn_`.
     * @type {string}
     * @memberof TemplateVersion
     */
    private '_id': string;
    public get id() { return (this._id); }
    public set id(newValue: string) {
        if(newValue && !/^vrsn_[a-zA-Z0-9]+$/.test(newValue)) {
            throw new Error("Invalid id provided");
        }
        this._id = newValue;
    }



    
    /**
     * An internal description that identifies this resource. Must be no longer than 255 characters. 
     * @type {string}
     * @memberof TemplateVersion
     */
    'description'?: string | null;



    
    /**
     * An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details: - [Postcards](https://docs.lob.com/#tag/Postcards/operation/postcard_create) - `front` and `back` - [Self Mailers](https://docs.lob.com/#tag/Self-Mailers/operation/self_mailer_create) - `inside` and `outside` - [Letters](https://docs.lob.com/#tag/Letters/operation/letter_create) - `file` - [Checks](https://docs.lob.com/#tag/Checks/operation/check_create) - `check_bottom` and `attachment` - [Cards](https://docs.lob.com/#tag/Cards/operation/card_create) - `front` and `back`  If there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`. 
     * @type {string}
     * @memberof TemplateVersion
     */
    'html': string;



    
    /**
     * 
     * @type {EngineHtml}
     * @memberof TemplateVersion
     */
    'engine'?: EngineHtml | null;



    
    /**
     * Used by frontend, true if the template uses advanced features. 
     * @type {boolean}
     * @memberof TemplateVersion
     */
    'suggest_json_editor'?: boolean;



    
    /**
     * Used by frontend, an object representing the keys of every merge variable present in the template. It has one key named \'keys\', and its value is an array of strings. 
     * @type {object}
     * @memberof TemplateVersion
     */
    'merge_variables'?: object;



    
    /**
     * A timestamp in ISO 8601 format of the date the resource was created.
     * @type {string}
     * @memberof TemplateVersion
     */
    'date_created'?: string;



    
    /**
     * A timestamp in ISO 8601 format of the date the resource was last modified.
     * @type {string}
     * @memberof TemplateVersion
     */
    'date_modified'?: string;



    
    /**
     * Only returned if the resource has been successfully deleted.
     * @type {boolean}
     * @memberof TemplateVersion
     */
    'deleted'?: boolean;



    
    /**
     * Value is resource type.
     * @type {string}
     * @memberof TemplateVersion
     */
    'object'?: TemplateVersionObjectEnum;



    
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
export enum TemplateVersionObjectEnum {
    Version = 'version'
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

