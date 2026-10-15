"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Calendar, Newspaper, Linkedin } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SkyBackground from "./sky-background";

export default function LandingPage() {
	const [language, setLanguage] = useState<"en" | "de">("en");
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);

	// Content object for both languages
	const content = {
		en: {
			hero: {
				title: "The Future of Apps Is Conversational",
				subtitle:
					"We're a collective of builders rethinking how humans interact with technology. Not through clicks, but through conversation, collaboration, and creativity.",
				primaryCta: "Try the Badge Generator",
				secondaryCta: "Read on Substack",
			},
			badgeGenerator: {
				label: "New lab experiment",
				title: "AI Event Badge Generator",
				description:
					"It started as a playful Twelve Balloons lab experiment: type a prompt and watch your badge come alive in that style, colours and motion shifting uniquely to your words.",
				steps: [
					{ title: "Style generator", text: "maps your text to colours, gradients, typography and textures" },
					{ title: "Physics generator", text: "sets how elements move, from drift to burst" },
					{ title: "Motion generator", text: "shapes animation curves and interactions" },
					{ title: "Animation layer", text: "merges it all into a seamless, live loop" },
				],
				cta: "What's your badge's look?",
				buttonText: "Try the Badge Generator",
			},
			about: {
				title: "About the Collective",
				description1:
					"We're developers, designers, researchers, and systems thinkers exploring a new interface paradigm, one where the UI is generated, not predefined.",
				description2:
					"Our client work shapes real-world tools. But our boldest ideas begin in-house: building our own agents, testing workflows, and reimagining how humans and machines think together.",
			},
			mission: {
				title: "Our Mission",
				items: [
					"Let ideas fly: faster, lighter, bolder",
					"Build open-source tools and experiments",
					"Share patterns, practices, philosophies",
					"Teach AI-native ways of working",
					"Redesign the interface, from the prompt up",
				],
			},
			projects: {
				title: "Featured Projects",
				spotify: {
					title: "Spotify Agent",
					description:
						"A conversational UI that links natural language (voice or text) to real-time music control via Spotify.",
					status: "Prototype in progress",
				},
				badge: {
					title: "AI Event Badge Generator",
					description:
						"Type a prompt and watch your badge come alive in that style. An API-based architecture for event-ready scenarios where organisers can generate badges at scale.",
					status: "Live experiment",
				},
				viewPrototype: "View prototype",
				readPost: "Read the post",
				tryIt: "Try it now",
			},
			building: {
				title: "What We're Building",
				subtitle: "Live Experiments",
				items: [
					{ title: "Conversational interfaces", description: "Apps that speak, listen, and respond" },
					{ title: "Composable UI agents", description: "LLMs that assemble interfaces from intent" },
					{ title: "Prompt-to-UI systems", description: "Design frameworks that respond to language" },
					{ title: "Ambient interfaces", description: "UI that dissolves into experience" },
					{ title: "Programmable surfaces", description: "Lightweight UI elements controlled by AI tools" },
				],
			},
			community: {
				title: "Community",
				description:
					"Twelve Balloons is a growing collective connected by a shared curiosity about how humans and machines evolve together. We build in the open, share what we learn, and believe creativity scales faster when it's visible.",
				openSource: {
					title: "Open Source",
					description: "Contribute to our projects and experiments on GitHub.",
					link: "Join on GitHub",
				},
				events: {
					title: "Events",
					description: "Join virtual sessions, demos, in-person events, and experiments in progress.",
					link: "View Calendar",
				},
				news: {
					title: "News",
					description: "Follow insights, reflections, and updates on Substack and LinkedIn.",
				},
			},
		},
		de: {
			hero: {
				title: "Die Zukunft von Apps ist sprachgesteuert",
				subtitle:
					"Wir sind ein Schweizer Kollektiv von Entwickler:innen, Designer:innen und Strateg:innen, das digitale Interaktionen neu denkt: durch Sprache, Zusammenarbeit und intuitive Systeme statt Klicks und klassische Interfaces.",
				primaryCta: "Badge-Generator ausprobieren",
				secondaryCta: "Auf Substack lesen",
			},
			badgeGenerator: {
				label: "Neues Labor-Experiment",
				title: "KI Event-Badge-Generator",
				description:
					"Es begann als spielerisches Twelve Balloons Labor-Experiment: Geben Sie einen Prompt ein und beobachten Sie, wie Ihr Badge zum Leben erwacht. Stil, Farben und Bewegungen passen sich einzigartig an Ihre Worte an.",
				steps: [
					{ title: "Stilgenerator", text: "bildet Ihren Text auf Farben, Verläufe, Typografie und Texturen ab" },
					{ title: "Physikgenerator", text: "bestimmt, wie sich Elemente bewegen, von Drift bis Burst" },
					{ title: "Bewegungsgenerator", text: "formt Animationskurven und Interaktionen" },
					{ title: "Animationsebene", text: "fügt alles zu einer nahtlosen, lebendigen Schleife zusammen" },
				],
				cta: "Wie sieht Ihr Badge aus?",
				buttonText: "Badge-Generator ausprobieren",
			},
			about: {
				title: "Über uns, das Kollektiv",
				description1:
					"Wir sind Entwickler:innen, Designer:innen, Forscher:innen und Systemdenker:innen, die ein neues Interface-Paradigma erforschen, eines, bei dem die Benutzeroberfläche nicht vorgegeben, sondern generiert wird.",
				description2:
					"Unsere Arbeit mit Kund:innen führt zu echten Tools für komplexe Umgebungen. Aber unsere mutigsten Ideen entstehen intern: Wir bauen eigene Agenten, testen neue Workflows und gestalten neu, wie Menschen und Maschinen gemeinsam denken.",
			},
			mission: {
				title: "Unsere Mission",
				items: [
					"Ideen fliegen lassen: schnell, leicht, mutig",
					"Offene Tools und gewagte Experimente entwickeln",
					"Denkmuster teilen, Perspektiven öffnen",
					"KI-native Arbeitsweisen vermitteln und weitergeben",
					"Interfaces neu denken, gebaut aus Sprache",
				],
			},
			projects: {
				title: "Laufende Projekte",
				spotify: {
					title: "Spotify Agent",
					description:
						"Ein sprachgesteuertes Interface, das natürliche Sprache (per Stimme oder Text) mit Spotify verbindet. Musiksteuerung in Echtzeit, ohne klassische App.",
					status: "Prototyp in Entwicklung",
				},
				badge: {
					title: "KI Event-Badge-Generator",
					description:
						"Geben Sie einen Prompt ein und beobachten Sie, wie Ihr Badge zum Leben erwacht. Eine API-basierte Architektur für Event-fähige Szenarien, in denen Organisatoren Badges in grossem Massstab generieren können.",
					status: "Live-Experiment",
				},
				viewPrototype: "Prototyp ansehen",
				readPost: "Beitrag lesen",
				tryIt: "Jetzt ausprobieren",
			},
			building: {
				title: "Woran wir arbeiten",
				subtitle: "Live-Experimente",
				items: [
					{ title: "Sprachbasierte Interfaces", description: "Apps, die zuhören, antworten und mitdenken" },
					{ title: "Modulare UI-Agenten", description: "Systeme, die aus Absicht und Sprache Oberflächen erzeugen" },
					{ title: "Prompt-to-UI Frameworks", description: "Designlösungen, die direkt auf Sprache reagieren" },
					{ title: "Kontextuelle Interfaces", description: "Schnittstellen, die sich dem Nutzungskontext anpassen" },
					{ title: "Programmierbare Oberflächen", description: "Leichte UI-Elemente, steuerbar durch KI-Tools" },
				],
			},
			community: {
				title: "Community",
				description:
					"Twelve Balloons ist ein wachsendes Kollektiv, verbunden durch gemeinsame Neugier darauf, wie Menschen und Maschinen sich gemeinsam entwickeln. Wir bauen offen, teilen was wir lernen und glauben, dass Kreativität schneller skaliert, wenn sie sichtbar ist.",
				openSource: {
					title: "Open Source",
					description: "Tragen Sie zu unseren Projekten und Experimenten auf GitHub bei.",
					link: "Auf GitHub beitreten",
				},
				events: {
					title: "Events",
					description: "Nehmen Sie an virtuellen Sessions, Demos, persönlichen Events und laufenden Experimenten teil.",
					link: "Kalender ansehen",
				},
				news: {
					title: "News",
					description: "Folgen Sie Einblicken, Reflexionen und Updates auf Substack und LinkedIn.",
				},
			},
		},
	};

	const c = content[language];
	const heroWords = c.hero.title.split(" ");

	return (
		<div className="min-h-screen flex flex-col font-display text-ink">
			<SkyBackground />

			<div className="relative z-10 min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
				{/* Header */}
				<header className="pt-6 relative max-w-5xl mx-auto w-full flex items-center justify-center">
					<p className="text-xl md:text-2xl font-black tracking-tight text-deep">Twelve Balloons</p>
				</header>

				{/* Language toggle */}
				<div className="fixed md:absolute md:top-6 top-6 right-6 z-20">
					<div className="relative">
						{/* Mobile: floating button */}
						<div className="md:hidden">
							<button
								onClick={() => setShowLanguageMenu(!showLanguageMenu)}
								aria-label="Change language"
								aria-expanded={showLanguageMenu}
								className="w-11 h-11 bg-paper/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-deep font-bold border border-gold/40 text-xs transition-transform active:scale-[0.97]"
							>
								{language.toUpperCase()}
							</button>
							<motion.div
								className="absolute top-12 right-0 bg-paper/95 backdrop-blur-sm rounded-xl shadow-lg border border-gold/40 overflow-hidden"
								initial={false}
								animate={{
									opacity: showLanguageMenu ? 1 : 0,
									y: showLanguageMenu ? 0 : -8,
									scale: showLanguageMenu ? 1 : 0.95,
								}}
								transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
								style={{ pointerEvents: showLanguageMenu ? "auto" : "none", transformOrigin: "top right" }}
							>
								{(["en", "de"] as const).map((lang) => (
									<button
										key={lang}
										onClick={() => {
											setLanguage(lang);
											setShowLanguageMenu(false);
										}}
										className={`block w-full px-4 py-3 text-left font-semibold transition-colors ${
											language === lang ? "bg-deep text-paper" : "text-deep hover:bg-sage/20"
										}`}
									>
										{lang === "en" ? "English" : "Deutsch"}
									</button>
								))}
							</motion.div>
						</div>

						{/* Desktop: sliding toggle */}
						<div className="hidden md:block relative bg-paper/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gold/40">
							<motion.div
								className="absolute top-1 bottom-1 bg-deep rounded-full"
								initial={false}
								animate={{ left: language === "en" ? "4px" : "50%" }}
								style={{ width: "calc(50% - 4px)" }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							/>
							<div className="relative flex">
								{(["en", "de"] as const).map((lang) => (
									<button
										key={lang}
										onClick={() => setLanguage(lang)}
										className={`relative z-10 px-3 py-1 rounded-full text-sm font-bold transition-colors ${
											language === lang ? "text-paper" : "text-deep hover:text-ink"
										}`}
									>
										{lang.toUpperCase()}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				<main className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
					{/* Hero: full first screen, balloons above, text in the lower part */}
					<section className="min-h-[92svh] flex flex-col justify-end pb-[10vh] pt-[40vh] md:pt-[46vh]">
						<div className="relative mx-auto max-w-3xl text-center">
							{/* Soft paper glow for legibility over the painting (no box) */}
							<div
								aria-hidden="true"
								className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[48px] bg-paper/70 blur-2xl"
							/>
							<h1 key={language} className="text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.05] text-ink">
								{heroWords.map((word, i) => (
									<span key={i} className="word-mask">
										<span className="word-rise" style={{ animationDelay: `${120 + i * 70}ms` }}>
											{word}
										</span>
										{i < heroWords.length - 1 ? " " : null}
									</span>
								))}
							</h1>
							<p
								className="fade-up mt-6 text-lg md:text-xl max-w-2xl mx-auto text-deep leading-relaxed"
								style={{ animationDelay: "520ms" }}
							>
								{c.hero.subtitle}
							</p>
							<div
								className="fade-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
								style={{ animationDelay: "680ms" }}
							>
								<PrimaryButton href="https://badge.twelve-balloons.com/">{c.hero.primaryCta}</PrimaryButton>
								<Link
									href="https://miketwelveballoons.substack.com/s/twelve-balloons"
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-1.5 font-semibold text-deep underline-offset-4 hover:underline"
								>
									{c.hero.secondaryCta}
									<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
								</Link>
							</div>
						</div>
					</section>

					{/* Badge Generator */}
					<AnimatedSection className={`${panel} mb-12`}>
						<div className="text-center">
							<motion.div
								className="inline-flex items-center gap-2 bg-paper border border-gold/50 text-deep px-3 py-1.5 rounded-full mb-5 text-xs font-semibold uppercase tracking-[0.08em]"
								variants={itemVariants}
							>
								<span className="h-2 w-2 rounded-full bg-balloon" />
								{c.badgeGenerator.label}
							</motion.div>

							<motion.h2 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-[-0.02em] text-ink" variants={itemVariants}>
								{c.badgeGenerator.title}
							</motion.h2>

							<motion.p className="text-lg max-w-2xl mx-auto mb-10 text-deep leading-relaxed" variants={itemVariants}>
								{c.badgeGenerator.description}
							</motion.p>

							{/* Four steps of the pipeline, numbered instead of icons */}
							<motion.ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px mb-10 max-w-4xl mx-auto text-left bg-gold/40 rounded-xl overflow-hidden border border-gold/40" variants={itemVariants}>
								{c.badgeGenerator.steps.map((step, i) => (
									<li key={step.title} className="bg-paper/90 p-5">
										<span className="font-mono text-xs text-deep/70">{String(i + 1).padStart(2, "0")}</span>
										<p className="mt-2 font-bold text-ink">{step.title}</p>
										<p className="mt-1 text-sm text-deep leading-snug">{step.text}</p>
									</li>
								))}
							</motion.ol>

							<motion.div className="space-y-4" variants={itemVariants}>
								<p className="text-xl font-bold text-ink">{c.badgeGenerator.cta}</p>
								<PrimaryButton href="https://badge.twelve-balloons.com/">{c.badgeGenerator.buttonText}</PrimaryButton>
							</motion.div>
						</div>
					</AnimatedSection>

					{/* About */}
					<AnimatedSection className={`${panel} mb-12 text-center`}>
						<motion.h2 className={sectionTitle} variants={itemVariants}>
							{c.about.title}
						</motion.h2>
						<motion.p className={`${bodyText} mb-6`} variants={itemVariants}>
							{c.about.description1}
						</motion.p>
						<motion.p className={bodyText} variants={itemVariants}>
							{c.about.description2}
						</motion.p>
					</AnimatedSection>

					{/* Mission */}
					<AnimatedSection className={`${panel} mb-12 text-center`}>
						<motion.h2 className={sectionTitle} variants={itemVariants}>
							{c.mission.title}
						</motion.h2>
						<ul className="space-y-3 text-lg max-w-3xl mx-auto">
							{c.mission.items.map((item) => (
								<motion.li key={item} className="font-semibold text-ink" variants={itemVariants}>
									{item}
								</motion.li>
							))}
						</ul>
					</AnimatedSection>

					{/* Featured Projects */}
					<AnimatedSection className={`${panel} mb-12`}>
						<motion.h2 className={`${sectionTitle} text-center`} variants={itemVariants}>
							{c.projects.title}
						</motion.h2>

						<div className="grid md:grid-cols-2 gap-6">
							<motion.div className={card} variants={itemVariants}>
								<StatusChip tone="progress">{c.projects.spotify.status}</StatusChip>
								<h3 className="text-xl font-bold mt-4 mb-2 text-ink">{c.projects.spotify.title}</h3>
								<p className="mb-6 text-deep leading-relaxed">{c.projects.spotify.description}</p>
								<div className="flex flex-wrap gap-3 mt-auto">
									<SecondaryButton href="https://v0.dev/community/neumorphic-design-system-ChCGgi8RVyO">
										{c.projects.viewPrototype}
									</SecondaryButton>
									<SecondaryButton href="https://miketwelveballoons.substack.com/p/when-conversation-becomes-the-ui">
										{c.projects.readPost}
									</SecondaryButton>
								</div>
							</motion.div>

							<motion.div className={card} variants={itemVariants}>
								<StatusChip tone="live">{c.projects.badge.status}</StatusChip>
								<h3 className="text-xl font-bold mt-4 mb-2 text-ink">{c.projects.badge.title}</h3>
								<p className="mb-6 text-deep leading-relaxed">{c.projects.badge.description}</p>
								<div className="mt-auto">
									<PrimaryButton href="https://badge.twelve-balloons.com/" size="sm">
										{c.projects.tryIt}
									</PrimaryButton>
								</div>
							</motion.div>
						</div>
					</AnimatedSection>

					{/* What We're Building */}
					<AnimatedSection className={`${panel} mb-12 text-center`}>
						<motion.h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-[-0.02em] text-ink" variants={itemVariants}>
							{c.building.title}
						</motion.h2>
						<motion.p className="text-sm font-semibold uppercase tracking-[0.08em] text-deep/80 mb-8" variants={itemVariants}>
							{c.building.subtitle}
						</motion.p>
						<ul className="space-y-6 text-lg max-w-3xl mx-auto">
							{c.building.items.map((item) => (
								<motion.li key={item.title} className="flex flex-col items-center" variants={itemVariants}>
									<span className="font-bold text-ink mb-1">{item.title}</span>
									<span className="text-deep text-base">{item.description}</span>
								</motion.li>
							))}
						</ul>
					</AnimatedSection>

					{/* Community */}
					<AnimatedSection className={`${panel} mb-12 text-center`}>
						<motion.h2 className={sectionTitle} variants={itemVariants}>
							{c.community.title}
						</motion.h2>
						<motion.p className={`${bodyText} mb-10`} variants={itemVariants}>
							{c.community.description}
						</motion.p>

						<div className="grid md:grid-cols-3 gap-6">
							<motion.div className={`${card} items-center text-center`} variants={itemVariants}>
								<IconBadge>
									<Github size={22} />
								</IconBadge>
								<h3 className="text-xl font-bold mb-2 text-ink">{c.community.openSource.title}</h3>
								<p className="mb-4 text-deep">{c.community.openSource.description}</p>
								<span className="mt-auto font-semibold text-deep/50 cursor-not-allowed">{c.community.openSource.link}</span>
							</motion.div>

							<motion.div className={`${card} items-center text-center`} variants={itemVariants}>
								<IconBadge>
									<Calendar size={22} />
								</IconBadge>
								<h3 className="text-xl font-bold mb-2 text-ink">{c.community.events.title}</h3>
								<p className="mb-4 text-deep">{c.community.events.description}</p>
								<span className="mt-auto font-semibold text-deep/50 cursor-not-allowed">{c.community.events.link}</span>
							</motion.div>

							<motion.div className={`${card} items-center text-center`} variants={itemVariants}>
								<IconBadge>
									<Newspaper size={22} />
								</IconBadge>
								<h3 className="text-xl font-bold mb-2 text-ink">{c.community.news.title}</h3>
								<p className="mb-4 text-deep">{c.community.news.description}</p>
								<div className="flex gap-4 mt-auto">
									<Link
										href="https://miketwelveballoons.substack.com/s/twelve-balloons"
										className="text-deep hover:text-ink transition-colors"
									>
										<Newspaper size={24} />
										<span className="sr-only">Substack</span>
									</Link>
									<Link
										href="https://www.linkedin.com/company/twelve-balloons"
										className="text-deep hover:text-ink transition-colors"
									>
										<Linkedin size={24} />
										<span className="sr-only">LinkedIn</span>
									</Link>
								</div>
							</motion.div>
						</div>
					</AnimatedSection>
				</main>

				{/* Footer */}
				<footer className="relative z-10 border-t border-deep/15 py-8 bg-paper/70 backdrop-blur-sm">
					<div className="max-w-5xl mx-auto px-6 md:px-3">
						<div className="flex flex-col md:flex-row justify-between items-center mb-4">
							<div className="mb-4 md:mb-0 flex justify-center md:justify-start">
								<Image
									src="/images/logo-balloons.png"
									alt="Twelve Balloons – Let ideas fly."
									width={62}
									height={52}
									className="h-[52px] w-auto"
									style={{ width: "auto" }}
								/>
							</div>
							<div className="flex gap-6">
								<div className="font-semibold text-deep/50 cursor-not-allowed">GitHub</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}

// Shared class recipes
const panel = "bg-paper/85 backdrop-blur-md rounded-2xl border border-gold/30 p-8 md:p-12 shadow-[0_1px_2px_rgba(31,42,37,0.04),0_12px_32px_-12px_rgba(31,42,37,0.12)]";
const card = "bg-paper rounded-xl border border-gold/40 p-6 flex flex-col h-full transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-12px_rgba(31,42,37,0.2)]";
const sectionTitle = "text-2xl md:text-3xl font-extrabold mb-6 tracking-[-0.02em] text-ink";
const bodyText = "text-lg max-w-3xl mx-auto text-deep leading-relaxed";

function PrimaryButton({ href, children, size = "lg" }: { href: string; children: React.ReactNode; size?: "sm" | "lg" }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 rounded-full bg-balloon text-ink font-bold border border-balloon-dark/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.08),0_6px_16px_-6px_rgba(217,133,58,0.55)] transition-[transform,background-color] duration-150 ease-out hover:bg-balloon-dark active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep ${
				size === "lg" ? "px-7 py-3.5 text-base md:text-lg" : "px-5 py-2.5 text-sm"
			}`}
		>
			{children}
			<ExternalLink size={size === "lg" ? 16 : 14} />
		</Link>
	);
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1.5 rounded-full border border-deep/25 px-4 py-2 text-sm font-semibold text-deep transition-[transform,background-color] duration-150 ease-out hover:bg-sage/20 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep"
		>
			{children}
			<ExternalLink size={13} />
		</Link>
	);
}

function StatusChip({ tone, children }: { tone: "live" | "progress"; children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center gap-2 self-start rounded-full border border-gold/50 bg-paper px-3 py-1 text-xs font-semibold text-deep">
			<span className={`h-2 w-2 rounded-full ${tone === "live" ? "bg-balloon" : "bg-sage"}`} />
			{children}
		</span>
	);
}

function IconBadge({ children }: { children: React.ReactNode }) {
	return <div className="w-12 h-12 bg-sage/25 text-deep rounded-full flex items-center justify-center mb-4">{children}</div>;
}

// Children rise in sequence once their section enters the viewport.
const itemVariants = {
	hidden: { opacity: 0, y: 16, transition: { duration: 0 } },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

// Content is rendered visible on the server and for anything already on screen.
// Only sections that start below the fold are hidden after mount and revealed on scroll,
// so the page never depends on JavaScript to show its text.
function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
	const ref = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const [deferred, setDeferred] = useState(false);
	const isInView = useInView(ref, { once: true, amount: 0.15 });

	useEffect(() => {
		const el = ref.current;
		if (!el || reduce) return;
		if (el.getBoundingClientRect().top > window.innerHeight) setDeferred(true);
	}, [reduce]);

	const state = !deferred || isInView ? "visible" : "hidden";

	return (
		<motion.section
			ref={ref}
			className={className}
			initial={false}
			animate={state}
			variants={{
				hidden: { opacity: 0, y: 24, transition: { duration: 0 } },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], staggerChildren: 0.06, delayChildren: 0.05 },
				},
			}}
		>
			{children}
		</motion.section>
	);
}
