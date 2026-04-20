import type { NextRequest } from "next/server";

import { parseOrgAppSiteSlug } from "@/lib/app-host";
import { platformAppOrigin } from "@/lib/platform-app-origin";
import {
	isPlatformHostname,
	normalizeDomainHostname,
} from "@/lib/site-hostname";

/**
 * Keep WorkOS callbacks on the platform app, but honor the live request origin
 * for first-party platform hosts so production aliases never fall back to a
 * stale localhost env value.
 */
export function authKitRedirectUri(
	request: Pick<NextRequest, "headers" | "nextUrl">,
): string {
	const host = request.headers.get("host") ?? "";
	const normalizedHost = normalizeDomainHostname(host);
	const onOrgAppHost = parseOrgAppSiteSlug(host) != null;
	const onPlatformHost =
		normalizedHost.length > 0 && isPlatformHostname(normalizedHost);

	const callbackBase =
		onPlatformHost && !onOrgAppHost
			? request.nextUrl.origin
			: platformAppOrigin();

	return new URL("/callback", callbackBase).toString();
}
