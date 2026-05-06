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
	return createAuthHandler({
		baseUrl,
		apiKey,
		callbackUrl: getBiabAuthCallbackUrl(request),
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
