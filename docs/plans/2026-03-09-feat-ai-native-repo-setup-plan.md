---
title: "feat: AI-Native Repository Setup"
type: feat
date: 2026-03-09
---

# feat: AI-Native Repository Setup

## Overview

Set up ibgoldbergs-site with the AI-native scaffolding that lets Claude Code (and any future AI agent) onboard itself instantly. This means a `CLAUDE.md` at the root, a `.claude/` directory with settings and project context, and a `docs/` directory for plans and solutions.

The reference implementation is the whilst-slack-bot repo, which has a mature AI-native structure. We're adapting it to the much simpler scope of a personal Next.js site.

## Problem Statement / Motivation

Right now, every Claude Code session on this repo starts cold. There's no `CLAUDE.md` to explain the project, no `.claude/settings.json` for MCP servers, no project context document, and no conventions file. Each session requires re-discovery of the tech stack, file structure, coding conventions, and deployment workflow.

Adding these files means:
- AI agents onboard themselves in seconds instead of minutes
- Coding conventions are enforced consistently across sessions
- MCP servers (like context7 for docs lookup) are pre-configured
- Plans and learnings accumulate in `docs/` over time

## Acceptance Criteria

- [x] `CLAUDE.md` exists at repo root with project overview, structure, tech stack, conventions, and common tasks
- [x] `.claude/settings.json` exists with MCP server configuration (context7)
- [x] `.claude/project_context.md` exists with detailed technical context
- [x] `docs/plans/` directory exists for plan documents
- [x] `docs/solutions/` directory exists for institutional learnings
- [x] `.gitignore` updated to exclude `.claude/settings.local.json`
- [x] All files follow patterns established in whilst-slack-bot (adapted for simpler scope)

## Technical Considerations

**What we need (adapted from whilst-slack-bot):**

| whilst-slack-bot | ibgoldbergs-site | Notes |
|---|---|---|
| `CLAUDE.md` (80 lines) | `CLAUDE.md` (~60 lines) | Simpler project = shorter guide |
| `.claude/settings.json` (MCP servers) | `.claude/settings.json` | Same pattern, context7 MCP |
| `.claude/settings.local.json` (local) | gitignored | Personal settings stay local |
| `.claude/project_context.md` (8KB) | `.claude/project_context.md` (~3KB) | Focused on Next.js 16 + MDX |
| `.claude/commands/` (18 commands) | Not needed | Overkill for a personal site |
| `.claude/agents/` (5 agent dirs) | Not needed | Overkill for a personal site |
| `docs/` (130+ files) | `docs/plans/`, `docs/solutions/` | Start with just the directory structure |

**What we explicitly skip:**
- Custom commands (`.claude/commands/`) - the compound-engineering plugin already provides these
- Custom agents (`.claude/agents/`) - not needed for a personal site
- Extensive docs - start empty, accumulate organically

## Implementation Plan

### 1. Create `CLAUDE.md`

```
CLAUDE.md
```

Root-level AI onboarding guide covering:
- What this project is (personal website for Ian Goldberg)
- Project structure (app/, components/, content/, lib/, public/)
- Tech stack (Next.js 16, Tailwind v4, MDX, Motion, Vercel)
- Key conventions (no em dashes, editorial voice, minimalist design)
- Common tasks (dev server, build, deploy, new blog post, new podcast)
- Important files to know
- Writing style preferences

### 2. Create `.claude/settings.json`

```
.claude/settings.json
```

MCP server configuration:
- context7 (documentation lookup for Next.js, Tailwind, etc.)

### 3. Create `.claude/project_context.md`

```
.claude/project_context.md
```

Detailed technical context:
- Full tech stack with versions
- Repository structure with file purposes
- Design system (color tokens, typography, spacing patterns)
- Content model (MDX blog, static pages, podcast data)
- Deployment pipeline (git push → Vercel auto-deploy)
- Domain: ibgoldbergs.com

### 4. Create `docs/` directory structure

```
docs/plans/       # Plan documents (like this one)
docs/solutions/   # Institutional learnings
```

### 5. Update `.gitignore`

Add `.claude/settings.local.json` to prevent committing personal/local Claude settings.

## References

- **Reference repo:** `/Users/iangoldberg/Projects/whilst-slack-bot/` (mature AI-native setup)
- **whilst-slack-bot CLAUDE.md:** Root onboarding guide pattern
- **whilst-slack-bot .claude/settings.json:** MCP server configuration pattern
- **whilst-slack-bot .claude/project_context.md:** Detailed context pattern
