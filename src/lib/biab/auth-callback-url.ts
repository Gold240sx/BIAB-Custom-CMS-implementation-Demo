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
	if (explicit) return explicit;
	const site =
		process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
		process.env.VERCEL_URL?.trim();
	if (site) {
		const base = site.startsWith("http") ? site : `https://${site}`;
		return `${base.replace(/\/$/, "")}${AUTH_CALLBACK_PATH}`;
	}
	if (request) {
		return new URL(AUTH_CALLBACK_PATH, request.url).href;
	}
	return `http://localhost:3000${AUTH_CALLBACK_PATH}`;
}
