# Modifying a Resource for SDK Generation

Most of the resources aren't super different from their `lob-openapi` counterparts.

*(1)* Make sure the filepaths match the patterns in this repository, as opposed to `lob-openapi`. This mostly affects files within `shared/`, since the structure of the `shared` folder here is a little different from the one in `lob-openapi`. Usually doing a find and replace which changes `../../shared` to `../shared` works pretty well.

*(2)* Get rid of all `required` blocks. We don't need them.

*(3)* There are some files which are different between the two repositories:

Unlike in `lob-openapi`, there are no individual error files, because there are no examples in the SDK specs (the examples in the `lob-openapi` error files are why they're resource-specific). All resources use `specs/shared/models/lob_error.yml` as their error response. Another variation is that the `before_after` parameter has been split into `before` and `after` here. `object.yml` has also become `lob_object`. The reason some files have `lob_` as a prefix is because OpenAPI has trouble naming model files which share names with preexisting types, like Error and Object.

More differences which apply to some resources: `address_intl` and `address_us` are not differentiated here. There is no `inline`. For examples of how to construct `to` and `from` for resources where both are domestic, check out `specs/checks/models/check_editable_props.yml`. If `to` can be international, check out `specs/postcards/models/postcard_editable.yml`.

*(4)* `allOf` is not allowed at the beginning of files. I know it violates DRY, but repeating properties across files is just fine here, given OpenAPI Generator's weirdness about `allOf` in models. Copy and paste the properties in each file in the `allOf` list into the main one, and delete the `allOf`.

*(5)* Change the `summary:` values for operations to lowercase, one-word function names (e.g. `get`, `delete`, etc based on the operation they're associated with).