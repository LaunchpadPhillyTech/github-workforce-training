# Git Branching + CI/CD Lab: Dev to Production

This repository is a hands-on companion to the **Git Branching + CI/CD: From Dev to Production** lesson.

You will practice moving one small change through a real team workflow:

```text
feature/<ticket> -> dev -> uat -> main
```

The goal is not just to make code work. The goal is to prove that the code is safe to promote at every stage.

---

## What you will learn

By the end of this lab, you should be able to:

- Create a feature branch from `dev`.
- Make a small code change and add automated tests.
- Use the question-led Claude Code review coach before proposing a fix.
- Open and review pull requests.
- Work with another developer before code reaches UAT.
- Test the merged code in UAT, not only on your feature branch.
- Request final approval from a **Lead Developer or Project Manager** before merging to `main`.
- Use CI checks, dependency auditing, and recorded validation as promotion gates.

---

# The branch model

| Branch | Purpose | Who approves promotion? |
|---|---|---|
| `feature/<ticket>` | Your isolated work | Author prepares it for review |
| `dev` | Shared development integration | Another developer reviews/tests before UAT |
| `uat` | Release candidate / acceptance testing | UAT testing must pass |
| `main` | Production-ready code | Lead Developer or Project Manager |

> **Important:** Passing tests on your feature branch or `dev` does **not** mean the change is ready for production. The merged version must be tested again from `uat` before a PR to `main` is requested.

---

# Team rules for this lab

1. **Do not work directly on `dev`, `uat`, or `main`.**
2. **Do not approve your own promotion to UAT.**
3. Before a change can move from `dev` to `uat`, another developer must:
   - review the code,
   - check out and run the code,
   - run the automated tests,
   - verify the acceptance criteria,
   - and make/push a meaningful commit to the PR branch.
4. UAT must test the merged UAT version, not just the developer's local branch.
5. The author performs technical validation in UAT.
6. Another developer or stakeholder performs acceptance testing in UAT.
7. A PR to `main` is requested only after UAT passes.
8. Only a **Lead Developer or Project Manager** can approve the PR to `main`.
9. CI must pass before promotion.
10. The Claude Code review coach does not replace human review.

---

# The scenario

The application calculates an order total.

Business rule:

- Standard customers receive no discount.
- VIP customers receive a **15% discount when the subtotal is $100 or more**.

The repository contains an intentional defect and an intentional testing gap.

Your job is to use the workflow—not guess—to discover, fix, review, test, and safely promote the change.

---

# Before you begin

You need:

- Git
- GitHub access
- Node.js 22+
- Corepack
- pnpm
- VS Code
- Claude Code configured in your development environment

Verify your tools:

```bash
git --version
node --version
corepack --version
pnpm --version
```

If `pnpm` is unavailable:

```bash
corepack enable
corepack prepare pnpm@11.24.0 --activate
```

---

# Step 1 - Clone the repository

Clone the repository your instructor provides:

```bash
git clone <REPOSITORY_URL>
cd branching-cicd-demo
```

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

Run the full local verification command:

```bash
pnpm verify
```

Expected checks:

```text
lint
-> typecheck
-> automated tests
-> build
-> dependency audit
```

All checks should pass at the start of the exercise.

---

# Step 2 - Start from `dev`

Never create feature work from `main` for this exercise.

```bash
git checkout dev
git pull origin dev
```

Confirm your branch:

```bash
git branch --show-current
```

Expected:

```text
dev
```

---

# Step 3 - Create your feature branch

Use this naming format:

```text
feature/<ticket>-<short-description>
```

Example:

```bash
git checkout -b feature/101-vip-discount
```

Confirm:

```bash
git branch --show-current
```

---

# Step 4 - Inspect the requirement before changing code

Read:

```text
apps/discount-demo/src/discount.ts
apps/discount-demo/tests/discount.test.ts
```

Acceptance criteria:

```text
Given a VIP customer
When the subtotal is $100 or more
Then the customer receives a 15% discount.
```

Do not change code yet.

First run the existing tests:

```bash
pnpm test
```

Then run the demo:

```bash
pnpm dev
```

Compare the actual behavior with the acceptance criteria.

---

# Step 5 - Work with the question-led review coach

Before writing a fix, ask the read-only `review-coach` subagent to inspect the requirement, implementation, and test coverage. In Claude Code, type `@` and select `review-coach (agent)`, or ask Claude to use the `review-coach` subagent.

Ask Claude Code:

```text
Use the review-coach subagent to question my understanding of this change. Do not give me the fix.
```

The coach should ask you to explain:

- the relevant acceptance criteria and boundary cases,
- what the existing tests prove and what they may miss,
- how you would verify your hypothesis manually,
- whether naming, workspace placement, and security checks apply.

