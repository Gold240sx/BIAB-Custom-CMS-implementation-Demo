import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { HomePageContent } from "./home-content.types";

/** First fenced `json` code block in `content.md` (project root). */
const JSON_FENCE_RE = /```json\s*([\s\S]*?)```/;

/**
 * Parses the canonical `HomePageContent` JSON embedded in `content.md`.
 * The file must live at the project root next to `package.json`.
 */
export function loadHomePageContentFromMarkdown(): HomePageContent {
	const filePath = join(process.cwd(), "content.md");
	let raw: string;
	try {
		raw = readFileSync(filePath, "utf8");
	} catch (e) {
		throw new Error(
			`Could not read content.md at ${filePath}. Add the file or fix the working directory.`,
			{ cause: e },
		);
	}

	const match = raw.match(JSON_FENCE_RE);
	if (!match) {
		throw new Error(
			"content.md must include a fenced ```json … ``` block with the full HomePageContent object.",
		);
	}

	try {
		return JSON.parse(match[1].trim()) as HomePageContent;
	} catch (e) {
		throw new Error("Invalid JSON inside content.md fenced block.", { cause: e });
	}
}
