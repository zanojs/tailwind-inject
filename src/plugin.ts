import plugin from "tailwindcss/plugin";

import { extractCSSData } from "./utils/extractCSSData";

type PluginConfigType = {
	paths: string[];
};

type PluginHandler = (config: PluginConfigType) => ReturnType<typeof plugin>;

const thisPlugin: PluginHandler = ({ paths }) =>
	plugin(({ addBase, addComponents, addUtilities }) => {
		extractCSSData({ paths }).then((styles) => {
			for (const style of styles.base) {
				addBase(style);
			}

			for (const style of styles.components) {
				addComponents(style);
			}

			for (const style of styles.utilities) {
				addUtilities(style);
			}
		});
	});

export default thisPlugin;
