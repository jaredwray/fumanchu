---
title: Migration Progress
sideBarTitle: Migration Progress
description: Fumanchu Migration Progress
order: 2
---
# Fumanchu Migration Progress
# Migration Status

We are working to migrate all legacy helpers to a modern helper approach with less reliance on node modules. We plan to make significant changes over time with this project such as the following:
- ✅ Remove all dependencies on `handlebars-helpers` and maintain all helpers in this project
- ✅ Migration to `vitest` as a testing framework
- ✅ Migration to `xo` as a linting framework
- ✅ Migrate to Typescript with full typing support
- **(In Progress)** Replace module dependencies that are no longer supported with supported ones. Please see the [Legacy Helper Migration Status to Fumanchu Helper Registry](#legacy-helper-migration-status-to-fumanchu-helper-registry) table below for more information.
- Migration to ESM and CJS support using cross compatible code
- Move to better documentation and examples where it makes sense
- Add in browser support via CDN (this will remove the nodejs specific helpers)

# Legacy Helper Migration Status to Fumanchu Helper Registry

| Helper | Migration Status | Notes |
| --- | --- |
| `array` | No |
| `code` | No |
| `collection` | No |
| `comparrison` | No |
| `date` | ✅ |
| `fs` | No |
| `html` | No |
| `i18n` | No |
| `inflection` | No |
| `logging` | No |
| `markdown` | No |
| `match` | No |
| `misc` | No |
| `number` | No |
| `object` | No |
| `path` | No |
| `regex` | No |
| `string` | No |
| `url` | No |