import type {FileChange} from '@onecfg/core';
import {editorconfigFile} from '@onecfg/defaults';
import {mergeContent} from '@onecfg/utils';

export function editorconfig(): readonly FileChange<any>[] {
  return [
    mergeContent(editorconfigFile, [
      `[*]`,
      `charset = utf-8`,
      `end_of_line = lf`,
      `indent_size = 2`,
      `indent_style = space`,
      `insert_final_newline = true`,
      `trim_trailing_whitespace = true`,
    ]),
  ];
}