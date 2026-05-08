"use client";

import { Chatbot } from "@biab-dev/sdk/react";
import { useState } from "react";

/**
 * Floating BIAB chatbot widget for the demo. The layout reads the API
 * key + base URL server-side and passes them in here, so a fork's
 * existing `BIAB_API_KEY` / `BIAB_PACKAGE_API_BASE_URL` env vars work
 * without duplicating them as `NEXT_PUBLIC_*`.
 *
 * The host enforces the basic-vs-front-desk distinction based on the
 * org's subscription plan — this component is intentionally dumb about
 * that.
 *
 * Renders a floating launcher button when collapsed; opens an
 * iframe-hosted chat panel with a close (×) button in its header.
 */
export function DemoChatbot({
	apiKey,
	baseUrl,
}: {
	apiKey: string;
	baseUrl: string;
}) {
	const [open, setOpen] = useState(false);

	if (!open) {
		return (
			<button
				aria-label="Open chat"
				className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-foreground text-background shadow-2xl transition-transform hover:-translate-y-0.5"
				onClick={() => setOpen(true)}
				type="button"
			>
				<svg
					aria-hidden
					className="h-6 w-6"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.75}
					viewBox="0 0 24 24"
				>
					<title>Open chat</title>
					<path d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
				</svg>
			</button>
		);
	}

	return (
		<div className="pointer-events-none fixed right-4 bottom-4 z-50 w-[min(100vw-2rem,22rem)]">
			{/* `overflow-hidden` clips the iframe inside the SDK's <Chatbot>
			    so the wrapper's rounded corners actually round the chat — without
			    it, the iframe paints square corners on top of the parent radius. */}
			<div className="pointer-events-auto flex flex-col overflow-hidden rounded-2xl border border-border/30 bg-background/85 shadow-2xl backdrop-blur-md">
				<div className="flex items-center justify-between gap-2 border-b border-border/30 bg-background/60 px-3 py-2">
					<p className="font-medium text-foreground text-sm">
						Ask us anything
					</p>
					<button
						aria-label="Close chat"
						className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
						onClick={() => setOpen(false)}
						type="button"
					>
						<svg
							aria-hidden
							className="h-3.5 w-3.5"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<title>Close chat</title>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
				<Chatbot apiKey={apiKey} baseUrl={baseUrl} title="" />
			</div>
		</div>
	);
}
