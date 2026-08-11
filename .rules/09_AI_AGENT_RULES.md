# 09 AI AGENT RULES

- AI must operate with the principle of Least Privilege.
- AI must NOT autonomously modify database schema or drop tables.
- All AI-generated responses to users must be sanitized for XSS.
- Destructive operations triggered by an AI Intent Engine must require a human-in-the-loop confirmation (via `ActionModal`).\n