#!/bin/sh

# fail with failing exit code (and therefore a failing check)
# if any subcommand fails
set -e

sh -c "$1 && $2"