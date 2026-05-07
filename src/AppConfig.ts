/**
 * Quick on/off feature flags for the custom demo.
 *
 * Intentionally hand-rolled (not an env var) so demos / forks can flip a
 * feature without touching `.env.local` and so the config is reviewable in
 * the diff. Anything that needs per-environment overrides (API keys,
 * hostnames, etc.) belongs in `.env`, not here.
 */
export const AppConfig = {
	/**
	 * Embeds the BIAB developer SDK's `<Chatbot>` widget in the demo. The
	 * widget speaks to the host's `/api/package/v1/chatbot/*` routes with
	 * the API key from `.env`, so the chatbot the visitor sees is the same
	 * model + knowledge base + handoff dial the org configured in their
	 * dashboard. The basic-vs-front-desk distinction is enforced
	 * server-side based on the org's subscription plan — Launch tier gets
	 * the AI-answer + form-fallback bot, Growth+ unlocks the live front
	 * desk handoff. No code change is needed on this side to switch
	 * between them.
	 */
	chatbot: true as boolean,
} as const;
