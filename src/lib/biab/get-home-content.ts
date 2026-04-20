import { createBiabDevClient } from "@biab-dev/sdk";
import { z } from "zod";

import type { HomePageContent } from "./home-content.types";
import { loadHomePageContentFromMarkdown } from "./load-home-content-markdown";

/**
 * Fetches the marketing home page payload from the BIAB host's package API and
 * falls back to `content.md` when the env is not configured or the host has
 * not published a `home` row yet.
 *
 * Env (set in the Site Builder → Developer panel):
 *  - `BIAB_API_KEY`              the bearer token (one-time reveal)
 *  - `BIAB_SITE_ID`              the host site UUID
 *  - `BIAB_PACKAGE_API_BASE_URL` e.g. `https://your-host.tld/api/package/v1`
 *
 * `NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL` is also accepted so the value can be
 * shared with client code if needed.
 *
 * Uses the SDK's low-level `request()` so this works against `@biab-dev/sdk`
 * 0.1.x as well as the typed `marketingPages.get()` helper added in 0.2.x.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
	const apiKey = process.env.BIAB_API_KEY;
	const siteId = process.env.BIAB_SITE_ID;
	const baseUrl =
		process.env.BIAB_PACKAGE_API_BASE_URL ??
		process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL;

	if (!apiKey || !siteId || !baseUrl) {
		if (process.env.NODE_ENV === "development") {
			console.warn(
				"[biab] Missing BIAB_API_KEY / BIAB_SITE_ID / BIAB_PACKAGE_API_BASE_URL — serving copy from content.md.",
			);
		}
		return loadHomePageContentFromMarkdown();
	}

	try {
		const client = createBiabDevClient({ apiKey, baseUrl });

		const response = await client.request({
			path: `sites/${encodeURIComponent(siteId)}/marketing-pages/home`,
			responseSchema: z.object({
				page: z
					.object({
						siteId: z.string(),
						pageKey: z.string(),
						payload: z.unknown(),
						updatedAt: z.string(),
					})
					.nullable(),
			}),
		});

		if (!response.page) {
			console.warn(
				`[biab] Host has no \`home\` marketing page for site ${siteId} yet — serving copy from content.md. Publish it from Site Builder to override.`,
			);
			return loadHomePageContentFromMarkdown();
		}

		return response.page.payload as HomePageContent;
	} catch (error) {
		console.error(
			"[biab] Failed to load marketing page from host package API — falling back to content.md.",
			error,
		);
		return loadHomePageContentFromMarkdown();
	}
}
