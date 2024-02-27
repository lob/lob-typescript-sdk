# Code Snippets

## Address Api

### Retrieve

```bash
curl https://api.lob.com/v1/addresses/adr_fa85158b26c3eb7c \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const address = await new AddressesApi(config).get("adr_fa85158b26c3eb7c");
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/addresses/adr_43769b47aed248c2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteAddress = await new AddressesApi(config).delete(
    "adr_43769b47aed248c2"
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/addresses \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Harry - Office" \
  -d "name=Harry Zhang" \
  -d "company=Lob" \
  -d "email=harry@lob.com" \
  -d "phone=5555555555" \
  -d "address_line1=2261 Market Street" \
  -d "address_line2=STE 5668" \
  -d "address_city=San Francisco" \
  -d "address_state=CA" \
  -d "address_zip=94114" \
  -d "address_country=US" \
```

```typescript
const addressCreate = new AddressEditable({
  description: "Harry - Office",
  name: "Harry Zhang",
  company: "Lob",
  email: "harry@lob.com",
  phone: "5555555555",
  address_line1: "2261 Market Street",
  address_line2: "STE 5668",
  address_city: "San Francisco",
  address_state: "CA",
  address_zip: "94114",
  address_country: "US",
});

try {
  const myAddress = await new AddressesApi(config).create(addressCreate);
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/addresses?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const addresses = await new AddressesApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

## Postcards Api

### Retrieve

```bash
curl https://api.lob.com/v1/postcards/psc_5c002b86ce47537a \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const postcard = await new PostcardsApi(config).get("psc_5c002b86ce47537a");
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/postcards/psc_5c002b86ce47537a" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deletePostcard = await new PostcardsApi(config).cancel(
    "psc_5c002b86ce47537a"
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/postcards \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Postcard job" \
  -d "from=adr_210a8d4b0b76d77b" \
  --data-urlencode "front=<html style='padding: 1in; font-size: 50;'>Front HTML for {{name}}</html>" \
  --data-urlencode "back=<html style='padding: 1in; font-size: 20;'>Back HTML for {{name}}</html>" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=2261 Market Street" \
  -d "to[address_line2]=STE 5668" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94114" \
  -d "merge_variables[name]=Harry" \
```

```typescript
const postcardCreate = new PostcardEditable({
  description: "Demo Postcard job",
  from: "adr_210a8d4b0b76d77b",
  front:
    "<html style='padding: 1in; font-size: 50;'>Front HTML for {{name}}</html>",
  back: "<html style='padding: 1in; font-size: 20;'>Back HTML for {{name}}</html>",
  to: {
    name: "Harry Zhang",
    address_line1: "2261 Market Street",
    address_line2: "STE 5668",
    address_city: "San Francisco",
    address_state: "CA",
    address_zip: "94114",
  },
  merge_variables: {
    name: "Harry",
  },
});

try {
  const myPostcard = await new PostcardsApi(config).create(postcardCreate);
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/postcards?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const postcards = await new PostcardsApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

## SelfMailers Api

### Retrieve

```bash
curl https://api.lob.com/v1/self_mailers/sfm_8ffbe811dea49dcf \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const selfMailer = await new SelfMailersApi(config).get(
    "sfm_8ffbe811dea49dcf"
  );
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/self_mailers/sfm_8ffbe811dea49dcf" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteSelfMailer = await new SelfMailersApi(config).delete(
    "sfm_8ffbe811dea49dcf"
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/self_mailers \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Self Mailer job" \
  -d "from=adr_210a8d4b0b76d77b" \
  --data-urlencode "inside=<html style='padding: 1in; font-size: 50;'>Inside HTML for {{name}}</html>" \
  --data-urlencode "outside=<html style='padding: 1in; font-size: 20;'>Outside HTML for {{name}}</html>" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=2261 Market Street" \
  -d "to[address_line2]=STE 5668" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94114" \
  -d "merge_variables[name]=Harry" \
```

