# Hearth & Beam — site content

**Live site data:** `getHomePageContent()` reads the **first fenced `json` block** below. Edit that JSON to change copy, URLs, and nav on the home page (until content is loaded from the BIAB package API).

```json
{
	"metadata": {
		"title": "Hearth & Beam | Custom Home Remodeling",
		"description": "Kitchens, baths, and whole-home remodels for homeowners who want craftsmanship, clear timelines, and a crew that shows up on time."
	},
	"brand": {
		"name": "Hearth & Beam"
	},
	"header": {
		"nav": [
			{ "href": "#services", "label": "Services" },
			{ "href": "#process", "label": "Process" },
			{ "href": "#work", "label": "Work" },
			{ "href": "#contact", "label": "Contact" }
		],
		"menuLabel": "Menu",
		"phoneDisplay": "(555) 555-0123",
		"phoneTel": "+15555550123",
		"ctaLabel": "Free estimate",
		"ctaHref": "#contact"
	},
	"hero": {
		"imageSrc": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=2000&q=80",
		"imageAlt": "Sunlit kitchen with wood cabinets and marble counters",
		"eyebrow": "Portland metro · Licensed & insured",
		"title": "Remodels built like furniture — tight seams, honest timelines.",
		"body": "We specialize in kitchens, baths, and additions for homeowners who want a single crew from demo to the last coat of paint.",
		"primaryCta": { "label": "Schedule a walkthrough", "href": "#contact" },
		"secondaryCta": { "label": "See recent projects", "href": "#work" },
		"pullQuote": "Quiet job sites. Daily photo updates. Zero surprises on the invoice.",
		"pullQuoteAttribution": "— M. Reyes, Laurelhurst"
	},
	"services": {
		"eyebrow": "What we build",
		"title": "Full-service remodeling — design support through punch list.",
		"body": "One project manager, one calendar, and trades we have worked with for years. You will not chase returns or wonder who is on site tomorrow.",
		"items": [
			{
				"id": "kitchens",
				"title": "Kitchens",
				"body": "Layout, cabinetry, lighting, and finishes coordinated in one schedule — not three different subcontractors guessing at each other."
			},
			{
				"id": "baths",
				"title": "Baths",
				"body": "Steam showers, tile that drains right, and ventilation you cannot hear from the bedroom. Details that age well in wet rooms."
			},
			{
				"id": "additions",
				"title": "Additions",
				"body": "Foundations, roof lines, and interior flow designed together so the new space feels like it was always part of the home."
			},
			{
				"id": "wholeHome",
				"title": "Whole-home",
				"body": "Phased plans when you need to live in the house during work — we sequence rooms so life keeps moving."
			}
		]
	},
	"process": {
		"eyebrow": "How it works",
		"title": "A process you can repeat to friends without wincing.",
		"intro": "We have refined this over fifteen years and hundreds of remodels. If something is unclear, we fix the communication — not blame the client.",
		"steps": [
			{
				"step": "01",
				"title": "Listen & measure",
				"body": "We walk the space, talk about how you actually live, and document what is behind the walls before we promise a number."
			},
			{
				"step": "02",
				"title": "Scope & schedule",
				"body": "A written proposal with allowances, milestones, and a realistic calendar — not a one-page guess."
			},
			{
				"step": "03",
				"title": "Build in phases",
				"body": "Protected floors, dust control, and end-of-day photos. You always know what is next."
			},
			{
				"step": "04",
				"title": "Finish & warranty",
				"body": "Punch list in 48 hours, then a one-year workmanship warranty on our labor."
			}
		]
	},
	"work": {
		"eyebrow": "Selected work",
		"title": "Recent projects around Portland.",
		"aside": "Every photo is from a job we led start to finish — design partners and engineering when needed, always coordinated in-house.",
		"images": [
			{
				"alt": "Bathroom with walk-in shower and natural stone tile",
				"src": "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
				"caption": "Alberta Arts bath — heated floors, curbless shower"
			},
			{
				"alt": "Living room with large windows and wood trim",
				"src": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
				"caption": "Sellwood addition — matched existing oak trim throughout"
			},
			{
				"alt": "Kitchen island with pendant lights",
				"src": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
				"caption": "Irvington kitchen — custom island, panel-ready appliances"
			}
		]
	},
	"testimonials": {
		"eyebrow": "Homeowners",
		"title": "Word of mouth is most of our calendar.",
		"items": [
			{
				"quote": "They told us exactly which weeks would be loud and which would be quiet. For a family with two kids and a dog, that mattered more than the tile sample.",
				"name": "Jordan & Sam K.",
				"place": "Mt. Tabor"
			},
			{
				"quote": "Our 1924 bungalow had surprises in every wall. Hearth & Beam documented everything and never pushed an upsell we did not need.",
				"name": "Elena V.",
				"place": "Rose City Park"
			}
		]
	},
	"contact": {
		"title": "Tell us about your remodel.",
		"body": "Send a short note — we reply within one business day with availability for a site visit. No pressure, no automated spam.",
		"phoneLabel": "Phone",
		"emailLabel": "Email",
		"hoursLabel": "Hours",
		"phoneDisplay": "(555) 555-0123",
		"phoneTel": "+15555550123",
		"emailDisplay": "hello@hearthandbeam.co",
		"emailMailto": "hello@hearthandbeam.co",
		"hours": "Mon–Fri 7:30a – 4:30p",
		"form": {
			"nameLabel": "Name",
			"emailLabel": "Email",
			"projectLabel": "Project",
			"namePlaceholder": "Alex Morgan",
			"emailPlaceholder": "you@example.com",
			"projectPlaceholder": "Kitchen refresh, bath gut, addition…",
			"submitLabel": "Request a call back",
			"note": "This demo form does not submit anywhere yet — wire it to your inbox or CRM when you connect the site."
		}
	},
	"footer": {
		"tagline": "Custom residential remodeling · OR CCB #123456",
		"nav": [
			{ "href": "#services", "label": "Services" },
			{ "href": "#process", "label": "Process" },
			{ "href": "#contact", "label": "Contact" }
		],
		"copyrightTemplate": "© {year} {brand}. Demo site for portfolio use."
	}
}
```

