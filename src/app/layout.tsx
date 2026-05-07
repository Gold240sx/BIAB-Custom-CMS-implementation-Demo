import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

import { AppConfig } from "@/AppConfig";
import { DemoChatbot } from "@/components/biab/demo-chatbot";
import { getPackageApiBaseUrl } from "@/lib/biab/package-api-base-url";

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
	display: "swap",
});

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	display: "swap",
});

/** Fallback for routes without their own `generateMetadata` (home overrides via `page.tsx`). */
export const metadata: Metadata = {
	title: "BIAB custom demo",
	description: "Placeholder — home page sets title/description from BIAB content.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Read the BIAB credentials server-side and pass them down to the
	// chatbot component. The widget needs them client-side, but pulling
	// from the layout (rather than `NEXT_PUBLIC_*`) lets the demo reuse
	// its existing server env without duplicating keys. The values still
	// land in the rendered HTML — same effective scope as a public env.
	const apiKey = process.env.BIAB_API_KEY?.trim() ?? "";
	const baseUrl = getPackageApiBaseUrl();
	const chatbotReady = AppConfig.chatbot && apiKey.length > 0 && baseUrl.length > 0;

	return (
		<html
			lang="en"
			className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
		>
			<body className="grain min-h-full flex flex-col">
				{children}
				{chatbotReady ? (
					<DemoChatbot apiKey={apiKey} baseUrl={baseUrl} />
				) : null}
			</body>
		</html>
	);
}
