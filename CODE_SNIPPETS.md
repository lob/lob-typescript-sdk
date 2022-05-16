# Code Snippets

## Address Api

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

```typescript
try {
  const templateVersions = await new TemplateVersionsApi(config).list(
    tmpl_xxxx
  );
} catch (err: any) {
  console.error(err);
}
```
