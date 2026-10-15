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
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Keep the document language in sync with the toggle (screen readers, hyphenation).
	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	// Content object for both languages
	const content = {
		en: {
			nav: { lab: "Lab", exploring: "Exploring", about: "About", community: "Community" },
			lab: { title: "The Lab", subtitle: "Experiments we've built and are still building" },
			hero: {
				title: "The Future of Apps Is Conversational",
				subtitle:
					"We're a collective of builders rethinking how humans interact with technology. Not through clicks, but through conversation, collaboration, and creativity.",
				primaryCta: "Try the Badge Generator",
				secondaryCta: "Read on Substack",
			},
			badgeGenerator: {
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
				exampleAlt: "Badges made with the generator, each in a different style",
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
				title: "What we stand for",
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
					status: "Working prototype",
				},
				kit: {
					title: "Neumorphic UI kit",
					description:
						"An open v0 template we share with the community: music player, events, agenda and project cards in a soft neumorphic style, light and dark.",
					status: "Open template",
				},
				liveStatus: "Live experiment",
				useTemplate: "Use the template on v0",
				readPost: "Read how it works",
			},
			building: {
				title: "What We're Exploring",
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
			nav: { lab: "Lab", exploring: "Forschung", about: "Über uns", community: "Community" },
			lab: { title: "Das Lab", subtitle: "Experimente, die wir gebaut haben und weiterbauen" },
			hero: {
				title: "Die Zukunft von Apps ist sprachgesteuert",
				subtitle:
					"Wir sind ein Schweizer Kollektiv von Entwickler:innen, Designer:innen und Strateg:innen, das digitale Interaktionen neu denkt: durch Sprache, Zusammenarbeit und intuitive Systeme statt Klicks und klassische Interfaces.",
				primaryCta: "Badge-Generator ausprobieren",
				secondaryCta: "Auf Substack lesen",
			},
			badgeGenerator: {
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
				exampleAlt: "Mit dem Generator erstellte Badges, jedes in einem anderen Stil",
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
				title: "Wofür wir stehen",
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
					status: "Funktionierender Prototyp",
				},
				kit: {
					title: "Neumorphic UI-Kit",
					description:
						"Eine offene v0-Vorlage, die wir mit der Community teilen: Musikplayer, Events, Agenda und Projektkarten im sanften Neumorphic-Stil, hell und dunkel.",
					status: "Offene Vorlage",
				},
				liveStatus: "Live-Experiment",
				useTemplate: "Vorlage auf v0 verwenden",
				readPost: "Lesen, wie er funktioniert",
			},
			building: {
				title: "Woran wir forschen",
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
		<div id="top" className="min-h-screen flex flex-col overflow-x-clip font-display text-ink">
			<SkyBackground />

			<div className="relative z-10 min-h-screen flex flex-col px-6 md:px-16 lg:px-24">
				{/* Header: logo, section anchors, language. Gets a paper background once you scroll. */}
				<header
					className={`sticky top-0 z-30 -mx-6 md:-mx-16 lg:-mx-24 px-6 md:px-16 lg:px-24 transition-[background-color,box-shadow] duration-200 ease-out ${
						scrolled ? "bg-paper/80 backdrop-blur-md shadow-[0_1px_0_rgba(31,42,37,0.08)]" : "bg-transparent"
					}`}
				>
					<div className="max-w-5xl mx-auto h-16 flex items-center justify-between gap-6">
						<a href="#top" className={`flex items-center gap-2.5 rounded-md ${focusRing}`}>
							<Image src="/images/logo-balloons.png" alt="" width={34} height={28} className="h-7 w-auto" style={{ width: "auto" }} />
							<span className="text-lg md:text-xl font-black tracking-tight text-deep">Twelve Balloons</span>
						</a>
						<nav aria-label="Sections" className="hidden md:flex items-center gap-7 text-sm font-semibold text-deep">
							{(["lab", "exploring", "about", "community"] as const).map((id) => (
								<a key={id} href={`#${id}`} className={`rounded-sm transition-colors hover:text-ink ${focusRing}`}>
									{c.nav[id]}
								</a>
							))}
						</nav>
					<div className="relative">
							{/* Mobile: floating button */}
							<div className="md:hidden">
								<button
									onClick={() => setShowLanguageMenu(!showLanguageMenu)}
									aria-label="Change language"
									aria-expanded={showLanguageMenu}
									className={`w-11 h-11 bg-paper/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-deep font-bold border border-gold/40 text-xs transition-transform active:scale-[0.97] ${focusRing}`}
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
											className={`block w-full px-4 py-3 text-left font-semibold transition-colors ${focusRing} ${
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
											className={`relative z-10 px-3 py-1 rounded-full text-sm font-bold transition-colors ${focusRing} ${
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
				</header>

				<main className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
					{/* Hero: full first screen, balloons above, text in the lower part */}
					<section className="min-h-[92svh] flex flex-col justify-end pb-[7svh] pt-[33svh] md:pb-[10vh] md:pt-[46vh]">
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
								className="fade-up mt-5 text-base sm:text-lg md:mt-6 md:text-xl max-w-2xl mx-auto text-deep leading-relaxed"
								style={{ animationDelay: "520ms" }}
							>
								{c.hero.subtitle}
							</p>
							<div
								className="fade-up mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
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

					{/* The Lab: everything we've built, live or in progress */}
					<AnimatedSection id="lab" className={`${panel} mb-12`}>
						<div className="text-center mb-10">
							<motion.h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-ink" variants={itemVariants}>
								{c.lab.title}
							</motion.h2>
							<motion.p className="mt-3 text-lg text-deep" variants={itemVariants}>
								{c.lab.subtitle}
							</motion.p>
						</div>

						{/* Experiment 1: Badge Generator (live). Text left, one real badge right that changes style one by one. */}
						<motion.article className="border-t border-gold/50 pt-10" variants={itemVariants}>
							<div className="grid md:grid-cols-[1fr_auto] gap-10 items-center max-w-4xl mx-auto">
								<div className="text-center md:text-left">
									<StatusChip tone="live" center>{c.projects.liveStatus}</StatusChip>
									<h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-ink">{c.badgeGenerator.title}</h3>
									<p className="mt-4 text-lg text-deep leading-relaxed">{c.badgeGenerator.description}</p>
									<p className="mt-6 text-xl font-bold text-ink">{c.badgeGenerator.cta}</p>
									<div className="mt-4">
										<PrimaryButton href="https://badge.twelve-balloons.com/">{c.badgeGenerator.buttonText}</PrimaryButton>
									</div>
								</div>
								<BadgeCycler alt={c.badgeGenerator.exampleAlt} />
							</div>

							{/* Four steps of the pipeline, numbered instead of icons */}
							<ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px mt-10 max-w-4xl mx-auto text-left bg-gold/40 rounded-md overflow-hidden border border-gold/40">
								{c.badgeGenerator.steps.map((step, i) => (
									<li key={step.title} className="bg-paper/90 p-5">
										<span className="font-mono text-xs text-deep/70">{String(i + 1).padStart(2, "0")}</span>
										<p className="mt-2 font-bold text-ink">{step.title}</p>
										<p className="mt-1 text-sm text-deep leading-snug">{step.text}</p>
									</li>
								))}
							</ol>
						</motion.article>

						{/* Experiments 2 and 3: side by side. Buttons follow status (see DESIGN.md). */}
						<div className="mt-12 border-t border-gold/50 grid md:grid-cols-2 md:divide-x divide-gold/50 max-w-4xl mx-auto">
							<motion.article className="pt-10 md:pr-10 flex flex-col" variants={itemVariants}>
								<StatusChip tone="progress">{c.projects.spotify.status}</StatusChip>
								<h3 className="mt-4 mb-2 text-2xl font-extrabold tracking-[-0.02em] text-ink">{c.projects.spotify.title}</h3>
								<p className="mb-6 text-deep leading-relaxed">{c.projects.spotify.description}</p>
								<TextLink href="https://miketwelveballoons.substack.com/p/when-conversation-becomes-the-ui">
									{c.projects.readPost}
								</TextLink>
							</motion.article>

							<motion.article className="pt-10 md:pl-10 flex flex-col border-t border-gold/50 mt-10 md:border-t-0 md:mt-0" variants={itemVariants}>
								<StatusChip tone="open">{c.projects.kit.status}</StatusChip>
								<h3 className="mt-4 mb-2 text-2xl font-extrabold tracking-[-0.02em] text-ink">{c.projects.kit.title}</h3>
								<p className="mb-6 text-deep leading-relaxed">{c.projects.kit.description}</p>
								<div className="mt-auto">
									<SecondaryButton href="https://v0.app/templates/neumorphic-design-system-ChCGgi8RVyO">
										{c.projects.useTemplate}
									</SecondaryButton>
								</div>
							</motion.article>
						</div>
					</AnimatedSection>

					{/* Exploring: research directions, not shipped experiments */}
					<AnimatedSection id="exploring" className={`${panel} mb-12`}>
						<motion.h2 className={`${sectionTitle} text-center mb-8`} variants={itemVariants}>
							{c.building.title}
						</motion.h2>
						{/* One topic per row: title left, description right; stacked on phones */}
						<ul className="max-w-4xl mx-auto border-t border-gold/50">
							{c.building.items.map((item) => (
								<motion.li
									key={item.title}
									className="grid md:grid-cols-[17rem_1fr] gap-x-8 gap-y-1 py-4 border-b border-gold/50 md:items-baseline"
									variants={itemVariants}
								>
									<p className="font-bold text-ink">{item.title}</p>
									<p className="text-deep">{item.description}</p>
								</motion.li>
							))}
						</ul>
					</AnimatedSection>

					{/* About: who we are + what we stand for */}
					<AnimatedSection id="about" className={`${panel} mb-12`}>
						<motion.h2 className={`${sectionTitle} text-center`} variants={itemVariants}>
							{c.about.title}
						</motion.h2>
						<motion.p className={`${bodyText} text-center mb-6`} variants={itemVariants}>
							{c.about.description1}
						</motion.p>
						<motion.p className={`${bodyText} text-center`} variants={itemVariants}>
							{c.about.description2}
						</motion.p>

						<motion.h3 className="mt-12 mb-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-deep/80" variants={itemVariants}>
							{c.mission.title}
						</motion.h3>
						<ul className="max-w-xl mx-auto text-left text-lg divide-y divide-gold/50 border-y border-gold/50">
							{c.mission.items.map((item) => (
								<motion.li key={item} className="py-3.5 font-semibold text-ink" variants={itemVariants}>
									{item}
								</motion.li>
							))}
						</ul>
					</AnimatedSection>

					{/* Community */}
					<AnimatedSection id="community" className={`${panel} mb-12 text-center`}>
						<motion.h2 className={sectionTitle} variants={itemVariants}>
							{c.community.title}
						</motion.h2>
						<motion.p className={`${bodyText} mb-10`} variants={itemVariants}>
							{c.community.description}
						</motion.p>

						<div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/50 border-t border-gold/50">
							<motion.div className={column} variants={itemVariants}>
								<IconBadge>
									<Github size={22} />
								</IconBadge>
								<h3 className="text-xl font-bold mb-2 text-ink">{c.community.openSource.title}</h3>
								<p className="mb-4 text-deep">{c.community.openSource.description}</p>
								<TextLink href="https://github.com/twelve-balloons">{c.community.openSource.link}</TextLink>
							</motion.div>

							<motion.div className={column} variants={itemVariants}>
								<IconBadge>
									<Calendar size={22} />
								</IconBadge>
								<h3 className="text-xl font-bold mb-2 text-ink">{c.community.events.title}</h3>
								<p className="text-deep">{c.community.events.description}</p>
							</motion.div>

							<motion.div className={column} variants={itemVariants}>
								<IconBadge>
									<Newspaper size={22} />
								</IconBadge>
								<h3 className="text-xl font-bold mb-2 text-ink">{c.community.news.title}</h3>
								<p className="mb-4 text-deep">{c.community.news.description}</p>
								<div className="flex gap-5 mt-auto">
									<TextLink href="https://miketwelveballoons.substack.com/s/twelve-balloons">Substack</TextLink>
									<TextLink href="https://www.linkedin.com/company/twelve-balloons">LinkedIn</TextLink>
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
							<nav aria-label="Elsewhere" className="flex gap-6 text-sm font-semibold text-deep">
								<a href="https://miketwelveballoons.substack.com/s/twelve-balloons" className={`inline-flex items-center gap-1.5 rounded-sm hover:text-ink transition-colors ${focusRing}`}>
									<Newspaper size={16} /> Substack
								</a>
								<a href="https://www.linkedin.com/company/twelve-balloons" className={`inline-flex items-center gap-1.5 rounded-sm hover:text-ink transition-colors ${focusRing}`}>
									<Linkedin size={16} /> LinkedIn
								</a>
								<a href="https://github.com/twelve-balloons" className={`inline-flex items-center gap-1.5 rounded-sm hover:text-ink transition-colors ${focusRing}`}>
									<Github size={16} /> GitHub
								</a>
							</nav>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}

// Shared class recipes
const panel = "scroll-mt-24 bg-paper/85 backdrop-blur-md rounded-2xl border border-gold/30 p-8 md:p-12 shadow-[0_1px_2px_rgba(31,42,37,0.04),0_12px_32px_-12px_rgba(31,42,37,0.12)]";
const column = "flex flex-col items-center text-center px-6 py-8";
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep";
const sectionTitle = "text-2xl md:text-3xl font-extrabold mb-6 tracking-[-0.02em] text-ink";
const bodyText = "text-lg max-w-3xl mx-auto text-deep leading-relaxed";

function PrimaryButton({ href, children, size = "lg" }: { href: string; children: React.ReactNode; size?: "sm" | "lg" }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`btn-lit inline-flex items-center gap-2 rounded-full text-ink font-bold border border-balloon-dark/60 transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep ${
				size === "lg" ? "whitespace-nowrap px-5 sm:px-7 py-3.5 text-[15px] sm:text-base md:text-lg" : "whitespace-nowrap px-5 py-2.5 text-sm"
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

// Real badges from the generator (stills from the team's screen recordings), shown one by one.
const BADGE_EXAMPLES = ["/images/badges/badge-1.jpg", "/images/badges/badge-2.jpg", "/images/badges/badge-3.jpg", "/images/badges/badge-4.jpg", "/images/badges/badge-5.jpg"];

function BadgeCycler({ alt }: { alt: string }) {
	const reduce = useReducedMotion();
	const [index, setIndex] = useState(0);
	useEffect(() => {
		if (reduce) return;
		const id = window.setInterval(() => setIndex((i) => (i + 1) % BADGE_EXAMPLES.length), 2800);
		return () => window.clearInterval(id);
	}, [reduce]);
	return (
		<figure className="relative mx-auto w-[200px] md:w-[220px] aspect-[2/3] rounded-md overflow-hidden border border-gold/40 shadow-[0_12px_32px_-12px_rgba(31,42,37,0.35)]">
			{BADGE_EXAMPLES.map((src, i) => (
				<Image
					key={src}
					src={src}
					alt={i === 0 ? alt : ""}
					fill
					sizes="220px"
					className={`object-cover transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
				/>
			))}
		</figure>
	);
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`group mt-auto inline-flex items-center gap-1 font-semibold text-deep underline-offset-4 hover:underline hover:text-ink rounded-sm ${focusRing}`}
		>
			{children}
			<ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
		</a>
	);
}

function StatusChip({ tone, children, center }: { tone: "live" | "progress" | "open"; children: React.ReactNode; center?: boolean }) {
	return (
		<span className={`inline-flex items-center gap-2 ${center ? "" : "self-start"} rounded-full border border-gold/50 bg-paper px-3 py-1 text-xs font-semibold text-deep`}>
			<span className={`h-2 w-2 rounded-full ${tone === "live" ? "bg-balloon" : tone === "open" ? "bg-deep" : "bg-sage"}`} />
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
function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
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
			id={id}
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
