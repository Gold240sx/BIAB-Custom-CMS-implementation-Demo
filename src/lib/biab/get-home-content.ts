import type { HomePageContent } from "./home-content.types";
import { loadHomePageContentFromMarkdown } from "./load-home-content-markdown";

/**
 * Loads the marketing home page from **`content.md`** at the project root (first fenced `json` block),
 * unless the BIAB package API is wired below.
 *
 * **When `@biab-dev/sdk` is connected:**
 *
 * ```ts
 * import { createBiabDevClient } from "@biab-dev/sdk";
 *
 * const client = createBiabDevClient({
 *   apiKey: process.env.BIAB_API_KEY!,
 *   baseUrl:
 *     process.env.BIAB_PACKAGE_API_BASE_URL ??
 *     process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL!,
 * });
 *
 * return client.pages.getHomeContent({ siteId: process.env.BIAB_SITE_ID! });
 * ```
 *
 * Env (typical): `BIAB_API_KEY`, `BIAB_SITE_ID`, `BIAB_PACKAGE_API_BASE_URL`.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
	const apiKey = process.env.BIAB_API_KEY;
	const siteId = process.env.BIAB_SITE_ID;
	const baseUrl =
		process.env.BIAB_PACKAGE_API_BASE_URL ??
		process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL;

	void apiKey;
	void siteId;
	void baseUrl;

	// TODO: when the host exposes getHomeContent via the package API:
	// if (apiKey && siteId && baseUrl) {
	//   return fetchHomeContentFromBiabPackage({ apiKey, siteId, baseUrl });
	// }

	if (process.env.NODE_ENV === "development" && !apiKey) {
		console.warn(
			"[biab] BIAB_API_KEY not set — serving copy from content.md until the package client is wired.",
		);
	}

	return loadHomePageContentFromMarkdown();
}
