---
title: Compatibility Helpers
description: >
    Fumanchu provides utilities to filter and query helpers based on their runtime environment compatibility. Use these to determine which helpers work in Node.js, browsers, or both.
order: 26
---

## compatibility

Visit the: [code](https://github.com/jaredwray/fumanchu/tree/main/src/helpers/environment.ts) | [unit tests](https://github.com/jaredwray/fumanchu/tree/main/test/helpers/environment.test.ts)

### HelperCompatibility Enum

An enum representing the runtime environment compatibility for helpers.

**Values**

* `ALL` - All helpers regardless of environment compatibility
* `NODEJS` - Helpers compatible with Node.js runtime
* `BROWSER` - Helpers compatible with browser environments

**Example**

```typescript
import { HelperCompatibility } from "@jaredwray/fumanchu";

// Use the enum to filter helpers
const nodeHelpers = getHelpersByEnvironment(HelperCompatibility.NODEJS);
const browserHelpers = getHelpersByEnvironment(HelperCompatibility.BROWSER);
const allHelpers = getHelpersByEnvironment(HelperCompatibility.ALL);
```

### getHelpersByEnvironment

Get helpers filtered by environment compatibility.

**Params**

* `environment` **{HelperCompatibility}**: The target environment (ALL, NODEJS, or BROWSER)
* `returns` **{Helper[]}**: Array of helpers compatible with the specified environment

**Example**

```typescript
import { getHelpersByEnvironment, HelperCompatibility } from "@jaredwray/fumanchu";

// Get all Node.js compatible helpers
const nodeHelpers = getHelpersByEnvironment(HelperCompatibility.NODEJS);

// Get all browser compatible helpers
const browserHelpers = getHelpersByEnvironment(HelperCompatibility.BROWSER);
```

### getHelperNamesByEnvironment

Get helper names filtered by environment compatibility.

**Params**

* `environment` **{HelperCompatibility}**: The target environment
* `returns` **{string[]}**: Array of helper names compatible with the specified environment

**Example**

```typescript
import { getHelperNamesByEnvironment, HelperCompatibility } from "@jaredwray/fumanchu";

const browserHelperNames = getHelperNamesByEnvironment(HelperCompatibility.BROWSER);
// ['append', 'camelcase', 'capitalize', ...]
```

### getAllHelperNames

Get all helper names.

**Params**

* `returns` **{string[]}**: Array of all helper names

**Example**

```typescript
import { getAllHelperNames } from "@jaredwray/fumanchu";

const allNames = getAllHelperNames();
// ['absolute', 'after', 'and', 'append', ...]
```

### getAllHelpers

Get all helpers from all categories.

**Params**

* `returns` **{Helper[]}**: Array of all registered helpers

**Example**

```typescript
import { getAllHelpers } from "@jaredwray/fumanchu";

const helpers = getAllHelpers();
console.log(`Total helpers: ${helpers.length}`);
```

### getNodejsOnlyHelperNames

Get Node.js-only helper names (helpers that ONLY work in Node.js and not in the browser).

**Params**

* `returns` **{string[]}**: Array of Node.js-only helper names

**Example**

```typescript
import { getNodejsOnlyHelperNames } from "@jaredwray/fumanchu";

const nodejsOnly = getNodejsOnlyHelperNames();
// ['absolute', 'basename', 'dirname', 'embed', 'extname', 'fileSize', 'read', 'readdir', 'relative', 'resolve', 'segments', 'stem']
```

### getBrowserOnlyHelperNames

Get browser-only helper names (helpers that ONLY work in the browser and not in Node.js).

**Params**

* `returns` **{string[]}**: Array of browser-only helper names

**Example**

```typescript
import { getBrowserOnlyHelperNames } from "@jaredwray/fumanchu";

const browserOnly = getBrowserOnlyHelperNames();
// Currently returns an empty array as all browser helpers also work in Node.js
```

### getUniversalHelperNames

Get universal helper names (helpers that work in both Node.js and browser).

**Params**

* `returns` **{string[]}**: Array of universal helper names

**Example**

```typescript
import { getUniversalHelperNames } from "@jaredwray/fumanchu";

const universal = getUniversalHelperNames();
// ['append', 'camelcase', 'capitalize', 'year', ...]
```

### isHelperCompatible

Check if a helper is compatible with a specific environment.

**Params**

* `helperName` **{string}**: The name of the helper to check
* `environment` **{HelperCompatibility}**: The target environment
* `returns` **{boolean}**: True if the helper is compatible with the environment

**Example**

```typescript
import { isHelperCompatible, HelperCompatibility } from "@jaredwray/fumanchu";

isHelperCompatible("camelcase", HelperCompatibility.BROWSER); // true
isHelperCompatible("read", HelperCompatibility.BROWSER); // false
isHelperCompatible("read", HelperCompatibility.NODEJS); // true
```

### getHelperCountByEnvironment

Get the count of helpers by environment.

**Params**

* `environment` **{HelperCompatibility}**: The target environment
* `returns` **{number}**: The number of helpers compatible with the environment

**Example**

```typescript
import { getHelperCountByEnvironment, HelperCompatibility } from "@jaredwray/fumanchu";

const nodeCount = getHelperCountByEnvironment(HelperCompatibility.NODEJS);
const browserCount = getHelperCountByEnvironment(HelperCompatibility.BROWSER);
const allCount = getHelperCountByEnvironment(HelperCompatibility.ALL);
```

### getHelperCompatibilitySummary

Get a summary of helper counts by environment.

**Params**

* `returns` **{Object}**: Object with helper counts
  * `all` **{number}**: Total number of helpers
  * `nodejs` **{number}**: Helpers compatible with Node.js
  * `browser` **{number}**: Helpers compatible with browser
  * `nodejsOnly` **{number}**: Helpers that only work in Node.js
  * `browserOnly` **{number}**: Helpers that only work in browser
  * `universal` **{number}**: Helpers that work in both environments

**Example**

```typescript
import { getHelperCompatibilitySummary } from "@jaredwray/fumanchu";

const summary = getHelperCompatibilitySummary();
// {
//   all: 205,
//   nodejs: 205,
//   browser: 193,
//   nodejsOnly: 12,
//   browserOnly: 0,
//   universal: 193
// }
```

## Use Cases

### Loading Only Browser-Compatible Helpers

When building for the browser, you may want to only include helpers that work in that environment:

```typescript
import { fumanchu, HelperCompatibility, getHelperNamesByEnvironment } from "@jaredwray/fumanchu";

// Get only browser-compatible helper names
const browserHelpers = getHelperNamesByEnvironment(HelperCompatibility.BROWSER);

// Create a Handlebars instance with filtered helpers
const hbs = fumanchu({
  filter: {
    names: browserHelpers
  }
});
```

### Checking Helper Compatibility Before Use

You can verify a helper works in your target environment before using it:

```typescript
import { isHelperCompatible, HelperCompatibility } from "@jaredwray/fumanchu";

function safelyUseHelper(helperName: string, isBrowser: boolean) {
  const env = isBrowser ? HelperCompatibility.BROWSER : HelperCompatibility.NODEJS;

  if (isHelperCompatible(helperName, env)) {
    // Safe to use the helper
    return true;
  }

  console.warn(`Helper '${helperName}' is not compatible with the current environment`);
  return false;
}
```
