import type { HomePageContent } from "@/lib/biab/home-content.types";

type Props = {
	contact: HomePageContent["contact"];
};

export function CtaSection({ contact }: Props) {
	return (
		<section className="bg-paper py-20 md:py-28" id="contact">
			<div className="mx-auto max-w-6xl px-5 md:px-8">
				<div className="grid gap-10 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-paper-deep to-paper shadow-lg md:grid-cols-2">
					<div className="flex flex-col justify-center p-8 md:p-12">
						<h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
							{contact.title}
						</h2>
						<p className="mt-4 text-lg text-ink-muted">{contact.body}</p>
						<dl className="mt-8 space-y-3 text-sm">
							<div className="flex gap-3">
								<dt className="w-24 shrink-0 font-semibold text-ink">
									{contact.phoneLabel}
								</dt>
								<dd>
									<a
										className="text-accent underline-offset-4 hover:underline"
										href={`tel:${contact.phoneTel}`}
									>
										{contact.phoneDisplay}
									</a>
								</dd>
							</div>
							<div className="flex gap-3">
								<dt className="w-24 shrink-0 font-semibold text-ink">
									{contact.emailLabel}
								</dt>
								<dd>
									<a
										className="text-accent underline-offset-4 hover:underline"
										href={`mailto:${contact.emailMailto}`}
									>
										{contact.emailDisplay}
									</a>
								</dd>
							</div>
							<div className="flex gap-3">
								<dt className="w-24 shrink-0 font-semibold text-ink">
									{contact.hoursLabel}
								</dt>
								<dd className="text-ink-muted">{contact.hours}</dd>
							</div>
						</dl>
					</div>
					<form
						action="#"
						className="flex flex-col gap-4 border-t border-line bg-paper/80 p-8 md:border-l md:border-t-0 md:p-12"
						method="post"
					>
						<div>
							<label
								className="text-xs font-semibold uppercase tracking-wide text-ink-muted"
								htmlFor="name"
							>
								{contact.form.nameLabel}
							</label>
							<input
								className="mt-1 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2"
								id="name"
								name="name"
								placeholder={contact.form.namePlaceholder}
								type="text"
							/>
						</div>
						<div>
							<label
								className="text-xs font-semibold uppercase tracking-wide text-ink-muted"
								htmlFor="email"
							>
								{contact.form.emailLabel}
							</label>
							<input
								className="mt-1 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2"
								id="email"
								name="email"
								placeholder={contact.form.emailPlaceholder}
								type="email"
							/>
						</div>
						<div>
							<label
								className="text-xs font-semibold uppercase tracking-wide text-ink-muted"
								htmlFor="project"
							>
								{contact.form.projectLabel}
							</label>
							<textarea
								className="mt-1 min-h-[120px] w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none ring-accent/30 transition focus:ring-2"
								id="project"
								name="project"
								placeholder={contact.form.projectPlaceholder}
							/>
						</div>
						<button
							className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition hover:bg-sage"
							type="submit"
						>
							{contact.form.submitLabel}
						</button>
						<p className="text-xs text-ink-muted">{contact.form.note}</p>
					</form>
				</div>
			</div>
		</section>
	);
}
