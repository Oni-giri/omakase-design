#!/usr/bin/env bash
# Installs the Omakase design system into the current project.
# Usage: bash install.sh [target-dir]     default target: src/omakase if ./src exists, else ./omakase
# Re-running updates the files in place (it overwrites the target folder, nothing else).
set -euo pipefail

REPO="${OMAKASE_REPO:-https://github.com/Oni-giri/omakase-design}"
REF="${OMAKASE_REF:-main}"
if [ $# -ge 1 ]; then TARGET="$1"; elif [ -d src ]; then TARGET="src/omakase"; else TARGET="omakase"; fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git clone --quiet --depth 1 --branch "$REF" "$REPO" "$TMP/omakase"
SHA="$(git -C "$TMP/omakase" rev-parse --short HEAD)"

rm -rf "$TARGET"
mkdir -p "$TARGET"
cp -R "$TMP/omakase/css" "$TMP/omakase/tokens" "$TMP/omakase/icons" "$TMP/omakase/docs" "$TMP/omakase/examples" "$TARGET/"
cp "$TMP/omakase/AGENTS.md" "$TARGET/AGENTS.md"
mkdir -p "$TARGET/scripts" && cp "$TMP/omakase/scripts/check.mjs" "$TARGET/scripts/check.mjs"

# React components only when the project uses React.
if [ -f package.json ] && grep -q '"react"' package.json; then
  cp -R "$TMP/omakase/react" "$TARGET/react"
  STACK="react"
else
  STACK="html"
  rm -rf "$TARGET/examples/react"   # its TSX would break non-React builds
fi
TW="none"
if [ -f package.json ] && grep -q '"tailwindcss"' package.json; then
  if grep -Eq '"tailwindcss": *"[\^~]?4' package.json; then TW="v4"; else TW="v3"; fi
fi

echo "$REPO@$SHA" > "$TARGET/VERSION"
echo "Omakase $SHA installed in $TARGET (stack: $STACK, tailwind: $TW)"
echo "Next: wire it up as $TARGET/AGENTS.md section 1 says, then build, then: node $TARGET/scripts/check.mjs src"
