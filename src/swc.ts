import type {FileChange} from '@onecfg/core';
import {swcConfigFile} from '@onecfg/defaults';
import {mergeContent} from '@onecfg/utils';

export interface SwcOptions {
  readonly target: string;
}

export function swc(options: SwcOptions): readonly FileChange<any>[] {
  const {target} = options;

  return [mergeContent(swcConfigFile, {jsc: {target}})];
}
