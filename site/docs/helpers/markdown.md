---
title: Markdown Helpers
description: Helpers for converting markdown to HTML
order: 15
---

> **Availability:** The Node build and the browser build register these helpers. Both builds render the markdown string. They do not read a file.

## Table of Contents

## {{markdown}}

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

## {{md}}

Converts a markdown string to HTML.

**Params**

* `string` **{String}**: Markdown string to convert
* `returns` **{String}**: HTML string

**Example**

```handlebars
{{md "# Hello World"}}
<!-- results in: <h1>Hello World</h1> -->
```
