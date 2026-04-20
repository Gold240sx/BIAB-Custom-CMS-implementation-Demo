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
/**
 * Normalize the configured base URL:
 *
 * 1. Force `https://` for non-local hosts. Production redirects HTTP→HTTPS
 *    and `fetch` drops the `Authorization: Bearer …` header on cross-scheme
 *    redirects per the WHATWG fetch spec.
 * 2. Make sure the URL ends in `/api/package/v1` so site-scoped paths from the
 *    SDK are appended correctly. Some SDK versions (≤ 0.2.0) silently drop the
 *    base URL's pathname when the relative path starts with `/`, so we guard
 *    here regardless of which SDK is installed.
 *
 * Localhost (`localhost`, `127.0.0.1`, `*.local`) is left as HTTP.
 */
function normalizeBaseUrl(rawBaseUrl: string): string {
	const trimmed = rawBaseUrl.trim().replace(/\/+$/, "");
	let normalized = trimmed;
	try {
		const url = new URL(trimmed);
		const isLocal =
			url.hostname === "localhost" ||
			url.hostname === "127.0.0.1" ||
			url.hostname.endsWith(".local");
		if (url.protocol === "http:" && !isLocal) {
			console.warn(
				`[biab] BIAB_PACKAGE_API_BASE_URL was set to http:// (${trimmed}). Auto-upgrading to https:// — production hosts redirect HTTP→HTTPS and that drops the Authorization header. Update the env var to remove this warning.`,
			);
			url.protocol = "https:";
			normalized = url.toString().replace(/\/+$/, "");
		}
	} catch {
		// Fall through and let the SDK surface the parse error in context.
	}

	if (!/\/api\/package\/v\d+$/.test(normalized)) {
		console.warn(
			`[biab] BIAB_PACKAGE_API_BASE_URL did not end with \`/api/package/v1\` (${normalized}). Auto-appending so the site-scoped paths resolve correctly. Update the env var to remove this warning.`,
		);
		normalized = `${normalized}/api/package/v1`;
	}

	return normalized;
}

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

	const baseUrl = normalizeBaseUrl(rawBaseUrl);

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
