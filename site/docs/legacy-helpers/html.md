---
title: Html Helpers
description: >
    Handlebars provides a set of built-in helpers for working with HTML. These helpers are used to manipulate and format HTML elements, making it easier to work with HTML data in templates.
order: 7
parent: legacy-helpers
---

## html

### [{{attr}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/html.js#L23)

Stringify attributes on the options `hash`.

**Params**

* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
<!-- value = 'bar' -->
<div{{attr foo=value}}></div>
<!-- results in: <div foo="bar"></div>
```

### [{{css}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/html.js#L45)

Add an array of `<link>` tags. Automatically resolves relative paths to `options.assets` if passed on the context.

**Params**

* `list` **{String|Array}**: One or more stylesheet urls.
* `returns` **{String}**

**Example**

```html
<!-- {stylesheets: ['foo.css', 'bar.css']} -->
{{css stylesheets}}

<!-- results in: -->
<!-- <link type="text/css" rel="stylesheet" href="foo.css"> -->
<!-- <link type="text/css" rel="stylesheet" href="bar.css"> -->
```


### [{{js}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/html.js#L89)

Generate one or more `<script></script>` tags with paths/urls to javascript or coffeescript files.

**Params**

* `context` **{Object}**
* `returns` **{String}**

**Example**

```html
{{js scripts}}
```
