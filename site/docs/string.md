---
title: String Helpers
description: >
    Handlebars provides a set of built-in helpers for working with strings. These helpers are used to manipulate and format strings, making it easier to work with text in templates.
order: 23
---

## string

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/src/helpers/string.ts) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/test/helpers/string.test.ts)

### {{append}}

Append the specified `suffix` to the given string.

**Params**

* `str` **{String}**
* `suffix` **{String}**
* `returns` **{String}**

**Example**

```html
<!-- given that "item.stem" is "foo" -->
{{append item.stem ".html"}}
<!-- results in:  'foo.html' -->
```

### {{camelcase}}

camelCase the characters in the given `string`.

**Params**

* `string` **{String}**: The string to camelcase.
* `returns` **{String}**

**Example**

```html
{{camelcase "foo bar baz"}};
<!-- results in:  'fooBarBaz' -->
```

### {{capitalize}}

Capitalize the first word in a sentence.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{capitalize "foo bar baz"}}
<!-- results in:  "Foo bar baz" -->
```

### {{capitalizeAll}}

Capitalize all words in a string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{capitalizeAll "foo bar baz"}}
<!-- results in:  "Foo Bar Baz" -->
```

### {{center}}

Center a string using non-breaking spaces

**Params**

* `str` **{String}**
* `spaces` **{Number}**
* `returns` **{String}**

**Example**

```html
{{center "foo" 2}}
<!-- results in:  '&nbsp;&nbsp;foo&nbsp;&nbsp;' -->
```

### {{chop}}

Like trim, but removes both extraneous whitespace **and non-word characters** from the beginning and end of a string.

**Params**

* `string` **{String}**: The string to chop.
* `returns` **{String}**

**Example**

```html
{{chop "_ABC_"}}
<!-- results in:  'ABC' -->

{{chop "-ABC-"}}
<!-- results in:  'ABC' -->

{{chop " ABC "}}
<!-- results in:  'ABC' -->
```

### {{dashcase}}

dash-case the characters in `string`. Replaces non-word characters and periods with hyphens.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{dashcase "a-b-c d_e"}}
<!-- results in:  'a-b-c-d-e' -->
```

### {{dotcase}}

dot.case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{dotcase "a-b-c d_e"}}
<!-- results in:  'a.b.c.d.e' -->
```

### {{downcase}}

Lowercase all of the characters in the given string. Alias for [lowercase](#lowercase).

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{downcase "aBcDeF"}}
<!-- results in:  'abcdef' -->
```

### {{ellipsis}}

Truncates a string to the specified `length`, and appends it with an elipsis, `…`.

**Params**

* `str` **{String}**
* `length` **{Number}**: The desired length of the returned string.
* `returns` **{String}**: The truncated string.

**Example**

```html
{{ellipsis (sanitize "<span>foo bar baz</span>"), 7}}
<!-- results in:  'foo bar…' -->
{{ellipsis "foo bar baz", 7}}
<!-- results in:  'foo bar…' -->
```

### {{hyphenate}}

Replace spaces in a string with hyphens.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{hyphenate "foo bar baz qux"}}
<!-- results in:  "foo-bar-baz-qux" -->
```

### {{isString}}

Return true if `value` is a string.

**Params**

* `value` **{Any}**
* `returns` **{Boolean}**

**Example**

```html
{{isString "foo"}}
<!-- results in:  'true' -->
```

### {{lowercase}}

Lowercase all characters in the given string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{lowercase "Foo BAR baZ"}}
<!-- results in:  'foo bar baz' -->
```

### {{occurrences}}

Return the number of occurrences of `substring` within the given `string`.

**Params**

* `str` **{String}**
* `substring` **{String}**
* `returns` **{Number}**: Number of occurrences

**Example**

```html
{{occurrences "foo bar foo bar baz" "foo"}}
<!-- results in:  2 -->
```

### {{pascalcase}}

PascalCase the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{pascalcase "foo bar baz"}}
<!-- results in:  'FooBarBaz' -->
```

### {{pathcase}}

path/case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{pathcase "a-b-c d_e"}}
<!-- results in:  'a/b/c/d/e' -->
```

### {{plusify}}

Replace spaces in the given string with pluses.

**Params**

* `str` **{String}**: The input string
* `ch` **{String}**: Optional character to replace (defaults to space)
* `returns` **{String}**: Input string with spaces replaced by plus signs

**Example**

```html
{{plusify "foo bar baz"}}
<!-- results in:  'foo+bar+baz' -->
```

### {{prepend}}

Prepends the given `string` with the specified `prefix`.

**Params**

* `str` **{String}**
* `prefix` **{String}**
* `returns` **{String}**

**Example**

```html
<!-- given that "val" is "bar" -->
{{prepend val "foo-"}}
<!-- results in:  'foo-bar' -->
```

### {{raw}}

Render a block without processing mustache templates inside the block.

**Params**

* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
{{{{#raw}}}}
{{foo}}
{{{{/raw}}}}
<!-- results in:  '{{foo}}' -->
```

