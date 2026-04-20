export type NavItem = {
	href: string;
	label: string;
};

export type ServiceId = "kitchens" | "baths" | "additions" | "wholeHome";

export type ServiceCardContent = {
	id: ServiceId;
	title: string;
	body: string;
};

export type ProcessStepContent = {
	step: string;
	title: string;
	body: string;
};

export type WorkImageContent = {
	alt: string;
	src: string;
	caption: string;
};

export type TestimonialContent = {
	quote: string;
	name: string;
	place: string;
};

export type HomePageContent = {
	metadata: {
		title: string;
		description: string;
	};
	brand: {
		name: string;
	};
	header: {
		nav: NavItem[];
		menuLabel: string;
		phoneDisplay: string;
		phoneTel: string;
		ctaLabel: string;
		ctaHref: string;
	};
	hero: {
		imageSrc: string;
		imageAlt: string;
		eyebrow: string;
		title: string;
		body: string;
		primaryCta: { label: string; href: string };
		secondaryCta: { label: string; href: string };
		pullQuote: string;
		pullQuoteAttribution: string;
	};
	services: {
		eyebrow: string;
		title: string;
		body: string;
		items: ServiceCardContent[];
	};
	process: {
		eyebrow: string;
		title: string;
		intro: string;
		steps: ProcessStepContent[];
	};
	work: {
		eyebrow: string;
		title: string;
		aside: string;
		images: WorkImageContent[];
	};
	testimonials: {
		eyebrow: string;
		title: string;
		items: TestimonialContent[];
	};
	contact: {
		title: string;
		body: string;
		phoneLabel: string;
		emailLabel: string;
		hoursLabel: string;
		phoneDisplay: string;
		phoneTel: string;
		emailDisplay: string;
		emailMailto: string;
		hours: string;
		form: {
			nameLabel: string;
			emailLabel: string;
			projectLabel: string;
			namePlaceholder: string;
			emailPlaceholder: string;
			projectPlaceholder: string;
			submitLabel: string;
			note: string;
		};
	};
	footer: {
		tagline: string;
		nav: NavItem[];
		copyrightTemplate: string;
	};
};