Write down your own hypothesis, expected results, and proposed test cases before changing code. The coach must not provide the solution. You are responsible for understanding every code change that enters the repository.

---

# Step 6 - Design the missing tests

If you find a testing gap, first describe the input, expected result, and reason the test matters. Write the Vitest case yourself. If you want help turning your own test design into code after that, run:

```text
/create-tests
```

The required flow is:

```text
review-coach questions
-> learner explains the gap and designs a test
-> learner writes or reviews the test
-> run full test suite
-> investigate failures
-> review-coach checks the evidence again
```

Generated tests are suggestions. Review them before committing. Do not use test generation to skip your own reasoning.

Ask yourself:

- Does the test verify business behavior rather than implementation details?
- Does it cover the boundary condition?
- Would the test fail before the bug is fixed?
- Is the expected result correct?

---

# Step 7 - Make the change

Implement the smallest change that satisfies the acceptance criteria.

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit:gate
```

Or run everything with:

```bash
pnpm verify
```

Do not continue until all checks pass.

---

# Step 8 - Re-run the review coach

Run:

```text
Use the review-coach subagent to question my tests, verification, and security evidence.
```

Answer the coach's questions with your test cases, commands, observations, and any unresolved risks.

Address gaps you confirm.

Then run:

```bash
pnpm verify
```

again.

---

# Step 9 - Commit and push your feature branch

Review your changes:

```bash
git status
git diff
```

Stage and commit:

```bash
git add .
git commit -m "fix: satisfy discount acceptance criteria"
```

Push:

```bash
git push -u origin feature/101-vip-discount
```

---

# Step 10 - Open PR: feature -> dev

Open a pull request:

```text
base: dev
compare: feature/101-vip-discount
```

Complete the PR template.

Your PR must include:

- what changed,
- the acceptance criteria,
- automated tests added or updated,
- review-coach questions answered,
- local verification completed.

Wait for CI.

Do not merge with failing checks.

---

# Step 11 - Merge into `dev`

After required review and CI checks pass, merge the feature PR into `dev` according to your team's GitHub permissions.

Now update locally:

```bash
git checkout dev
git pull origin dev
pnpm install --frozen-lockfile
pnpm verify
```

The shared `dev` branch must be healthy before promotion toward UAT.

---

# Step 12 - Open PR: dev -> uat

Create the promotion PR:

```text
base: uat
compare: dev
```

This is a **team review gate**.

The author cannot be the only person validating the change.

---

# Step 13 - Reviewer checks out and tests the PR

A developer other than the author performs this step.

Reviewer:

```bash
git fetch origin
git checkout dev
git pull origin dev
pnpm install --frozen-lockfile
pnpm verify
pnpm dev
```

The reviewer must verify:

- the application runs,
- automated checks pass,
- the acceptance criteria are satisfied,
- edge cases are covered,
- the code is understandable,
- tests prove the new behavior.

---

# Step 14 - Reviewer must make a commit

For this lab, review is intentionally more than clicking **Approve**.

The reviewer must make a meaningful contribution to the code under review. Examples:

- add a missing test,
- improve an assertion,
- fix an issue found during testing,
- improve error handling,
- make a small code-quality correction connected to the change.

The reviewer then commits and pushes that change to the branch/PR being reviewed.

Example:

```bash
git add .
git commit -m "test: strengthen reviewer coverage"
git push
```

> Do **not** create meaningless or empty commits simply to satisfy this rule. The reviewer contribution must improve or validate the change.

After the reviewer commit, CI must run again and pass.

---

# Step 15 - Reviewer re-runs verification

Reviewer runs:

```bash
pnpm verify
```

Then the reviewer confirms the PR checklist and approves promotion to UAT.

The purpose of this gate is to ensure that a second developer has actually interacted with the code—not merely read the PR description.

---

# Step 16 - Merge dev -> uat

After peer review and CI pass, merge the PR into `uat`.

The promotion is not complete yet.

The code must now be validated **from UAT**.

---

# Step 17 - Test the merged UAT version

Update your local copy:

```bash
git checkout uat
git pull origin uat
pnpm install --frozen-lockfile
pnpm verify
pnpm dev
```

If your team has a deployed UAT environment, perform the equivalent validation against that deployment as well.

Why test again?

Because you are now testing the version created after integration and promotion—not the isolated feature branch you originally worked on.

---

# Step 18 - Author performs technical UAT validation

The original author verifies:

- application startup,
- affected feature behavior,
- automated test results,
- integrations touched by the change,
- expected error behavior,
- no obvious regressions.

Record the exact UAT commit and environment, manual steps, expected and actual results, and any relevant screenshots or configuration evidence in the PR. Redact secrets and personal data.

---

# Step 19 - Another person performs acceptance testing

A second developer or stakeholder validates the behavior from the user's point of view.

They should test the acceptance criteria without relying only on the developer's explanation.

For this exercise, the acceptance tester should choose cases below, at, and above the stated boundary, plus a standard customer. They should record observed results without relying on the author's report.

Do not open the PR to `main` until UAT is accepted.

---

# Step 20 - Review release evidence

Before requesting production approval, use the review coach against the UAT/release changes:

```text
Use the review-coach subagent to question the UAT evidence and promotion readiness.
```

Confirm:

- no unresolved high-impact risks,
- automated tests exist,
- changed behavior is tested,
- CI passes,
- UAT is complete,
- manual steps, actual results, and relevant screenshots or configuration evidence are attached to the PR.

If you identify missing tests, design the cases yourself. After you have stated the expected behavior, you may use:

```text
/create-tests
```

Review any generated tests, run them, and repeat validation.

---

# Step 21 - Open PR: uat -> main

Only after UAT testing succeeds should you open:

```text
base: main
compare: uat
```

The PR should include:

- UAT results,
- acceptance-testing confirmation,
- CI results,
- review-coach and human-review confirmation,
- automated-test confirmation,
- manual steps, actual results, and relevant screenshots or configuration evidence,
- known limitations, if any.

---

# Step 22 - Request production approval

A learner or developer does **not** self-approve the final production promotion.

Approval to merge into `main` must come from:

```text
Lead Developer
or
Project Manager
```

If CI fails, UAT is incomplete, or required tests are missing, the PR is not ready for approval.

---

# Step 23 - Merge to main

After the Lead Developer or Project Manager approves the PR and all required checks pass, merge `uat` into `main`.

`main` now represents production-ready code.

---

# The complete workflow

```text
1. Start from dev
        |
