/**
 * Same base URL shape as {@link getHomePageContent} / `createBiabDevClient`.
 */
export function getPackageApiBaseUrl(): string {
	const raw =
		process.env.BIAB_PACKAGE_API_BASE_URL?.trim() ??
		process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL?.trim() ??
		"";
	if (!raw) return "";
	let normalized = raw.replace(/\/+$/, "");
	try {
		const url = new URL(normalized);
		const isLocal =
			url.hostname === "localhost" ||
			url.hostname === "127.0.0.1" ||
			url.hostname.endsWith(".local");
		if (url.protocol === "http:" && !isLocal) {
			url.protocol = "https:";
			normalized = url.toString().replace(/\/+$/, "");
		}
	} catch {
		/* fall through */
	}
	if (normalized && !/\/api\/package\/v\d+$/.test(normalized)) {
		normalized = `${normalized}/api/package/v1`;
	}
	return normalized;
}
