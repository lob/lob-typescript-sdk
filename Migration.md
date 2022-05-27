# Migrate from Lob’s JavaScript to TypeScript SDK

This guide illustrates differences between Lob’s current JavaScript library (lob-node) and our new TypeScript SDK (lob-typescript-sdk). The new TypeScript SDK supports all generally available endpoints and has the benefit of being built with TypeScript.
We have also compared performance and found the new TypeScript SDK is equivalent or improved in most cases with some operations experiencing a consistent 2X improvement.

Note: apps written in JavaScript or TypeScript can both utilize Lob’s TypeScript SDK

In this guide we compare how lob-node and lob-typescript-sdk implement the following method pattern.

- CREATE
- LIST
- GET
- DELETE
- BULK VERIFY (ADDRESS VERIFICATION)
- VERIFY (BANK ACCOUNTS)

## INSTALL

Similar to lob-node, the lob-typescript-sdk package is available through NPM:

```
$ npm install lob
```

## IMPORT AND INITIALIZE

Lob-node uses JavaScript’s built-in require. You initialize by passing your API key as an argument:

```javascript
const Lob = require("lob")("YOUR API KEY");
```

The new TypeScript SDK uses an ES module import statement and configuration variable for the object containing your API key. This variable is used to instantiate a new configuration:

```typescript
import { Configuration } from "lob-typescript-sdk";

const config: Configuration = new Configuration({
  username: "<<YOUR API KEY HERE>>",
});
```

_Note:_ If you are using the new TypeScript SDK using JavaScript here is the code that you would use for this:

```javascript
const { Configuration } = require("@lob/lob-typescript-sdk");
const config = new Configuration({
  username: process.env.LOB_API_KEY,
});
```

Like lob-node this approach uses Javascript's built-in require with ES6 destructuring to extract the essential classes from the results of requiring the TypeScript SDK..

## Error Handling

In the new Typescript SDK, errors returned by the API are thrown, not returned to an error first callback (See below examples in Compare Create methods). As a result, consumer code does not need to do the work of detecting an error, and can

## METHODS

The new TypeScript SDK does not use the callback pattern found in lob-node. Instead, the TypeScript SDK uses promise-based/async and await in a try catch block. Additionally ,the Typescript SDK utilizes the best practice of instantiating a class of the appropriate type providing needed data during instantiation or by setting properties rather than simply passing an object with the intended properties. Switching to this allows model validation to trigger.

### COMPARE CREATE METHODS

Here is a sample of a lob-node CREATE function:

```javascript
const Lob = require("lob")("YOUR API KEY");

Lob.addresses.create(
  {
    name: "Thing T. Thing",
    address_line1: "1313 CEMETERY",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
  },
  function (err, res) {
    console.log(err, res);
  }
);
```

Here is a sample of TypeScript SDK CREATE method

```typescript
const addressCreate: AddressEditable = new AddressEditable({
  name: "Thing T. Thing",
  address_line1: "1313 CEMETERY LN",
  address_line2: "",
  address_city: "WESTFIELD",
  address_state: "NJ",
  address_zip: "07090",
  address_county: "US",
});

try {
  const myAddress = await new AddressesApi(config).create(addressCreate);
} catch (err: any) {
  console.error(err);
}
```

If you are using the new TypeScript SDK using JavaScript the code is largely the same apart from removing the "type" identifiers found in TypeScript. Here is the code that you would use for this method:

```javascript
const addressData = new AddressEditable({
  name: "Wednesday Addams",
  address_line1: "1313 CEMETERY LN",
  address_city: "WESTFIELD",
  address_state: "NJ",
  address_zip: "07090",
});

try {
  const addresses = await new AddressesApi(config).create(addressData);
} catch (err) {
  console.error(err);
}
```

### COMPARE LIST METHODS

Here is a sample of a lob-node LIST method:

```javascript
Lob.addresses.list({ limit: 2 }, function (err, address) {
  if (err) {
    console.log(err);
    return;
  }
});
```

Here is a sample of the TypeScript SDK LIST method:

```typescript
try {
  const addresses = await new AddressesApi(config).list();
} catch (err: any) {
  console.error(err);
}
```

### COMPARE GET BY ID METHOD

Here is a sample of a lob-node GET method:

```javascript
Lob.addresses.retrieve("adr_xxxx", function (err, address) {
  if (err) {
    console.log(err);
    return;
  }
});
```

Here is a sample of the TypeScript SDK GET by ID method:

```typescript
try {
  const address = await new AddressesApi(config).get("adr_xxxx");
} catch (err: any) {
  console.error(err);
}
```

### COMPARE DELETE METHOD

​Here is a sample of the lob-node DELETE method:

