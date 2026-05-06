"use client";

import "./globals.css";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body className="grain min-h-full antialiased">
				<div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 px-6 py-16 text-center">
					<h1 className="text-2xl font-medium text-ink">Something went wrong</h1>
					<p className="text-sm text-ink-muted">
						{error.digest != null && error.digest !== ""
							? `Reference: ${error.digest}`
							: error.message}
					</p>
					<button
						type="button"
						onClick={() => reset()}
						className="rounded-md border border-line bg-paper-deep px-4 py-2 text-sm text-ink"
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
}
