import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	process: HomePageContent["process"];
};

export function ProcessSection({ process }: Props) {
	return (
		<section
			className="border-b border-line bg-paper-deep/50 py-20 md:py-28"
			id="process"
		>
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
							{process.eyebrow}
						</p>
						<h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
							{process.title}
						</h2>
						<p className="mt-4 text-lg text-ink-muted">{process.intro}</p>
					</div>
					<ol className="space-y-8">
						{process.steps.map((s) => (
							<li className="flex gap-5" key={s.step}>
								<span className="font-display text-2xl font-semibold tabular-nums text-accent">
									{s.step}
								</span>
								<div>
									<h3 className="font-display text-xl font-semibold text-ink">
										{s.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-ink-muted">
										{s.body}
									</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
