import pluginTypescript from "@rollup/plugin-typescript";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import * as path from "path";
import pkg from "./package.json";
const moduleName = pkg.name.replace(/^@.*\//, "");
const inputFileName = "index.ts";
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * Lob Typescript SDK v${pkg.version}
   */
`;

export default [
  // ESM
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: "inline",
        banner,
        exports: "named",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript({
        module: "esnext",
        target: "es2017",
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },
  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: "inline",
        banner,
        exports: "default",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },
];
