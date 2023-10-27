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

import { DpvFootnote } from './dpv-footnote';

/**
 * A nested object containing a breakdown of the deliverability of an address.
 * @export
 * @class DeliverabilityAnalysis
 */
export class DeliverabilityAnalysis {
    constructor(input?: any) {
        if (typeof input?.dpv_confirmation !== "undefined") {
            this.dpv_confirmation = input.dpv_confirmation;
        }
        if (typeof input?.dpv_cmra !== "undefined") {
            this.dpv_cmra = input.dpv_cmra;
        }
        if (typeof input?.dpv_vacant !== "undefined") {
            this.dpv_vacant = input.dpv_vacant;
        }
        if (typeof input?.dpv_active !== "undefined") {
            this.dpv_active = input.dpv_active;
        }
        if (typeof input?.dpv_inactive_reason !== "undefined") {
            this.dpv_inactive_reason = input.dpv_inactive_reason;
        }
        if (typeof input?.dpv_throwback !== "undefined") {
            this.dpv_throwback = input.dpv_throwback;
        }
        if (typeof input?.dpv_non_delivery_day_flag !== "undefined") {
            this.dpv_non_delivery_day_flag = input.dpv_non_delivery_day_flag;
        }
        if (typeof input?.dpv_non_delivery_day_values !== "undefined") {
            this.dpv_non_delivery_day_values = input.dpv_non_delivery_day_values;
        }
        if (typeof input?.dpv_no_secure_location !== "undefined") {
            this.dpv_no_secure_location = input.dpv_no_secure_location;
        }
        if (typeof input?.dpv_door_not_accessible !== "undefined") {
            this.dpv_door_not_accessible = input.dpv_door_not_accessible;
        }
        if (typeof input?.dpv_footnotes !== "undefined") {
            this.dpv_footnotes = input.dpv_footnotes;
        }
        if (typeof input?.ews_match !== "undefined") {
            this.ews_match = input.ews_match;
        }
        if (typeof input?.lacs_indicator !== "undefined") {
            this.lacs_indicator = input.lacs_indicator;
        }
        if (typeof input?.lacs_return_code !== "undefined") {
            this.lacs_return_code = input.lacs_return_code;
        }
        if (typeof input?.suite_return_code !== "undefined") {
            this.suite_return_code = input.suite_return_code;
        }
    }

