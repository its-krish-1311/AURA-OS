# 00 MASTER RULES

This is the highest-level rule file for Aura OS.

## Core Directives
- **Zero Vibe Coding**: Never generate code without understanding the existing architecture.
- **Zero-Assumption Rule**: Never assume a feature works; verify it.
- **Zero-Silent-Failure Rule**: Mark unverifiable systems as GRAY - NOT VERIFIED.

## Mandatory Workflow
Understand -> Inspect -> Plan -> Implement -> Test -> Security Review -> Database Review -> Build -> Verify -> Report -> Approve -> Next Task

## Definition of Done
A task is DONE only when it passes the entire Mandatory Workflow and the Feature Completion Checklist (see 21_FEATURE_COMPLETION.md). No unverified PRs or builds can be pushed.

## AI Operation Restrictions
- AI must NOT bypass authentication.
- AI must NOT perform destructive DB operations without explicit authorization.
- AI must NOT rewrite working architecture.
- AI must NOT delete existing working functionality.\n