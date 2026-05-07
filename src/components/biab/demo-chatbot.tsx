"use client";

import { Chatbot } from "@biab-dev/sdk/react";

/**
 * Floating BIAB chatbot widget for the demo. The layout reads the API
 * key + base URL server-side and passes them in here, so a fork's
 * existing `BIAB_API_KEY` / `BIAB_PACKAGE_API_BASE_URL` env vars work
 * without duplicating them as `NEXT_PUBLIC_*`.
 *
 * The host enforces the basic-vs-front-desk distinction based on the
 * org's subscription plan — this component is intentionally dumb about
 * that.
 */
export function DemoChatbot({
	apiKey,
	baseUrl,
}: {
	apiKey: string;
	baseUrl: string;
}) {
	return (
		<div className="pointer-events-none fixed right-4 bottom-4 z-50 w-[min(100vw-2rem,22rem)]">
			<div className="pointer-events-auto rounded-2xl border border-border/30 bg-background/85 shadow-2xl backdrop-blur-md">
				<Chatbot
					apiKey={apiKey}
					baseUrl={baseUrl}
					title="Ask us anything"
				/>
			</div>
		</div>
	);
}
