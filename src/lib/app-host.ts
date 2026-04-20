import { type NextRequest, NextResponse } from "next/server";

import {
	isPlatformHostname,
	normalizeDomainHostname,
	platformHostnames,
} from "@/lib/site-hostname";

/**
 * `app.{siteSlug}.{platformDomain}` — per-organization app / builder surface.
 * Uses the full configured platform domain as the host suffix so multi-label locals
 * like `app.acme.inovadev2.localhost` resolve to slug `acme` (not `acme.inovadev2`).
 */
export function parseOrgAppSiteSlug(host: string): string | null {
	const h = host.split(":")[0]?.toLowerCase() ?? "";
	const prefix = "app.";
	for (const base of platformHostnames()) {
		const suffix = `.${base}`;
		if (h.startsWith(prefix) && h.endsWith(suffix)) {
			const slug = h.slice(prefix.length, h.length - suffix.length);
			if (slug && !slug.includes(".")) return slug;
		}
	}

	// `app.{slug}.localhost` when platform domain is still default `biab.com` (or unset).
	const local = /^app\.([a-z0-9-]+)\.localhost$/.exec(h);
	if (local?.[1]) return local[1];

	return null;
}

const BYPASS_ORG_REWRITE_PREFIXES = [
	"/api",
	"/_next",
	"/callback",
	"/login",
	"/signup",
	"/favicon.ico",
];

function shouldBypassOrgRewrite(pathname: string): boolean {
	if (pathname.startsWith("/api/") || pathname === "/api") return true;
	return BYPASS_ORG_REWRITE_PREFIXES.some(
		(p) => pathname === p || pathname.startsWith(`${p}/`),
	);
}

/**
 * When the request hits the org app host, rewrite to the internal `org-app/[orgSlug]` tree.
 * API routes stay on their normal paths; resolve org from the `Host` header in procedures.
 */
export function getOrgAppRewrite(request: NextRequest): NextResponse | null {
	const host = request.headers.get("host") ?? "";
	const slug = parseOrgAppSiteSlug(host);
	if (!slug) return null;

	const { pathname } = request.nextUrl;
	if (shouldBypassOrgRewrite(pathname)) return null;

	const url = request.nextUrl.clone();
	url.pathname = `/org-app/${slug}${pathname}`;
	return NextResponse.rewrite(url);
}

/**
 * Any non-platform, non-preview host is treated as a published-site candidate.
 * The page layer resolves whether the hostname is connected, detached, or unknown.
 */
export function getPublishedSiteRewrite(
	request: NextRequest,
): NextResponse | null {
	const host = request.headers.get("host") ?? "";
	if (parseOrgAppSiteSlug(host)) return null;

	const normalizedHost = normalizeDomainHostname(host);
	if (!normalizedHost || isPlatformHostname(normalizedHost)) return null;

	const { pathname } = request.nextUrl;
	if (shouldBypassOrgRewrite(pathname)) return null;

	const url = request.nextUrl.clone();
	url.pathname = `/published/${encodeURIComponent(normalizedHost)}${pathname === "/" ? "" : pathname}`;
	return NextResponse.rewrite(url);
}
