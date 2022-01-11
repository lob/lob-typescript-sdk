import * as index from "../index";

import * as configuration from "../configuration";
import * as api from "../api";

describe("index", () => {
  it("Configuration is exported", () => {
    const indexAttributes = Object.keys(index);
    for (const key of Object.keys(configuration)) {
      expect(indexAttributes).toContain(key);
    }
  });

  it("API is exported", () => {
    const indexAttributes = Object.keys(index);
    for (const key of Object.keys(api)) {
      expect(indexAttributes).toContain(key);
    }
  });
});
