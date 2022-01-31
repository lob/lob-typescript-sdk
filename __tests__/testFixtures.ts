import { Configuration } from "../configuration";

export const URL_VALID_LIST = [
  "https://lob-assets.com/bank-accounts/asd_asdfghjkqwertyui.pdf?version=123&expires=1234567890&signature=aksdf",
];

export const DATE_FILTER = { gt: "2020-01-01", lt: "2020-01-31T12" };

export const CONFIG_FOR_INTEGRATION: Configuration = new Configuration({
  username: process.env.LOB_API_KEY,
});

export const CONFIG_FOR_INTEGRATION_WITH_LIVE: Configuration =
  new Configuration({
    username: process.env.LOB_LIVE_API_KEY,
  });

export const CONFIG_FOR_UNIT: Configuration = new Configuration({
  username: "Totally Fake Key",
});
export const CONFIG_WITH_BASE_OPTIONS_FOR_UNIT: Configuration =
  new Configuration({
    username: "Totally Fake Key",
    baseOptions: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
