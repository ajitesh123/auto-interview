#!/usr/bin/env bash
# Test build in a sandbox without Google Fonts access. Restores the build-generated tag file afterwards.
set -e
cd "$(dirname "$0")/../.."
NEXT_FONT_GOOGLE_MOCKED_RESPONSES="$PWD/scripts/dev/fontmock.cjs" NODE_OPTIONS=--max-old-space-size=4096 npx next build
git checkout -- app/tag-data.json 2>/dev/null || true
