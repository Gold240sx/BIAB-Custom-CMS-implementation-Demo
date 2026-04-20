import Link from "next/link";

import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	brand: HomePageContent["brand"];
	header: HomePageContent["header"];
};

export function SiteHeader({ brand, header }: Props) {
	return (
		<header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
				<Link
					className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl"
					href="#top"
				>
					{brand.name}
				</Link>
				<nav
					aria-label="Primary"
					className="hidden items-center gap-8 text-sm font-medium text-ink-muted md:flex"
				>
					{header.nav.map((item) => (
						<Link
							className="transition-colors hover:text-accent"
							href={item.href}
							key={item.href}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<details className="relative md:hidden">
					<summary className="cursor-pointer list-none rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink">
						{header.menuLabel}
					</summary>
					<div className="absolute right-0 z-50 mt-2 min-w-[12rem] rounded-xl border border-line bg-paper py-2 shadow-lg">
						{header.nav.map((item) => (
							<Link
								className="block px-4 py-2 text-sm text-ink-muted hover:bg-paper-deep hover:text-accent"
								href={item.href}
								key={item.href}
							>
								{item.label}
							</Link>
						))}
					</div>
				</details>
				<div className="flex items-center gap-3">
					<a
						className="hidden text-sm font-medium text-ink-muted underline-offset-4 hover:text-accent hover:underline sm:inline"
						href={`tel:${header.phoneTel}`}
					>
						{header.phoneDisplay}
					</a>
					<Link
						className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-sage"
						href={header.ctaHref}
					>
						{header.ctaLabel}
					</Link>
				</div>
			</div>
		</header>
	);
}