```typescript
const selfMailerCreate = new SelfMailerEditable({
  description: "Demo Self Mailer job",
  from: "adr_210a8d4b0b76d77b",
  inside:
    "<html style='padding: 1in; font-size: 50;'>Inside HTML for {{name}}</html>",
  outside:
    "<html style='padding: 1in; font-size: 20;'>Outside HTML for {{name}}</html>",
  to: {
    name: "Harry Zhang",
    address_line1: "2261 Market Street",
    address_line2: "STE 5668",
    address_city: "San Francisco",
    address_state: "CA",
    address_zip: "94114",
  },
  merge_variables: {
    name: "Harry",
  },
});

try {
  const mySelfMailer = await new SelfMailersApi(config).create(
    selfMailerCreate
  );
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/self_mailers?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const selfMailers = await new SelfMailersApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

## Letters Api

### Retrieve

```bash
curl https://api.lob.com/v1/letters/ltr_4868c3b754655f90 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const letter = await new LettersApi(config).get("ltr_4868c3b754655f90");
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/letters/ltr_4868c3b754655f90" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteLetter = await new LettersApi(config).cancel(
    "ltr_4868c3b754655f90"
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/letters \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Letter" \
  -d "from=adr_210a8d4b0b76d77b" \
  --data-urlencode "file=<html style='padding-top: 3in; margin: .5in;'>HTML Letter for {{name}}</html>" \
  -d "color=true" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=2261 Market Street" \
  -d "to[address_line2]=STE 5668" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94114" \
  -d "merge_variables[name]=Harry" \
  -d "cards[]=card_c51ae96f5cebf3e"
```

```typescript
const letterCreate = new LetterEditable({
  description: "Demo Letter",
  from: "adr_210a8d4b0b76d77b",
  file: "<html style='padding-top: 3in; margin: .5in;'>HTML Letter for {{name}}</html>",
  color: true,
  to: {
    name: "Harry Zhang",
    address_line1: "2261 Market Street",
    address_line2: "STE 5668",
    address_city: "San Francisco",
    address_state: "CA",
    address_zip: "94114",
  },
  merge_variables: {
    name: "Harry",
  },
  cards: ["card_c51ae96f5cebf3e"],
});

try {
  const myLetter = await new LettersApi(config).create(letterCreate);
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/letters?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const letters = await new LettersApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

## Checks Api

### Retrieve

```bash
curl https://api.lob.com/v1/checks/chk_534f10783683daa0 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const check = await new ChecksApi(config).get("chk_534f10783683daa0");
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/checks/chk_534f10783683daa0" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteCheck = await new ChecksApi(config).cancel(
    "chk_534f10783683daa0"
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/checks \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Check" \
  -d "bank_account=bank_8cad8df5354d33f" \
  -d "amount=22.5" \
  -d "memo=rent" \
  --data-urlencode "logo=https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png" \
  --data-urlencode "check_bottom=<h1 style='padding-top:4in;'>Demo Check for {{name}}</h1>" \
  -d "from=adr_210a8d4b0b76d77b" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=2261 Market Street" \
  -d "to[address_line2]=STE 5668" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94114" \
  -d "merge_variables[name]=Harry" \
```

```typescript
const checkCreate = new CheckEditable({
  description: "Demo Check",
  bank_account: "bank_8cad8df5354d33f",
  amount: 22.5,
  memo: "rent",
  logo: "https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png",
  check_bottom: "<h1 style='padding-top:4in;'>Demo Check for {{name}}</h1>",
  from: "adr_210a8d4b0b76d77b",
  to: {
    name: "Harry Zhang",
    address_line1: "2261 Market Street",
    address_line2: "STE 5668",
    address_city: "San Francisco",
    address_state: "CA",
    address_zip: "94114",
  },
  merge_variables: {
    name: "Harry",
  },
});

try {
  const myCheck = await new ChecksApi(config).create(checkCreate);
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/checks?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const checks = await new ChecksApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

## BankAccounts Api

### Retrieve

```bash
curl https://api.lob.com/v1/bank_accounts/bank_8cad8df5354d33f \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const bankAccount = await new BankAccountsApi(config).get(
    "bank_8cad8df5354d33f"
  );
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/bank_accounts/bank_3e64d9904356b20" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteBankAccount = await new BankAccountsApi(config).delete(
    "bank_3e64d9904356b20"
  );
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/bank_accounts?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const bankAccounts = await new BankAccountsApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

### Verify

```bash
curl https://api.lob.com/v1/bank_accounts/bank_dfceb4a2a05b57e/verify \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "amounts[]=25" \
  -d "amounts[]=63" \
```

```typescript
const verificationData = new BankAccountVerify({
  amounts: [25, 63],
});

try {
  const verifiedAccount = await new BankAccountsApi(config).verify(
    "bank_dfceb4a2a05b57e",
    verificationData
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/bank_accounts \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Test Bank Account" \
  -d "routing_number=322271627" \
  -d "account_number=123456789" \
  -d "signatory=John Doe" \
  -d "account_type=company" \
```

