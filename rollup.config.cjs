import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"
import { dts } from "rollup-plugin-dts"
import packageJson from "./package.json"

export default [
	{
		input: "src/hooks/index.ts",
		output: [
			{
				file: packageJson.main.replace("index.js", "hooks.js"),
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module.replace("index.js", "hooks.js"),
				format: "es",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss({
				modules: true,
				use: ["sass"],
			}),
			terser(),
		],
	},

	{
		input: "src/utils/index.ts",
		output: [
			{
				file: packageJson.main.replace("index.js", "utils.js"),
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module.replace("index.js", "utils.js"),
				format: "es",
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss({
				modules: true,
				use: ["sass"],
			}),
			terser(),
		],
	},

	{
		input: "src/index.ts",
		output: {
			file: "./dist/index.d.ts",
			format: "es",
		},
		plugins: [dts()],
	},
]
