import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Only override tracing root for local monorepo dev. On Vercel the project
// is checked out at /vercel/path0 and pointing the root above it causes
// Next.js to look for build manifests under /vercel/path0/path0/.next/...
const workspaceRoot = process.env.VERCEL ? undefined : path.resolve(__dirname, "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
	...(workspaceRoot ? { outputFileTracingRoot: workspaceRoot } : {}),
	experimental: {
		turbopackFileSystemCacheForDev: false,
		turbopackFileSystemCacheForBuild: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
