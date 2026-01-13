---
title: Inflection Helpers
description: >
    Handlebars provides a set of built-in helpers for working with inflection. These helpers are used to format and manipulate words, making it easier to display text in a readable format.
order: 14
---

## inflection

### {{inflect}}

Returns either the `singular` or `plural` inflection of a word based on the given `count`.

**Params**

* `count` **{Number}**
* `singular` **{String}**: The singular form
* `plural` **{String}**: The plural form
* `includeCount` **{Boolean}**
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

### {{ordinalize}}

Returns an ordinalized number as a string.

**Params**

* `value` **{Number|String}**: The value to ordinalize.
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
