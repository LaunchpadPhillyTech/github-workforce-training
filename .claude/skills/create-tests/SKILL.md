---
name: create-tests
description: Create or improve automated tests for changed behavior after review identifies missing or insufficient coverage.
---

# Create Automated Tests

Create focused automated tests for the current change.

## Rules

1. Read the README and acceptance criteria first.
2. Inspect the implementation and existing tests.
3. Inspect the current Git diff so tests are tied to actual changed behavior.
4. Prefer behavior-focused tests over implementation-detail tests.
5. Include boundary conditions, error paths, and realistic edge cases when relevant.
6. Do not weaken existing assertions just to make the suite pass.
7. Do not delete failing tests unless the requirement changed and the developer confirms the change.
8. Keep test changes minimal and readable.
9. After creating tests, run the relevant test suite.
10. Run `pnpm ci` when practical.

## Developer handoff

After generating tests, summarize:

- what tests were added,
- what behavior each test protects,
- which test would have caught the original defect,
- any assumptions you made,
- whether the suite passes.

Remind the developer that generated tests require human review before commit.
