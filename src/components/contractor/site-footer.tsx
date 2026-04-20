import Link from "next/link";

import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	brand: HomePageContent["brand"];
	footer: HomePageContent["footer"];
};

export function SiteFooter({ brand, footer }: Props) {
	const year = new Date().getFullYear();
	const copyright = footer.copyrightTemplate
		.replace("{year}", String(year))
		.replace("{brand}", brand.name);

	return (
		<footer className="border-t border-line bg-paper-deep/60 py-12">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-8">
				<div>
					<p className="font-display text-lg font-semibold text-ink">
						{brand.name}
					</p>
					<p className="mt-1 text-sm text-ink-muted">{footer.tagline}</p>
				</div>
				<div className="flex flex-wrap gap-6 text-sm text-ink-muted">
					{footer.nav.map((item) => (
						<Link className="hover:text-accent" href={item.href} key={item.href}>
							{item.label}
						</Link>
					))}
				</div>
				<p className="text-xs text-ink-muted/80">{copyright}</p>
			</div>
		</footer>
	);
}
