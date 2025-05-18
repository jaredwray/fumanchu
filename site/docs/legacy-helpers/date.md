---
title: Date Helpers
description: >
    Handlebars provides a set of built-in helpers for working with dates. These helpers are used to format and manipulate dates, making it easier to display date information in a readable format.
order: 5
parent: legacy-helpers
---

## date

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/date.js) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/helpers/test/date.js)

### [{{year}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/date.js#L15)

Get the current year.

**Example**

```html
{{year}}
<!-- 2017 -->
```

### [{{moment}}](https://github.com/jaredwray/fumanchu/tree/main/helpers/lib/date.js#L24)

Use [moment](http://momentjs.com) as a helper. See [helper-date](https://github.com/helpers/helper-date) for more details.
