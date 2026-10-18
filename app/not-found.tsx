import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Page not found | Twelve Balloons" };

export default function NotFound() {
	return (
		<main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 text-ink">
			<Image src="/media/meadow-start.jpg" alt="" fill priority sizes="100vw" className="object-cover object-top" />
			<div className="absolute inset-0 bg-paper/40" aria-hidden="true" />
			<div className="relative max-w-md text-center bg-paper/85 backdrop-blur-md rounded-2xl border border-gold/30 px-8 py-10">
				<Image
					src="/images/logo-balloons.png"
					alt=""
					width={62}
					height={52}
					className="mx-auto h-[52px] w-auto"
					style={{ width: "auto" }}
				/>
				<p className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-deep/70">404</p>
				<h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em]">This balloon flew away</h1>
				<p className="mt-3 text-deep leading-relaxed">The page you were looking for isn&apos;t here. The rest of the sky is.</p>
				<Link
					href="/"
					className="mt-8 inline-flex items-center btn-lit rounded-full px-6 py-3 font-bold text-ink border border-balloon-dark/60 transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep"
				>
					Back to the homepage
				</Link>
			</div>
		</main>
	);
}
