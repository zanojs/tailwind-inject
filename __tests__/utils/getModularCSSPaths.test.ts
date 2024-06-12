import { EmptyPathError } from "@/errors/EmptyPathError";
import { getModularCSSPaths } from "@/utils/getModularCSSPaths";

describe("'getModularCSSPaths' para extração de arquivos CSS do tipo 'modular'", () => {
  it("deve retornar um array com objetos contendo os caminhos dos arquivos CSS do tipo 'modular'", () => {
    const paths = ["__tests__/__fixtures__/modular/components"];
    const result = getModularCSSPaths(paths);

    expect(result).toEqual({
      base: ["__tests__/__fixtures__/modular/components/Button/base.css"],
      components: [
        "__tests__/__fixtures__/modular/components/Input/components.css",
        "__tests__/__fixtures__/modular/components/Button/components.css",
      ],
      utilities: [
        "__tests__/__fixtures__/modular/components/Button/utilities.css",
      ],
    });
  });

  it("deve retornar um objeto cssFiles vazio se não encontrar arquivos CSS do tipo 'modular'", () => {
    const paths = ["__tests__/mock/single"];
    const result = getModularCSSPaths(paths);

    expect(result).toEqual({
      base: [],
      components: [],
      utilities: [],
    });
  });

  it("deve retornar um objeto cssFiles vazio se o path informado não existir", () => {
    const paths = ["__tests__/mock/unknown"];
    const result = getModularCSSPaths(paths);

    expect(result).toEqual({
      base: [],
      components: [],
      utilities: [],
    });
  });

  describe("com múltiplos paths", () => {
    it("deve retornar um array com objetos contendo os caminhos dos arquivos CSS do tipo 'modular'", () => {
      const paths = [
        "__tests__/__fixtures__/modular/components",
        "__tests__/__fixtures__/modular/another-components",
      ];
      const result = getModularCSSPaths(paths);

      expect(result).toEqual({
        base: ["__tests__/__fixtures__/modular/components/Button/base.css"],
        components: [
          "__tests__/__fixtures__/modular/components/Input/components.css",
          "__tests__/__fixtures__/modular/components/Button/components.css",
          "__tests__/__fixtures__/modular/another-components/Badge/components.css",
        ],
        utilities: [
          "__tests__/__fixtures__/modular/components/Button/utilities.css",
        ],
      });
    });

    it("deve retornar um objeto cssFiles vazio se não encontrar arquivos CSS do tipo 'modular'", () => {
      const paths = [
        "__tests__/__fixtures__/single/components",
        "__tests__/__fixtures__/single/another-components",
      ];
      const result = getModularCSSPaths(paths);

      expect(result).toEqual({
        base: [],
        components: [],
        utilities: [],
      });
    });

    it("deve retornar um objeto cssFiles vazio se o path informado não existir", () => {
      const paths = [
        "__tests__/__fixtures__/modular/unknown",
        "__tests__/__fixtures__/modular/another-unknown",
      ];
      const result = getModularCSSPaths(paths);

      expect(result).toEqual({
        base: [],
        components: [],
        utilities: [],
      });
    });
  });

  describe("EmptyPathError", () => {
    it("deve retornar um erro caso path não seja informado", () => {
      expect(() => getModularCSSPaths([])).toThrow(EmptyPathError);
    });

    it("deve retornar um erro caso path possua uma string vazia", () => {
      expect(() => getModularCSSPaths([""])).toThrow(EmptyPathError);
    });

    it("deve retornar um erro caso path possua um valor vazio", () => {
      expect(() =>
        getModularCSSPaths(["__tests__/__fixtures__/modular/components", ""])
      ).toThrow(EmptyPathError);
    });
  });
});
