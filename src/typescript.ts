import type {FileChange} from '@onecfg/core';
import {
  eslintConfigFile,
  eslintIgnoreFile,
  gitIgnoreFile,
  jestConfigFile,
  prettierIgnoreFile,
  swcConfigFile,
  typescriptConfigFile,
  vscodeSettingsFile,
} from '@onecfg/defaults';
import {mergeContent} from '@onecfg/utils';

export interface TypescriptOptions {
  readonly module: string;
  readonly declaration?: boolean;
  readonly outDir: string;
  readonly sourceMap?: boolean | 'inline';
  readonly lib: readonly string[];
  readonly target: string;
}

export function typescript(
  options: TypescriptOptions,
): readonly FileChange<any>[] {
  const {module, declaration = false, outDir, sourceMap, lib, target} = options;

  return [
    mergeContent(typescriptConfigFile, {
      compilerOptions: {
        // Type Checking
        allowUnreachableCode: false,
        allowUnusedLabels: false,
        noFallthroughCasesInSwitch: true,
        noImplicitOverride: true,
        noImplicitReturns: true,
        noUncheckedIndexedAccess: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        strict: true,

        // Modules
        module,
        moduleResolution: `node`,
        rootDir: `src`,

        // Emit
        declaration,
        importsNotUsedAsValues: `error`,
        outDir,

        ...(sourceMap === `inline`
          ? {inlineSources: true, inlineSourceMap: true}
          : sourceMap
          ? {inlineSources: true, sourceMap: true}
          : {}),

        // Interop Constraints
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        isolatedModules: true,

        // Language and Environment
        lib,
        target,
      },
      include: [`**/*.ts`, `**/*.tsx`],
    }),

    mergeContent(eslintIgnoreFile, [outDir]),
    mergeContent(gitIgnoreFile, [outDir]),
    mergeContent(prettierIgnoreFile, [outDir]),

    mergeContent(eslintConfigFile, {
      plugins: [`@typescript-eslint`],
      overrides: [
        {
          files: [`**/*.ts`, `**/*.tsx`],
          parser: `@typescript-eslint/parser`,
          parserOptions: {project: typescriptConfigFile.path},
          rules: {
            '@typescript-eslint/await-thenable': `error`,
            '@typescript-eslint/consistent-type-imports': [
              `error`,
              {prefer: `type-imports`},
            ],
            '@typescript-eslint/no-floating-promises': `error`,
            '@typescript-eslint/no-shadow': [`error`, {hoist: `all`}],
            '@typescript-eslint/promise-function-async': `error`,
            '@typescript-eslint/quotes': [`error`, `backtick`],
            '@typescript-eslint/require-await': `error`,
            'quotes': `off`,
          },
        },
      ],
    }),

    mergeContent(jestConfigFile, {transform: {'^.+\\.tsx?$': [`@swc/jest`]}}),

    mergeContent(swcConfigFile, {
      jsc: {parser: {syntax: `typescript`}},
      sourceMaps: Boolean(sourceMap),
    }),

    mergeContent(vscodeSettingsFile, {'files.exclude': {[outDir]: true}}),
  ];
}
