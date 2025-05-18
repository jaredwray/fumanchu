---
title: Code Helpers
description: >
  Handlebars provides a set of built-in helpers for working with code. These helpers are used to format and manipulate code snippets, making it easier to display code in a readable format.
order: 2
parent: legacy-helpers
---

# Code Helpers

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/code.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/code.js)

### [{{embed}}](lib/code.js#L23)

Embed code from an external file as preformatted text.

**Params**

* `filepath` **{String}**: filepath to the file to embed.
* `language` **{String}**: Optionally specify the language to use for syntax highlighting.
* `returns` **{String}**

**Example**

```html
{{embed 'path/to/file.js'}}
<!-- optionally specify the language to use -->
{{embed 'path/to/file.hbs' 'html')}}
```

### [{{gist}}](lib/code.js#L45)

Embed a GitHub Gist using only the id of the Gist

**Params**

* `id` **{String}**
* `returns` **{String}**

**Example**

```html
{{gist "12345"}}
```

### [{{jsfiddle}}](lib/code.js#L60)

Generate the HTML for a jsFiddle link with the given `params`

**Params**

* `params` **{Object}**
* `returns` **{String}**

**Example**

```html
{{jsfiddle id="0dfk10ks" tabs="true"}}
```