```typescript
const bankAccountCreate = new BankAccountWritable({
  description: "Test Bank Account",
  routing_number: "322271627",
  account_number: "123456789",
  signatory: "John Doe",
  account_type: BankTypeEnum.Company,
});

try {
  const myBankAccount = await new BankAccountsApi(config).create(
    bankAccountCreate
  );
} catch (err: any) {
  console.error(err);
}
```

## Templates Api

### Retrieve

```bash
curl https://api.lob.com/v1/templates/tmpl_c94e83ca2cd5121 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const template = await new TemplatesApi(config).get("tmpl_c94e83ca2cd5121");
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/templates/tmpl_df934eeda694203" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteTemplate = await new TemplatesApi(config).delete(
    "tmpl_df934eeda694203"
  );
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/templates?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const templates = await new TemplatesApi(config).list(2);
} catch (err: any) {
  console.error(err);
}
```

### Update

```bash
curl https://api.lob.com/v1/templates/tmpl_c94e83ca2cd5121 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Updated description" \
  -d "published_version=vrsn_362184d96d9b0c9"
```

```typescript
const Templates = new TemplatesApi(config);

try {
  const updateData = new TemplateUpdate({
    description: "updated template",
    published_version: "vrsn_362184d96d9b0c9",
  });
  const updateTemplate = await Templates.update(
    "tmpl_c94e83ca2cd5121",
    updateData
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/templates \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Test Template" \
  --data-urlencode "html=<html>HTML for {{name}}</html>" \
```

```typescript
const templateCreate = new TemplateWritable({
  description: "Test Template",
  html: "<html>HTML for {{name}}</html>",
});

try {
  const myTemplate = await new TemplatesApi(config).create(templateCreate);
} catch (err: any) {
  console.error(err);
}
```

## TemplateVersions Api

### Retrieve

```bash
curl -X GET "https://api.lob.com/v1/templates/tmpl_c94e83ca2cd5121/versions/vrsn_534e339882d2282" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const templateVersion = await new TemplateVersionsApi(config).get(
    "tmpl_c94e83ca2cd5121",
    "vrsn_534e339882d2282"
  );
} catch (err: any) {
  console.error(err);
}
```

### Delete

```bash
curl -X DELETE "https://api.lob.com/v1/templates/tmpl_4aa14648113e45b/versions/vrsn_534e339882d2282" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const deleteTemplateVersion = await new TemplateVersionsApi(config).delete(
    "tmpl_4aa14648113e45b",
    "vrsn_534e339882d2282"
  );
} catch (err: any) {
  console.error(err);
}
```

### List

```bash
curl -X GET "https://api.lob.com/v1/templates/tmpl_dadaaf7b76c9f25/versions?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const templateVersions = await new TemplateVersionsApi(config).list(
    "tmpl_dadaaf7b76c9f25"
  );
} catch (err: any) {
  console.error(err);
}
```

### Update

```bash
curl https://api.lob.com/v1/templates/tmpl_c94e83ca2cd5121/versions/vrsn_534e339882d2282 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Updated description"
```

```typescript
const TemplateVersions = new TemplateVersionsApi(config);

try {
  const updateData = new TemplateVersionUpdatable({
    description: "updated template",
  });
  const updateTemplateVersion = await TemplateVersions.update(
    "tmpl_c94e83ca2cd5121",
    "vrsn_534e339882d2282",
    updateData
  );
} catch (err: any) {
  console.error(err);
}
```

### Create

```bash
curl https://api.lob.com/v1/templates/tmpl_4aa14648113e45b/versions \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Second Version" \
  --data-urlencode "html=<html>Second HTML for {{name}}</html>" \
```

```typescript
const templateVersionCreate = new TemplateVersionWritable({
  description: "Second Version",
  html: "<html>Second HTML for {{name}}</html>",
});

try {
  const myTemplateVersion = await new TemplateVersionsApi(config).create(
    "tmpl_4aa14648113e45b",
    templateVersionCreate
  );
} catch (err: any) {
  console.error(err);
}
```

## IntlAutocompletion Api

### IntlAutocompletion

