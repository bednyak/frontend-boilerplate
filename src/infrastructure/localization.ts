import "server-only";
import type { Locale } from "./i18n.config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types

export type Dictionary = typeof import("../dictionaries/en.json");

// A function to import a dictionary
const importDictionary = <T extends Locale>(locale: T): Promise<Dictionary> => {
	return import(`../dictionaries/${locale}.json`).then((module) => module.default);
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () => importDictionary('en'),
	ua: () => importDictionary('ua'),
	// Add more languages as needed
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
	dictionaries[locale]?.() ?? await dictionaries.en();
