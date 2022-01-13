## Current Workflow
As of January 2022

First, navigate to `./sdks/` and run `git clone git@github.com:lob/lob-sdk-ts.git`

When a change is made to either a spec or a template, navigate to any affected sdk repo and:
* `git checkout master`
* `git pull`
* `git checkout -b feat/<<whatever>>`

Then go back to the root and run the generate operation. Assuming that it is correct, you will need to commit and push your sdk branch manually.

Once that is done, go to a more permanent working copy of the SDK repo and pull your branch with the new generation output.

Finally, add tests, commit, and open a PR.

## Modifying a Resource for SDK Generation

Most of the resources aren't super different from their `lob-openapi` counterparts.

(1) Make sure the filepaths match the patterns in this repository, as opposed to `lob-openapi`. This mostly affects files within `shared/`, since the structure of the `shared` folder here is a little different from the one in `lob-openapi`. Usually doing a find and replace which changes `../../shared` to `../shared` works pretty well.

(2) There are some files which are different between the two repositories. Unlike in `lob-openapi`, there are no individual error files, because there are no examples in the SDK specs (the examples in the `lob-openapi` error files are why they're resource-specific). All resources use `specs/shared/models/lob_error.yml` as their error response. Another variation is that the `before_after` parameter has been split into `before` and `after` here. `object.yml` has also become `lob_object`. The reason some files have `lob_` as a prefix is because OpenAPI has trouble naming model files which share names with preexisting types, like Error and Object.

The most complex changes 