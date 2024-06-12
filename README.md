# Tailwind Inject

O Tailwind Inject é um plugin personalizado para Tailwind CSS que permite a injeção de classes CSS de um determinado repositório diretamente no seu tema Tailwind CSS.

## Instalação

Você pode instalar o Tailwind Inject via npm:

```bash
npm install tailwind-inject --save-dev
```

ou via yarn:

```bash
yarn add tailwind-inject --dev
```

## Uso

### Configuração

Adicione o plugin ao seu arquivo de configuração do Tailwind CSS:

```ts
// tailwind.config.ts

module.exports = {
	// Outras configurações do Tailwind CSS...

	plugins: [
		require("tailwind-inject")({
			// Configurações do plugin aqui...
		})
	]
};
```

## Exemplo de Uso

Suponha que você tenha um repositório de componentes em src/components. Cada componente possui arquivos CSS separados para base, componentes e utilitários.

Você pode configurar o Tailwind Inject para buscar esses arquivos CSS e injetar as classes diretamente no seu tema Tailwind.

```ts
// tailwind.config.js

module.exports = {
	plugins: [
		require("tailwind-inject")({
			paths: ["src/components"] // Caminho para os arquivos CSS dos componentes
		})
	]
};
```

Com essa configuração, o Tailwind Inject buscará os arquivos CSS em src/components e injetará as classes no tema Tailwind CSS.

Por exemplo, vamos considerar o componente `Button`.

### Abordagem 1: Arquivo Único

Se preferir, você pode agrupar todos os estilos em um único arquivo styles.css.

```css
// src/components/Button/styles.css

@layer base {
	:root {
		--btn-primary-bg: theme(colors.green.500);
		--btn-primary-bg-hover: theme(colors.green.600);
	}

	button {
		@apply rounded-md px-4 py-2 text-white;
	}
}

@layer components {
	.btn-example {
		background-color: var(--btn-primary-bg);
		transition: background-color 0.3s;

		&:hover {
			background-color: var(--btn-primary-bg-hover);
		}
	}
}

@layer utilities {
	@responsive {
		.btn-left {
			text-align: left;
		}

		.btn-center {
			text-align: center;
		}

		.btn-right {
			text-align: right;
		}

		.btn-full {
			width: 100%;
		}

		.btn-half {
			width: 50%;
		}

		.btn-third {
			width: 33.3333%;
		}
	}
}
```

### Abordagem 2: Arquivos Separados

Você também pode separar os estilos em arquivos individuais para base, componentes e utilitários.

```css
/* src/components/Button/base.css */

:root {
	--btn-primary-bg: theme(colors.green.500);
	--btn-primary-bg-hover: theme(colors.green.600);
}

button {
	@apply rounded-md px-4 py-2 text-white;
}
```

```css
/* src/components/Button/components.css */

.btn-example {
	background-color: var(--btn-primary-bg);
	transition: background-color 0.3s;

	&:hover {
		background-color: var(--btn-primary-bg-hover);
	}
}
```

```css
/* src/components/Button/utilities.css */

@responsive {
	.btn-left {
		text-align: left;
	}

	.btn-center {
		text-align: center;
	}

	.btn-right {
		text-align: right;
	}

	.btn-full {
		width: 100%;
	}

	.btn-half {
		width: 50%;
	}

	.btn-third {
		width: 33.3333%;
	}
}
```

Você poderá usar para aplicar esses estilos da seguinte maneira:

```tsx
<!-- Usa `width: 100%` como padrão, porém usa `width: 50%` em telas médias e superiores -->
<div class="btn-full md:btn-half"></div>
```

## Opções de Configuração

O Tailwind Inject oferece as seguintes opções de configuração:

| Opção | Descrição                                                                                  |
| ----- | ------------------------------------------------------------------------------------------ |
| paths | Um array de caminhos para os arquivos CSS dos componentes. Exemplo: **['src/components']** |

<!-- | prefix | Um prefixo opcional a ser adicionado às classes injetadas. Exemplo: 'component-'.          | -->

## Informações úteis

- [Usando tailwindcss com pré-processadores](https://tailwindcss.com/docs/using-with-preprocessors)
- [Adicionando novos utilitários](https://v1.tailwindcss.com/docs/adding-new-utilities)
