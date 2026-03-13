---
origin: web
category: web
url: https://www.google.com/
description: Search engine and ecosystem of web services
use_state: active
sidebar_custom_props:
    image: /images/google.png
---

# Google

**[Google](https://www.google.com/)** is a search engine and a sprawling ecosystem of web services. Most people use it every day without thinking about it, but the search engine itself is far more powerful than the simple text box suggests. Learning a handful of search operators turns Google from a blunt instrument into a precise research tool.

## Searching smarter

The default behavior is to match pages containing all your keywords in any order. That works for casual lookups, but when you need something specific, operators let you control exactly what Google looks for.

### Exact match

Wrap a phrase in double quotes to require those words in that exact order:

```
"segmentation fault" rust borrow checker
```

Without quotes, Google may match pages that contain those words scattered across the page. With quotes, it must appear as a contiguous phrase.

### Exclude terms

Prefix a word with `-` to remove results containing it. Useful when a term is ambiguous:

```
python -snake -monty
jaguar speed -car
```

### Site-specific search

Restrict results to a single domain with `site:`. This is often faster than a site's own search feature:

```
site:stackoverflow.com rust lifetime error
site:reddit.com best mechanical keyboard 2025
site:docs.github.com actions workflow
```

### File type

Find documents of a specific format with `filetype:`:

```
filetype:pdf machine learning cheatsheet
filetype:csv population data
filetype:pptx quarterly report
```

### OR operator

By default, all terms must be present. Use `OR` (uppercase) to match either term:

```
rust OR go performance benchmark
(javascript OR typescript) bundler comparison
```

### Wildcards and ranges

Use `*` as a placeholder for unknown words in a phrase, and `..` for numeric ranges:

```
"the * of the *" philosophy
best laptop $500..$1000
```

### Combining operators

Operators compose freely. A realistic research query might look like:

```
site:github.com filetype:md "contributing guide" rust OR "rust-lang"
```

This finds Markdown contributing guides on GitHub related to Rust projects.

## Quick reference

| Operator         | Purpose                          | Example                              |
| ---------------- | -------------------------------- | ------------------------------------ |
| `"..."`          | Exact phrase match               | `"out of memory"`                    |
| `-`              | Exclude a term                   | `apple -fruit`                       |
| `site:`          | Restrict to a domain             | `site:mdn.org fetch api`            |
| `filetype:`      | Restrict to a file format        | `filetype:pdf`                       |
| `OR`             | Match either term                | `react OR vue`                       |
| `*`              | Wildcard in a phrase             | `"how to * in python"`              |
| `..`             | Numeric range                    | `camera $200..$500`                  |
| `intitle:`       | Term must appear in page title   | `intitle:changelog vite`            |
| `inurl:`         | Term must appear in the URL      | `inurl:api reference`               |

## The ecosystem

Beyond search, Google provides a broad set of interconnected services. A few that are worth knowing about:

- **Google Drive / Docs / Sheets / Slides** -- cloud-based office suite with real-time collaboration. Sheets in particular is useful for quick data manipulation and sharing.
- **Google Maps** -- navigation, street view, and the Places API for developers.
- **Google Translate** -- supports 130+ languages with text, image, document, and real-time conversation translation.
- **Google Scholar** (`scholar.google.com`) -- search engine for academic papers, patents, and citations. Excellent for literature reviews.
- **Google Fonts** (`fonts.google.com`) -- free, open-source font library that can be embedded via CDN or downloaded.
- **Google Trends** (`trends.google.com`) -- explore search volume over time for any topic. Useful for gauging interest in technologies or comparing alternatives.

The search engine is the core though. Master the operators and you will find answers significantly faster.
