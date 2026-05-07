"use client";

import { SignIn, SignOut, useUser } from "@biab-dev/sdk/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

function SiteHeaderAuthInner() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const returnTo = useMemo(() => {
		const qs = searchParams.toString();
		const path = `${pathname}${qs ? `?${qs}` : ""}`;
		return path.length > 0 ? path : "/";
	}, [pathname, searchParams]);

	const auth = useUser();

	if (auth.status === "loading") {
		return (
			<span
				aria-hidden
				className="inline-block h-9 w-[5.25rem] rounded-full bg-paper-deep/90"
			/>
		);
	}

	if (auth.status === "signed-in") {
		const email = auth.user.user.email;
		const nameFromParts = [auth.user.user.firstName, auth.user.user.lastName]
			.filter(Boolean)
			.join(" ");
		const label = email ?? (nameFromParts.length > 0 ? nameFromParts : "Account");
		return (
			<span className="flex max-w-[min(100%,14rem)] items-center gap-2 sm:max-w-none">
				<Link
					className="truncate text-sm text-ink-muted transition hover:text-accent"
					href="/account"
					title={email ?? undefined}
				>
					{label}
				</Link>
				<SignOut className="rounded-full border border-line bg-transparent px-3 py-1.5 text-center text-xs font-semibold text-ink transition hover:border-accent hover:text-accent">
					Sign out
				</SignOut>
			</span>
		);
	}

	return (
		<SignIn
			returnTo={returnTo}
			className="rounded-full border border-line bg-transparent px-4 py-2 text-center text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
		>
			Log in
		</SignIn>
	);
}

export function SiteHeaderAuth() {
	return (
		<Suspense
			fallback={
				<span
					aria-hidden
					className="inline-block h-9 w-[5.25rem] rounded-full bg-paper-deep/90"
				/>
			}
		>
			<SiteHeaderAuthInner />
		</Suspense>
	);
}
