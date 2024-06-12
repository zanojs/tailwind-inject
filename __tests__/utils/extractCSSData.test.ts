import { extractCSSData } from "@/utils/extractCSSData";
import badgeComponents from "@/tests/__fixtures__/modular/another-components/Badge/components.json";
import buttonBase from "@/tests/__fixtures__/modular/components/Button/base.json";
import buttonComponents from "@/tests/__fixtures__/modular/components/Button/components.json";
import buttonUtilities from "@/tests/__fixtures__/modular/components/Button/utilities.json";
import inputComponents from "@/tests/__fixtures__/modular/components/Input/components.json";

describe("extractCSSData", () => {
  describe("arquivos CSS do tipo 'modular'", () => {
    it("deve retornar as estilizações CSS extraídas no formato JSON", async () => {
      const paths = ["__tests__/__fixtures__/modular/components"];
      const result = await extractCSSData({ paths });

      expect(result).toEqual({
        base: [buttonBase],
        components: [inputComponents, buttonComponents],
        utilities: [buttonUtilities],
      });
    });

    describe("com múltiplos paths", () => {
      it("deve retornar as estilizações CSS extraídas no formato JSON", async () => {
        const paths = [
          "__tests__/__fixtures__/modular/components",
          "__tests__/__fixtures__/modular/another-components",
        ];
        const result = await extractCSSData({ paths });

        expect(result).toEqual({
          base: [buttonBase],
          components: [inputComponents, buttonComponents, badgeComponents],
          utilities: [buttonUtilities],
        });
      });
    });
  });

  describe("arquivos CSS do tipo 'single'", () => {
    it("deve retornar as estilizações CSS extraídas no formato JSON", async () => {
      const paths = ["__tests__/__fixtures__/single/components"];
      const result = await extractCSSData({ paths });

      expect(result).toEqual({
        base: [buttonBase],
        components: [inputComponents, buttonComponents],
        utilities: [buttonUtilities],
      });
    });

    describe("com múltiplos paths", () => {
      it("deve retornar as estilizações CSS extraídas no formato JSON", async () => {
        const paths = [
          "__tests__/__fixtures__/single/components",
          "__tests__/__fixtures__/single/another-components",
        ];
        const result = await extractCSSData({ paths });

        expect(result).toEqual({
          base: [buttonBase],
          components: [inputComponents, buttonComponents, badgeComponents],
          utilities: [buttonUtilities],
        });
      });
    });
  });
});
