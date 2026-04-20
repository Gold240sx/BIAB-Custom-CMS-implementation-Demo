import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

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
	return (
		<html
			lang="en"
			className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
		>
			<body className="grain min-h-full flex flex-col">{children}</body>
		</html>
	);
}
