#!/bin/bash

generatedFolders=("api" "models")
acceptedAuthor=$1
baseBranch=$2

for folder in ${generatedFolders[@]}; do
    prohibitedAuthors=$(git shortlog ${baseBranch}.. -se  --perl-regexp --author="^((?!${acceptedAuthor}).*)$" -- ${folder} 2>&1)
    if [ -z "$prohibitedAuthors" ]
    then
        continue
    else
        exit 13
    fi
done

 echo 'Begin Middle End' | awk -F ' | ' '{print $2}'