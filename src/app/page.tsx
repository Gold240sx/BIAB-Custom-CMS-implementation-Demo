import type { Metadata } from "next";

import { CtaSection } from "@/components/contractor/cta-section";
import { HeroSection } from "@/components/contractor/hero-section";
import { ProcessSection } from "@/components/contractor/process-section";
import { ServicesSection } from "@/components/contractor/services-section";
import { SiteFooter } from "@/components/contractor/site-footer";
import { SiteHeader } from "@/components/contractor/site-header";
import { TestimonialsSection } from "@/components/contractor/testimonials-section";
import { WorkSection } from "@/components/contractor/work-section";
import { getHomePageContent } from "@/lib/biab/get-home-content";

/**
 * Render per-request so the home page always reflects the current copy from
 * Site Builder. Next's builder cannot reach the host during `next build`
 * (Vercel build machines have no network to a self-hosted dev server), which
 * previously caused the page to be prerendered with the `content.md` fallback.
 *
 * Switch to `export const revalidate = 60` + an on-demand revalidation webhook
 * once traffic justifies ISR.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
	const content = await getHomePageContent();
	return {
		title: content.metadata.title,
		description: content.metadata.description,
	};
}

export default async function Home() {
	const content = await getHomePageContent();

	return (
		<>
			<SiteHeader brand={content.brand} header={content.header} />
			<main className="flex-1">
				<HeroSection hero={content.hero} />
				<ServicesSection services={content.services} />
				<ProcessSection process={content.process} />
				<WorkSection work={content.work} />
				<TestimonialsSection testimonials={content.testimonials} />
				<CtaSection contact={content.contact} />
			</main>
			<SiteFooter brand={content.brand} footer={content.footer} />
		</>
	);
}
