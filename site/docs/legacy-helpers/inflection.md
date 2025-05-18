---
title: Inflection Helpers
description: >
    Handlebars provides a set of built-in helpers for working with inflection. These helpers are used to format and manipulate words, making it easier to display text in a readable format.
order: 9
parent: legacy-helpers
---

## inflection

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/inflection.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/inflection.js)

### [{{inflect}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/inflection.js#L30)

Returns either the `singular` or `plural` inflection of a word based on the given `count`.

**Params**

* `count` **{Number}**
* `singular` **{String}**: The singular form
* `plural` **{String}**: The plural form
* `includeCount` **{String}**
* `returns` **{String}**

**Example**

```html
{{inflect 0 "string" "strings"}}
<!-- "strings" -->
{{inflect 1 "string" "strings"}}
<!-- "string" -->
{{inflect 1 "string" "strings" true}}
<!-- "1 string" -->
{{inflect 2 "string" "strings"}}
<!-- "strings" -->
{{inflect 2 "string" "strings" true}}
<!-- "2 strings" -->
```

### [{{ordinalize}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/inflection.js#L58)

Returns an ordinalized number as a string.

**Params**

* `val` **{String}**: The value to ordinalize.
* `returns` **{String}**: The ordinalized number

**Example**

```html
{{ordinalize 1}}
<!-- '1st' -->
{{ordinalize 21}}
<!-- '21st' -->
{{ordinalize 29}}
<!-- '29th' -->
{{ordinalize 22}}
<!-- '22nd' -->
```
