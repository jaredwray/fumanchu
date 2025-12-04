---
title: File System Helpers
description: >
    Handlebars provides a set of built-in helpers for working with the file system. These helpers are used to read and manipulate files, making it easier to work with file data in templates.
order: 11
---

## fs

### {{fileSize}}

Formats a number of bytes into a human-readable file size string with appropriate units.

**Params**

* `value` **{Number|Object}**: The number of bytes, or an object with a `length` property
* `precision` **{Number}**: Optional decimal precision (default: 2)
* `returns` **{String}**: Formatted file size string

**Supported Units**

B, kB, MB, GB, TB, PB, EB, ZB, YB

**Example**

```handlebars
{{fileSize 1024}}
<!-- results in: '1 kB' -->

{{fileSize 1536}}
<!-- results in: '1.5 kB' -->

{{fileSize 1048576}}
<!-- results in: '1 MB' -->

{{fileSize 1073741824}}
<!-- results in: '1 GB' -->

<!-- With custom precision -->
{{fileSize 1536 0}}
<!-- results in: '2 kB' -->

{{fileSize 1536 3}}
<!-- results in: '1.5 kB' -->

<!-- Returns '0 B' for null/undefined -->
{{fileSize null}}
<!-- results in: '0 B' -->
```

### {{read}}

Read a file from the file system. This is useful in composing "include"-style helpers using sub-expressions.

**Params**

* `filepath` **{String}**: The path to the file to read
* `returns` **{String}**: The file contents as a UTF-8 string

**Example**

```handlebars
<!-- Read and output file contents -->
{{read "path/to/file.txt"}}

<!-- Use with other helpers -->
{{markdown (read "README.md")}}

<!-- Include a partial file -->
<script>
{{read "src/scripts/analytics.js"}}
</script>
```

### {{readdir}}

Return an array of files from the given directory. Supports optional filtering by function, RegExp, glob pattern, or type.

**Params**

* `directory` **{String}**: The directory path to read
* `filter` **{Function|RegExp|String}**: Optional filter to apply to the file list
* `returns` **{Array}**: Array of file paths

**Filter Options**

* **Function**: Custom filter function that receives the files array and returns filtered array
* **RegExp**: Regular expression to test against file paths
* **Glob string**: Glob pattern to match files (e.g., `"*.js"`, `"**/*.md"`)
* **"isFile"**: Return only files (not directories)
* **"isDirectory"**: Return only directories (not files)

**Example**

```handlebars
<!-- List all files in a directory -->
{{#each (readdir "src")}}
  {{this}}
{{/each}}

<!-- Filter by glob pattern -->
{{#each (readdir "src" "*.js")}}
  {{this}}
{{/each}}

<!-- Filter to only files -->
{{#each (readdir "src" "isFile")}}
  {{this}}
{{/each}}

<!-- Filter to only directories -->
{{#each (readdir "src" "isDirectory")}}
  {{this}}
{{/each}}

<!-- Use with other helpers -->
{{#each (readdir "posts" "*.md")}}
  <article>
    {{markdown (read this)}}
  </article>
{{/each}}
```
