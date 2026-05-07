/**
 * Origin sent on server-to-server BIAB requests. Must match the API key's
 * Allowed Host.
 */
export function resolveSiteOriginForBiab(): string | undefined {
	const explicit = process.env.BIAB_SITE_ORIGIN?.trim();
	if (explicit) return explicit;
	const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (site) return site;
	const vercel = process.env.VERCEL_URL?.trim();
	if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;
	return process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: undefined;
}