---

## Human-readable reference (mirror of the JSON)

Useful for review and diffs; **the fenced JSON above is what the app loads.**

### SEO / metadata

- **title:** Hearth & Beam | Custom Home Remodeling
- **description:** Kitchens, baths, and whole-home remodels for homeowners who want craftsmanship, clear timelines, and a crew that shows up on time.

### Brand

- **name:** Hearth & Beam

### Header

- **nav:** Services, Process, Work, Contact (anchors as in JSON)
- **menu label (mobile):** Menu
- **phone display / tel:** (555) 555-0123 / +15555550123
- **primary CTA:** Free estimate → `#contact`

### Hero

- **image URL / alt:** see `hero.imageSrc` / `hero.imageAlt` in JSON
- **eyebrow, title, body, CTAs, pull quote:** see `hero` in JSON

### Services

- Section intro + four cards (`kitchens`, `baths`, `additions`, `wholeHome`) — icons are chosen in code by `id`.

### Process

- Intro + four numbered steps — see `process` in JSON

### Work / gallery

- Three images — see `work.images` in JSON

### Testimonials

- Two quotes — see `testimonials.items` in JSON

### Contact / CTA

- Labels, hours, form copy — see `contact` in JSON

### Footer

- Tagline, nav links, copyright template — see `footer` in JSON (`{year}` and `{brand}` are replaced at render time)

---

## Runtime wiring

- **Loader:** `src/lib/biab/get-home-content.ts` — reads `**content.md`** via `load-home-content-markdown.ts`; when BIAB exposes page content over the API, swap in `createBiabDevClient` + env (`BIAB_API_KEY`, `BIAB_SITE_ID`, `BIAB_PACKAGE_API_BASE_URL`).
- **Types:** `src/lib/biab/home-content.types.ts`
- **Page:** `src/app/page.tsx` awaits `getHomePageContent()` and passes slices into section components.

