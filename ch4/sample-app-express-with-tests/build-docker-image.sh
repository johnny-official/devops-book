#!/usr/bin/env bash

set -e

name=$(bun -p "require('./package.json').name")
version=$(bun -p "require('./package.json').version")

docker buildx build \
  --platform=linux/amd64,linux/arm64 \
  --load \
  -t "$name:$version" \
  .
