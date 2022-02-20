import type {FileChange} from '@onecfg/core';
import {eslintConfigFile, prettierConfigFile} from '@onecfg/defaults';
import {mergeContent} from '@onecfg/utils';

export function prettier(): readonly FileChange<any>[] {
  return [
    mergeContent(prettierConfigFile, {
      bracketSpacing: false,
      printWidth: 80,
      proseWrap: `always`,
      quoteProps: `consistent`,
      singleQuote: true,
      trailingComma: `all`,
    }),

    mergeContent(eslintConfigFile, {extends: [`prettier`]}),
  ];
}
