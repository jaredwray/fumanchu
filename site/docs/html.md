---
title: Html Helpers
description: >
    Handlebars provides a set of built-in helpers for working with HTML. These helpers are used to manipulate and format HTML elements, making it easier to work with HTML data in templates.
order: 12
---

## html

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/html.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/html.js)

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

### [{{sanitize}}](lib/html.js#L121)

Strip HTML tags from a string, so that only the text nodes are preserved.

**Params**

* `str` **{String}**: The string of HTML to sanitize.
* `returns` **{String}**

**Example**

```html
{{sanitize "<span>foo</span>"}}
<!-- results in: 'foo' -->
```

### [{{ul}}](lib/html.js#L135)

Block helper for creating unordered lists (`<ul></ul>`)

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

### [{{ol}}](lib/html.js#L154)

Block helper for creating ordered lists  (`<ol></ol>`)

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

### [{{thumbnailImage}}](lib/html.js#L176)

Returns a `<figure>` with a thumbnail linked to a full picture

**Params**

* `context` **{Object}**: Object with values/attributes to add to the generated elements:
* `context.alt` **{String}**
* `context.src` **{String}**
* `context.width` **{Number}**
* `context.height` **{Number}**
* `returns` **{String}**: HTML `<figure>` element with image and optional caption/link.

