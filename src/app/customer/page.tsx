import { createBiabDevClient } from "@biab-dev/sdk";

export const dynamic = "force-dynamic";

/**
 * Customer-portal demo. Shows how a tenant site (e.g. dominoes.example) calls
 * the BIAB customer-portal SDK pinned to one organization.
 *
 * Env:
 *  - `BIAB_PACKAGE_API_BASE_URL`  e.g. https://biab.app/api/package/v1
 *  - `BIAB_API_KEY`               user-bound API key with `customer_portal:self` scope
 *  - `BIAB_CUSTOMER_PORTAL_ORG_ID`  the WorkOS organization id this site belongs to
 *
 * Note: the SDK pins every request to the org id you pass — the platform
 * rejects access to any other org so this page can never accidentally surface
 * data from a different tenant.
 */
export default async function CustomerDemoPage() {
	const baseUrl = process.env.BIAB_PACKAGE_API_BASE_URL;
	const apiKey = process.env.BIAB_API_KEY;
	const orgId = process.env.BIAB_CUSTOMER_PORTAL_ORG_ID;

	if (!baseUrl || !apiKey || !orgId) {
		return (
			<main className="mx-auto max-w-2xl px-6 py-12">
				<h1 className="text-2xl font-semibold">Customer portal demo</h1>
				<p className="mt-2 text-sm text-zinc-600">
					Set <code>BIAB_PACKAGE_API_BASE_URL</code>,{" "}
					<code>BIAB_API_KEY</code>, and{" "}
					<code>BIAB_CUSTOMER_PORTAL_ORG_ID</code> to enable this page.
				</p>
			</main>
		);
	}

	const client = createBiabDevClient({ baseUrl, apiKey });
	const portal = client.customerPortal(orgId);

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
		<main className="mx-auto max-w-2xl px-6 py-12">
			<h1 className="text-2xl font-semibold">Customer portal demo</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Pinned to org <code>{orgId}</code>. The SDK sends{" "}
				<code>X-BIAB-Customer-Portal-Org</code> on every request, and the BIAB
				platform rejects access to any other organization.
			</p>

			{error ? (
				<pre className="mt-6 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
					{error}
				</pre>
			) : null}

			{context ? (
				<section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
					<h2 className="font-semibold">Context</h2>
					<dl className="mt-2 grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
						<dt className="text-zinc-500">Org</dt>
						<dd>{context.organization.name ?? "(unnamed)"}</dd>
						<dt className="text-zinc-500">User</dt>
						<dd>{context.user.email ?? context.user.id}</dd>
						<dt className="text-zinc-500">Customer</dt>
						<dd>{context.isCustomer ? "Yes" : "No (staff preview)"}</dd>
					</dl>
				</section>
			) : null}

			<section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4">
				<h2 className="font-semibold">Profile</h2>
				<pre className="mt-2 overflow-auto rounded-md bg-zinc-50 p-3 text-xs">
					{JSON.stringify(profile, null, 2)}
				</pre>
			</section>

			<p className="mt-6 text-xs text-zinc-500">
				See <code>/customer-portal</code> in the docs for the full surface.
			</p>
		</main>
	);
}
