import { glob } from "glob";

import { EmptyPathError } from "@/errors/EmptyPathError";

import { pathToUnix } from "./pathToUnix";

type GetSingleCSSPathsHandler = (paths: string[]) => string[];

/**
 * Extrai os caminhos dos arquivos CSS com a estrutura de css de arquivo único ("styles.css") para cada path informado.
 * @param paths - Array de caminhos para serem vasculhados em busca de arquivos CSS. Exemplo: ["src/components"]
 * @returns Um array de strings contendo os caminhos dos arquivos CSS para cada path informado.
 */
export const getSingleCSSPaths: GetSingleCSSPathsHandler = (paths) => {
	if (!paths.length || paths.some((path) => !path)) {
		throw new EmptyPathError();
	}

	const selector = paths.map((path) => `${path}/**/styles.css`);

	const cssFiles = selector.map((path) =>
		glob.sync(path, { ignore: ["**/node_modules/**"] })
	);

	return pathToUnix(cssFiles.flat()) as string[];
};
