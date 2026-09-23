# Workspace and future MCP server conventions

The root pnpm workspace discovers applications in `apps/*`, reusable packages in `packages/*`, and future MCP servers in `servers/*`. The root owns lint and Vitest; packages with source code must include tests. Keep tests in `tests/` or a colocated `__tests__/` directory with `.test.ts`, `.spec.ts`, `.test.tsx`, or `.spec.tsx` names.

Use camelCase for ordinary functions and hooks (`useSomething`), PascalCase for React components and TypeScript context types, and descriptive names for shared APIs. In future UI packages, use `src/lib` for general utilities, `src/shared` for code reused across features, `src/components` for reusable UI, and `src/contexts` for Context API modules. Do not create these folders until code needs them. Automated naming and placement checks catch syntax-level mistakes; reviewers decide whether an abstraction is genuinely reusable or a context is justified.

## Future local MCP server review

The first MCP server is planned as a local stdio process under `servers/*`; this change does not add a server. Before adding one, document its tools and resources, expected callers, data flows, and exact permissions. Reviewers should require:

- a tool and resource allowlist, with no network listener by default;
- validated input schemas, bounded payloads, and rejection of path traversal and symlink escapes for file access;
- only the credentials and environment variables the child process needs, kept outside source control;
- explicit approval for write or destructive tools and tests for denied operations;
- protocol output only on stdout, with redacted diagnostics on stderr;
- Vitest cases for malformed input, unauthorized or out-of-scope access, failure paths, and secret-safe output.

Adding a remote transport needs a separate design for authentication, authorization, transport protection, and deployment controls. Do not infer remote access from this local workspace configuration.

Before UAT or production promotion, record the tested commit and environment, reproducible manual steps, expected and observed results, and screenshots or configuration evidence when relevant. Keep credentials and personal data out of all evidence.
