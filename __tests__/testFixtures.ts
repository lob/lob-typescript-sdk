import { Configuration } from "../configuration";
import { AddressEditable, CountryExtended } from "../models";

export const URL_VALID_LIST = [
  "https://lob-assets.com/bank-accounts/asd_asdfghjkqwertyui.pdf?version=123&expires=1234567890&signature=aksdf",
];
export const DATE_FILTER = { gt: "2020-01-01", lt: "2020-01-31T12" };
export const DATE_CREATED_QUERY_STRING: string =
  "date_created=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%22%7D";
export const DATE_MODIFIED_QUERY_STRING: string =
  "date_modified=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%22%7D";
export const DATE_SEND_QUERY_STRING: string =
  "send_date=%7B%22gt%22%3A%222020-01-01%22%2C%22lt%22%3A%222020-01-31T12%22%7D";
export const FILE_LOCATION: string =
  "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf";
export const FILE_LOCATION_6X18: string =
  "https://s3.us-west-2.amazonaws.com/public.lob.com/assets/templates/self_mailers/6x18_sfm_inside.pdf";
export const FILE_LOCATION_8X11: string =
  "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/us_letter_1pg.pdf";
export const FILE_LOCATION_4X6: string =
  "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf";
export const METADATA_OBJECT: { [key: string]: string } = {
  fakeMetadata: "fakemetadata",
};
export const METADATA_QUERY_STRING: string =
  "metadata=%7B%22fakeMetadata%22%3A%22fakemetadata%22%7D";
export const CONFIG_FOR_INTEGRATION: Configuration = new Configuration({
  username: process.env.LOB_API_KEY,
});
export const CONFIG_FOR_INTEGRATION_WITH_LIVE: Configuration =
  new Configuration({
    username: process.env.LOB_LIVE_API_KEY,
  });
export const CONFIG_FOR_UNIT: Configuration = new Configuration({
  username: "Totally Fake Key",
});
export const CONFIG_WITH_BASE_OPTIONS_FOR_UNIT: Configuration =
  new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
export const ADDRESSES_EDITABLE: AddressEditable[] = [
  new AddressEditable({
    name: "Thing T. Thing",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
  }),
  new AddressEditable({
    name: "FESTER",
    address_line1: "001 CEMETERY LN",
    address_line2: "SUITE 666",
    address_city: "WESTFIELD ",
    address_state: "NJ",
    address_zip: "07000",
  }),
  new AddressEditable({
    name: "MORTICIA ADDAMS",
    address_line1: "1212 CEMETERY LANE",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
  }),
  new AddressEditable({
    name: "COUSIN ITT",
    address_line1: "1515 CEMETERY LN",
    address_line2: "FLOOR 0",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
  }),
  new AddressEditable({
    name: "WEDNESDAY ADDAMS",
    address_line1: "1313 CEMETERY LN",
    address_line2: "# 000",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
    address_country: CountryExtended.Us,
  }),
  new AddressEditable({
    name: "GORDON CRAVEN",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
    address_country: CountryExtended.Us,
  }),
  new AddressEditable({
    name: "PUGSLEY",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
    address_country: CountryExtended.Us,
  }),
];
