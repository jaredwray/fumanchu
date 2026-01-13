---
title: Logging Helpers
description: >
    Handlebars provides a set of built-in helpers for logging and debugging. These helpers output messages to the terminal with various formatting and color options, making it easier to debug templates and display status information. Node.js only.
order: 6
---

## logging

> **Note:** These helpers are only available in Node.js environments. They are not compatible with browser-based Handlebars usage.

These helpers output messages to the terminal with ANSI color formatting. All logging helpers return an empty string to avoid affecting template output.

### {{log}}

Logs an unstyled message to the terminal via `console.log`.

**Params**

* `...args` **{any}**: Values to log
* `returns` **{String}**: Empty string

**Example**

```html
{{log "Processing item:" itemName}}
<!-- outputs to console: Processing item: Widget -->
```

### {{ok}}

Logs a green colored message preceded by a checkmark to the terminal. Useful for indicating successful operations.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{ok "Build completed successfully"}}
<!-- outputs to console: ✓ Build completed successfully (in green) -->
```

### {{success}}

Logs a green colored message to the terminal. Similar to `ok` but without the checkmark.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{success "All tests passed"}}
<!-- outputs to console: All tests passed (in green) -->
```

### {{info}}

Logs a cyan colored informational message to the terminal.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{info "Processing" totalCount "items"}}
<!-- outputs to console: Processing 42 items (in cyan) -->
```

### {{warning}}

Logs a yellow colored warning message to stderr.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{warning "Deprecated feature detected"}}
<!-- outputs to stderr: Deprecated feature detected (in yellow) -->
```

### {{warn}}

Alias for `{{warning}}`. Logs a yellow colored warning message to stderr.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{warn "This method will be removed in v5"}}
<!-- outputs to stderr: This method will be removed in v5 (in yellow) -->
```

### {{error}}

Logs a red colored error message to stderr.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{error "Failed to process item:" itemId}}
<!-- outputs to stderr: Failed to process item: 123 (in red) -->
```

### {{danger}}

Alias for `{{error}}`. Logs a red colored error message to stderr.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{danger "Critical failure in module"}}
<!-- outputs to stderr: Critical failure in module (in red) -->
```

### {{bold}}

Logs a bold formatted message to stderr.

**Params**

* `...args` **{any}**: Values to log (will be joined with spaces)
* `returns` **{String}**: Empty string

**Example**

```html
{{bold "Important Notice"}}
<!-- outputs to stderr: Important Notice (in bold) -->
```

### {{_debug}}

Outputs debug information including the provided value and the current Handlebars context. Useful for inspecting template data during development.

**Params**

* `...args` **{any}**: Optional values to inspect
* `returns` **{String}**: Empty string

**Example**

```html
{{_debug user}}
<!-- outputs to stderr:
──────────────────────────────────────────────────
VALUE: { name: "John", role: "admin" }
CONTEXT: { users: [...], settings: {...} }
──────────────────────────────────────────────────
-->
```

### {{_inspect}}

Formats a value as JSON and returns it for display in the template. Supports different output formats.

**Params**

* `context` **{any}**: The value to inspect
* `options.hash.type` **{String}**: Output format: `"html"` (default), `"md"`, or any other value for raw JSON
* `returns` **{String}**: Formatted JSON string

**Example**

```html
{{_inspect user}}
<!-- returns HTML formatted JSON:
<div class="highlight highlight-json">
<pre><code>
{
  "name": "John",
  "role": "admin"
}</code></pre></div>
-->

{{_inspect user type="md"}}
<!-- returns Markdown formatted JSON:
```json
{
  "name": "John",
  "role": "admin"
}
```
-->

{{_inspect user type="raw"}}
<!-- returns raw JSON:
{
  "name": "John",
  "role": "admin"
}
-->
```
