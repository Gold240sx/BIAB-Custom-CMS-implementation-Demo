import Image from "next/image";

import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	work: HomePageContent["work"];
};

export function WorkSection({ work }: Props) {
	return (
		<section className="border-b border-line bg-paper py-20 md:py-28" id="work">
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div className="max-w-xl">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
							{work.eyebrow}
						</p>
						<h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
							{work.title}
						</h2>
					</div>
					<p className="max-w-md text-ink-muted md:text-right">{work.aside}</p>
				</div>
				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{work.images.map((shot) => (
						<figure
							className="group overflow-hidden rounded-2xl border border-line bg-paper-deep/30 shadow-sm"
							key={shot.src}
						>
							<div className="relative aspect-[4/5] overflow-hidden">
								<Image
									alt={shot.alt}
									className="object-cover transition duration-500 group-hover:scale-[1.03]"
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									src={shot.src}
								/>
							</div>
							<figcaption className="border-t border-line px-4 py-3 text-sm text-ink-muted">
								{shot.caption}
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
