"use client";

import { Chatbot } from "@biab-dev/sdk/react";

/**
 * Floating BIAB chatbot widget for the demo. Reads its API key + base URL
 * from `NEXT_PUBLIC_*` env so it can talk to the host's
 * `/api/package/v1/chatbot/*` routes from the browser. The host enforces
 * the basic-vs-front-desk distinction based on the org's subscription
 * plan — this component is intentionally dumb about that.
 *
 * Renders nothing until the env is configured, so a forked demo without a
 * key won't blow up at runtime.
 */
export function DemoChatbot() {
	const apiKey = process.env.NEXT_PUBLIC_BIAB_API_KEY?.trim();
	const baseUrl = process.env.NEXT_PUBLIC_BIAB_PACKAGE_API_BASE_URL?.trim();
	if (!apiKey || !baseUrl) return null;

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
