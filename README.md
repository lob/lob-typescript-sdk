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
    address_zip: "07000",
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

## Modifying a Resource for SDK Generation

Most of the resources aren't super different from their `lob-openapi` counterparts.

*(1)* Make sure the filepaths match the patterns in this repository, as opposed to `lob-openapi`. This mostly affects files within `shared/`, since the structure of the `shared` folder here is a little different from the one in `lob-openapi`. Usually doing a find and replace which changes `../../shared` to `../shared` works pretty well.

*(2)* Get rid of all `required` blocks. We don't need them.

*(3)* There are some files which are different between the two repositories:
