import Image from "next/image";
import Link from "next/link";

import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	hero: HomePageContent["hero"];
};

export function HeroSection({ hero }: Props) {
	return (
		<section
			className="relative overflow-hidden border-b border-line bg-ink"
			id="top"
		>
			<Image
				alt={hero.imageAlt}
				className="object-cover opacity-90"
				fill
				priority
				sizes="100vw"
				src={hero.imageSrc}
			/>
			<div
				aria-hidden
				className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20"
			/>
			<div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-8 md:py-28">
				<div className="max-w-xl space-y-6">
					<p className="text-xs font-semibold uppercase tracking-[0.25em] text-paper/70">
						{hero.eyebrow}
					</p>
					<h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper md:text-5xl lg:text-6xl">
						{hero.title}
					</h1>
					<p className="text-lg leading-relaxed text-paper/85 md:text-xl">
						{hero.body}
					</p>
					<div className="flex flex-wrap gap-4">
						<Link
							className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-black/20 transition hover:bg-paper hover:text-ink"
							href={hero.primaryCta.href}
						>
							{hero.primaryCta.label}
						</Link>
						<Link
							className="rounded-full border border-paper/35 px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
							href={hero.secondaryCta.href}
						>
							{hero.secondaryCta.label}
						</Link>
					</div>
				</div>
				<div className="rounded-2xl border border-paper/15 bg-paper/5 p-6 backdrop-blur-sm md:max-w-sm">
					<p className="font-display text-2xl font-medium text-paper">
						“{hero.pullQuote}”
					</p>
					<p className="mt-4 text-sm text-paper/65">{hero.pullQuoteAttribution}</p>
				</div>
			</div>
		</section>
	);
}
