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
 * A nested object containing a breakdown of each component of a reverse geocoded response.
 * @export
 * @interface GeocodeComponents
 */
export class GeocodeComponents {
    /**
     * The 5-digit ZIP code
     * @type {string}
     * @memberof GeocodeComponents
     */
    private '_zip_code'?: string;
    public get zip_code() { return (this._zip_code || undefined) as string; }
    public set zip_code(newValue: string) {
        if(newValue && !/^\d{5}$/.test(newValue)) {
            throw new Error("Invalid zip_code provided");
        }
        this._zip_code = newValue;
    }
    /**
     * 
     * @type {string}
     * @memberof GeocodeComponents
     */
    private '_zip_code_plus_4'?: string;
    public get zip_code_plus_4() { return (this._zip_code_plus_4 || undefined) as string; }
    public set zip_code_plus_4(newValue: string) {
        if(newValue && !/^\d{4}$/.test(newValue)) {
            throw new Error("Invalid zip_code_plus_4 provided");
        }
        this._zip_code_plus_4 = newValue;
    }
}


/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

