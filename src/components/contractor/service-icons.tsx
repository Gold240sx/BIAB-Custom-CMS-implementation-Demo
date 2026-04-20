import type { ReactNode } from "react";

import type { ServiceId } from "@/lib/biab/home-content.types";

const icons: Record<ServiceId, ReactNode> = {
	kitchens: (
		<svg aria-hidden className="h-8 w-8" fill="none" viewBox="0 0 32 32">
			<path
				d="M4 14h24v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V14Z"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M4 14V10a2 2 0 0 1 2-2h4v6"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path d="M14 8h14v6" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	),
	baths: (
		<svg aria-hidden className="h-8 w-8" fill="none" viewBox="0 0 32 32">
			<path
				d="M6 22h20v4H6v-4ZM8 10h16v8H8V10Z"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path d="M10 6h12v4H10V6Z" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	),
	additions: (
		<svg aria-hidden className="h-8 w-8" fill="none" viewBox="0 0 32 32">
			<path
				d="M6 26h20M10 26V12l6-4 6 4v14"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
			<path d="M14 18h4v8h-4v-8Z" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	),
	wholeHome: (
		<svg aria-hidden className="h-8 w-8" fill="none" viewBox="0 0 32 32">
			<path
				d="M6 14 16 6l10 8v14H6V14Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
			<path d="M12 26v-8h8v8" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	),
};

export function ServiceIcon({ id }: { id: ServiceId }) {
	return icons[id];
}
