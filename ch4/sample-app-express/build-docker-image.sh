#!/usr/bin/env bash

set -e

# name=$(npm pkg get name | tr -d '"')
# version=$(npm pkg get version | tr -d '"')

name=$(bun -p 'require("./package.json").name')
version=$(bun -p 'require("./package.json").version')

docker buildx build \
  --platform=linux/amd64 \
  --load \
  -t "$name:$version" \
  .
