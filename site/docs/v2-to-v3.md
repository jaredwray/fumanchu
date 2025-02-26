---
title: 'Breaking Changes from v2 to v3'
sideBarTitle: 'Changes from v2 to v3'
description: 'This document describes the breaking changes from v2 to v3 of the jaredwray/fumanchu library.'
order: 3
---

# Breaking Changes from v2 to v3

Because of the complexity in the legacy helpers library we have moved to exporting the libraries and a helper function to make it easier to use. Here are the exports:

- `handlebars` - This is an instance of handlebars library without any helpers. It is the same as calling `Handlebars.create()`
- `helpers` - This is a function that takes an object with a `handlebars` key and adds all the helpers to the handlebars instance. This is the same as calling `helpers({ handlebars: handlebars }, { ..options })`
- `createHandlebars` - This is an async function that returns a handlebars instance with all the helpers added. This is the same as calling `helpers({ handlebars: handlebars }, { ..options })` but async.
- `Handlebars` - This is the handlebars library itself. It is the same as calling `require('handlebars')`

Please see the examples below for how to use the library.