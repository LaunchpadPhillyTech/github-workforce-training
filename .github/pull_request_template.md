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
- [ ] New/changed behavior has automated tests.

## AI review
- [ ] Claude Code `ai-code-review` skill was run.
- [ ] Findings were addressed or documented.
- [ ] If tests were missing, the `create-tests` skill was run and generated tests were reviewed by a developer.

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
- [ ] Author completed technical UAT validation.
- [ ] Another developer or stakeholder completed acceptance testing.
- [ ] AI review is complete.
- [ ] CI passes on UAT.
- [ ] Approval requested from Lead Developer or Project Manager.