```bash
curl https://api.lob.com/v1/intl_autocompletions \
  -u <YOUR_LIVE_API_KEY>: \
  -d "address_prefix=340 Wat" \
  -d "city=Summerside" \
  -d "state=Prince Edward Island" \
  -d "zip_code=C1N 1C4" \
  -d "country=CA" \
```

```typescript
const IntlAutocompletions = new IntlAutocompletionsApi(config);
const autoCompletionData = new IntlAutocompletionsWritable({
  address_prefix: "340 Wat",
  city: "Summerside",
  state: "Prince Edward Island",
  zip_code: "C1N 1C4",
  country: "CA",
});

try {
  const autocompletedAddresses = await IntlAutocompletions.autocomplete(
    autoCompletionData
  );
} catch (err: any) {
  console.error(err);
}
```

## ZipLookups Api

### ZipLookup

```bash
curl https://api.lob.com/v1/us_zip_lookups \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "zip_code=94107"
```

```typescript
const ZipLookup = new ZipLookupsApi(config);
const zipRequest = new ZipEditable({
  zip_code: "94107",
});

try {
  const zipLookup = await ZipLookup.lookup(zipRequest);
} catch (err: any) {
  console.error(err);
}
```

## Reverse Geocode Lookups Api

### Reverse Geocode Lookup

```bash
curl https://api.lob.com/v1/us_reverse_geocode_lookups \
  -u <YOUR_LIVE_API_KEY>: \
```

```typescript
const ReverseGeocodeLookup = new ReverseGeocodeLookupsApi(config);
const coordinates = new Location({});

try {
  const geocode = await ReverseGeocodeLookup.lookup(coordinates);
} catch (err: any) {
  console.error(err);
}
```

## USAutoCompletions Api

### Autocomplete

```bash
curl https://api.lob.com/v1/us_autocompletions \
  -u <YOUR_LIVE_API_KEY>: \
  -d "address_prefix=185 B" \
  -d "city=San Francisco" \
  -d "state=CA" \
  -d "zip_code=94017" \
```

```typescript
const UsAutocompletions = new UsAutocompletionsApi(config);
const autocompletionData = new UsAutocompletionsWritable({
  address_prefix: "185 B",
  city: "San Francisco",
  state: "CA",
  zip_code: "94017",
});

try {
  const autocompletedAddresses = await UsAutocompletions.autocomplete(
    autocompletionData
  );
} catch (err: any) {
  console.error(err);
}
```

## UsVerifications Api

### Bulk Verify

```bash
curl https://api.lob.com/v1/bulk/us_verifications \
  -u <YOUR LIVE API KEY>: \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'addresses[0][primary_line]=2261 Market Street' \
  --data-urlencode 'addresses[0][city]=San Francisco' \
  --data-urlencode 'addresses[0][state]=CA' \
  --data-urlencode 'addresses[0][zip_code]=94114' \
  --data-urlencode 'addresses[1][primary_line]=185 BERRY ST STE 6600' \
  --data-urlencode 'addresses[1][city]=SAN FRANCISCO' \
  --data-urlencode 'addresses[1][state]=CA' \
  --data-urlencode 'addresses[1][zip_code]=94017' \
```

```typescript
const UsVerifications = new UsVerificationsApi(config);

const verificationData0 = new MultipleComponents({
  primary_line: "2261 Market Street",
  city: "San Francisco",
  state: "CA",
  zip_code: "94114",
});

const verificationData1 = new MultipleComponents({
  primary_line: "185 BERRY ST STE 6600",
  city: "SAN FRANCISCO",
  state: "CA",
  zip_code: "94017",
});

const addressList = new MultipleComponentsList({
  addresses: [verificationData0, verificationData1],
});

try {
  const bulkVerified = await UsVerifications.verifyBulk(addressList);
} catch (err: any) {
  console.error(err);
}
```

### Single Verify

```bash
curl https://api.lob.com/v1/us_verifications \
  -u <YOUR_LIVE_API_KEY>: \
  -d "primary_line=2261 Market Street" \
  -d "city=San Francisco" \
  -d "state=CA" \
  -d "zip_code=94114" \
```

```typescript
const UsVerification = new UsVerificationsApi(config);
const verificationData1 = new UsVerificationsWritable({
  primary_line: "2261 Market Street",
  city: "San Francisco",
  state: "CA",
  zip_code: "94114",
});

try {
  const singleVerified = await UsVerification.verifySingle(verificationData1);
} catch (err: any) {
  console.error(err);
}
```
