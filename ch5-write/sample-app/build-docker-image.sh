#!/usr/bin/env bash

set -e

name=$(node -p 'require("./package.json").name')
version=$(node -p 'require("./package.json").version')

docker buildx build \
  --platform=linux/amd64,linux/arm64 \
  --load \
  -t "$name:$version" \
  .
