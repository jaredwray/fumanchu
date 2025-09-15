---
title: 'Breaking Changes from v3 to v4'
sideBarTitle: 'Changes from v3 to v4'
description: 'This document describes the breaking changes from v3 to v4 of the jaredwray/fumanchu library.'
order: 4
---

# Breaking Changes from v3 to v4

We are now fully migrated 🎉 and all helpers are in typescript and working correctly

- We no longer support the legacy helpers that were in this project as we have migrated to a new helper system.
- `createHandlebars` is now deprecated in favor of just using `fumanchu()` and no more needing async.
- The `FumanchuOptions` has been changed on filtering and also now fully supported with `fumanchu()`
- Caching is now enabled by default! 🚀