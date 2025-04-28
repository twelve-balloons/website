"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Calendar } from "lucide-react";

// Add these imports at the top of the file
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Replace the existing LandingPage component with this enhanced version
export default function LandingPage() {
	// Smooth scroll setup
	useEffect(() => {
		// Add smooth scrolling to the document
		document.documentElement.style.scrollBehavior = "smooth";

		return () => {
			document.documentElement.style.scrollBehavior = "auto";
		};
	}, []);

	// Scroll progress for parallax effects
	// const { scrollY } = useScroll()
	// const backgroundY = useTransform(scrollY, [0, 1000], [0, 100])

	return (
		<div className="min-h-screen flex flex-col font-display text-emerald-900">
			{/* Background Image with parallax effect */}
			<motion.div className="fixed inset-0 z-0">
				<Image
					src="/images/mountain-background.png"
					alt="Dreamy mountain landscape with balloons"
					fill
					priority
					className="object-cover"
					sizes="100vw"
				/>
			</motion.div>

			{/* Content Container */}
			<div className="relative z-10 min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
				{/* Header with fade in animation */}
				<motion.header
					className="pt-6 flex justify-center items-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-xl md:text-2xl font-black tracking-tight">
						Twelve Balloons
					</h1>
				</motion.header>

				{/* Main Content - Split into separate boxes */}
				<div className="flex-1 flex flex-col max-w-5xl mx-auto w-full py-12">
					{/* Hero Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12">
						<div className="text-center">
							<motion.h2
								className="text-4xl md:text-6xl font-black mb-6 text-emerald-900 drop-shadow-sm tracking-tight"
								variants={titleVariants}
							>
								The Future of Apps is Conversational
							</motion.h2>
							<motion.p
								className="text-lg md:text-xl max-w-3xl mx-auto text-emerald-800 font-medium drop-shadow-sm"
								variants={paragraphVariants}
							>
								We&apos;re a collective of builders exploring how large language
								models (LLMs) can shape the way humans interact with technology.
								<br />
								Not through clicks — but through conversation, collaboration,
								and creativity.
							</motion.p>
						</div>
					</AnimatedSection>

					{/* About Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3
							className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight"
							variants={titleVariants}
						>
							About the Collective
						</motion.h3>

						<motion.h4
							className="text-xl font-bold mb-3"
							variants={subtitleVariants}
						>
							Who We Are
						</motion.h4>
						<motion.p
							className="text-lg mb-6 font-medium max-w-3xl mx-auto"
							variants={paragraphVariants}
						>
							Twelve Balloons is a group of developers, designers, researchers,
							and dreamers building toward the next UI paradigm — one where the
							interface is not fixed, but generated.
						</motion.p>
						<motion.p
							className="text-lg mb-6 font-medium max-w-3xl mx-auto"
							variants={paragraphVariants}
							transition={{ delay: 0.2 }}
						>
							We believe LLMs are not tools we control, but co-creators we work
							with.
						</motion.p>
					</AnimatedSection>

					{/* Mission Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3
							className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight"
							variants={titleVariants}
						>
							Our Mission
						</motion.h3>
						<motion.ul
							className="space-y-3 text-lg font-medium max-w-3xl mx-auto"
							variants={containerVariants}
						>
							{[
								"Let ideas fly — faster, lighter, bolder",
								"Build open-source tools and prototypes",
								"Share learning, patterns, and philosophies",
								"Teach how to build with AI-first principles",
								"Reimagine the user interface from the prompt up",
							].map((item, index) => (
								<motion.li
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className="flex flex-col items-center"
									variants={itemVariants}
									custom={index}
								>
									<span className="font-bold mb-1">{item}</span>
								</motion.li>
							))}
						</motion.ul>
					</AnimatedSection>

					{/* Featured Projects Section */}
					{/* <AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12">
						<motion.h3
							className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight text-center"
							variants={titleVariants}
						>
							Featured Projects
						</motion.h3>

						<motion.div
							className="grid md:grid-cols-2 gap-8"
							variants={containerVariants}
						>
							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col h-full"
								variants={cardVariants}
								custom={0}
								whileHover={{
									y: -5,
									boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
								}}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h4 className="text-xl font-bold mb-2">
									Conversational Canvas
								</h4>
								<p className="mb-4 font-medium">
									A design tool that generates UI components from natural
									language descriptions.
								</p>
								<div className="flex justify-between items-center mt-auto">
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
							</motion.div>

							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col h-full"
								variants={cardVariants}
								custom={1}
								whileHover={{
									y: -5,
									boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
								}}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h4 className="text-xl font-bold mb-2">Intent Mapper</h4>
								<p className="mb-4 font-medium">
									A tool that translates user intentions into dynamic interface
									components.
								</p>
								<div className="flex justify-between items-center mt-auto">
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
							</motion.div>
						</motion.div>
					</AnimatedSection>

					{/* What We're Building Section */}
					{/* <AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3
							className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight"
							variants={titleVariants}
						>
							What We&apos;re Building
						</motion.h3>

						<motion.h4
							className="text-xl font-bold mb-3"
							variants={subtitleVariants}
						>
							Live Experiments
						</motion.h4>
						<motion.ul
							className="space-y-3 text-lg mb-0 font-medium max-w-3xl mx-auto"
							variants={containerVariants}
						>
							{[
								"Conversational Interfaces — where apps speak with you",
								"Composable UI Agents — LLMs orchestrate UI from intent",
								"Prompt-to-UI — design systems that respond to language",
								"Ambient Interfaces — the UI fades into experience",
							].map((item, index) => (
								<motion.li
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className="flex flex-col items-center"
									variants={itemVariants}
									custom={index}
								>
									<span className="font-bold mb-1">{item}</span>
								</motion.li>
							))}
						</motion.ul>
					</AnimatedSection> */}

					{/* Community Section */}
					{/* <AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3
							className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight"
							variants={titleVariants}
						>
							Community
						</motion.h3>

						<motion.p
							className="text-lg mb-6 font-medium max-w-3xl mx-auto"
							variants={paragraphVariants}
						>
							Twelve Balloons is built around a growing community of thinkers and
							builders exploring the future of human-computer interaction.
						</motion.p>

						<motion.div
							className="grid md:grid-cols-2 gap-8 mb-8"
							variants={containerVariants}
						>
							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center"
								variants={cardVariants}
								custom={0}
								whileHover={{
									y: -5,
									boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
								}}
								transition={{ type: "spring", stiffness: 300 }}
							>
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
							</motion.div>

							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center"
								variants={cardVariants}
								custom={1}
								whileHover={{
									y: -5,
									boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
								}}
								transition={{ type: "spring", stiffness: 300 }}
							>
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
							</motion.div>
						</motion.div>
					</AnimatedSection> */}
				</div>

				{/* Footer */}
				<motion.footer
					className="relative z-10 border-t border-emerald-800/20 py-8 bg-white/30 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="max-w-5xl mx-auto px-6 md:px-3">
						<div className="flex flex-col md:flex-row justify-between items-center mb-4">
							<div className="mb-4 md:mb-0 text-center md:text-left">
								<h3 className="text-xl font-black tracking-tight">
									Twelve Balloon
								</h3>
								<p className="font-bold">Let ideas fly.</p>
							</div>
							<div className="flex gap-6">
								<Link
									href="https://github.com/twelve-balloons"
									className="hover:text-emerald-700 transition-colors font-bold"
								>
									GitHub
								</Link>
							</div>
						</div>
					</div>
				</motion.footer>
			</div>
		</div>
	);
}

// Animation variants
const titleVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

const subtitleVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, delay: 0.1 },
	},
};

const paragraphVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.5, delay: 0.2 },
	},
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: 0.1 * i,
		},
	}),
};

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 24,
			delay: 0.2 * i,
		},
	}),
};

// Animated Section Component
function AnimatedSection({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<motion.section
			ref={ref}
			className={className}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.6,
						staggerChildren: 0.2,
					},
				},
			}}
		>
			{children}
		</motion.section>
	);
}
