import { platformHostname } from "@/lib/site-hostname";

/**
 * Origin of the main BIAB app (marketing + dashboard), not `app.{slug}.*` tenants.
 * Used for links from org-app hosts back to the platform.
 */
export function platformAppOrigin(): string {
	const explicit = process.env.NEXT_PUBLIC_PLATFORM_HOME_URL?.replace(
		/\/$/,
		"",
	);
	if (explicit) return explicit;

	if (process.env.NODE_ENV === "development") {
		const port = process.env.NEXT_PUBLIC_DEV_SERVER_PORT ?? "3000";
		return `http://localhost:${port}`;
	}

	return `https://${platformHostname()}`;
}
