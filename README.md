# @onecfg/clebert

Opinionated defaults for generating config files with
[onecfg](https://github.com/clebert/onecfg).

## Installation

```
npm install @onecfg/clebert
```

## Getting started

### Example: `onecfg.js`

```js
// @ts-check

const clebert = require('@onecfg/clebert');
const defaults = require('@onecfg/defaults');
const {onecfg} = require('onecfg');

const nodeVersion = '16';
const target = 'es2021';

onecfg(
  ...defaults.editorconfig(),
  ...defaults.eslint(),
  ...defaults.git(),
  ...defaults.jest(),
  ...defaults.node({version: nodeVersion}),
  ...defaults.npm(),
  ...defaults.prettier(),
  ...defaults.swc(),
  ...defaults.typescript(),
  ...defaults.vscode({showFilesInEditor: false}),

  ...clebert.editorconfig(),
  ...clebert.eslint({env: {[target]: true}}),
  ...clebert.github({branches: ['master'], nodeVersion}),
  ...clebert.jest({collectCoverage: true}),
  ...clebert.prettier(),
  ...clebert.swc({target}),

  ...clebert.typescript({
    module: 'CommonJS',
    declaration: true,
    outDir: 'lib',
    sourceMap: true,
    lib: [target, 'DOM'],
    target,
  }),
);
```

### Example: `package.json`

```json
{
  "scripts": {
    "compile": "tsc",
    "format": "prettier .",
    "lint": "eslint .",
    "prepare": "node onecfg.js",
    "test": "jest"
  },
  "devDependencies": {
    "@onecfg/clebert": "^1.0.1",
    "@swc/core": "^1.2.143",
    "@swc/jest": "^0.2.17",
    "@types/jest": "^27.4.0",
    "@typescript-eslint/eslint-plugin": "^5.12.0",
    "@typescript-eslint/parser": "^5.12.0",
    "eslint": "^8.9.0",
    "eslint-config-prettier": "^8.4.0",
    "eslint-plugin-import": "^2.25.4",
    "eslint-plugin-markdown": "^2.2.1",
    "jest": "^27.5.1",
    "onecfg": "^2.0.0",
    "prettier": "^2.5.1",
    "typescript": "^4.5.5"
  }
}
```
