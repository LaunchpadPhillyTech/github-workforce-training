# First Run / Instructor Setup

This downloadable workspace intentionally does not ship `node_modules`. The root lockfile and pnpm version are committed so local and CI checks use the same dependency graph.

After placing the repository on GitHub:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm verify
```

`pnpm verify` includes a high-and-critical dependency audit. It needs access to the package registry. Run `pnpm audit:report` to review lower-severity advisories; record relevant findings in the PR.

Use `pnpm verify` for the project checks; `pnpm ci` is a pnpm install command. The workspace allows the pinned esbuild install script explicitly, and unreviewed dependency build scripts fail installation.
