// @ts-check

const defaults = require(`@onecfg/defaults`);
const {onecfg} = require(`onecfg`);
const clebert = require(`./lib/index`);
const nodeVersion = `16`;

onecfg(
  ...defaults.editorconfig(),
  ...defaults.eslint(),
  ...defaults.git(),
  ...defaults.node({version: nodeVersion}),
  ...defaults.npm(),
  ...defaults.prettier(),
  ...defaults.typescript(),
  ...defaults.vscode({showFilesInEditor: false}),

  ...clebert.editorconfig(),
  ...clebert.eslint({env: {es2021: true}}),
  ...clebert.github({nodeVersion}),
  ...clebert.prettier(),

  ...clebert.typescript({
    module: `CommonJS`,
    declaration: true,
    outDir: `lib`,
    sourceMap: true,
    lib: [`ES2021`, `DOM`],
    target: `ES2021`,
  }),
);
