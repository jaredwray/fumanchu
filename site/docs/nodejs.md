---
title: 'Node.js Support'
description: 'How to use Fumanchu in Node.js and the full list of helpers registered in the Node build.'
order: 2
---

# Node.js Support

The default `@jaredwray/fumanchu` entry is the Node.js build. It registers every helper, including categories that depend on Node core modules such as `fs` and `path`.

## Install

```bash
npm install @jaredwray/fumanchu --save
```

## Use Handlebars with all helpers

`fumanchu()` returns a Handlebars instance with the full Node helper set already registered. Handlebars itself is included — you do not need to add it as a separate dependency.

```javascript
import { fumanchu } from '@jaredwray/fumanchu';

const handlebars = fumanchu();
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({ foo: 'bar' });
console.log(html); // <p>Foo is bar</p>
```

## Register helpers on an existing Handlebars instance

If you already have a Handlebars instance, call `helpers()` to attach the Node registry to it:

```javascript
import { helpers } from '@jaredwray/fumanchu';
import handlebars from 'handlebars';

helpers({ handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
console.log(template({ foo: 'bar' }));
```

You can also import Handlebars from Fumanchu:

```javascript
import { handlebars, helpers } from '@jaredwray/fumanchu';

helpers({ handlebars });
const template = handlebars.compile('{{uppercase name}}');
console.log(template({ name: 'hello' })); // HELLO
```

## Helper registry

`HelperRegistry` loads the full Node helper set. Use it to register extra helpers or to load a filtered subset:

```javascript
import { HelperRegistry, handlebars } from '@jaredwray/fumanchu';

const registry = new HelperRegistry();
registry.register('eq', (a, b) => a === b);
registry.load(handlebars, { names: ['eq'] });
```

Helpers also declare a compatibility flag such as `HelperRegistryCompatibility.NODEJS` or `HelperRegistryCompatibility.BROWSER`, so you can filter by environment.

## Caching

When caching is enabled, Fumanchu wraps Handlebars `compile()` and stores compiled template functions in [@cacheable/memory](https://github.com/jaredwray/cacheable/tree/main/packages/memory). Compiling the same template string again returns the cached function.

The `caching` option accepts a boolean, a `CacheableMemory` instance, or a `CacheableMemoryOptions` object (`ttl`, `lruSize`, `checkInterval`, and so on).

```javascript
import { fumanchu } from '@jaredwray/fumanchu';

const handlebars = fumanchu({ caching: true });
const template = handlebars.compile('Hello {{name}}!');
template({ name: 'World' }); // compiles and caches
handlebars.compile('Hello {{name}}!'); // cached — no recompilation
```

```javascript
import { fumanchu } from '@jaredwray/fumanchu';

const handlebars = fumanchu({
  caching: {
    ttl: '1h',
    lruSize: 500,
    checkInterval: 0,
  },
});
```

```javascript
import { fumanchu, CacheableMemory } from '@jaredwray/fumanchu';

const cache = new CacheableMemory({ ttl: '1h', lruSize: 1000, useClone: false });
const hbs1 = fumanchu({ caching: cache });
const hbs2 = fumanchu({ caching: cache }); // shares the same cache as hbs1
```

## Available helpers

The Node build registers every helper below. See the category pages for parameters and examples.

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
| [code](/docs/helpers/code/) | `embed` | Embed code from an external file as preformatted text. |
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
| [fs](/docs/helpers/fs/) | `fileSize` | Formats a number of bytes into a human-readable file size string with appropriate units. |
| [fs](/docs/helpers/fs/) | `read` | Read a file from the file system. |
| [fs](/docs/helpers/fs/) | `readdir` | Return an array of files from the given directory. |
| [html](/docs/helpers/html/) | `attr` | Stringify attributes from the options hash into an HTML attribute string. |
| [html](/docs/helpers/html/) | `sanitize` | Strip all HTML tags from a string, preserving only the text content. |
| [html](/docs/helpers/html/) | `ul` | Block helper for creating unordered lists. |
| [html](/docs/helpers/html/) | `ol` | Block helper for creating ordered lists. |
| [html](/docs/helpers/html/) | `thumbnailImage` | Generate a `<figure>` element with a thumbnail image, optional link to full-size image, and optional caption. |
| [html](/docs/helpers/html/) | `css` | Generate `<link>` tags for stylesheets. |
| [html](/docs/helpers/html/) | `js` | Generate `<script>` tags for JavaScript files. |
| [i18n](/docs/helpers/i18n/) | `i18n` | Looks up a translation key for the current language. |
| [inflection](/docs/helpers/inflection/) | `inflect` | Returns either the `singular` or `plural` inflection of a word based on the given `count`. |
| [inflection](/docs/helpers/inflection/) | `ordinalize` | Returns an ordinalized number as a string. |
| [logging](/docs/helpers/logging/) | `log` | Logs an unstyled message to the terminal via `console.log`. |
| [logging](/docs/helpers/logging/) | `ok` | Logs a green colored message preceded by a checkmark to the terminal. |
| [logging](/docs/helpers/logging/) | `success` | Logs a green colored message to the terminal. |
| [logging](/docs/helpers/logging/) | `info` | Logs a cyan colored informational message to the terminal. |
| [logging](/docs/helpers/logging/) | `warning` | Logs a yellow colored warning message to stderr. |
| [logging](/docs/helpers/logging/) | `warn` | Alias for `{{warning}}`. |
| [logging](/docs/helpers/logging/) | `error` | Logs a red colored error message to stderr. |
| [logging](/docs/helpers/logging/) | `danger` | Alias for `{{error}}`. |
| [logging](/docs/helpers/logging/) | `bold` | Logs a bold formatted message to stderr. |
| [logging](/docs/helpers/logging/) | `_debug` | Outputs debug information including the provided value and the current Handlebars context. |
| [logging](/docs/helpers/logging/) | `_inspect` | Formats a value as JSON and returns it for display in the template. |
| [markdown](/docs/helpers/markdown/) | `md` | Converts a markdown string to HTML, or reads a markdown file from the file system and converts its contents to HTML. |
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
| [path](/docs/helpers/path/) | `absolute` | Resolve an absolute path from the given `filepath`. |
| [path](/docs/helpers/path/) | `dirname` | Get the directory path segment from the given `filepath`. |
| [path](/docs/helpers/path/) | `relative` | Get the relative filepath from `a` to `b`. |
| [path](/docs/helpers/path/) | `basename` | Get the filename from the given `filepath`. |
| [path](/docs/helpers/path/) | `stem` | Get the "stem" (filename without extension) from the given `filepath`. |
| [path](/docs/helpers/path/) | `extname` | Get the file extension from the given `filepath`. |
| [path](/docs/helpers/path/) | `resolve` | Resolve an absolute path from the given `filepath`. |
| [path](/docs/helpers/path/) | `segments` | Get specific (joined) segments of a file path by passing a range of array indices. |
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
| [url](/docs/helpers/url/) | `escape` | Escapes a string for use in a URL. |
| [url](/docs/helpers/url/) | `urlResolve` | Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag. |
| [url](/docs/helpers/url/) | `urlParse` | Parses a `url` string into an object. |
| [url](/docs/helpers/url/) | `stripProtocol` | Strip protocol from a `url`. |
