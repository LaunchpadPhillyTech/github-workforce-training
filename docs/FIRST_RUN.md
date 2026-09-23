# First Run / Instructor Setup

This downloadable demo intentionally does not ship `node_modules`.

After placing the repository on GitHub:

```bash
corepack enable
pnpm install
pnpm ci
```

Commit the generated `pnpm-lock.yaml` so subsequent CI runs can be changed to:

```yaml
pnpm install --frozen-lockfile
```

The included CI workflow uses `--no-frozen-lockfile` so the training repo can run before the first lockfile has been committed.

For a production repository, commit and enforce the lockfile.
