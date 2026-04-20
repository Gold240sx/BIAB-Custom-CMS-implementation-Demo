function resolveHostnameFromUrl(value: string | undefined): string | null {
	const trimmed = value?.trim();
	if (!trimmed) return null;

	try {
		return new URL(trimmed).host;
	} catch {
		return null;
	}
}

function isLoopbackHostname(hostname: string): boolean {
	const h = hostname.toLowerCase();
	return (
		h === "localhost" ||
		h === "127.0.0.1" ||
		h === "0.0.0.0" ||
		h.endsWith(".localhost")
	);
}

/** Dedup while preserving order (first win). */
function pushHostnameUnique(
	out: string[],
	hostname: string | null | undefined,
) {
	if (hostname == null) return;
	const normalized = stripHostnamePort(hostname.trim());
	if (!normalized || out.includes(normalized)) return;
	out.push(normalized);
}

/**
 * Hostnames that identify “the platform” for org-app routing (`app.{slug}.{domain}`) and
 * published-site detection. Order matters: explicit env wins; WorkOS callback URL is **not**
 * a reliable platform host (it is often localhost in dev and must not override production).
 */
function resolvePlatformDomainCandidates(): string[] {
	const out: string[] = [];

	pushHostnameUnique(out, process.env.NEXT_PUBLIC_PLATFORM_DOMAIN);
	pushHostnameUnique(
		out,
		resolveHostnameFromUrl(process.env.NEXT_PUBLIC_PLATFORM_HOME_URL),
	);
	pushHostnameUnique(out, process.env.VERCEL_PROJECT_PRODUCTION_URL);
	pushHostnameUnique(out, process.env.VERCEL_URL);

	const workosHost = resolveHostnameFromUrl(
		process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
	);
	if (workosHost) {
		const w = stripHostnamePort(workosHost);
		// Production bundles (server or browser) must not treat OAuth callback localhost as the platform.
		const skipLoopbackWorkOs =
			process.env.NODE_ENV === "production" && isLoopbackHostname(w);
		if (!skipLoopbackWorkOs) {
			pushHostnameUnique(out, w);
		}
	}

	pushHostnameUnique(out, "localhost");
	pushHostnameUnique(out, "127.0.0.1");
	pushHostnameUnique(out, "0.0.0.0");

	let result = out.length > 0 ? out : ["biab.com"];

	// Production (SSR or browser): never use loopback as the primary platform host. If nothing
	// non-loopback was inlined (set NEXT_PUBLIC_PLATFORM_DOMAIN / HOME_URL), fall back to biab.com.
	if (process.env.NODE_ENV === "production") {
		const preferred = result.filter((h) => !isLoopbackHostname(h));
		result = preferred.length > 0 ? preferred : ["biab.com"];
	}

	return result;
}

const PLATFORM_HOSTNAMES = resolvePlatformDomainCandidates();
const PRIMARY_PLATFORM_DOMAIN = PLATFORM_HOSTNAMES[0] ?? "biab.com";

export function stripHostnamePort(hostname: string): string {
	return hostname.replace(/:\d+$/, "").toLowerCase();
}

export function normalizeDomainHostname(hostname: string): string {
	return stripHostnamePort(hostname)
		.replace(/^https?:\/\//, "")
		.replace(/\/.*$/, "")
		.replace(/\.$/, "")
		.trim();
}

export function platformHostname(): string {
	return PRIMARY_PLATFORM_DOMAIN;
}

export function platformHostnames(): string[] {
	return [...PLATFORM_HOSTNAMES];
}

export function isPlatformHostname(hostname: string): boolean {
	return platformHostnames().includes(normalizeDomainHostname(hostname));
}
