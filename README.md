# lob-sdk-ts

Typescript SDK for the [Lob.com](https://lob.com) API. See full Lob.com API documentation [here](https://lob.com/docs/node). For best results, be sure that you're using [the latest version](https://lob.com/docs/node#version) of the Lob API and the latest version of the Node wrapper.

## Getting Started

### Registration

First, you will need to first create an account at [Lob.com](https://dashboard.lob.com/#/register) and obtain your Test and Live API Keys.

Once you have created an account, you can access your API Keys from the [Settings Panel](https://dashboard.lob.com/#/settings).

### Installation

lob-sdk-ts can be installed through the npm:
```bash
# FOR PRE PUBLISH ALPHA TESTING ONLY!!!!!
# UPDATE BEFORE PUBLISHING
$ npm i https://github.com/lob/lob-sdk-ts
```

## Examples

### First API Calls
```typescript
import {Configuration, AddressesApi} from "lob-sdk-ts";
const config: Configuration = new Configuration({
    username: "<<YOUR API KEY HERE>>",
});

const addressCreate: AddressEditable = {
    name: "Thing T. Thing",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07090",
};
try {
    const myAddress = await new AddressesApi(config).create(addressCreate);
    const myAddressFromApi = await new AddressesApi(config).get(myAddress.id);
    const response = await new AddressesApi(config).list();
} catch (err: any) {
    console.error(err);
}
```

## API Documentation

The full and comprehensive documentation of Lob's APIs is available [here](https://docs.lob.com/).

## Contributing
<<<< UPDATE BEFORE PUBLISHING >>>>

To contribute, please see the CONTRIBUTING.md file.

## Testing

### Unit Tests
To run unit tests:
```bash
$ npm test
```

### Integration Tests
Running integration tests requires multiple valid API keys with access to specific features. As such, it is not expected that these tests will pass for every user in every environment.

```bash
$ LOB_API_KEY=<<API KEY 1>> LOB_LIVE_API_KEY=<< API KEY 2>> npm run test:integration
```

# Modifying a Resource for SDK Generation

Most of the resources aren't super different from their `lob-openapi` counterparts.

*(1)* Make sure the filepaths match the patterns in this repository, as opposed to `lob-openapi`. This mostly affects files within `shared/`, since the structure of the `shared` folder here is a little different from the one in `lob-openapi`. Usually doing a find and replace which changes `../../shared` to `../shared` works pretty well.

*(2)* Get rid of all `required` blocks. We don't need them.

*(3)* There are some files which are different between the two repositories:

Unlike in `lob-openapi`, there are no individual error files, because there are no examples in the SDK specs (the examples in the `lob-openapi` error files are why they're resource-specific). All resources use `specs/shared/models/lob_error.yml` as their error response. Another variation is that the `before_after` parameter has been split into `before` and `after` here. `object.yml` has also become `lob_object`. The reason some files have `lob_` as a prefix is because OpenAPI has trouble naming model files which share names with preexisting types, like Error and Object.

More differences which apply to some resources: `address_intl` and `address_us` are not differentiated here. There is no `inline`. For examples of how to construct `to` and `from` for resources where both are domestic, check out `specs/checks/models/check_editable_props.yml`. If `to` can be international, check out `specs/postcards/models/postcard_editable.yml`.

*(4)* `allOf` is not allowed at the beginning of files. I know it violates DRY, but repeating properties across files is just fine here, given OpenAPI Generator's weirdness about `allOf` in models. Copy and paste the properties in each file in the `allOf` list into the main one, and delete the `allOf`.

*(5)* Change the `summary:` values for operations to lowercase, one-word function names (e.g. `get`, `delete`, etc based on the operation they're associated with).
