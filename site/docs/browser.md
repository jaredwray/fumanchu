---
title: 'Browser Support'
description: 'How to use Fumanchu in the browser and the list of helpers registered in the browser-safe build.'
order: 3
---

# Browser Support

Fumanchu ships a browser-safe build that excludes helpers that depend on Node core modules. The public API (`fumanchu`, `helpers`, `HelperRegistry`) is the same as [Node.js](/docs/nodejs/); only the registered helper set differs.

## Import the browser build

Use the `/browser` subpath when you want the browser registry explicitly:

```javascript
import { fumanchu } from '@jaredwray/fumanchu/browser';

const handlebars = fumanchu();
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

The package also sets the `browser` export condition on the main entry. Webpack, Vite, esbuild, Rollup, and other browser-aware bundlers pick up the browser build automatically when you `import '@jaredwray/fumanchu'` from a browser target — no code change required.

## Register helpers on an existing Handlebars instance

```javascript
import { helpers } from '@jaredwray/fumanchu/browser';
import Handlebars from 'handlebars';

helpers({ handlebars: Handlebars });
const template = Handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
console.log(template({ foo: 'bar' }));
```

## Load from a CDN

You can load the browser build from a CDN such as [jsDelivr](https://www.jsdelivr.com/package/npm/@jaredwray/fumanchu) with no bundler:

```html
<script type="module">
  import { fumanchu } from 'https://cdn.jsdelivr.net/npm/@jaredwray/fumanchu/dist/index.browser.mjs';
  const handlebars = fumanchu();
  document.body.textContent = handlebars.compile('{{uppercase name}}')({ name: 'hello' });
</script>
```

## Helper registry

`HelperRegistry` in the browser entry is the browser-safe registry. It registers every environment-neutral helper and omits anything that depends on Node core modules.

```javascript
import { HelperRegistry, handlebars } from '@jaredwray/fumanchu/browser';

const registry = new HelperRegistry();
registry.load(handlebars);
```

## Caching

Template compile caching works the same way as on Node. Pass `caching: true`, a `CacheableMemory` instance, or cache options:

```javascript
import { fumanchu } from '@jaredwray/fumanchu/browser';

const handlebars = fumanchu({ caching: true });
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

## Not available in the browser

These helpers need Node APIs (`fs`, `path`, the terminal, and related modules) and are not registered in the browser build:

- The entire [fs](/docs/helpers/fs/), [path](/docs/helpers/path/), and [logging](/docs/helpers/logging/) categories
- `embed` from [code](/docs/helpers/code/)
- `css` and `js` from [html](/docs/helpers/html/)
- `escape`, `urlResolve`, `urlParse`, and `stripProtocol` from [url](/docs/helpers/url/)

[Markdown](/docs/helpers/markdown/) helpers (`md`, `markdown`) **are** registered. They render inline markdown only — unlike Node, they will not read a file path from disk.

See [Node.js Support](/docs/nodejs/) for the full helper set, including Node-only helpers.

## Available helpers

See the category pages for parameters and examples.

