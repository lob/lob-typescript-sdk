#!/bin/bash

generatedFolders=("api" "models")
baseBranch=$1
currentBranch=$2

git fetch
git checkout "${currentBranch}"
for folder in ${generatedFolders[@]}; do
    prohibitedAuthors=$(git shortlog origin/${baseBranch}.. -se  --perl-regexp --author='^((?!lobot).*)$' -- ${folder} 2>&1)
    if [ -z "$prohibitedAuthors" ]
    then
        continue
    else
        exit 13
    fi
done