```javascript
Lob.addresses.delete("adr_xxxx", function (err, address) {
  if (err) {
    console.log(err);
    return;
  }
});
```

Here is a sample of the TypeScript SDK DELETE method:

```typescript
try {
  const deleteAddress = await new AddressesApi(config).delete("adr_xxxx");
} catch (err: any) {
  console.error(err);
}
```

### COMPARE BULK VERIFICATION METHOD

The Bulk verify endpoint from our Addresses Verification Api is used to verify a list of US or US territory addresses with a live API key. This endpoint is not currently supported in lob-node. However, this is how it is done in the TypeScript sdk:

```typescript
const UsVerifications = new UsVerificationsApi(av_config);
const verificationData1 = new UsVerificationsWritable({
  primary_line: "001 CEMETERY LANE",
  city: "WESTFIELD",
  state: "NJ",
  zip_code: "07090"
};
const verificationData2: UsVerificationsWritable = {
  primary_line: "1515 CEMETERY LN",
  city: "WESTFIELD",
  state: "NJ",
  zip_code: "07090"
};
const addressList: MultipleComponentsList = {
  addresses: [verificationData1, verificationData2],
});

try {
  const bulkVerified = await UsVerifications.verifyBulk(addressList);
} catch (err: any) {
  console.error(err);
}
```

​Again, as mentioned above, If you are using the new TypeScript SDK using JavaScript,the code is essentially the same apart from removing the type identifiers found in TypeScript This pattern may be followed for all methods where examples are not supplied as shown here:

```javascript
const UsVerifications = new USVerificationsApi(av_config);
const verificationData1 = {
    primary_line: "001 CEMETERY LANE",
    city: "WESTFIELD",
    state: "NJ",
    zip_code: "07090"
};
const verificationData2 = {
    primary_line: "1515 CEMETERY LN",
    city: "WESTFIELD",
    state: "NJ",
    zip_code: "07090"
};
const addressList = {
  addresses: [verificationData1, verificationData2]
}

try {
  const bulkVerified = await UsVerifications.verifyBulk(addressList);
} catch (err: any) {
    console.error(err);
}
```

### COMPARE SINGLE ADDRESS VERIFICATION METHOD

Here is a sample of the lob-node SINGLE VERIFY method:

```javascript
Lob.UsVerifications.verify(
  {
    primary_line: "1313 CEMETERY LN",
    city: "WESTFIELD",
    state: "NJ",
    zip_code: "07000",
  },
  function (err, res) {
    console.log(err, res);
  }
);
```

​Here is a sample of the TypeScript SDK Single Verify method:

```typescript
const UsVerifications = new UsVerificationsApi(av_config);
const verificationData1 = new UsVerificationsWritable({
  primary_line: "001 CEMETERY LANE",
  city: "WESTFIELD",
  state: "NJ",
  zip_code: "07090"
};

try {
  const singleVerified = await UsVerifications.verifySingle(verificationData1);
} catch (err: any) {
  console.error(err);
}
```

### COMPARE BANK ACCOUNT VERIFY

​Here is a sample of the lob-node Bank Account Verify method

```javascript
Lob.bankAccounts.verify(
  "bank_dfceb4a2a05b57e",
  {
    amounts: [25, 63],
  },
  function (err, res) {
    console.log(err, res);
  }
);
```

Here is a sample of the TypeScript SDK Bank Account Verify method:

```typescript
const verificationData = new BankAccountVerify({
  amounts: [11, 35],
});
const bankData = (new BankAccountWritable() = {
  description: "Test Bank Account",
  routing_number: "322271627",
  account_number: "123456789",
  signatory: "Gomez Addams",
  account_type: BankTypeEnum.Individual,
});
let id = "";
try {
  const result = await new BankAccountsApi(config).create(bankData);
  const verifiedAccount = await new BankAccountsApi(config).verify(
    result.id,
    verificationData
  );
  id = verifiedAccount.id;
} catch (err: any) {
  console.error(err);
}
return id;
```

### TEMPLATE UPDATE METHOD

The Template Update endpoint updates the description and/or published version of the template with a given id. This endpoint is not currently supported in lob-node. However, this is how it is done in the TypeScript SDK:

```typescript
const Templates = new TemplatesApi(config);
const templateData: new TemplateWritable({
    description: "Newer Template",
    html: "<html>Updated HTML for {{name}}</html>"
});

try {
     const createTemplate = await Templates.create(templateData);
     const updateData= new TemplateUpdate ({
         description: "updated template",
         published_version: createTemplate.published_version?.id as string
     });
     const updateTemplate = await Templates.update(createTemplate.id updateData);
} catch (err: any) {
     console.error(err);
}
```
