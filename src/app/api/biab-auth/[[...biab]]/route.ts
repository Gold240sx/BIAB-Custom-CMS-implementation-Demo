import { createAuthHandler } from "@biab-dev/sdk";

import { getBiabAuthCallbackUrl } from "@/lib/biab/auth-callback-url";
import { getPackageApiBaseUrl } from "@/lib/biab/package-api-base-url";

const baseUrl = getPackageApiBaseUrl();
const apiKey = process.env.BIAB_API_KEY ?? "";

async function missing(): Promise<Response> {
	return new Response(
		"BIAB tenant auth is not configured: set BIAB_PACKAGE_API_BASE_URL (or NEXT_PUBLIC_…) and BIAB_API_KEY.",
		{ status: 503 },
	);
}

function handlerFor(request: Request) {
	if (!baseUrl || !apiKey) return null;
	// IMPORTANT: WorkOS rejects the token exchange ("Invalid code verifier" /
	// invalid_grant) if the redirect_uri sent on /authorize differs at all from
	// the one sent on /token. Prefer an env-pinned value so two requests on
	// different hostnames (canonical vs. preview vs. proxied) can't disagree.
	const callbackUrl =
		process.env.BIAB_AUTH_CALLBACK_URL?.trim() || getBiabAuthCallbackUrl(request);
	return createAuthHandler({
		baseUrl,
		apiKey,
		callbackUrl,
		defaultReturnTo: "/",
		signOutReturnTo: "/",
	});
}

export async function GET(request: Request) {
	const h = handlerFor(request);
	if (!h) return missing();
	return h.GET(request);
}

export async function POST(request: Request) {
	const h = handlerFor(request);
	if (!h) return missing();
	return h.POST(request);
}
