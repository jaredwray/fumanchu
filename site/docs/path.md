---
title: Path Helpers
description: >
    Handlebars provides a set of built-in helpers for working with file paths. These helpers are used to manipulate and format file paths, making it easier to work with files in templates.
order: 21
---

## path

### {{absolute}}

Resolve an absolute path from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{absolute "docs/toc.md"}}
<!-- results in: '/User/dev/docs/toc.md' -->
```

### {{dirname}}

Get the directory path segment from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{dirname "docs/toc.md"}}
<!-- results in: 'docs' -->
```

### {{relative}}

Get the relative filepath from `a` to `b`.

**Params**

* `a` **{String}**
* `b` **{String}**
* `returns` **{String}**

**Example**

```html
{{relative a b}}
```

### {{basename}}

Get the filename from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{basename "docs/toc.md"}}
<!-- results in: 'toc.md' -->
```

### {{stem}}

Get the "stem" (filename without extension) from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{stem "docs/toc.md"}}
<!-- results in: 'toc' -->
```

### {{extname}}

Get the file extension from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{extname "docs/toc.md"}}
<!-- results in: '.md' -->
```

### {{resolve}}

Resolve an absolute path from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{resolve "docs/toc.md"}}
<!-- results in: '/User/dev/docs/toc.md' -->
```

### {{segments}}

Get specific (joined) segments of a file path by passing a range of array indices.

**Params**

* `filepath` **{String}**: The file path to split into segments.
* `returns` **{String}**: Returns a single, joined file path.

**Example**

```html
{{segments "a/b/c/d" "2" "3"}}
<!-- results in: 'c/d' -->

{{segments "a/b/c/d" "1" "3"}}
<!-- results in: 'b/c/d' -->

{{segments "a/b/c/d" "1" "2"}}
<!-- results in: 'b/c' -->
```
