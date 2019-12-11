#!/bin/bash
set -e

REPO="https://${GITHUB_BOT_TOKEN}@github.com/ambanum/pariscall.international.git"

git config user.name "AmbNum-Bot"
git config user.email "pariscall-tech.dgp-asd-asc@diplomatie.gouv.fr"

git checkout gh-pages
git pull origin gh-pages

find . -maxdepth 1 ! -name '_site' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv _site/* .
rm -R _site/

git add -fA
git commit --allow-empty -m "$(git log master -1 --pretty=%B)
[skip ci]"
git push $REPO gh-pages

echo "Deployed successfully"
