---
title: Url Helpers
description: >
    Handlebars provides a set of built-in helpers for working with URLs. These helpers are used to manipulate and format URLs, making it easier to work with web links in templates.
order: 24
---

## url

### {{encodeURI}}

Encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.

**Params**

* `str` **{String}**: The un-encoded string
* `returns` **{String}**: The encoded string

**Example**

```html
{{encodeURI "http://example.com?comment=Thyme &time=again"}}
<!-- results in: 'http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain' -->
```

### {{escape}}

Escape the given string by replacing characters with escape sequences. Useful for allowing the string to be used in a URL, etc.

**Params**

* `str` **{String}**
* `returns` **{String}**: Escaped string.

**Example**

```html
{{escape "http://example.com?comment=Thyme &time=again"}}
<!-- results in: 'http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain' -->
```

### {{decodeURI}}

Decode a Uniform Resource Identifier (URI) component.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{decodeURI "http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain"}}
<!-- results in: 'http://example.com?comment=Thyme &time=again' -->
```

### {{url_encode}}

Alias for [encodeURI](#encodeuri).

### {{url_decode}}

Alias for [decodeURI](#decodeuri).

### {{urlResolve}}

Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag.

**Params**

* `base` **{String}**
* `href` **{String}**
* `returns` **{String}**

**Example**

```html
{{urlResolve "/one/two/three" "four"}}
<!-- results in: '/one/two/four' -->

{{urlResolve "http://example.com/" "/one"}}
<!-- results in: 'http://example.com/one' -->
```

### {{urlParse}}

Parses a `url` string into an object.

**Params**

* `str` **{String}**: URL string
* `returns` **{Object}**: Returns parsed URL object

**Example**

```html
{{urlParse "http://foo.com/bar/baz?key=value"}}
<!-- results in an object with: protocol: 'http:', hostname: 'foo.com', pathname: '/bar/baz', query: 'key=value' -->
```

### {{stripQuerystring}}

Strip the query string from the given `url`.

**Params**

* `url` **{String}**
* `returns` **{String}**: the url without the queryString

**Example**

```html
{{stripQuerystring "http://example.com?tests=true"}}
<!-- results in: 'http://example.com' -->
```

### {{stripProtocol}}

Strip protocol from a `url`. Useful for displaying media that may have an 'http' protocol on secure connections.

**Params**

* `str` **{String}**
* `returns` **{String}**: the url with http protocol stripped

**Example**

```html
{{stripProtocol "http://foo.bar"}}
<!-- results in: '//foo.bar/' -->
```
