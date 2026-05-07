/**
 * Normalize the configured package API base URL for server-side BIAB clients.
 *
 * 1. Force `https://` for non-local hosts (fetch drops Authorization on HTTP→HTTPS redirects).
 * 2. Ensure the path ends with `/api/package/v1` so SDK paths append correctly.
 */
export function normalizePackageApiBaseUrl(rawBaseUrl: string): string {
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