| Category | Name | Description |
| --- | --- | --- |
| [array](/docs/helpers/array/) | `after` | Returns all of the items in an array after the specified index. |
| [array](/docs/helpers/array/) | `before` | Return all of the items in the collection before the specified count. |
| [array](/docs/helpers/array/) | `arrayify` | Cast the given `value` to an array. |
| [array](/docs/helpers/array/) | `first` | Returns the first item, or first `n` items of an array. |
| [array](/docs/helpers/array/) | `last` | Returns the last item, or last `n` items of an array or string. |
| [array](/docs/helpers/array/) | `length` | Returns the length of the given string or array. |
| [array](/docs/helpers/array/) | `join` | Join all elements of array into a string, optionally using a given separator. |
| [array](/docs/helpers/array/) | `forEach` | Iterates over each item in an array and exposes the current item in the array as context to the inner block. |
| [array](/docs/helpers/array/) | `inArray` | Block helper that renders the block if an array has the given `value`. |
| [array](/docs/helpers/array/) | `isArray` | Returns true if `value` is an es5 array. |
| [array](/docs/helpers/array/) | `itemAt` | Returns the item from `array` at index `idx`. |
| [array](/docs/helpers/array/) | `equalsLength` | Returns true if the length of the given value equals the given length. |
| [array](/docs/helpers/array/) | `some` | Block helper that returns the block if the callback returns true for some value in the given array. |
| [array](/docs/helpers/array/) | `eachIndex` | Block helper that iterates an array and exposes `item` and `index`. |
| [array](/docs/helpers/array/) | `withAfter` | Use the items in the array _after_ the specified index as context inside a block. |
| [array](/docs/helpers/array/) | `withBefore` | Use the items in the array _before_ the specified index as context inside a block. |
| [array](/docs/helpers/array/) | `withFirst` | Use the first item in a collection inside a handlebars block expression. |
| [array](/docs/helpers/array/) | `withLast` | Use the last item or `n` items in an array as context inside a block. |
| [array](/docs/helpers/array/) | `withGroup` | Block helper that groups array elements by given group `size`. |
| [array](/docs/helpers/array/) | `withSort` | Block helper that sorts a collection and exposes the sorted collection as context inside the block. |
| [array](/docs/helpers/array/) | `filter` | Block helper that filters the given array and renders the block for values that evaluate to `true`, otherwise the inverse block is returned. |
| [array](/docs/helpers/array/) | `map` | Returns a new array, created by calling `function` on each element of the given `array`. |
| [array](/docs/helpers/array/) | `pluck` | Map over the given object or array or objects and create an array of values from the given `prop`. |
| [array](/docs/helpers/array/) | `reverse` | Reverse the elements in an array, or the characters in a string. |
| [array](/docs/helpers/array/) | `sort` | Sort the given `array`. |
| [array](/docs/helpers/array/) | `sortBy` | Sort an `array`. |
| [array](/docs/helpers/array/) | `unique` | Block helper that return an array with all duplicate values removed. |
| [code](/docs/helpers/code/) | `gist` | Embed a GitHub Gist using only the id of the Gist. |
| [code](/docs/helpers/code/) | `jsfiddle` | Generate the HTML for a jsFiddle iframe with the given options. |
| [collection](/docs/helpers/collection/) | `isEmpty` | Returns true if the given collection is empty. |
| [collection](/docs/helpers/collection/) | `iterate` | Block helper that iterates over an array or object. |
| [comparison](/docs/helpers/comparison/) | `and` | Helper that renders the block if **all** of the given values are truthy. |
| [comparison](/docs/helpers/comparison/) | `compare` | Render a block when a comparison of the first and third arguments returns true. |
| [comparison](/docs/helpers/comparison/) | `contains` | Block helper that renders the block if `collection` has the given `value`, otherwise the inverse block is rendered (if specified). |
| [comparison](/docs/helpers/comparison/) | `default` | Returns the first value that is not null or undefined, otherwise returns an empty string. |
| [comparison](/docs/helpers/comparison/) | `eq` | Block helper that renders a block if `a` is **strictly equal to** `b` (using `===`). |
| [comparison](/docs/helpers/comparison/) | `gt` | Block helper that renders a block if `a` is **greater than** `b`. |
| [comparison](/docs/helpers/comparison/) | `gte` | Block helper that renders a block if `a` is **greater than or equal to** `b`. |
| [comparison](/docs/helpers/comparison/) | `has` | Block helper that renders a block if `value` has `pattern`. |
| [comparison](/docs/helpers/comparison/) | `isFalsey` | Returns true if the given `value` is falsey. |
| [comparison](/docs/helpers/comparison/) | `isTruthy` | Returns true if the given `value` is truthy (not falsey). |
| [comparison](/docs/helpers/comparison/) | `ifEven` | Returns true if the given value is an even number. |
| [comparison](/docs/helpers/comparison/) | `ifNth` | Returns true if `b` is divisible by `a` (remainder is zero when `b` is divided by `a`). |
| [comparison](/docs/helpers/comparison/) | `ifOdd` | Block helper that renders a block if `value` is **an odd number**. |
| [comparison](/docs/helpers/comparison/) | `is` | Block helper that renders a block if `a` is **equal to** `b` using loose equality (`==`). |
| [comparison](/docs/helpers/comparison/) | `isnt` | Block helper that renders a block if `a` is **not equal to** `b` using loose inequality (`!=`). |
| [comparison](/docs/helpers/comparison/) | `lt` | Block helper that renders a block if `a` is **less than** `b`. |
| [comparison](/docs/helpers/comparison/) | `lte` | Block helper that renders a block if `a` is **less than or equal to** `b`. |
| [comparison](/docs/helpers/comparison/) | `neither` | Block helper that renders a block if **neither of** the given values are truthy. |
| [comparison](/docs/helpers/comparison/) | `not` | Returns true if `val` is falsey. |
| [comparison](/docs/helpers/comparison/) | `or` | Block helper that renders a block if **any of** the given values is truthy. |
| [comparison](/docs/helpers/comparison/) | `unlessEq` | Block helper that returns true **unless `a` is strictly equal to `b`** (using `!==`). |
| [comparison](/docs/helpers/comparison/) | `unlessGt` | Block helper that returns true **unless `a` is greater than `b`** (equivalent to `a <= b`). |
| [comparison](/docs/helpers/comparison/) | `unlessLt` | Block helper that returns true **unless `a` is less than `b`** (equivalent to `a >= b`). |
| [comparison](/docs/helpers/comparison/) | `unlessGteq` | Block helper that returns true **unless `a` is greater than or equal to `b`** (equivalent to `a < b`). |
| [comparison](/docs/helpers/comparison/) | `unlessLteq` | Block helper that returns true **unless `a` is less than or equal to `b`** (equivalent to `a > b`). |
| [date](/docs/helpers/date/) | `year` | Get the current year as a string. |
| [date](/docs/helpers/date/) | `date` | Format a date with support for human-readable date strings, Date objects, timestamps, or defaults to current date. |
| [date](/docs/helpers/date/) | `moment` | Legacy alias for `{{date}}`. |
| [date](/docs/helpers/date/) | `timestamp` | Returns the current Unix timestamp in milliseconds. |
| [date](/docs/helpers/date/) | `now` | Returns the current date/time with optional formatting. |
| [date](/docs/helpers/date/) | `fromNow` | Display relative time from now (e.g., "5 minutes ago", "in 2 hours"). |
| [date](/docs/helpers/date/) | `toNow` | Opposite of `fromNow`. |
| [date](/docs/helpers/date/) | `ago` | Alias for `{{fromNow}}`. |
| [date](/docs/helpers/date/) | `dateAdd` | Add time to a date. |
| [date](/docs/helpers/date/) | `dateSubtract` | Subtract time from a date. |
| [date](/docs/helpers/date/) | `startOf` | Get the start of a time period. |
| [date](/docs/helpers/date/) | `endOf` | Get the end of a time period. |
| [date](/docs/helpers/date/) | `isBefore` | Check if the first date is before the second date. |
| [date](/docs/helpers/date/) | `isAfter` | Check if the first date is after the second date. |
| [date](/docs/helpers/date/) | `isSame` | Check if two dates are the same, with optional unit precision. |
| [date](/docs/helpers/date/) | `isBetween` | Check if a date is between two other dates (inclusive). |
| [date](/docs/helpers/date/) | `diff` | Calculate the difference between two dates. |
| [date](/docs/helpers/date/) | `toISOString` | Convert a date to ISO 8601 format. |
| [date](/docs/helpers/date/) | `dateTimezone` | Format a date in a specific timezone. |
| [date](/docs/helpers/date/) | `dateLocale` | Format a date with a specific locale. |
| [html](/docs/helpers/html/) | `attr` | Stringify attributes from the options hash into an HTML attribute string. |
| [html](/docs/helpers/html/) | `sanitize` | Strip all HTML tags from a string, preserving only the text content. |
| [html](/docs/helpers/html/) | `ul` | Block helper for creating unordered lists. |
| [html](/docs/helpers/html/) | `ol` | Block helper for creating ordered lists. |
| [html](/docs/helpers/html/) | `thumbnailImage` | Generate a `<figure>` element with a thumbnail image, optional link to full-size image, and optional caption. |
| [i18n](/docs/helpers/i18n/) | `i18n` | Looks up a translation key for the current language. |
| [inflection](/docs/helpers/inflection/) | `inflect` | Returns either the `singular` or `plural` inflection of a word based on the given `count`. |
| [inflection](/docs/helpers/inflection/) | `ordinalize` | Returns an ordinalized number as a string. |
| [markdown](/docs/helpers/markdown/) | `md` | Converts a markdown string to HTML. |
| [markdown](/docs/helpers/markdown/) | `markdown` | Block helper that converts a string of inline markdown to HTML. |
| [match](/docs/helpers/match/) | `match` | Returns an array of strings that match the given glob pattern(s). |
| [match](/docs/helpers/match/) | `isMatch` | Returns true if a filepath matches the given pattern. |
| [match](/docs/helpers/match/) | `mm` | Deprecated alias for `match`. |
| [math](/docs/helpers/math/) | `abs` | Return the magnitude of `a`. |
| [math](/docs/helpers/math/) | `add` | Return the sum of `a` plus `b`. |
| [math](/docs/helpers/math/) | `avg` | Returns the average of all numbers in the given array. |
| [math](/docs/helpers/math/) | `ceil` | Get the `Math.ceil()` of the given value. |
| [math](/docs/helpers/math/) | `divide` | Divide `a` by `b`. |
| [math](/docs/helpers/math/) | `floor` | Get the `Math.floor()` of the given value. |
| [math](/docs/helpers/math/) | `minus` | Return the difference of `a` minus `b`. |
| [math](/docs/helpers/math/) | `modulo` | Get the remainder of a division operation. |
| [math](/docs/helpers/math/) | `multiply` | Return the product of `a` times `b`. |
| [math](/docs/helpers/math/) | `plus` | Add `a` by `b`. |
| [math](/docs/helpers/math/) | `random` | Generate a random number between two values. |
| [math](/docs/helpers/math/) | `remainder` | Get the remainder when `a` is divided by `b`. |
| [math](/docs/helpers/math/) | `round` | Round the given number. |
| [math](/docs/helpers/math/) | `subtract` | Return the product of `a` minus `b`. |
| [math](/docs/helpers/math/) | `sum` | Returns the sum of all numbers in the given array. |
| [math](/docs/helpers/math/) | `times` | Multiply number `a` by number `b`. |
| [misc](/docs/helpers/misc/) | `frame` | Block helper for exposing private `@` variables on the context. |
| [misc](/docs/helpers/misc/) | `option` | Return the given value of `prop` from `this.options`. |
| [misc](/docs/helpers/misc/) | `noop` | Block helper that renders the block without taking any arguments. |
| [misc](/docs/helpers/misc/) | `typeOf` | Get the native type of the given `value`. |
| [misc](/docs/helpers/misc/) | `withHash` | Block helper that builds the context for the block from the options hash. |
| [number](/docs/helpers/number/) | `bytes` | Format a number to it's equivalent in bytes. |
| [number](/docs/helpers/number/) | `addCommas` | Add commas to numbers. |
| [number](/docs/helpers/number/) | `phoneNumber` | Convert a string or number to a formatted phone number. |
| [number](/docs/helpers/number/) | `toAbbr` | Abbreviate numbers to the given number of `precision`. |
| [number](/docs/helpers/number/) | `toExponential` | Returns a string representing the given number in exponential notation. |
| [number](/docs/helpers/number/) | `toFixed` | Formats the given number using fixed-point notation. |
| [number](/docs/helpers/number/) | `toFloat` | Convert the given value to a floating-point number. |
| [number](/docs/helpers/number/) | `toInt` | Convert the given value to an integer. |
| [number](/docs/helpers/number/) | `toPrecision` | Returns a string representing the `Number` object to the specified precision. |
| [object](/docs/helpers/object/) | `extend` | Extend the context with the properties of other objects. |
| [object](/docs/helpers/object/) | `forIn` | Block helper that iterates over the properties of an object, exposing each key and value on the context. |
| [object](/docs/helpers/object/) | `forOwn` | Block helper that iterates over the **own** properties of an object, exposing each key and value on the context. |
| [object](/docs/helpers/object/) | `toPath` | Take arguments and, if they are string or number, convert them to a dot-delineated object property path. |
| [object](/docs/helpers/object/) | `get` | Use property paths (`a.b.c`) to get a value or nested value from the context. |
| [object](/docs/helpers/object/) | `getObject` | Use property paths (`a.b.c`) to get an object from the context. |
| [object](/docs/helpers/object/) | `hasOwn` | Return true if `key` is an own, enumerable property of the given `context` object. |
| [object](/docs/helpers/object/) | `isObject` | Return true if `value` is an object. |
| [object](/docs/helpers/object/) | `JSONparse` | Parses the given string using `JSON.parse`. |
| [object](/docs/helpers/object/) | `JSONstringify` | Stringify an object using `JSON.stringify`. |
| [object](/docs/helpers/object/) | `merge` | Deeply merge the properties of the given `objects` with the context object. |
| [object](/docs/helpers/object/) | `parseJSON` | Alias for `JSONparse`. |
| [object](/docs/helpers/object/) | `pick` | Pick properties from the context object. |
| [object](/docs/helpers/object/) | `stringify` | Alias for `JSONstringify`. |
| [regex](/docs/helpers/regex/) | `toRegex` | Convert the given string to a regular expression. |
| [regex](/docs/helpers/regex/) | `test` | Returns true if the given `str` matches the given regex. |
| [string](/docs/helpers/string/) | `append` | Append the specified `suffix` to the given string. |
| [string](/docs/helpers/string/) | `camelcase` | camelCase the characters in the given `string`. |
| [string](/docs/helpers/string/) | `capitalize` | Capitalize the first word in a sentence. |
| [string](/docs/helpers/string/) | `capitalizeAll` | Capitalize all words in a string. |
| [string](/docs/helpers/string/) | `center` | Center a string using non-breaking spaces. |
| [string](/docs/helpers/string/) | `chop` | Like trim, but removes both extraneous whitespace **and non-word characters** from the beginning and end of a string. |
| [string](/docs/helpers/string/) | `dashcase` | dash-case the characters in `string`. |
| [string](/docs/helpers/string/) | `dotcase` | dot.case the characters in `string`. |
| [string](/docs/helpers/string/) | `ellipsis` | Truncates a string to the specified `length`, and appends it with an elipsis, `…`. |
| [string](/docs/helpers/string/) | `hyphenate` | Replace spaces in a string with hyphens. |
| [string](/docs/helpers/string/) | `isString` | Return true if `value` is a string. |
| [string](/docs/helpers/string/) | `lowercase` | Lowercase all characters in the given string. |
| [string](/docs/helpers/string/) | `downcase` | Lowercase all of the characters in the given string. |
| [string](/docs/helpers/string/) | `occurrences` | Return the number of occurrences of `substring` within the given `string`. |
| [string](/docs/helpers/string/) | `pascalcase` | PascalCase the characters in `string`. |
| [string](/docs/helpers/string/) | `pathcase` | path/case the characters in `string`. |
| [string](/docs/helpers/string/) | `plusify` | Replace spaces in the given string with pluses. |
| [string](/docs/helpers/string/) | `prepend` | Prepends the given `string` with the specified `prefix`. |
| [string](/docs/helpers/string/) | `remove` | Remove all occurrences of `substring` from the given `str`. |
| [string](/docs/helpers/string/) | `removeFirst` | Remove the first occurrence of `substring` from the given `str`. |
| [string](/docs/helpers/string/) | `replace` | Replace all occurrences of substring `a` with substring `b`. |
| [string](/docs/helpers/string/) | `replaceFirst` | Replace the first occurrence of substring `a` with substring `b`. |
| [string](/docs/helpers/string/) | `sentence` | Sentence case the given string. |
| [string](/docs/helpers/string/) | `snakecase` | snake_case the characters in the given `string`. |
| [string](/docs/helpers/string/) | `trim` | Removes extraneous whitespace from the beginning and end of a string. |
| [string](/docs/helpers/string/) | `trimLeft` | Removes extraneous whitespace from the beginning of a string. |
| [string](/docs/helpers/string/) | `trimRight` | Removes extraneous whitespace from the end of a string. |
| [string](/docs/helpers/string/) | `truncate` | Truncate a string to the specified `length`. |
| [string](/docs/helpers/string/) | `truncateWords` | Truncate a string to have the specified number of words. |
| [string](/docs/helpers/string/) | `uppercase` | Uppercase all of the characters in the given string. |
| [string](/docs/helpers/string/) | `upcase` | Uppercase all of the characters in the given string. |
| [string](/docs/helpers/string/) | `split` | Split `string` by the given `character`. |
| [string](/docs/helpers/string/) | `startsWith` | Tests whether a string begins with the given prefix. |
| [string](/docs/helpers/string/) | `titleize` | Title case the given string. |
| [string](/docs/helpers/string/) | `raw` | Render a block without processing mustache templates inside the block. |
| [url](/docs/helpers/url/) | `encodeURI` | Encodes a URI component. |
| [url](/docs/helpers/url/) | `decodeURI` | Decode a Uniform Resource Identifier (URI) component. |
| [url](/docs/helpers/url/) | `url_encode` | Alias for encodeURI. |
| [url](/docs/helpers/url/) | `url_decode` | Alias for decodeURI. |
| [url](/docs/helpers/url/) | `stripQuerystring` | Strip the query string from the given `url`. |
