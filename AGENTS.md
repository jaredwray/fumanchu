# AGENTS.md

Guidelines for AI coding agents (Claude, Gemini, Codex).

## Project

Fumanchu is a TypeScript library that combines Handlebars with 189+ helpers in 20 categories. It serves as a drop-in replacement for Handlebars with built-in helper functions for arrays, strings, math, dates, comparisons, and more.

## Commands

- `pnpm install` - Install dependencies
- `pnpm build` - Build the project
- `pnpm test` - Run linter and tests with coverage

**Use pnpm, not npm.**

## Development Rules

1. **Always run `pnpm test` before committing** - All tests must pass
2. **Maintain 100% code coverage** - Add tests for any new code
3. **Follow existing code style** - Biome enforces formatting and linting

## Structure

- `src/` - TypeScript source code
- `src/helpers/` - Handlebars helper implementations by category
- `test/` - Test files (Vitest)
- `site/` - Documentation website assets
