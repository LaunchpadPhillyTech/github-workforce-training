# Suggested GitHub Branch Protection

Use this guide when configuring the training repository in GitHub.

## `dev`

Recommended:

- Require a pull request before merging.
- Require status checks to pass.
- Require the `verify` CI job.
- Block force pushes.
- Block deletion.

## `uat`

Recommended:

- Require a pull request before merging.
- Require status checks to pass.
- Require at least one approving review from someone other than the author.
- Dismiss stale approvals when new commits are pushed.
- Require approval of the most recent reviewable push when available.
- Block force pushes.
- Block deletion.

Operational rule for this lab:

The peer reviewer must also make a meaningful code/test commit associated with the change before approving the promotion to UAT.

GitHub branch protection cannot reliably prove that a reviewer made a meaningful contribution, so this remains a team/process requirement and should be checked in the PR template.

## `main`

Recommended:

- Require a pull request before merging.
- Require status checks to pass.
- Require the `verify` CI job.
- Restrict who can push/merge to designated Lead Developers or Project Managers.
- Use CODEOWNERS or a protected GitHub team where appropriate.
- Dismiss stale approvals after new commits.
- Block force pushes.
- Block deletion.

## Promotion rule

```text
feature -> dev -> uat -> main
```

Do not bypass `uat` for normal feature work.

Do not open `uat -> main` until testing has been performed against the merged UAT version.
