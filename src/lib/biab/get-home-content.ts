import { createBiabDevClient } from "@biab-dev/sdk";
import { z } from "zod";

import type { HomePageContent } from "./home-content.types";
import { loadHomePageContentFromMarkdown } from "./load-home-content-markdown";
import { normalizePackageApiBaseUrl } from "./normalize-package-api-base-url";
import { resolveSiteOriginForBiab } from "./resolve-site-origin";

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

const UUID_RE =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getHomePageContent(): Promise<HomePageContent> {
	const apiKey = process.env.BIAB_API_KEY;
	const siteId = process.env.BIAB_SITE_ID;
	const rawBaseUrl =
		process.env.BIAB_PACKAGE_API_BASE_URL ??
		process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL;

	if (!apiKey || !siteId || !rawBaseUrl) {
		if (process.env.NODE_ENV === "development") {
			console.warn(
				"[biab] Missing BIAB_API_KEY / BIAB_SITE_ID / BIAB_PACKAGE_API_BASE_URL — serving copy from content.md.",
			);
		}
		return loadHomePageContentFromMarkdown();
	}

	if (!UUID_RE.test(siteId)) {
		console.warn(
			`[biab] BIAB_SITE_ID is not a UUID (${siteId}) — Site Builder reports site ids like dd7b0e6d-bce7-4c45-a537-cd092d1de6b9. Falling back to content.md.`,
		);
		return loadHomePageContentFromMarkdown();
	}

	const baseUrl = normalizePackageApiBaseUrl(rawBaseUrl);
	const siteOrigin = resolveSiteOriginForBiab();

	try {
		const client = createBiabDevClient({
			apiKey,
			baseUrl,
			...(siteOrigin ? { siteOrigin } : {}),
		});

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
