import { EmptyPathError } from "@/errors/EmptyPathError";
import { getSingleCSSPaths } from "@/utils/getSingleCSSPaths";

describe("'getSingleCSSPaths' para extração de arquivos CSS do tipo 'single'", () => {
	it("deve retornar um array com os caminhos dos arquivos CSS do tipo 'single'", () => {
		const paths = ["__tests__/__fixtures__/single/components"];
		const result = getSingleCSSPaths(paths);

		expect(result).toEqual(
			expect.arrayContaining([
				"__tests__/__fixtures__/single/components/Input/styles.css",
				"__tests__/__fixtures__/single/components/Button/styles.css"
			])
		);
	});

	it("deve retornar um array vazio se não encontrar arquivos CSS do tipo 'single'", () => {
		const paths = ["__tests__/mock/modular"];
		const result = getSingleCSSPaths(paths);

		expect(result).toEqual([]);
	});

	it("deve retornar um array vazio se o path informado não existir", () => {
		const paths = ["__tests__/mock/unknown"];
		const result = getSingleCSSPaths(paths);

		expect(result).toEqual([]);
	});

	describe("EmptyPathError", () => {
		it("deve retornar um erro caso path não seja informado", () => {
			expect(() => getSingleCSSPaths([])).toThrow(EmptyPathError);
		});

		it("deve retornar um erro caso path possua uma string vazia", () => {
			expect(() => getSingleCSSPaths([""])).toThrow(EmptyPathError);
		});

		it("deve retornar um erro caso path possua um valor vazio", () => {
			expect(() => getSingleCSSPaths(["__tests__/mock/modular", ""])).toThrow(
				EmptyPathError
			);
		});
	});
});
