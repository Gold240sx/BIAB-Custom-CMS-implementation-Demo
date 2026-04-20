import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	testimonials: HomePageContent["testimonials"];
};

export function TestimonialsSection({ testimonials }: Props) {
	return (
		<section className="border-b border-line bg-ink py-20 text-paper md:py-28">
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">
					{testimonials.eyebrow}
				</p>
				<h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
					{testimonials.title}
				</h2>
				<div className="mt-12 grid gap-8 md:grid-cols-2">
					{testimonials.items.map((q) => (
						<blockquote
							className="rounded-2xl border border-paper/15 bg-paper/5 p-8"
							key={`${q.name}-${q.place}`}
						>
							<p className="font-display text-xl font-medium leading-relaxed text-paper">
								“{q.quote}”
							</p>
							<footer className="mt-6 text-sm text-paper/60">
								<span className="font-semibold text-paper/85">{q.name}</span>
								<span className="text-paper/50"> · {q.place}</span>
							</footer>
						</blockquote>
					))}
				</div>
			</div>
		</section>
	);
}
