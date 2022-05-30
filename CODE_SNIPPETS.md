# Code Snippets

## Address Api

<<<<<<< HEAD
### Retrieve
```bash
curl https://api.lob.com/v1/addresses/adr_fa85158b26c3eb7c \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const address = await new AddressesApi(config).get('adr_fa85158b26c3eb7c');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======
### Create
```bash
curl https://api.lob.com/v1/addresses \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Harry - Office" \
  -d "name=Harry Zhang" \
  -d "company=Lob" \
  -d "email=harry@lob.com" \
  -d "phone=5555555555" \
  -d "address_line1=210 King St" \
  -d "address_line2=# 6100" \
  -d "address_city=San Francisco" \
  -d "address_state=CA" \
  -d "address_zip=94107" \
  -d "address_country=US" \
```

```typescript
const addressCreate = new AddressEditable({
  description: 'Harry - Office',
  name: 'Harry Zhang',
  company: 'Lob',
  email: 'harry@lob.com',
  phone: '5555555555',
  address_line1: '210 King St',
  address_line2: '# 6100',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94107',
  address_country: 'US'
});

try {
  const myAddress = await new AddressesApi(config).create(addressCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======

>>>>>>> 51728890 (docs: create code snippets)
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

### Create
```bash
curl https://api.lob.com/v1/postcards \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Postcard job" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=210 King St" \
  -d "to[address_line2]=# 6100" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94107" \
  -d "from=adr_210a8d4b0b76d77b" \
  --data-urlencode 'front=<html style="padding: 1in; font-size: 50;">Front HTML for {{name}}</html>' \
  --data-urlencode 'back=<html style="padding: 1in; font-size: 20;">Back HTML for {{name}}</html>' \
  -d "merge_variables[name]=Harry" \
```

```typescript
const postcardCreate = new PostcardEditable({
  description: 'Demo Postcard job',
  to: new AddressEditable({
    name: 'Harry Zhang'
    address_line1: '210 King St',
    address_line2: '# 6100',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
  }),
  from: 'adr_210a8d4b0b76d77b',
  front: '<html style="padding: 1in; font-size: 50;">Front HTML for {{name}}</html>',
  back: '<html style="padding: 1in; font-size: 20;">Back HTML for {{name}}</html>',
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

<<<<<<< HEAD
### Retrieve
```bash
curl https://api.lob.com/v1/self_mailers/sfm_8ffbe811dea49dcf \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const selfMailer = await new SelfMailersApi(config).get('sfm_8ffbe811dea49dcf');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======
### Create
```bash
curl https://api.lob.com/v1/self_mailers \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Self Mailer job" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=210 King St" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94107" \
  -d "from=adr_210a8d4b0b76d77b" \
  --data-urlencode 'inside=<html style="padding: 1in; font-size: 50;">Inside HTML for {{name}}</html>' \
  --data-urlencode 'outside=<html style="padding: 1in; font-size: 20;">Outside HTML for {{name}}</html>' \
  -d "merge_variables[name]=Harry" \
```

```typescript
const selfMailerCreate = new SelfMailerEditable({
  description: 'Demo Self Mailer job',
  to: new AddressEditable({
    name: 'Harry Zhang'
    address_line1: '210 King St',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
  }),
  from: 'adr_210a8d4b0b76d77b',
  inside: '<html style="padding: 1in; font-size: 50;">Inside HTML for {{name}}</html>',
  outside: '<html style="padding: 1in; font-size: 20;">Outside HTML for {{name}}</html>',
});

try {
  const mySelfMailer = await new SelfMailersApi(config).create(selfMailerCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======

>>>>>>> 51728890 (docs: create code snippets)
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

<<<<<<< HEAD
### Retrieve
```bash
curl https://api.lob.com/v1/letters/ltr_4868c3b754655f90 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const letter = await new LettersApi(config).get('ltr_4868c3b754655f90');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======
### Create
```bash
curl https://api.lob.com/v1/letters \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Letter" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=210 King St" \
  -d "to[address_line2]=# 6100" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94107" \
  -d "from=adr_210a8d4b0b76d77b" \
  --data-urlencode 'file=<html style="padding-top: 3in; margin: .5in;">HTML Letter for {{name}}</html>' \
  -d "merge_variables[name]=Harry" \
  -d "color=true" \
  -d "cards[]=card_c51ae96f5cebf3e" \
```

```typescript
const letterCreate = new LetterEditable({
  description: 'Demo Letter',
  to: new AddressEditable({
    name: 'Harry Zhang'
    address_line1: '210 King St',
    address_line2: '# 6100',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
  }),
  from: 'adr_210a8d4b0b76d77b',
  file: '<html style="padding-top: 3in; margin: .5in;">HTML Letter for {{name}}</html>',
  color: true,
});

try {
  const myLetter = await new LettersApi(config).create(letterCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======

>>>>>>> 51728890 (docs: create code snippets)
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

<<<<<<< HEAD
### Retrieve
```bash
curl https://api.lob.com/v1/checks/chk_534f10783683daa0 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const check = await new ChecksApi(config).get('chk_534f10783683daa0');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======
### Create
```bash
curl https://api.lob.com/v1/checks \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Demo Check" \
  -d "to[name]=Harry Zhang" \
  -d "to[address_line1]=210 King St" \
  -d "to[address_line2]=# 6100" \
  -d "to[address_city]=San Francisco" \
  -d "to[address_state]=CA" \
  -d "to[address_zip]=94107" \
  -d "from=adr_210a8d4b0b76d77b" \
  -d 'bank_account=bank_8cad8df5354d33f' \
  -d 'amount=22.50' \
  -d 'memo=rent' \
  --data-urlencode 'logo=https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png' \
  --data-urlencode 'check_bottom=<h1 style="padding-top:4in;">Demo Check for {{name}}</h1>' \
  -d "merge_variables[name]=Harry" \
```

```typescript
const checkCreate = new CheckEditable({
  description: 'Demo Check',
  to: new AddressEditable({
    name: 'Harry Zhang'
    address_line1: '210 King St',
    address_line2: '# 6100',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94107',
  }),
  from: 'adr_210a8d4b0b76d77b',
  bank_account: 'bank_8cad8df5354d33f',
  amount: 22.50,
});

try {
  const myCheck = await new ChecksApi(config).create(checkCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======

>>>>>>> 51728890 (docs: create code snippets)
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

<<<<<<< HEAD
### Retrieve
```bash
curl https://api.lob.com/v1/bank_accounts/bank_8cad8df5354d33f \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const bankAccount = await new BankAccountsApi(config).get('bank_8cad8df5354d33f');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======

>>>>>>> 51728890 (docs: create code snippets)
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

<<<<<<< HEAD

=======
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
  description: 'Test Bank Account',
  routing_number: '322271627',
  account_number: '123456789',
  signatory: 'John Doe',
  account_type: BankTypeEnum.Company,
});

