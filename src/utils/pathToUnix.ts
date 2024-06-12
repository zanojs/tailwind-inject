type PathToUnixHandler = (path: string | string[]) => string | string[];

/**
 * Converte uma string ou um array de strings de caminhos com barras invertidas para barras normais (UNIX).
 * @param {string | string[]} path - O caminho ou array de caminhos a serem convertidos.
 * @returns {string | string[]} O caminho ou array de caminhos convertidos.
 */
export const pathToUnix: PathToUnixHandler = (path) => {
	if (typeof path === "string") {
		return path.replace(/\\/g, "/");
	}

	if (Array.isArray(path)) {
		return path.map((p) => p.replace(/\\/g, "/"));
	}

	return path;
};
