const core = require("@actions/core");
const pkg = require("../../package.json");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { WebClient } = require("@slack/web-api");
const { execSync } = require("child_process");
// my_custom_action.ts
const github = require("@actions/github");

web = new WebClient(process.env.SLACK_TOKEN);

module.exports.runTests = async function runTests() {
  try {
    exec("npm run test:all", async function (err, stdout) {
      if (err) {
        core.setFailed(`Tests errored out.`);
        try {
          await web.chat.postMessage({
            channel: "#eng-sdk-errors",
            text: `:octagonal_sign: Failure in the Typescript SDK tests. <https://github.com/lob/lob-typescript-sdk/actions/runs/${github.context.runId}|Link to Workflow Run>`,
          });
        } catch (slackError) {
          console.error(slackError);
        }
      }
    });
  } catch (execError) {
    core.setFailed(
      `Failure with childProcess.execSync. ERROR : ${execError.status}`
    );
    await web.chat.postMessage({
      channel: "#eng-sdk-errors",
      text: `:robot_face: Failure with childProcess.execSync.`,
    });
    process.exit();
  }
};

this.runTests();
