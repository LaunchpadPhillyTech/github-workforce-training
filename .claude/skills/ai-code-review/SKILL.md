---
name: ai-code-review
description: Review the current branch or PR changes for correctness, acceptance criteria, risk, and automated test coverage before promotion.
---

# AI Code Review

Review the current Git changes as a senior engineer preparing code for a promotion gate.

## Required review sequence

1. Read the repository README and relevant acceptance criteria.
2. Inspect `git status`, `git diff`, and the changed files.
3. Inspect relevant existing tests.
4. Check whether the implementation satisfies the documented business behavior.
5. Identify bugs, edge cases, regressions, weak error handling, security concerns, duplication, and unnecessary complexity.
6. Confirm automated tests exist for every meaningful changed behavior.
7. Specifically look for boundary conditions and failure paths.
8. Run the project's available verification commands when appropriate:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`
9. Do not modify code unless the developer explicitly asks you to implement a finding.

## Required output

Report findings by severity:

- BLOCKER
- SHOULD FIX
- SUGGESTION

For every finding include:

- file/location,
- what is wrong,
- why it matters,
- how to verify the fix.

End with these explicit checks:

- Acceptance criteria satisfied: YES / NO / UNCLEAR
- Automated tests present for changed behavior: YES / NO
- Boundary/edge cases tested: YES / NO
- Full automated suite passing: YES / NO / NOT RUN
- Ready for human review: YES / NO

If automated tests are missing, explicitly instruct the developer to run the `create-tests` skill before requesting review.
