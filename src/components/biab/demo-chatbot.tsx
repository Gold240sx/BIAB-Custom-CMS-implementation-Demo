"use client";

import { ChatbotInline } from "@biab-dev/sdk/react";
import { useState } from "react";

/**
 * Floating BIAB chatbot widget for the demo, rendered with the SDK's
 * in-tree `<ChatbotInline />` (not the iframe `<Chatbot />`) so the chat
 * messages, presence strip, and inline form cards all share this site's
 * Tailwind theme tokens (`bg-background`, `text-foreground`, `bg-primary`,
 * etc.) instead of being isolated in an iframe.
 *
 * The layout reads `BIAB_API_KEY` / `BIAB_PACKAGE_API_BASE_URL` server-
 * side and passes them in here. The host server still enforces the
 * basic-vs-front-desk distinction based on the org's subscription plan;
 * this component is intentionally dumb about that.
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
			<div className="pointer-events-auto flex h-[32rem] flex-col overflow-hidden rounded-2xl border border-border/30 bg-background/85 shadow-2xl backdrop-blur-md">
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
				<ChatbotInline
					apiKey={apiKey}
					baseUrl={baseUrl}
					title={null}
					welcomeMessage="Hi! I'm the assistant for this demo. How can I help?"
					classNames={{
						root: "flex-1",
						presenceStrip:
							"flex items-center justify-between gap-2 border-b border-border/30 px-3 py-1.5 text-xs",
						presenceStripOnline:
							"bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
						presenceStripAway:
							"bg-amber-500/10 text-amber-800 dark:text-amber-200",
						presenceStripOffline: "bg-muted/40 text-muted-foreground",
						presenceLabel: "truncate",
						presenceEstimate:
							"shrink-0 rounded-full bg-background/60 px-2 py-0.5 font-medium text-[0.65rem]",
						messageList: "gap-3 px-3 py-3",
						messageUser:
							"ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground text-sm",
						messageAssistant:
							"mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-border/40 bg-card/40 px-3 py-2 text-sm text-foreground",
						messagePending:
							"mr-auto max-w-[85%] rounded-2xl border border-border/40 bg-card/40 px-3 py-2 text-muted-foreground text-sm",
						formCard:
							"mr-auto w-full max-w-[90%] space-y-3 rounded-2xl rounded-bl-sm border border-border/60 bg-card/60 p-3 text-sm",
						formTitle: "font-semibold text-foreground",
						formDescription: "text-muted-foreground text-xs",
						formField: "gap-1",
						formLabel: "font-medium text-foreground text-xs",
						formInput:
							"w-full rounded-md border border-border/60 bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/40",
						formTextarea:
							"w-full rounded-md border border-border/60 bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/40",
						formSelect:
							"w-full rounded-md border border-border/60 bg-background px-2 py-1.5 text-sm",
						formSubmit:
							"w-full rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-60",
						formError: "text-destructive text-xs",
						formReceipt:
							"mr-auto max-w-[85%] rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-700 text-sm dark:text-emerald-300",
						inputBar:
							"items-center gap-2 border-t border-border/30 bg-background/40 p-2",
						inputField:
							"rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/40",
						sendButton:
							"rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-60",
						errorText: "px-3 pb-2 text-destructive text-xs",
					}}
				/>
			</div>
		</div>
	);
}
