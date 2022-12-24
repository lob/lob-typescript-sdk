# lob-typescript-sdk

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Typescript SDK for the [Lob.com](https://lob.com) API. See the full Lob.com API documentation [here](https://docs.lob.com).

Looking for our [legacy Javascript SDK](https://github.com/lob/lob-node)?

## Getting Started

### Registration

First, you will need to first create an account at [Lob.com](https://dashboard.lob.com/#/register) and obtain your Test and Live API Keys.

Once you have created an account, you can access your API Keys from the [Settings Panel](https://dashboard.lob.com/#/settings).

### Installation

lob-typescript-sdk can be installed through the npm:

```bash
$ npm i @lob/lob-typescript-sdk
```

## Examples

### First API Calls

```typescript
import { Configuration, AddressesApi } from "@lob/lob-typescript-sdk";
const config: Configuration = new Configuration({
  username: "<<YOUR API KEY HERE>>",
});

const addressApi = new AddressesApi(config);

try {
  const addressCreate = new AddressEditable({
    name: "Thing T. Thing",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07090",
  });

  const myAddress = await addressApi.create(addressCreate);
  const myAddressFromApi = await addressApi.get(myAddress.id);
  const addressList = await addressApi.list(3); // lists up to 3 addresses
} catch (err: any) {
  console.error(err);
}
```

## API Documentation

The full and comprehensive documentation of Lob's APIs is available [here](https://docs.lob.com/).

## Supported Node.js Versions

Our client libraries follow the [Node.js release schedule](https://nodejs.org/en/about/releases/).
This package is compatible with all current _active_ and _maintenance_ versions of
Node.js. If you are using a version that is not listed as an _active_ or _maintenance_ version we recommend that you switch to an actively supported LTS version.

Any support or compatability with versions of Node.js not listed as _active_ or _maintenance_ is on a
best-efforts basis.

## Contributing

To contribute, please see the [Contributing.md](https://github.com/lob/lob-typescript-sdk/blob/main/.github/Contributing.md) file.

## Testing

### Unit Tests

To run unit tests:

```bash
$ npm test
```

### Integration Tests

Integration tests run against a live deployment of the Lob API and require multiple valid API keys with access to specific features. As such, it is not expected that these tests will pass for every user in every environment.

To run integration tests:

```bash
$ LOB_API_LIVE_KEY=<<API KEY 1>> LOB_API_LIVE_KEY=<< API KEY 2>> npm run test:integration
```

#### A cleaner alternative if you are going to run integration tests frequently

Run this the first time:

```bash
$ echo "LOB_API_LIVE_KEY=<<API KEY 1>>\nLOB_API_LIVE_KEY=<< API KEY 2>>" > LOCAL.env
```

Then, to run the integration tests:

```bash
$ env $(cat LOCAL.env) npm run test:integration
```

=======================

Copyright © 2022 Lob.com

Released under the MIT License, which can be found in the repository in [LICENSE.txt](https://github.com/lob/lob-typescript-sdk/blob/main/LICENSE.txt).
