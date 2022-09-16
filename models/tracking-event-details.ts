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


/**
 * 
 * @export
 * @class TrackingEventDetails
 */
export class TrackingEventDetails {
    constructor(input?: any) {
        if (typeof input?.event !== "undefined") {
            this.event = input.event;
        }
        if (typeof input?.description !== "undefined") {
            this.description = input.description;
        }
        if (typeof input?.notes !== "undefined") {
            this.notes = input.notes;
        }
        if (typeof input?.action_required !== "undefined") {
            this.action_required = input.action_required;
        }
    }

    /**
     * Find the full table [here](#tag/Tracking-Events). A detailed substatus about the event: * `package_accepted` - Package has been accepted into the carrier network for delivery. * `package_arrived` - Package has arrived at an intermediate location in the carrier network. * `package_departed` - Package has departed from an intermediate location in the carrier network. * `package_processing` - Package is processing at an intermediate location in the carrier network. * `package_processed` - Package has been processed at an intermediate location. * `package_in_local_area` - Package is at a location near the end destination. * `delivery_scheduled` - Package is scheduled for delivery. * `out_for_delivery` - Package is out for delivery. * `pickup_available` - Package is available for pickup at carrier location. * `delivered` - Package has been delivered. * `package_forwarded` - Package has been forwarded. * `returned_to_sender` - Package is to be returned to sender. * `address_issue` - Address information is incorrect. Contact carrier to ensure delivery. * `contact_carrier` - Contact the carrier for more information. * `delayed` - Delivery of package is delayed. * `delivery_attempted` - Delivery of package has been attempted. Contact carrier to ensure delivery. * `delivery_rescheduled` - Delivery of package has been rescheduled. * `location_inaccessible` - Delivery location inaccessible to carrier. Contact carrier to ensure delivery. * `notice_left` - Carrier left notice during attempted delivery. Follow carrier instructions on notice. * `package_damaged` - Package has been damaged. Contact carrier for more details. * `package_disposed` - Package has been disposed. * `package_held` - Package held at carrier location. Contact carrier for more details. * `package_lost` - Package has been lost. Contact carrier for more details. * `package_unclaimed` - Package is unclaimed. * `package_undeliverable` - Package is not able to be delivered. * `reschedule_delivery` - Contact carrier to reschedule delivery. * `other` - Unrecognized carrier status. 
     * @type {string}
     * @memberof TrackingEventDetails
     */
    'event': TrackingEventDetailsEventEnum;



    
    /**
     * The description as listed in the description for event.
     * @type {string}
     * @memberof TrackingEventDetails
     */
    'description': string;



    
    /**
     * Event-specific notes from USPS about the tracking event.
     * @type {string}
     * @memberof TrackingEventDetails
     */
    'notes'?: string;



    
    /**
     * `true` if action is required by the end recipient, `false` otherwise. 
     * @type {boolean}
     * @memberof TrackingEventDetails
     */
    'action_required': boolean;



    
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
export enum TrackingEventDetailsEventEnum {
    PackageAccepted = 'package_accepted',
    PackageArrived = 'package_arrived',
    PackageDeparted = 'package_departed',
    PackageProcessing = 'package_processing',
    PackageProcessed = 'package_processed',
    PackageInLocalArea = 'package_in_local_area',
    DeliveryScheduled = 'delivery_scheduled',
    OutForDelivery = 'out_for_delivery',
    PickupAvailable = 'pickup_available',
    Delivered = 'delivered',
    PackageForwarded = 'package_forwarded',
    ReturnedToSender = 'returned_to_sender',
    AddressIssue = 'address_issue',
    ContactCarrier = 'contact_carrier',
    Delayed = 'delayed',
    DeliveryAttempted = 'delivery_attempted',
    DeliveryRescheduled = 'delivery_rescheduled',
    LocationInaccessible = 'location_inaccessible',
    NoticeLeft = 'notice_left',
    PackageDamaged = 'package_damaged',
    PackageDisposed = 'package_disposed',
    PackageHeld = 'package_held',
    PackageLost = 'package_lost',
    PackageUnclaimed = 'package_unclaimed',
    PackageUndeliverable = 'package_undeliverable',
    RescheduleDelivery = 'reschedule_delivery',
    Other = 'other'
}



/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

