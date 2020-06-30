#!/bin/sh

git filter-branch --env-filter '
if [ "$GIT_AUTHOR_NAME" = "xxx.lin" ]
then
export GIT_AUTHOR_NAME="suisrc"
export GIT_AUTHOR_EMAIL="suisrc@outlook.com"
fi
' HEAD
#git push --force
#git push --force github master