2. Create feature branch
        |
3. Review-coach questions and learner test design
        |
4. Implement and run checks
        |
5. Missing tests?
     /      \
   yes       no
    |         |
optional test generation after learner design
    |         |
review tests  |
    \        /
      run CI
        |
6. feature -> dev PR
        |
7. CI passes
        |
8. merge to dev
        |
9. dev -> uat PR
        |
10. SECOND DEV reviews + runs app + tests
        |
11. REVIEWER makes meaningful commit
        |
12. CI runs again
        |
13. reviewer approves
        |
14. merge to uat
        |
15. test merged UAT version
        |
16. author technical validation
        |
17. second person acceptance testing
        |
18. Release evidence review
        |
19. uat -> main PR
        |
20. Lead Developer / Project Manager approval
        |
21. main
```

---

# CI is a gate, not a suggestion

This repository runs GitHub Actions for pull requests targeting:

```text
dev
uat
main
```

CI runs:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit:gate
```

If CI fails:

```text
STOP
-> inspect the failure
-> fix the code/test/configuration
-> push again
-> wait for CI
```

Human approval does not override a failing automated gate.

Run `pnpm audit:report` to review lower-severity findings. See `docs/WORKSPACE_AND_MCP.md` for workspace naming, test placement, and the security checklist for a future local MCP server.

---

# GitHub repository settings for the instructor

See:

```text
docs/BRANCH_PROTECTION.md
```

Recommended protections:

- `dev`: PR required + status checks.
- `uat`: PR required + status checks + another developer review.
- `main`: PR required + status checks + approval by Lead Developer/Project Manager via GitHub team/CODEOWNERS or repository permissions.

---

# Definition of done

A change is complete only when:

- [ ] The acceptance criteria are satisfied.
- [ ] The author ran the code locally.
- [ ] Automated tests exist for the changed behavior.
- [ ] The review coach questioned the learner's reasoning and evidence.
- [ ] Missing tests were created/reviewed when needed.
- [ ] `pnpm verify` passes.
- [ ] The feature was merged to `dev`.
- [ ] Another developer reviewed/tested before UAT.
- [ ] That reviewer made a meaningful commit.
- [ ] CI passed after the reviewer commit.
- [ ] The merged UAT version was tested.
- [ ] The author completed technical UAT validation.
- [ ] Another developer/stakeholder completed acceptance testing.
- [ ] The release candidate received review-coach and human review.
- [ ] Manual steps, actual results, and relevant screenshots or configuration evidence are recorded.
- [ ] The `uat -> main` PR was approved by a Lead Developer or Project Manager.
- [ ] All production promotion checks passed.

---

# Reflection questions

Be ready to explain:

1. Why isn't testing your feature branch enough?
2. Why does the reviewer need to run the application instead of only reading the diff?
3. Why do we test again after merging into UAT?
4. What can AI code review catch that CI may not catch?
5. Why must a human review AI-generated tests?
6. Why should the author not be the only person validating the change?
7. What is different between approving code for UAT and approving code for production?
