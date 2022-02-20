import type {FileChange} from '@onecfg/core';
import {eslintConfigFile} from '@onecfg/defaults';
import {mergeContent} from '@onecfg/utils';

export interface EslintOptions {
  readonly env: object;
}

export function eslint(options: EslintOptions): readonly FileChange<any>[] {
  const {env} = options;

  return [
    mergeContent(eslintConfigFile, {
      plugins: [`eslint-plugin-import`, `markdown`],
      env,
      rules: {
        'complexity': `error`,
        'curly': `error`,
        'eqeqeq': [`error`, `always`, {null: `ignore`}],
        'import/no-extraneous-dependencies': `error`,
        'import/order': [
          `error`,
          {
            'alphabetize': {order: `asc`},
            'newlines-between': `never`,
            'warnOnUnassignedImports': true,
          },
        ],
        'no-shadow': `error`,
        'object-shorthand': `error`,
        'prefer-const': `error`,
        'quotes': [`error`, `backtick`],
        'sort-imports': [
          `error`,
          {ignoreDeclarationSort: true, ignoreMemberSort: false},
        ],
      },
      overrides: [
        {files: [`**/*.md`], processor: `markdown/markdown`},
        {files: [`**/*.md/*.js`], rules: {quotes: [`error`, `single`]}},
      ],
    }),
  ];
}
