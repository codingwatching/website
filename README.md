# Blip Website

This repository contains the website for Blip, running on GitHub Pages with Jekyll.

## Local Development

### Using Docker (Recommended)

The easiest way to test the website locally is using Docker:

1. Make sure Docker is installed on your system
2. Run the included script from the website directory:

```bash
./docker-test.sh
```

3. Access the website at [http://localhost:4000](http://localhost:4000)

The website will automatically reload when you make changes to files.

## Adding Markdown Pages

To add a new markdown page:

1. Create a new `.md` file in the website directory
2. Add front matter at the top of the file:

```yaml
---
layout: default
title: Your Page Title
permalink: /your-page-url
---
```

3. Add your markdown content below the front matter 