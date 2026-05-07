import { createBiabDevClient } from "@biab-dev/sdk";
import Link from "next/link";

import { normalizePackageApiBaseUrl } from "@/lib/biab/normalize-package-api-base-url";
import { resolveSiteOriginForBiab } from "@/lib/biab/resolve-site-origin";

export const dynamic = "force-dynamic";

/**
 * Customer-portal demo. Calls the BIAB customer-portal API with the site API key.
 *
 * Env:
 *  - `BIAB_PACKAGE_API_BASE_URL`  e.g. https://biab.app/api/package/v1
 *  - `BIAB_API_KEY`               key with `customer_portal:self` (and usual tenant scopes)
 *  - `BIAB_CUSTOMER_PORTAL_ORG_ID`  optional — pins `X-BIAB-Customer-Portal-Org`; omit when
 *    the key’s default org is enough (common for a single-tenant site).
 */
export default async function CustomerDemoPage() {
	const rawBase =
		process.env.BIAB_PACKAGE_API_BASE_URL ??
		process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL;
	const apiKey = process.env.BIAB_API_KEY;
	const orgPin = process.env.BIAB_CUSTOMER_PORTAL_ORG_ID?.trim() || undefined;

	if (!rawBase || !apiKey) {
		return (
			<div className="grain flex min-h-full flex-col">
				<header className="border-b border-line/80 bg-paper/90 backdrop-blur-md">
					<div className="mx-auto flex max-w-6xl items-center px-5 py-4 md:px-8">
						<Link
							className="font-display text-sm font-semibold text-ink transition hover:text-accent"
							href="/"
						>
							← Home
						</Link>
					</div>
				</header>
				<main className="mx-auto max-w-2xl flex-1 px-6 py-12">
					<h1 className="font-display text-2xl font-semibold text-ink">
						Customer portal demo
					</h1>
					<p className="mt-2 text-sm text-ink-muted">
						Set <code className="text-ink">BIAB_PACKAGE_API_BASE_URL</code> and{" "}
						<code className="text-ink">BIAB_API_KEY</code> to enable this page.
						<span className="mt-2 block">
							Optional: <code className="text-ink">BIAB_CUSTOMER_PORTAL_ORG_ID</code>{" "}
							to pin a WorkOS org when your key can reach more than one org.
						</span>
					</p>
				</main>
			</div>
		);
	}

	const baseUrl = normalizePackageApiBaseUrl(rawBase);
	const siteOrigin = resolveSiteOriginForBiab();
	const client = createBiabDevClient({
		baseUrl,
		apiKey,
		...(siteOrigin ? { siteOrigin } : {}),
	});
	const portal = orgPin
		? client.customerPortal(orgPin)
		: client.customerPortal();

	let context: Awaited<ReturnType<typeof portal.context>> | null = null;
	let profile: Awaited<ReturnType<typeof portal.getProfile>> = null;
	let error: string | null = null;

	try {
		context = await portal.context();
		profile = await portal.getProfile();
	} catch (err) {
		error = err instanceof Error ? err.message : "Unknown error";
	}

	return (
		<div className="grain flex min-h-full flex-col">
			<header className="border-b border-line/80 bg-paper/90 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center px-5 py-4 md:px-8">
					<Link
						className="font-display text-sm font-semibold text-ink transition hover:text-accent"
						href="/"
					>
						← Home
					</Link>
				</div>
			</header>
			<main className="mx-auto max-w-2xl flex-1 px-6 py-12">
				<h1 className="font-display text-2xl font-semibold text-ink">
					Customer portal demo
				</h1>
				<p className="mt-2 text-sm text-ink-muted">
					{orgPin ? (
						<>
							Pinned to org <code className="text-ink">{orgPin}</code>. The SDK
							sends <code className="text-ink">X-BIAB-Customer-Portal-Org</code> on
							each request.
						</>
					) : (
						<>
							Using the org implied by your API key (no{" "}
							<code className="text-ink">BIAB_CUSTOMER_PORTAL_ORG_ID</code>). Add
							that variable if you need to lock the page to a specific WorkOS org.
						</>
					)}
				</p>

				{error ? (
					<pre className="mt-6 overflow-auto rounded-md border border-rose-200/80 bg-rose-50/90 p-3 text-sm text-rose-900">
						{error}
					</pre>
				) : null}

				{context ? (
					<section className="mt-6 rounded-2xl border border-line bg-paper-deep/40 p-4 shadow-sm">
						<h2 className="font-display font-semibold text-ink">Context</h2>
						<dl className="mt-2 grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
							<dt className="text-ink-muted">Org</dt>
							<dd className="text-ink">
								{context.organization.name ?? "(unnamed)"}
							</dd>
							<dt className="text-ink-muted">User</dt>
							<dd className="text-ink">
								{context.user.email ?? context.user.id}
							</dd>
							<dt className="text-ink-muted">Customer</dt>
							<dd className="text-ink">
								{context.isCustomer ? "Yes" : "No (staff preview)"}
							</dd>
						</dl>
					</section>
				) : null}

				<section className="mt-4 rounded-2xl border border-line bg-paper-deep/40 p-4 shadow-sm">
					<h2 className="font-display font-semibold text-ink">Profile</h2>
					<pre className="mt-2 overflow-auto rounded-md bg-paper p-3 text-xs text-ink">
						{JSON.stringify(profile, null, 2)}
					</pre>
				</section>

				<p className="mt-6 text-xs text-ink-muted">
					See <code className="text-ink/80">/customer-portal</code> in the BIAB docs
					for the full surface.
				</p>
			</main>
		</div>
	);
}
