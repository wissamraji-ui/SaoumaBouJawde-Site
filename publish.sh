#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

git add .

git status --short

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "Update site"

git push
