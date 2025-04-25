#!/bin/bash

# Stop and remove any existing container
docker rm -f jekyll-blip 2>/dev/null || true

# Run Jekyll in Docker
docker run --rm -it \
  --name jekyll-blip \
  -p 4000:4000 \
  -v "$(pwd):/site" \
  bretfisher/jekyll-serve

echo "Jekyll server stopped" 