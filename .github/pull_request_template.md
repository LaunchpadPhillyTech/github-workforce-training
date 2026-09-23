## Change summary
Describe what changed and why.

## Acceptance criteria
- [ ] The requested behavior is implemented.
- [ ] Edge cases are covered.

## Automated checks
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm audit:gate` (high and critical gate)
- [ ] Lower-severity findings from `pnpm audit:report` were reviewed and noted below.
- [ ] New/changed behavior has automated tests.

## Question-led review
- [ ] Claude Code `review-coach` asked about requirements, boundaries, tests, structure, and security.
- [ ] The author answered the questions and addressed or documented evidence gaps.
- [ ] The author designed missing cases before using any test-generation help.

## Manual and configuration evidence
Tested commit SHA and environment:

| Step or configuration checked | Expected result | Actual result | Screenshot or evidence link (when relevant) |
| --- | --- | --- | --- |
| | | | |

Security and dependency findings, including lower-severity advisories:

<!-- Attach screenshots only for visual or configuration claims. Redact secrets and personal data. CLI-only changes can use reproducible steps and output. -->

## Promotion gate
### feature -> dev
- [ ] Author completed local validation.

### dev -> uat
- [ ] A developer other than the author reviewed and tested the PR.
- [ ] The reviewer made and pushed a meaningful commit to the PR branch.
- [ ] Reviewer verified acceptance criteria.
- [ ] CI passes.

### uat -> main
- [ ] The merged UAT version was tested in the UAT environment.
- [ ] Manual steps, observed results, and relevant screenshots or configuration evidence are attached for the tested UAT commit.
- [ ] Author completed technical UAT validation.
- [ ] Another developer or stakeholder completed acceptance testing.
- [ ] Question-led review and human acceptance review are complete.
- [ ] CI passes on UAT.
- [ ] Approval requested from Lead Developer or Project Manager.
