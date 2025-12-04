---
title: Code Helpers
description: >
  Handlebars provides a set of built-in helpers for working with code. These helpers are used to format and manipulate code snippets, making it easier to display code in a readable format.
order: 7
---

# Code Helpers

### {{embed}}

Embed code from an external file as preformatted text.

**Params**

* `filepath` **{String}**: filepath to the file to embed.
* `language` **{String}**: Optionally specify the language to use for syntax highlighting.
* `returns` **{String}**

**Example**

```html
{{embed 'path/to/file.js'}}
<!-- optionally specify the language to use -->
{{embed 'path/to/file.hbs' 'html'}}
```

### {{gist}}

Embed a GitHub Gist using only the id of the Gist

**Params**

* `id` **{String}**
* `returns` **{String}**

**Example**

```html
{{gist "12345"}}
```

### {{jsfiddle}}

Generate the HTML for a jsFiddle iframe with the given options.

**Params**

* `id` **{String}**: The jsFiddle id (required)
* `width` **{String}**: Width of the iframe (default: "100%")
* `height` **{String}**: Height of the iframe (default: "300")
* `skin` **{String}**: Skin path (default: "/presentation/")
* `tabs` **{String}**: Tabs to display (default: "result,js,html,css")
* `allowfullscreen` **{String}**: Allowfullscreen attribute (default: "allowfullscreen")
* `frameborder` **{String}**: Frameborder attribute (default: "0")
* `returns` **{String}**

**Example**

```html
{{jsfiddle id="0dfk10ks"}}
<!-- with custom options -->
{{jsfiddle id="0dfk10ks" height="500" tabs="js,result"}}
```
