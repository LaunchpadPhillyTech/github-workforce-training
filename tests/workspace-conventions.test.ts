import { existsSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));
const workspaceGroups = ['apps', 'packages', 'servers'];
const ignoredDirectories = new Set(['node_modules', 'dist', 'coverage', '.git']);
const testFile = /\.(?:test|spec)\.[cm]?[jt]sx?$/;
const sourceFile = /\.[cm]?[jt]sx?$/;

function filesUnder(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory())
      return ignoredDirectories.has(entry.name) ? [] : filesUnder(path);
    return entry.isFile() ? [path] : [];
  });
}

function workspacePackages(): string[] {
  return workspaceGroups.flatMap((group) => {
    const directory = join(root, group);
    if (!existsSync(directory)) return [];
    return readdirSync(directory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(directory, entry.name))
      .filter((path) => existsSync(join(path, 'package.json')));
  });
}

describe('workspace test conventions', () => {
  it('gives every workspace directory a package manifest', () => {
    const missingManifests = workspaceGroups.flatMap((group) => {
      const directory = join(root, group);
      if (!existsSync(directory)) return [];
      return readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(directory, entry.name))
        .filter((path) => !existsSync(join(path, 'package.json')))
        .map((path) => relative(root, path));
    });

    expect(missingManifests).toEqual([]);
  });

  it('keeps tests in tests or __tests__ folders', () => {
    const misplaced = workspacePackages().flatMap((directory) =>
      filesUnder(directory)
        .filter((path) => testFile.test(path))
        .filter((path) => {
          const parts = relative(directory, path).split(sep);
          return !parts.includes('tests') && !parts.includes('__tests__');
        })
        .map((path) => relative(root, path))
    );

    expect(misplaced).toEqual([]);
  });

  it('requires tests for every workspace package with source code', () => {
    const untested = workspacePackages()
      .filter((directory) =>
        filesUnder(join(directory, 'src')).some(
          (path) => sourceFile.test(path) && !path.endsWith('.d.ts')
        )
      )
      .filter(
        (directory) => !filesUnder(directory).some((path) => testFile.test(path))
      )
      .map((directory) => relative(root, directory));

    expect(untested).toEqual([]);
  });
});
