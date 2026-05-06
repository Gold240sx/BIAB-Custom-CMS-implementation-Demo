import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
	outputFileTracingRoot: workspaceRoot,
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
