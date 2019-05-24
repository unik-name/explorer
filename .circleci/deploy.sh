#!/bin/sh

set -e # if a command exit is > 0, exit script

if [ "$CIRCLE_BRANCH" = "master" ] && [ -z "${CIRCLE_PULL_REQUEST}" ];
then
    git clone --quiet --depth=1 --branch=gh-pages $(git config remote.origin.url) gh-pages

    cd gh-pages

    git config user.email "developers@spacelephant.org"
    git config user.name "SpacelephantBot"

    # Delete all files (including 'dot' files), except .git folder
    find -not -path "./.git/*" -not -name ".git" -delete
    git add -A
    git commit -m "[CI] Clear branch"

    cp -RvT ../dist/ . # all files (even .*), recursive, verbose, doesn't create dest 'dist' folder

    git add -f .
    git commit -m "[CI]: publish master#$CIRCLE_SHA1 | Build $CIRCLE_BUILD_NUM | $(date -u '+%Y-%m-%d %H:%M:%S %Z')"

    git push --quiet --set-upstream origin HEAD:gh-pages

else

  echo "Nothing to do!!"
  echo "Branch: '$CIRCLE_BRANCH' - CIRCLE_PULL_REQUEST: '$CIRCLE_PULL_REQUEST'"
fi