import { createCustomerPortalProxyHandler } from "@biab-dev/sdk/proxy";

/**
 * Same-origin proxy that the browser-side BIAB customer-portal client calls.
 * Adds the BIAB API key + the `X-BIAB-Customer-Portal-Org` pin server-side so
 * those secrets never leave this tenant's server.
 *
 * Required env on this tenant deploy:
 *   - BIAB_PACKAGE_API_BASE_URL    e.g. https://biab.app/api/package/v1
 *   - BIAB_API_KEY                 user-bound API key with `customer_portal:self`
 *   - BIAB_CUSTOMER_PORTAL_ORG_ID  this tenant's WorkOS organization id
 */
function resolveSiteOrigin(): string | undefined {
	const explicit = process.env.BIAB_SITE_ORIGIN?.trim();
	if (explicit) return explicit;
	const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
	if (site) return site;
	const vercel = process.env.VERCEL_URL?.trim();
	if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;
	return undefined;
}

const handler = createCustomerPortalProxyHandler({
	biabBaseUrl: process.env.BIAB_PACKAGE_API_BASE_URL ?? "",
	apiKey: process.env.BIAB_API_KEY ?? "",
	workosOrganizationId: process.env.BIAB_CUSTOMER_PORTAL_ORG_ID ?? "",
	...(() => {
		const siteOrigin = resolveSiteOrigin();
		return siteOrigin ? { siteOrigin } : {};
	})(),
});

export const GET = handler;
export const POST = handler;
