---
title: Markdown Helpers
description: Helpers for converting markdown to HTML
order: 15
---

## markdown

### {{markdown}}

Block helper that converts a string of inline markdown to HTML.

**Params**

* `string` **{String}**: Markdown string to convert
* `returns` **{String}**: HTML string

**Example**

```handlebars
{{#markdown}}
# Foo
{{/markdown}}
<!-- results in: <h1>Foo</h1> -->
```

### {{md}}

Converts a markdown string to HTML, or reads a markdown file from the file system and converts its contents to HTML.

**Params**

* `filepath` **{String}**: Markdown string or path to a markdown file
* `returns` **{String}**: HTML string

**Example**

```handlebars
{{md "# Hello World"}}
<!-- results in: <h1>Hello World</h1> -->

{{md "foo/bar.md"}}
<!-- reads file and converts to HTML -->
```
