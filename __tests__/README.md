# Guide to Automated Testing

## Unit Tests

### Goal

The intention of a unit test is to evaluate the correctness of a single unit of code in isolation.
Although the "perfect" unit test would evaluate the smallest block of isolable code, often a single
function, for correct behavior in each meaningful variation of inputs, this can lead to overly
obtuse testing for the sake of testing.

The unit testing in this project blends some aspects of integration testing with the goal of
reducing the cost of creating tests.

### Isolating Code

Code that is not isolated is code that has reliance on operations in a different scope. In order
isolate code, we provide a **mock** version of the relied on code with specific behavior needed
for the specific test.

For example, this code base makes heavy reliance on the `axios` library, so we consistently need
to provide a mock for it.

```typescript
import axios from "axios";
const axiosRequest: jest.Mock = axios.request as jest.Mock;
jest.mock("axios", () => ({
  request: jest.fn(),
}));
```

We import `axios` and then immediately create a specifically typed reference to an operations
because we need access to it in order to specify the behavior as follows:

```typescript
axiosRequest.mockImplementationOnce(async () => {
  // Mock behavior
});
```

Within the mock implementation, we can do anything we want. The most common practice is to
either return a known value or throw an error. We can also **expect**/**assert** within the
mock if we are in a test.

### Structure of a test file

- As normal, provide all imports at the top of the file
- Follow that with all mock definitions
- Then there should be at least one `describe` block at the root level that provides the name of the module being tested.
  - Provide any static data or structures needed for the tests
    - if these change in any way between tests, then they should be declared in that test.
    - **There should NEVER be any dependence between tests**
  - **Before and After operations should never be needed in unit tests**
  - Provide any high level tests
  - provide nested describe blocks
- Provide additional describe blocks at the root level if testing multiple modules

### Structure of a Test

In general, use the AAA (Arrange-Act-Assert) pattern when crafting your test. You can also
think of this as set-up, act, and evaluate.

```typescript
it("handles errors returned by the api", async () => {
  // Arrange
  axiosRequest.mockImplementationOnce(async () => {
    throw {
      message: "error",
      response: { data: { error: { message: "error reported by API" } } },
    };
  });

  // Act
  try {
    await new AddressesApi(config).create(addressCreate);
  } catch (err: any) {
    // Assert
    expect(err.message).toEqual("error reported by API");
  }
});

it("works", async () => {
  // Arrange
  axiosRequest.mockImplementationOnce(async () => ({}));

  // Act
  const value = await new AddressesApi(config).create(addressCreate);

  // Assert
  expect(value).toEqual({});
});
```

A caveat to this is assertions expressed in the mock implementation. Although declared
near the beginning of the test, these are evaluated during the act stage.

### Large number of variations

When a block of code has a large number of variations that need to be evaluated, use
loops or leverage other test utilities to express the variations.

In Jest, this is done with `it.each` as follows:

```typescript
it.each([
  ["id", "ltr_fakeId"],
  ["to", new Address()],
])("can be created with a provided %s value", (prop, val) => {
  const input = {};
  (input as any)[prop] = val;

  const rec = new Letter(input);

  expect(rec).toBeDefined();
  expect((rec as any)[prop]).toEqual(val);
});
```

Or, alternatively:

```typescript
it("does a thing", (prop, val) => {
  const input = {};
  (input as any)[prop] = val;

  const cases = [{ input: "inVal", output: "out value" }];
  for (const testCase of cases) {
    expect(thingDoer(testCase.input)).toEqual(testCase.output);
  }
});
```

## Integration Tests

### Goal

An integration test validates that a block of work can be done with the software. This
evaluation leverages a production like environment and will often involve interactions
between different systems. For example, a web API will often interact with a cache service
and a database as part of every operation.

In other words, code isolation is limited to very specific cases based on the application
being tested.

### Providing Sensitive Data

All secrets will be provided as environment variables and will never be expressed
directly in code.

### Structure of a test file

- As normal, provide all imports at the top of the file
- Then there should be at least one `describe` block at the root level that provides the name of the module being tested.
  - Provide any static data or structures needed for the tests
  - Declare any dynamic data references that will be needed in runtime
    - **Do Not Set the Value**
  - add a `before` operation if the tested module requires any pre-existing data simply to operate
  - add an `after` if there is a before.
    - This will undo any change made in the `before`. Clean up after your tests
  - add a beforeEach if many tests need the same setup
    - these will often also require some additions to `after`
  - provide any high level tests
  - provide any describe block to collect related tests
    - nested describe blocks should follow the same pattern as root describe blocks
    - provide operational tests
      - \*\*Do Not perform more than one action per test

### Structure of a test

Integration tests should follow the same AAA pattern as unit tests. The caveat is that
most integration tests will not require an arrange phase. The following is a trimmed
down integration test with comments explaining what the parts are for.

```typescript
describe("AddressApi", () => {
  // Module level container
  jest.setTimeout(1000 * 60); // Extends the allowed time for the test
  const config: Configuration = new Configuration({
    username: process.env.LOB_API_TEST_KEY,
  }); // Static data required for the remote call

  const addressCreate: AddressEditable = {
    name: "Thing T. Thing",
    address_line1: "1313 CEMETERY LN",
    address_city: "WESTFIELD",
    address_state: "NJ",
    address_zip: "07000",
  }; // Static data structure used for the actual test

  const createdAddressIds: string[] = []; // A holding place for references needed during cleanup
  afterAll(async () => {
    // Cleanup After yourself
    const addressApi = new AddressesApi(config);
    for (const addressId of createdAddressIds) {
      await addressApi.delete(addressId); // Cleanup action
    }
  });

  describe("create", () => {
    // Collection of similar tests
    it("creates a new address", async () => {
      // operation test
      // Act
      const address = await new AddressesApi(config).create(addressCreate);

      // Assertions
      expect(address).toBeDefined();
      expect(address.id).toBeDefined();
      createdAddressIds.push(address.id);
    });
  });
});
```

### Dependency between Tests

Integration tests will have interdependency from one test to the next. Ideally, these
dependencies are minimal. When required, the affected tests should be clearly grouped
together within a single `describe` block. If the tests require that fixtures for a
different entity be provided, those fixtures should be set up in a `beforeAll` and
cleaned up in a corresponding `afterAll` within the `describe` block that most directly
requires the fixtures.

For example, if the root level `describe` block for the `LettersApi` needs to evaluate
a case where a number of _letters_ are created in a certain way that requires a reference
to a _template_ by that _template's_ id, then there should be a nested `describe` block
that contains a `beforeAll` that creates a template and retains the id within the nested
scope, an `afterAll` that deletes the template created in the `beforeAll` using the
retained id, and all tests for the particular case.

```typescript
describe("LettersApi", () => {
  describe("With template reference", () => {
    const templateFixture = {
      /* Whatever the template structure needs to be */
    };
    let createdTemplate: Template = new Template();
    beforeAll(async () => {
      createdTemplate = await new TemplateApi(config).create(templateFixture)
        .id;
    });
    afterAll(async () => {
      await new TemplateApi(config).create(createdTemplate.id);
    });

    it("creates a letter with a template id", async () => {
      /* Some sort of test */
    });
  });
});
```

**The Exception**
When a later tests deletes a record that was created as part of the test flow, the `afterAll`
block will not need to include an attempt to delete it a second time. This is largely only
going to be the case for integration tests that have a case for create and a case for delete.

## Test Fixtures

Integration tests and validation based unit tests often need specific data that can be static.
Some fixtures are only used in one test, like the structure of a specific entity's id, while
other bits of static data is used repeatedly throughout many test files, like the url to a file.

### Single use Fixture

Place the fixture as near to the scope in which it is used. If every test needs the value,
