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

### List

```bash
curl -X GET "https://api.lob.com/v1/templates/tmpl_ea6e6a1abf01703/versions?limit=2" \
  -u test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc:
```

```typescript
try {
  const templateVersions = await new TemplateVersionsApi(config).list(
    tmpl_xxxx
  );
} catch (err: any) {
  console.error(err);
}
```
