import type { HomePageContent } from "@/lib/biab/home-content.types";

import { ServiceIcon } from "./service-icons";

type Props = {
	services: HomePageContent["services"];
};

export function ServicesSection({ services }: Props) {
	return (
		<section className="border-b border-line bg-paper py-20 md:py-28" id="services">
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="max-w-2xl">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
						{services.eyebrow}
					</p>
					<h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
						{services.title}
					</h2>
					<p className="mt-4 text-lg text-ink-muted">{services.body}</p>
				</div>
				<ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{services.items.map((s) => (
						<li
							className="group flex flex-col rounded-2xl border border-line bg-paper-deep/40 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
							key={s.id}
						>
							<div className="text-accent transition group-hover:text-sage">
								<ServiceIcon id={s.id} />
							</div>
							<h3 className="mt-5 font-display text-xl font-semibold text-ink">
								{s.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-ink-muted">
								{s.body}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