    /**
     * Result of Delivery Point Validation (DPV), which determines whether or not the address is deliverable by the USPS. Possible values are: * `Y` –– The address is deliverable by the USPS. * `S` –– The address is deliverable by removing the provided secondary unit designator. This information may be incorrect or unnecessary. * `D` –– The address is deliverable to the building\'s default address but is missing a secondary unit designator and/or number.   There is a chance the mail will not reach the intended recipient. * `N` –– The address is not deliverable according to the USPS, but parts of the address are valid (such as the street and ZIP code). * `\'\'` –– This address is not deliverable. No matching street could be found within the city or ZIP code. 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_confirmation': DeliverabilityAnalysisDpvConfirmationEnum;



    
    /**
     * indicates whether or not the address is [CMRA-authorized](https://en.wikipedia.org/wiki/Commercial_mail_receiving_agency). Possible values are: * `Y` –– Address is CMRA-authorized. * `N` –– Address is not CMRA-authorized. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_cmra': DeliverabilityAnalysisDpvCmraEnum;



    
    /**
     * indicates that an address was once deliverable, but has become vacant and is no longer receiving deliveries. Possible values are: * `Y` –– Address is vacant. * `N` –– Address is not vacant. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_vacant': DeliverabilityAnalysisDpvVacantEnum;



    
    /**
     * Corresponds to the USPS field `dpv_no_stat`. Indicates that an address has been vacated in the recent past, and is no longer receiving deliveries. If it\'s been unoccupied for 90+ days, or temporarily vacant, this will be flagged. Possible values are: * `Y` –– Address is active. * `N` –– Address is not active. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_active': DeliverabilityAnalysisDpvActiveEnum;



    
    /**
     * Indicates the reason why an address is vacant or no longer receiving deliveries. Possible values are: * `01` –– Address does not receive mail from the USPS directly, but is serviced by a drop address. * `02` –– Address not yet deliverable. * `03` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). * `04` –– Address is a College, Military Zone, or other type. * `05` –– Address no longer receives deliveries. * `06` –– Address is missing required secondary information. * `\'\'` –– A DPV match is not made or the address is active. 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_inactive_reason': DeliverabilityAnalysisDpvInactiveReasonEnum;



    
    /**
     * Indicates a street address for which mail is delivered to a PO Box. Possible values are: * `Y` –– Address is a PO Box throwback delivery point. * `N` –– Address is not a PO Box throwback delivery point. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_throwback': DeliverabilityAnalysisDpvThrowbackEnum;



    
    /**
     * Indicates whether deliveries are not performed on one or more days of the week at an address. Possible values are: * `Y` –– Mail delivery does not occur on some days of the week. * `N` –– Mail delivery occurs every day of the week. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_non_delivery_day_flag': DeliverabilityAnalysisDpvNonDeliveryDayFlagEnum;



    
    /**
     * Indicates days of the week (starting on Sunday) deliveries are not performed at an address. For example: * `YNNNNNN` –– Mail delivery does not occur on Sunday\'s. * `NYNNNYN` –– Mail delivery does not occur on Monday\'s or Friday\'s. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string) or address receives mail every day of the week (`deliverability_analysis[dpv_non_delivery_day_flag]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_non_delivery_day_values': string;



    
    /**
     * Indicates packages to this address will not be left due to security concerns. Possible values are: * `Y` –– Address does not have a secure mailbox. * `N` –– Address has a secure mailbox. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_no_secure_location': DeliverabilityAnalysisDpvNoSecureLocationEnum;



    
    /**
     * Indicates the door of the address is not accessible for mail delivery. Possible values are: * `Y` –– Door is not accessible. * `N` –– Door is accessible. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_door_not_accessible': DeliverabilityAnalysisDpvDoorNotAccessibleEnum;



    
    /**
     * An array of 2-character strings that gives more insight into how `deliverability_analysis[dpv_confirmation]` was determined. Will always include at least 1 string, and can include up to 3. For details, see [US Verification Details](#tag/US-Verification-Types). 
     * @type {Array<DpvFootnote>}
     * @memberof DeliverabilityAnalysis
     */
    'dpv_footnotes': Array<DpvFootnote>;



    
    /**
     * indicates whether or not an address has been flagged in the [Early Warning System](https://docs.informatica.com/data-engineering/data-engineering-quality/10-4-0/address-validator-port-reference/postal-carrier-certification-data-ports/early-warning-system-return-code.html), meaning the address is under development and not yet ready to receive mail. However, it should become available in a few months. 
     * @type {boolean}
     * @memberof DeliverabilityAnalysis
     */
    'ews_match': boolean;



    
    /**
     * indicates whether this address has been converted by [LACS<sup>Link</sup>](https://postalpro.usps.com/address-quality/lacslink). LACS<sup>Link</sup> corrects outdated addresses into their modern counterparts. Possible values are: * `Y` –– New address produced with a matching record in LACS<sup>Link</sup>. * `N` –– New address could not be produced with a matching record in LACS<sup>Link</sup>. * `\'\'` –– A DPV match is not made (`deliverability_analysis[dpv_confirmation]` is `N` or an empty string). 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'lacs_indicator': DeliverabilityAnalysisLacsIndicatorEnum;



    
    /**
     * A code indicating how `deliverability_analysis[lacs_indicator]` was determined. Possible values are: * `A` — A new address was produced because a match was found in LACS<sup>Link</sup>. * `92` — A LACS<sup>Link</sup> record was matched after dropping secondary information. * `14` — A match was found in LACS<sup>Link</sup>, but could not be converted to a deliverable address. * `00` — A match was not found in LACS<sup>Link</sup>, and no new address was produced. * `\'\'` — LACS<sup>Link</sup> was not attempted. 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'lacs_return_code': string;



    
    /**
     * A return code that indicates whether the address was matched and corrected by [Suite<sup>Link</sup>](https://postalpro.usps.com/address-quality-solutions/suitelink). Suite<sup>Link</sup> attempts to provide secondary information to business addresses. Possible values are: * `A` –– A Suite<sup>Link</sup> match was found and secondary information was added. * `00` –– A Suite<sup>Link</sup> match could not be found and no secondary information was added. * `\'\'` –– Suite<sup>Link</sup> lookup was not attempted. 
     * @type {string}
     * @memberof DeliverabilityAnalysis
     */
    'suite_return_code': DeliverabilityAnalysisSuiteReturnCodeEnum;



    
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
export enum DeliverabilityAnalysisDpvConfirmationEnum {
    Y = 'Y',
    S = 'S',
    D = 'D',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvCmraEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvVacantEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvActiveEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvInactiveReasonEnum {
    _01 = '01',
    _02 = '02',
    _03 = '03',
    _04 = '04',
    _05 = '05',
    _06 = '06',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvThrowbackEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvNonDeliveryDayFlagEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvNoSecureLocationEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisDpvDoorNotAccessibleEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisLacsIndicatorEnum {
    Y = 'Y',
    N = 'N',
    Empty = ''
}
/**
    * @export
    * @enum {string}
    */
export enum DeliverabilityAnalysisSuiteReturnCodeEnum {
    A = 'A',
    _00 = '00',
    Empty = ''
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

