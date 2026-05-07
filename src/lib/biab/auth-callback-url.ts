const AUTH_CALLBACK_PATH = "/api/biab-auth/callback";

/**
 * Public URL of `createAuthHandler`'s `/callback` route on this site.
 * Must match a redirect URI registered for the org's WorkOS integration.
 *
 * - If `BIAB_AUTH_CALLBACK_URL` is set, it wins (use in production).
 * - Else `NEXT_PUBLIC_SITE_URL` / `VERCEL_URL` when set.
 * - Else, with an incoming `Request`, uses that URL's origin (correct port on
 *   `localhost:3001`, etc.). Without `request`, falls back to `localhost:3000`.
 */
export function getBiabAuthCallbackUrl(request?: Request): string {
	const explicit = process.env.BIAB_AUTH_CALLBACK_URL?.trim();
	if (explicit) return forceHttpsUnlessLocal(explicit);
	const site =
		process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
		process.env.VERCEL_URL?.trim();
	if (site) {
		const withProto = site.startsWith("http") ? site : `https://${site}`;
		const base = forceHttpsUnlessLocal(withProto).replace(/\/$/, "");
		return `${base}${AUTH_CALLBACK_PATH}`;
	}
	if (request) {
		return forceHttpsUnlessLocal(new URL(AUTH_CALLBACK_PATH, request.url).href);
	}
	return `http://localhost:3000${AUTH_CALLBACK_PATH}`;
}

// WorkOS rejects http:// redirect URIs (except localhost). Coerce to https
// so a misconfigured env var or a request behind a proxy that drops the
// X-Forwarded-Proto header doesn't break OAuth in production.
function forceHttpsUnlessLocal(url: string): string {
	try {
		const parsed = new URL(url);
		const isLocal =
			parsed.hostname === "localhost" ||
			parsed.hostname === "127.0.0.1" ||
			parsed.hostname.endsWith(".local");
		if (!isLocal && parsed.protocol === "http:") {
			parsed.protocol = "https:";
		}
		return parsed.href;
	} catch {
		return url;
	}
}
