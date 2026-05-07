import {
	DEFAULT_AUTH_COOKIE_NAME,
	getTenantSession,
} from "@biab-dev/sdk";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { normalizePackageApiBaseUrl } from "@/lib/biab/normalize-package-api-base-url";
import { resolveSiteOriginForBiab } from "@/lib/biab/resolve-site-origin";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Account",
	description: "Profile for your session on this tenant site.",
};

export default async function AccountPage() {
	const rawBase =
		process.env.BIAB_PACKAGE_API_BASE_URL ??
		process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL;
	const apiKey = process.env.BIAB_API_KEY;

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
				<main className="mx-auto max-w-lg flex-1 px-6 py-12">
					<h1 className="font-display text-2xl font-semibold text-ink">
						Account
					</h1>
					<p className="mt-2 text-sm text-ink-muted">
						Set <code className="text-ink">BIAB_PACKAGE_API_BASE_URL</code>{" "}
						and <code className="text-ink">BIAB_API_KEY</code> to load your
						session from the platform.
					</p>
				</main>
			</div>
		);
	}

	const baseUrl = normalizePackageApiBaseUrl(rawBase);
	const siteOrigin = resolveSiteOriginForBiab();
	const cookieStore = await cookies();
	const token = cookieStore.get(DEFAULT_AUTH_COOKIE_NAME)?.value ?? null;

	const session = await getTenantSession({
		cookieValue: token,
		baseUrl,
		apiKey,
		...(siteOrigin ? { siteOrigin } : {}),
	});

	if (!session) {
		redirect(
			`/api/biab-auth/sign-in?returnTo=${encodeURIComponent("/account")}`,
		);
	}

	const { user, organizationId, role } = session;
	const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ");

	return (
		<div className="grain flex min-h-full flex-col">
			<header className="border-b border-line/80 bg-paper/90 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
					<Link
						className="font-display text-sm font-semibold text-ink transition hover:text-accent"
						href="/"
					>
						← Home
					</Link>
					<Link
						className="rounded-full border border-line bg-transparent px-3 py-1.5 text-center text-xs font-semibold text-ink transition hover:border-accent hover:text-accent"
						href="/api/biab-auth/sign-out"
					>
						Sign out
					</Link>
				</div>
			</header>
			<main className="mx-auto w-full max-w-lg flex-1 px-6 py-12">
				<h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
					Your account
				</h1>
				<p className="mt-1 text-sm text-ink-muted">
					Details from your current BIAB tenant session.
				</p>

				<section className="mt-8 rounded-2xl border border-line bg-paper-deep/40 p-5 shadow-sm">
					<dl className="space-y-4 text-sm">
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
								Name
							</dt>
							<dd className="mt-1 font-medium text-ink">
								{displayName.length > 0 ? displayName : "—"}
							</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
								Email
							</dt>
							<dd className="mt-1 text-ink">{user.email ?? "—"}</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
								Role
							</dt>
							<dd className="mt-1 text-ink">{role ?? "—"}</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
								Organization
							</dt>
							<dd className="mt-1 break-all font-mono text-xs text-ink">
								{organizationId}
							</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">
								User id
							</dt>
							<dd className="mt-1 break-all font-mono text-xs text-ink">
								{user.id}
							</dd>
						</div>
					</dl>
				</section>

				<p className="mt-8 text-sm text-ink-muted">
					Customer portal tools:{" "}
					<Link className="font-medium text-accent underline-offset-4 hover:underline" href="/customer">
						Customer portal demo
					</Link>
				</p>
			</main>
		</div>
	);
}
