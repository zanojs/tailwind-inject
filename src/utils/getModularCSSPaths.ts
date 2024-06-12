import { glob } from "glob";

import { EmptyPathError } from "@/errors/EmptyPathError";

import { pathToUnix } from "./pathToUnix";

export type ModularCSSType = {
	base: string[];
	components: string[];
	utilities: string[];
};

type GetModularCSSPathsHandler = (paths: string[]) => ModularCSSType;

/**
 * Extrai os caminhos dos arquivos CSS com a estrutura de css de arquivo único ("styles.css") para cada path informado.
 * @param paths - Array de caminhos para serem vasculhados em busca de arquivos CSS. Exemplo: ["src/components"]
 * @returns Um array de array de string contendo os caminhos dos arquivos CSS para cada path informado.
 */
export const getModularCSSPaths: GetModularCSSPathsHandler = (paths) => {
	if (!paths.length || paths.some((path) => !path)) {
		throw new EmptyPathError();
	}

	const selectors = paths.map((path) => ({
		base: `${path}/**/base.css`,
		components: `${path}/**/components.css`,
		utilities: `${path}/**/utilities.css`
	}));

	const cssFiles: ModularCSSType[] = selectors.map((path) => {
		const base = pathToUnix(glob.sync(path.base)) as string[];

		const components = pathToUnix(glob.sync(path.components)) as string[];

		const utilities = pathToUnix(glob.sync(path.utilities)) as string[];

		return {
			base,
			components,
			utilities
		};
	});

	const result: ModularCSSType = cssFiles.reduce(
		(acc, curr) => {
			return {
				base: [...acc.base, ...curr.base],
				components: [...acc.components, ...curr.components],
				utilities: [...acc.utilities, ...curr.utilities]
			};
		},
		{
			base: [],
			components: [],
			utilities: []
		}
	);

	return result;
};
