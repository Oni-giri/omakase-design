#!/usr/bin/env bash
# Installs the Omakase design system into the current project.
# Usage: bash install.sh [target-dir]     default target: src/omakase if ./src exists, else ./omakase
# Installs the latest release (highest vX.Y.Z tag). Pin one with OMAKASE_REF=v0.2.1, or OMAKASE_REF=main for unreleased work.
# Re-running updates the files in place (it overwrites the target folder, nothing else) and prints the versions to read in CHANGELOG.md.
set -euo pipefail

REPO="${OMAKASE_REPO:-https://github.com/Oni-giri/omakase-design}"
REF="${OMAKASE_REF:-}"
if [ -z "$REF" ]; then
  REF="$(git ls-remote --tags --refs "$REPO" 'v*' | sed 's#.*refs/tags/##' | sort -V | tail -1)"
  REF="${REF:-main}"
fi
if [ $# -ge 1 ]; then TARGET="$1"; elif [ -d src ]; then TARGET="src/omakase"; else TARGET="omakase"; fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git clone --quiet --depth 1 --branch "$REF" "$REPO" "$TMP/omakase"
SHA="$(git -C "$TMP/omakase" rev-parse --short HEAD)"

OLD=""
[ -f "$TARGET/VERSION" ] && OLD="$(head -1 "$TARGET/VERSION" | cut -d' ' -f1)"
case "$OLD" in ""|[0-9]*) ;; *) OLD="0.0.0" ;; esac   # installs from before versioning
NEW="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$TMP/omakase/package.json" | head -1)"

rm -rf "$TARGET"
mkdir -p "$TARGET"
cp -R "$TMP/omakase/css" "$TMP/omakase/tokens" "$TMP/omakase/icons" "$TMP/omakase/docs" "$TMP/omakase/examples" "$TARGET/"
cp "$TMP/omakase/AGENTS.md" "$TMP/omakase/CHANGELOG.md" "$TARGET/"
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

printf '%s (%s@%s, %s)\n' "$NEW" "$REPO" "$SHA" "$REF" > "$TARGET/VERSION"
if [ -n "$OLD" ] && [ "$OLD" != "$NEW" ]; then
  echo "Omakase updated from $OLD to $NEW in $TARGET (stack: $STACK, tailwind: $TW)"
  echo "Read $TARGET/CHANGELOG.md: every entry newer than $OLD, oldest first, and apply its Upgrade steps."
elif [ -n "$OLD" ]; then
  echo "Omakase $NEW reinstalled in $TARGET (already up to date)"
else
  echo "Omakase $NEW installed in $TARGET (stack: $STACK, tailwind: $TW)"
fi
echo "Next: wire it up as $TARGET/AGENTS.md section 1 says, then build, then: node $TARGET/scripts/check.mjs src"
