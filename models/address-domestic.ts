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
 * @interface AddressDomestic
 */
export class AddressDomestic {
    constructor(input?: any) {
        if (typeof input?.address_line1 !== "undefined") {
            this.address_line1 = input.address_line1;
        }
        if (typeof input?.address_line2 !== "undefined") {
            this.address_line2 = input.address_line2;
        }
        if (typeof input?.address_city !== "undefined") {
            this.address_city = input.address_city;
        }
        if (typeof input?.address_state !== "undefined") {
            this.address_state = input.address_state;
        }
        if (typeof input?.address_zip !== "undefined") {
            this.address_zip = input.address_zip;
        }
        if (typeof input?.description !== "undefined") {
            this.description = input.description;
        }
        if (typeof input?.name !== "undefined") {
            this.name = input.name;
        }
        if (typeof input?.company !== "undefined") {
            this.company = input.company;
        }
        if (typeof input?.phone !== "undefined") {
            this.phone = input.phone;
        }
        if (typeof input?.email !== "undefined") {
            this.email = input.email;
        }
        if (typeof input?.address_country !== "undefined") {
            this.address_country = input.address_country;
        }
        if (typeof input?.metadata !== "undefined") {
            this.metadata = input.metadata;
        }
    }

    /**
     * The building number, street name, street suffix, and any street directionals. For US addresses, the max length is 64 characters.
     * @type {string}
     * @memberof AddressDomestic
     */
    'address_line1'?: string;
    
    /**
     * The suite or apartment number of the recipient address, if applicable. For US addresses, the max length is 64 characters.
     * @type {string}
     * @memberof AddressDomestic
     */
    'address_line2'?: string | null;
    
    /**
     * 
     * @type {string}
     * @memberof AddressDomestic
     */
    'address_city'?: string | null;
    
    /**
     * 
     * @type {string}
     * @memberof AddressDomestic
     */
    'address_state'?: string | null;
    
    /**
     * Optional postal code. For US addresses, must be either 5 or 9 digits.
     * @type {string}
     * @memberof AddressDomestic
     */
    'address_zip'?: string | null;
    
    /**
     * An internal description that identifies this resource. Must be no longer than 255 characters. 
     * @type {string}
     * @memberof AddressDomestic
     */
    'description'?: string | null;
    
    /**
     * Either `name` or `company` is required, you may also add both. Must be no longer than 40 characters. If both `name` and `company` are provided, they will be printed on two separate lines above the rest of the address. 
     * @type {string}
     * @memberof AddressDomestic
     */
    'name'?: string | null;
    
    /**
     * Either `name` or `company` is required, you may also add both.
     * @type {string}
     * @memberof AddressDomestic
     */
    'company'?: string | null;
    
    /**
     * Must be no longer than 40 characters.
     * @type {string}
     * @memberof AddressDomestic
     */
    'phone'?: string | null;
    
    /**
     * Must be no longer than 100 characters.
     * @type {string}
     * @memberof AddressDomestic
     */
    'email'?: string | null;
    
    /**
     * The country associated with this address.
     * @type {string}
     * @memberof AddressDomestic
     */
    private '_address_country'?: string;
    public get address_country() { return (this._address_country || undefined) as string; }
    public set address_country(newValue: string) {
        if(newValue && !/US/.test(newValue)) {
            throw new Error("Invalid address_country provided");
        }
        this._address_country = newValue;
    }
    
    /**
     * Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. \'{\"customer_id\" : \"NEWYORK2015\"}\' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.
     * @type {{ [key: string]: string; }}
     * @memberof AddressDomestic
     */
    'metadata'?: { [key: string]: string; };
    
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

