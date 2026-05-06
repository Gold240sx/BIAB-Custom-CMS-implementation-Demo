import { NextResponse } from "next/server";

/**
 * Tenant demo app: no platform AuthKit / host rewrites. Customer auth is handled
 * by BIAB (SDK + `/api/biab/customer-portal`). This file exists so Turbopack
 * never picks up a stale or parent-workspace middleware graph in the monorepo.
 */
export default function middleware() {
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
