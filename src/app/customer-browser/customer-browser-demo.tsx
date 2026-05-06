"use client";

import { createBrowserCustomerPortalClient } from "@biab-dev/sdk/proxy";
import { useEffect, useState } from "react";

export function CustomerBrowserDemo() {
	const [data, setData] = useState<unknown>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const portal = createBrowserCustomerPortalClient({
			proxyBaseUrl: "/api/biab/customer-portal",
		});
		portal
			.context()
			.then(setData)
			.catch((e: unknown) =>
				setError(e instanceof Error ? e.message : String(e)),
			);
	}, []);

	return (
		<section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
			<h2 className="font-semibold">Context (from browser)</h2>
			{error ? (
				<pre className="mt-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
					{error}
				</pre>
			) : (
				<pre className="mt-2 overflow-auto rounded-md bg-zinc-50 p-3 text-xs">
					{data ? JSON.stringify(data, null, 2) : "Loading…"}
				</pre>
			)}
		</section>
	);
}
