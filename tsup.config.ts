import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: ["src/index.ts"],
		outDir: "dist",
		format: ["cjs", "esm"],
		clean: true,
		minify: true,
		treeshake: true,
		splitting: false,
		sourcemap: true
	}
]);
