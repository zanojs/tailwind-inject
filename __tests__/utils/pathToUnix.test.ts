import { pathToUnix } from "@/utils/pathToUnix";

const EXAMPLE_PATH = "__tests__\\mock\\single\\Button\\styles.css";
const EXAMPLE_PATH_UNIX = "__tests__/mock/single/Button/styles.css";

describe("convertPathToUnix", () => {
	describe("converter uma string de caminho para o formato UNIX", () => {
		it("deve converter um caminho de Windows para Unix", () => {
			const convertedPath = pathToUnix(EXAMPLE_PATH);

			expect(convertedPath).toBe(EXAMPLE_PATH_UNIX);
		});

		it("deve retornar o mesmo caminho se já estiver no formato Unix", () => {
			const convertedPath = pathToUnix(EXAMPLE_PATH_UNIX);

			expect(convertedPath).toBe(EXAMPLE_PATH_UNIX);
		});

		it("deve retornar o mesmo caminho se não for informado", () => {
			const convertedPath = pathToUnix("");

			expect(convertedPath).toBe("");
		});

		it("deve retornar o mesmo caminho se for informado um caminho inválido", () => {
			const convertedPath = pathToUnix("invalid-path");

			expect(convertedPath).toBe("invalid-path");
		});
	});

	describe("converter um array de strings de caminhos para o formato UNIX", () => {
		it("deve converter um array de caminhos de Windows para Unix", () => {
			const convertedPath = pathToUnix([
				EXAMPLE_PATH,
				EXAMPLE_PATH,
				EXAMPLE_PATH
			]);

			expect(convertedPath).toEqual([
				EXAMPLE_PATH_UNIX,
				EXAMPLE_PATH_UNIX,
				EXAMPLE_PATH_UNIX
			]);
		});

		it("deve retornar o mesmo array de caminhos se já estiverem no formato Unix", () => {
			const convertedPath = pathToUnix([
				EXAMPLE_PATH_UNIX,
				EXAMPLE_PATH_UNIX,
				EXAMPLE_PATH_UNIX
			]);

			expect(convertedPath).toEqual([
				EXAMPLE_PATH_UNIX,
				EXAMPLE_PATH_UNIX,
				EXAMPLE_PATH_UNIX
			]);
		});

		it("deve retornar o mesmo array de caminhos se não for informado", () => {
			const convertedPath = pathToUnix([]);

			expect(convertedPath).toEqual([]);
		});

		it("deve retornar o mesmo array de caminhos se for informado um array de caminhos inválidos", () => {
			const convertedPath = pathToUnix(["invalid-path", "invalid-path"]);

			expect(convertedPath).toEqual(["invalid-path", "invalid-path"]);
		});
	});
});
