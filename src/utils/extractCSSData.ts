import fs from "fs";
import postcss from "postcss";
import postcssJs from "postcss-js";
import postcssNested from "postcss-nested";

import { getModularCSSPaths } from "./getModularCSSPaths";
import { getSingleCSSPaths } from "./getSingleCSSPaths";

type SingleCSSData = {
	[key in "@layer base" | "@layer components" | "@layer utilities"]: string;
};

type CSSDataPieceType = {
	[key: string]: {
		[key: string]: string;
	};
};

type CSSDataType = {
	base: Array<CSSDataPieceType>;
	components: Array<CSSDataPieceType>;
	utilities: Array<CSSDataPieceType>;
};

type ExtractCSSDataHandler = (config: {
	paths: string[];
}) => Promise<CSSDataType>;

/**
 * Extrai dados CSS de arquivos em uma determinada estrutura de diretórios
 * e retorna um objeto JSON usando PostCSS.
 * @param paths - Array de caminhos para os arquivos CSS. Exemplo: ["src/components"]
 * @returns Um objeto JSON contendo os dados CSS dos arquivos.
 */
export const extractCSSData: ExtractCSSDataHandler = async ({ paths }) => {
	const singleCSSPaths = getSingleCSSPaths(paths);
	const modularCSSPaths = getModularCSSPaths(paths);

	const cssData: CSSDataType = {
		base: [],
		components: [],
		utilities: []
	};

	for (const path of singleCSSPaths) {
		const cssContent = fs.readFileSync(path, "utf-8");

		try {
			const json = await postcss([postcssNested])
				// @ts-ignore
				.process(cssContent, { from: path })
				.then((result) => {
					const root = postcss.parse(result.css);

					return postcssJs.objectify(root) as SingleCSSData;
				});

			if (json["@layer base"]) {
				cssData.base.push(json["@layer base"] as unknown as CSSDataPieceType);
			}

			if (json["@layer components"]) {
				cssData.components.push(
					json["@layer components"] as unknown as CSSDataPieceType
				);
			}

			if (json["@layer utilities"]) {
				cssData.utilities.push(
					json["@layer utilities"] as unknown as CSSDataPieceType
				);
			}
		} catch (error) {
			console.error("Falha ao processar o arquivo CSS", { path, error });
		}
	}

	for (const path of modularCSSPaths.base) {
		const cssContent = fs.readFileSync(path, "utf-8");

		try {
			const json = await postcss([postcssNested])
				// @ts-ignore
				.process(cssContent, { from: path })
				.then((result) => {
					const root = postcss.parse(result.css);

					return postcssJs.objectify(root) as SingleCSSData;
				});

			cssData.base.push(json as unknown as CSSDataPieceType);
		} catch (error) {
			console.error("Falha ao processar o arquivo CSS", { path, error });
		}
	}

	for (const path of modularCSSPaths.components) {
		const cssContent = fs.readFileSync(path, "utf-8");

		try {
			const json = await postcss([postcssNested])
				// @ts-ignore
				.process(cssContent, { from: path })
				.then((result) => {
					const root = postcss.parse(result.css);

					return postcssJs.objectify(root) as SingleCSSData;
				});

			cssData.components.push(json as unknown as CSSDataPieceType);
		} catch (error) {
			console.error("Falha ao processar o arquivo CSS", { path, error });
		}
	}

	for (const path of modularCSSPaths.utilities) {
		const cssContent = fs.readFileSync(path, "utf-8");

		try {
			const json = await postcss([postcssNested])
				// @ts-ignore
				.process(cssContent, { from: path })
				.then((result) => {
					const root = postcss.parse(result.css);

					return postcssJs.objectify(root) as SingleCSSData;
				});

			cssData.utilities.push(json as unknown as CSSDataPieceType);
		} catch (error) {
			console.error("Falha ao processar o arquivo CSS", { path, error });
		}
	}

	return cssData;
};
