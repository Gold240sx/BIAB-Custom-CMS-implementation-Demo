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
const handler = createCustomerPortalProxyHandler({
	biabBaseUrl: process.env.BIAB_PACKAGE_API_BASE_URL ?? "",
	apiKey: process.env.BIAB_API_KEY ?? "",
	workosOrganizationId: process.env.BIAB_CUSTOMER_PORTAL_ORG_ID ?? "",
});

export const GET = handler;
export const POST = handler;
