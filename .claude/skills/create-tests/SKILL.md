---
name: create-tests
description: Create or improve automated tests for changed behavior after review identifies missing or insufficient coverage.
---

# Create Automated Tests

Create focused automated tests for the current change.

## Rules

1. Read the README and acceptance criteria first.
2. Inspect the implementation and existing tests.
3. Ask the developer to state the missing behavior, test inputs, and expected outcomes before generating tests. If they have not done so, stop and ask for their proposed cases without revealing the solution.
4. Inspect the current Git diff so tests are tied to actual changed behavior.
5. Prefer behavior-focused tests over implementation-detail tests.
6. Include boundary conditions, error paths, and realistic edge cases when relevant.
7. Do not weaken existing assertions just to make the suite pass.
8. Do not delete failing tests unless the requirement changed and the developer confirms the change.
9. Keep test changes minimal and readable.
10. After creating tests, run the relevant test suite.
11. Run `pnpm verify` when practical.

## Developer handoff

After generating tests, summarize:

- what tests were added,
- what behavior each test protects,
- which test would have caught the original defect,
- any assumptions you made,
- whether the suite passes.

Remind the developer that generated tests require human review before commit.
