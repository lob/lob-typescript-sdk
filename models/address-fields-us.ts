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
 * @interface AddressFieldsUs
 */
export class AddressFieldsUs {
    /**
     * The primary number, street name, and directional information.
     * @type {string}
     * @memberof AddressFieldsUs
     */
    'address_line1': string;
    /**
     * An optional field containing any information which can\'t fit into line 1.
     * @type {string}
     * @memberof AddressFieldsUs
     */
    'address_line2'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AddressFieldsUs
     */
    'address_city': string;
    /**
     * 2 letter state short-name code
     * @type {string}
     * @memberof AddressFieldsUs
     */
    private '_address_state': string;
    public get address_state() { return (this._address_state); }
    public set address_state(newValue: string) {
        if(newValue && !/^[a-zA-Z]{2}$/.test(newValue)) {
            throw new Error("Invalid address_state provided");
        }
        this._address_state = newValue;
    }
    /**
     * Must follow the ZIP format of `12345` or ZIP+4 format of `12345-1234`. 
     * @type {string}
     * @memberof AddressFieldsUs
     */
    private '_address_zip': string;
    public get address_zip() { return (this._address_zip); }
    public set address_zip(newValue: string) {
        if(newValue && !/^\d{5}(-\d{4})?$/.test(newValue)) {
            throw new Error("Invalid address_zip provided");
        }
        this._address_zip = newValue;
    }
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

