import type {FileChange} from '@onecfg/core';
import {
  eslintIgnoreFile,
  gitIgnoreFile,
  jestConfigFile,
  prettierIgnoreFile,
} from '@onecfg/defaults';
import {mergeContent} from '@onecfg/utils';

export interface JestOptions {
  readonly collectCoverage?: boolean;
}

export function jest(options: JestOptions = {}): readonly FileChange<any>[] {
  const {collectCoverage = false} = options;

  return [
    mergeContent(jestConfigFile, {
      collectCoverage,
      coverageThreshold: {
        global: {branches: 100, functions: 100, lines: 100, statements: 100},
        restoreMocks: true,
        testMatch: [`**/src/**/*.test.{js,jsx,ts,tsx}`],
      },
    }),

    mergeContent(eslintIgnoreFile, [`coverage`]),
    mergeContent(gitIgnoreFile, [`coverage`]),
    mergeContent(prettierIgnoreFile, [`coverage`]),
  ];
}