try {
  const myBankAccount = await new BankAccountsApi(config).create(bankAccountCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)


## Templates Api

<<<<<<< HEAD
### Retrieve
```bash
curl https://api.lob.com/v1/templates/tmpl_c94e83ca2cd5121 \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const template = await new TemplatesApi(config).get('tmpl_c94e83ca2cd5121');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)


<<<<<<< HEAD

=======

>>>>>>> 51728890 (docs: create code snippets)
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

<<<<<<< HEAD

=======
### Create
```bash
curl https://api.lob.com/v1/templates \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Test Template" \
  --data-urlencode 'html=<html>HTML for {{name}}</html>' \
```

```typescript
const templateCreate = new TemplateWritable({
  description: 'Test Template',
  html: '<html>HTML for {{name}}</html>',
});

try {
  const myTemplate = await new TemplatesApi(config).create(templateCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)


## TemplateVersions Api

<<<<<<< HEAD
### Retrieve
```bash
curl -X GET "https://api.lob.com/v1/templates/tmpl_c94e83ca2cd5121/versions/vrsn_534e339882d2282" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const templateVersion = await new TemplateVersionsApi(config).get('tmpl_c94e83ca2cd5121', 'vrsn_534e339882d2282');
} catch (err: any) {
  console.error(err);
}
```
=======

>>>>>>> 51728890 (docs: create code snippets)

<<<<<<< HEAD
=======

>>>>>>> 51728890 (docs: create code snippets)
### List
```bash
curl -X GET "https://api.lob.com/v1/templates/tmpl_ea6e6a1abf01703/versions?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const templateVersions = await new TemplateVersionsApi(config).list(tmpl_xxxx);
} catch (err: any) {
  console.error(err);
}
```

<<<<<<< HEAD
=======
### Create
```bash
curl https://api.lob.com/v1/templates/tmpl_4aa14648113e45b/versions \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc: \
  -d "description=Second Version" \
  --data-urlencode 'html=<html>Second HTML for {{name}}</html>' \
```

```typescript
const templateVersionCreate = new TemplateVersionWritable({
  description: 'Second Version',
  html: '<html>Second HTML for {{name}}</html>',
});

try {
  const myTemplateVersion = await new TemplateVersionsApi(config).create(templateVersionCreate);
} catch (err: any) {
  console.error(err);
}
```
>>>>>>> 51728890 (docs: create code snippets)
