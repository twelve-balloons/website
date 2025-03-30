"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Calendar } from "lucide-react";

export default function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col font-display text-emerald-900">
			{/* Background Image */}
			<div className="fixed inset-0 z-0">
				<Image
					src="/images/mountain-background.png"
					alt="Dreamy mountain landscape with balloons"
					fill
					priority
					className="object-cover"
					sizes="100vw"
				/>
			</div>

			{/* Content Container */}
			<div className="relative z-10 min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
				{/* Header */}
				<header className="pt-6 flex justify-between items-center">
					<h1 className="text-xl md:text-2xl font-black tracking-tight">
						Twelve Balloon
					</h1>
				</header>

				{/* Main Content - Split into separate boxes */}
				<div className="flex-1 flex flex-col max-w-5xl mx-auto w-full py-12">
					{/* Hero Section */}
					<section className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12">
						<div className="text-center">
							<h2 className="text-4xl md:text-6xl font-black mb-6 text-emerald-900 drop-shadow-sm tracking-tight">
								The Future of Apps is Conversational
							</h2>
							<p className="text-lg md:text-xl max-w-3xl mx-auto text-emerald-800 font-medium drop-shadow-sm">
								We&apos;re a collective of builders exploring how large language
								models (LLMs) can shape the way humans interact with technology.
								<br />
								Not through clicks — but through conversation, collaboration,
								and creativity.
							</p>
						</div>
					</section>

					{/* About Section */}
					<section className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight">
							About the Collective
						</h3>

						<h4 className="text-xl font-bold mb-3">Who We Are</h4>
						<p className="text-lg mb-6 font-medium max-w-3xl mx-auto">
							Twelve Balloon is a group of developers, designers, researchers,
							and dreamers building toward the next UI paradigm — one where the
							interface is not fixed, but generated.
						</p>
						<p className="text-lg mb-6 font-medium max-w-3xl mx-auto">
							We believe LLMs are not tools we control, but co-creators we work
							with.
						</p>
					</section>

					{/* Mission Section */}
					<section className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight">
							Our Mission
						</h3>
						<ul className="space-y-3 text-lg font-medium max-w-3xl mx-auto">
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Let ideas fly — faster, lighter, bolder
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Build open-source tools and prototypes
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Share learning, patterns, and philosophies
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Teach how to build with AI-first principles
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Reimagine the user interface from the prompt up
								</span>
							</li>
						</ul>
					</section>

					{/* Featured Projects Section */}
					<section className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12">
						<h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight text-center">
							Featured Projects
						</h3>

						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100">
								<h4 className="text-xl font-bold mb-2">
									Conversational Canvas
								</h4>
								<p className="mb-4 font-medium">
									A design tool that generates UI components from natural
									language descriptions.
								</p>
								<div className="flex justify-between items-center">
									<span className="text-sm bg-amber-100 px-3 py-1 rounded-full font-bold">
										Experimental
									</span>
									<Link
										href="#"
										className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold"
									>
										<span>View Project</span>
										<ExternalLink size={14} />
									</Link>
								</div>
							</div>

							<div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100">
								<h4 className="text-xl font-bold mb-2">Intent Mapper</h4>
								<p className="mb-4 font-medium">
									A tool that translates user intentions into dynamic interface
									components.
								</p>
								<div className="flex justify-between items-center">
									<span className="text-sm bg-amber-100 px-3 py-1 rounded-full font-bold">
										Experimental
									</span>
									<Link
										href="#"
										className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold"
									>
										<span>View Project</span>
										<ExternalLink size={14} />
									</Link>
								</div>
							</div>
						</div>
					</section>

					{/* What We're Building Section */}
					<section className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight">
							What We&apos;re Building
						</h3>

						<h4 className="text-xl font-bold mb-3">Live Experiments</h4>
						<ul className="space-y-3 text-lg mb-0 font-medium max-w-3xl mx-auto">
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Conversational Interfaces — where apps speak with you
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Composable UI Agents — LLMs orchestrate UI from intent
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Prompt-to-UI — design systems that respond to language
								</span>
							</li>
							<li className="flex flex-col items-center">
								<span className="font-bold mb-1">
									Ambient Interfaces — the UI fades into experience
								</span>
							</li>
						</ul>
					</section>

					{/* Community Section */}
					<section className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight">
							Community
						</h3>

						<p className="text-lg mb-6 font-medium max-w-3xl mx-auto">
							Twelve Balloon is built around a growing community of thinkers and
							builders exploring the future of human-computer interaction.
						</p>

						<div className="grid md:grid-cols-2 gap-8 mb-8">
							<div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center">
								<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
									<Github size={24} className="text-emerald-700" />
								</div>
								<h4 className="text-xl font-bold mb-2">Open Source</h4>
								<p className="mb-4 font-medium">
									Contribute to our projects and experiments on GitHub
								</p>
								<Link
									href="#"
									className="text-emerald-700 hover:text-emerald-900 mt-auto font-bold"
								>
									<span>Join on GitHub</span>
								</Link>
							</div>

							<div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center">
								<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
									<Calendar size={24} className="text-emerald-700" />
								</div>
								<h4 className="text-xl font-bold mb-2">Events</h4>
								<p className="mb-4 font-medium">
									Attend our virtual and in-person events and workshops
								</p>
								<Link
									href="#"
									className="text-emerald-700 hover:text-emerald-900 mt-auto font-bold"
								>
									<span>View Calendar</span>
								</Link>
							</div>
						</div>
					</section>
				</div>

				{/* Footer */}
				<footer className="relative z-10 border-t border-emerald-800/20 py-8 bg-white/30 backdrop-blur-sm">
					<div className="max-w-5xl mx-auto px-6 md:px-8">
						<div className="flex flex-col md:flex-row justify-between items-center mb-4">
							<div className="mb-4 md:mb-0 text-center md:text-left">
								<h3 className="text-xl font-black tracking-tight">
									Twelve Balloon
								</h3>
								<p className="font-bold">Let ideas fly.</p>
							</div>
							<div className="flex gap-6">
								<Link
									href="#"
									className="hover:text-emerald-700 transition-colors font-bold"
								>
									GitHub
								</Link>
								<Link
									href="#"
									className="hover:text-emerald-700 transition-colors font-bold"
								>
									Twitter
								</Link>
							</div>
						</div>
						<p className="text-center text-sm font-medium">
							Made with care, curiosity, and conversation.
						</p>
					</div>
				</footer>
			</div>
		</div>
	);
}