### {{remove}}

Remove all occurrences of `substring` from the given `str`.

**Params**

* `str` **{String}**
* `substring` **{String}**
* `returns` **{String}**

**Example**

```html
{{remove "a b a b a b" "a "}}
<!-- results in:  'b b b' -->
```

### {{removeFirst}}

Remove the first occurrence of `substring` from the given `str`.

**Params**

* `str` **{String}**
* `substring` **{String}**
* `returns` **{String}**

**Example**

```html
{{removeFirst "a b a b a b" "a"}}
<!-- results in:  ' b a b a b' -->
```

### {{replace}}

Replace all occurrences of substring `a` with substring `b`.

**Params**

* `str` **{String}**
* `a` **{String}**
* `b` **{String}**
* `returns` **{String}**

**Example**

```html
{{replace "a b a b a b" "a" "z"}}
<!-- results in:  'z b z b z b' -->
```

### {{replaceFirst}}

Replace the first occurrence of substring `a` with substring `b`.

**Params**

* `str` **{String}**
* `a` **{String}**
* `b` **{String}**
* `returns` **{String}**

**Example**

```html
{{replaceFirst "a b a b a b" "a" "z"}}
<!-- results in:  'z b a b a b' -->
```

### {{reverse}}

Reverse a string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{reverse "abcde"}}
<!-- results in:  'edcba' -->
```

### {{sentence}}

Sentence case the given string

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{sentence "hello world. goodbye world."}}
<!-- results in:  'Hello world. Goodbye world.' -->
```

### {{snakecase}}

snake_case the characters in the given `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{snakecase "a-b-c d_e"}}
<!-- results in:  'a_b_c_d_e' -->
```

### {{split}}

Split `string` by the given `character`.

**Params**

* `string` **{String}**: The string to split.
* `character` **{String}**: The character to split by. Default is an empty string.
* `returns` **{Array}**: Array of split strings.

**Example**

```html
{{split "a,b,c" ","}}
<!-- results in:  ['a', 'b', 'c'] -->
```

### {{startsWith}}

Tests whether a string begins with the given prefix.

**Params**

* `prefix` **{String}**: The prefix to test for
* `testString` **{String}**: The string to test
* `returns` **{Boolean}**: True if testString starts with prefix, false otherwise

**Example**

```html
{{startsWith "Hello" "Hello, world!"}}
<!-- results in:  true -->

{{startsWith "Goodbye" "Hello, world!"}}
<!-- results in:  false -->
```

### {{titleize}}

Title case the given string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{titleize "this is title case"}}
<!-- results in:  'This Is Title Case' -->
```

### {{trim}}

Removes extraneous whitespace from the beginning and end of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```html
{{trim " ABC "}}
<!-- results in:  'ABC' -->
```

### {{trimLeft}}

Removes extraneous whitespace from the beginning of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```html
{{trimLeft " ABC "}}
<!-- results in:  'ABC ' -->
```

### {{trimRight}}

Removes extraneous whitespace from the end of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```html
{{trimRight " ABC "}}
<!-- results in:  ' ABC' -->
```

### {{truncate}}

Truncate a string to the specified `length`. Also see [ellipsis](#ellipsis).

**Params**

* `str` **{String}**
* `limit` **{Number}**: The desired length of the returned string.
* `suffix` **{String}**: Optionally supply a string to use as a suffix to denote when the string has been truncated.
* `returns` **{String}**: The truncated string.

**Example**

```html
{{truncate "foo bar baz" 7}}
<!-- results in:  'foo bar' -->
{{truncate "foo bar baz" 7 "..."}}
<!-- results in:  'foo ...' -->
```

### {{truncateWords}}

Truncate a string to have the specified number of words. Also see [truncate](#truncate).

**Params**

* `str` **{String}**
* `limit` **{Number}**: The number of words to keep.
* `suffix` **{String}**: Optionally supply a string to use as a suffix. Default is '...'.
* `returns` **{String}**: The truncated string.

**Example**

```html
{{truncateWords "foo bar baz" 1}}
<!-- results in:  'foo...' -->
{{truncateWords "foo bar baz" 2}}
<!-- results in:  'foo bar...' -->
{{truncateWords "foo bar baz" 3}}
<!-- results in:  'foo bar baz...' -->
```

### {{upcase}}

Uppercase all of the characters in the given string. Alias for [uppercase](#uppercase).

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{upcase "aBcDeF"}}
<!-- results in:  'ABCDEF' -->
```

### {{uppercase}}

Uppercase all of the characters in the given string. If used as a block helper it will uppercase the entire block. This helper does not support inverse blocks.

**Params**

* `str` **{String}**: The string to uppercase
* `options` **{Object}**: Handlebars options object
* `returns` **{String}**

**Example**

```html
{{uppercase "aBcDeF"}}
<!-- results in:  'ABCDEF' -->
```
