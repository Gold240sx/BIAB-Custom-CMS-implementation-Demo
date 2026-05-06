import { CustomerBrowserDemo } from "./customer-browser-demo";

export const metadata = { title: "Customer portal · browser SDK demo" };

export default function CustomerBrowserPage() {
	return (
		<main className="mx-auto max-w-2xl px-6 py-12">
			<h1 className="text-2xl font-semibold">
				Customer portal — browser-only
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				This page calls the BIAB customer-portal API entirely from the
				browser. The API key and org pin are added server-side by the proxy
				route at <code>/api/biab/customer-portal/&lt;verb&gt;</code>. The
				browser never sees either.
			</p>
			<CustomerBrowserDemo />
		</main>
	);
}
