"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Calendar, Newspaper, Linkedin, Link2, Sparkles } from "lucide-react";

// Add these imports at the top of the file
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Replace the existing LandingPage component with this enhanced version
export default function LandingPage() {
	const [language, setLanguage] = useState<"en" | "de">("en");
	const [showLanguageMenu, setShowLanguageMenu] = useState(false);

	// Smooth scroll setup
	useEffect(() => {
		// Add smooth scrolling to the document
		document.documentElement.style.scrollBehavior = "smooth";

		return () => {
			document.documentElement.style.scrollBehavior = "auto";
		};
	}, []);

	// Content object for both languages
	const content = {
		en: {
			hero: {
				title: "The Future of Apps Is Conversational",
				subtitle:
					"We're a collective of builders rethinking how humans interact with technology — not through clicks, but through conversation, collaboration, and creativity.",
			},
			badgeGenerator: {
				title: "AI Event Badge Generator",
				description: "It started as a playful Twelve Balloons lab experiment: type a prompt and watch your badge come alive in that style, colours and motion shifting uniquely to your words.",
				features: {
					style: "Style generator → maps your text to colours, gradients, typography and textures",
					physics: "Physics generator → sets how elements move, from drift to burst",
					motion: "Motion generator → shapes animation curves and interactions",
					animation: "Animation layer → merges it all into a seamless, live loop"
				},
				cta: "What's your badge's look?",
				buttonText: "Try Badge Generator"
			},
			about: {
				title: "About the Collective",
				whoWeAre: "Who We Are",
				description1:
					"We're developers, designers, researchers, and systems thinkers exploring a new interface paradigm — one where the UI is generated, not predefined.",
				description2:
					"Our client work shapes real-world tools. But our boldest ideas begin in-house: building our own agents, testing workflows, and reimagining how humans and machines think together.",
			},
			mission: {
				title: "Our Mission",
				items: [
					"Let ideas fly — faster, lighter, bolder",
					"Build open-source tools and experiments",
					"Share patterns, practices, philosophies",
					"Teach AI-native ways of working",
					"Redesign the interface — from the prompt up",
				],
			},
			projects: {
				title: "Featured Projects",
				spotify: {
					title: "Spotify Agent",
					description:
						"A conversational UI that links natural language — voice or text — to real-time music control via Spotify.",
					status: "Prototype in progress",
				},
				badge: {
					title: "AI Event Badge Generator",
					description:
						"Type a prompt and watch your badge come alive in that style. An API-based architecture for event-ready scenarios where organisers can generate badges at scale.",
					status: "Live experiment",
				},
				viewProject: "View Project",
			},
			building: {
				title: "What We're Building",
				subtitle: "Live Experiments",
				items: [
					{
						title: "Conversational interfaces",
						description: "Apps that speak, listen, and respond",
					},
					{
						title: "Composable UI agents",
						description: "LLMs that assemble interfaces from intent",
					},
					{
						title: "Prompt-to-UI systems",
						description: "Design frameworks that respond to language",
					},
					{
						title: "Ambient interfaces",
						description: "UI that dissolves into experience",
					},
					{
						title: "Programmable surfaces",
						description: "Lightweight UI elements controlled by AI tools",
					},
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
					"Wir sind ein Schweizer Kollektiv von Entwickler:innen, Designer:innen und Strateg:innen, das digitale Interaktionen neu denkt – durch Sprache, Zusammenarbeit und intuitive Systeme statt Klicks und klassische Interfaces.",
			},
			badgeGenerator: {
				title: "KI Event-Badge-Generator",
				description: "Es begann als spielerisches Twelve Balloons Labor-Experiment: Geben Sie einen Prompt ein und beobachten Sie, wie Ihr Badge zum Leben erwacht – Stil, Farben und Bewegungen passen sich einzigartig an Ihre Worte an.",
				features: {
					style: "Stilgenerator → bildet Ihren Text auf Farben, Verläufe, Typografie und Texturen ab",
					physics: "Physikgenerator → bestimmt, wie sich Elemente bewegen, von Drift bis Burst",
					motion: "Bewegungsgenerator → formt Animationskurven und Interaktionen",
					animation: "Animationsebene → fügt alles zu einer nahtlosen, lebendigen Schleife zusammen"
				},
				cta: "Wie sieht Ihr Badge aus?",
				buttonText: "Badge-Generator ausprobieren"
			},
			about: {
				title: "Über uns – das Kollektiv",
				whoWeAre: "Wer wir sind",
				description1:
					"Wir sind Entwickler:innen, Designer:innen, Forscher:innen und Systemdenker:innen, die ein neues Interface-Paradigma erforschen – eines, bei dem die Benutzeroberfläche nicht vorgegeben, sondern generiert wird.",
				description2:
					"Unsere Arbeit mit Kund:innen führt zu echten Tools für komplexe Umgebungen. Aber unsere mutigsten Ideen entstehen intern: Wir bauen eigene Agenten, testen neue Workflows und gestalten neu, wie Menschen und Maschinen gemeinsam denken.",
			},
			mission: {
				title: "Unsere Mission",
				items: [
					"Ideen fliegen lassen – schnell, leicht, mutig",
					"Offene Tools und gewagte Experimente entwickeln",
					"Denkmuster teilen, Perspektiven öffnen",
					"KI-native Arbeitsweisen vermitteln und weitergeben",
					"Interfaces neu denken – gebaut aus Sprache",
				],
			},
			projects: {
				title: "Laufende Projekte",
				spotify: {
					title: "Spotify Agent",
					description:
						"Ein sprachgesteuertes Interface, das natürliche Sprache – per Stimme oder Text – mit Spotify verbindet. Musiksteuerung in Echtzeit, ohne klassische App.",
					status: "Prototyp in Entwicklung",
				},
				badge: {
					title: "KI Event-Badge-Generator",
					description:
						"Geben Sie einen Prompt ein und beobachten Sie, wie Ihr Badge zum Leben erwacht. Eine API-basierte Architektur für Event-fähige Szenarien, in denen Organisatoren Badges in grossem Massstab generieren können.",
					status: "Live-Experiment",
				},
				viewProject: "Projekt ansehen",
			},
			building: {
				title: "Woran wir arbeiten",
				subtitle: "Live-Experimente",
				items: [
					{
						title: "Sprachbasierte Interfaces",
						description: "Apps, die zuhören, antworten und mitdenken",
					},
					{
						title: "Modulare UI-Agenten",
						description: "Systeme, die aus Absicht und Sprache Oberflächen erzeugen",
					},
					{
						title: "Prompt-to-UI Frameworks",
						description: "Designlösungen, die direkt auf Sprache reagieren",
					},
					{
						title: "Kontextuelle Interfaces",
						description: "Schnittstellen, die sich dem Nutzungskontext anpassen",
					},
					{
						title: "Programmierbare Oberflächen",
						description: "Leichte UI-Elemente, steuerbar durch KI-Tools",
					},
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

	const currentContent = content[language];

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
					className="pt-6 relative max-w-5xl mx-auto w-full flex items-center justify-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-xl md:text-2xl font-black tracking-tight">Twelve Balloons</h1>
				</motion.header>

				{/* Floating Language Toggle - Mobile Friendly */}
				<motion.div
					className="fixed md:absolute md:top-6 top-6 right-6 z-20"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<div className="relative">
						{/* Mobile: Floating button */}
						<div className="md:hidden">
							<motion.button
								onClick={() => setShowLanguageMenu(!showLanguageMenu)}
								className="w-9 h-9 bg-white/40 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-emerald-700 font-bold border border-white/20 text-xs"
								whileTap={{ scale: 0.9 }}
								whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
							>
								{language.toUpperCase()}
							</motion.button>

							{/* Animated language options */}
							<motion.div
								className="absolute top-12 right-0 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden"
								initial={{ opacity: 0, y: -10, scale: 0.95 }}
								animate={{
									opacity: showLanguageMenu ? 1 : 0,
									y: showLanguageMenu ? 0 : -10,
									scale: showLanguageMenu ? 1 : 0.95,
								}}
								transition={{ duration: 0.2 }}
								style={{ pointerEvents: showLanguageMenu ? "auto" : "none" }}
							>
								<button
									onClick={() => {
										setLanguage("en");
										setShowLanguageMenu(false);
									}}
									className={`block w-full px-4 py-3 text-left font-bold transition-colors ${
										language === "en" ? "bg-emerald-600 text-white" : "text-emerald-700 hover:bg-white/50"
									}`}
								>
									English
								</button>
								<button
									onClick={() => {
										setLanguage("de");
										setShowLanguageMenu(false);
									}}
									className={`block w-full px-4 py-3 text-left font-bold transition-colors ${
										language === "de" ? "bg-emerald-600 text-white" : "text-emerald-700 hover:bg-white/50"
									}`}
								>
									Deutsch
								</button>
							</motion.div>
						</div>

						{/* Desktop: Sliding toggle */}
						<div className="hidden md:block relative bg-white/40 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/20">
							{/* Sliding background */}
							<motion.div
								className="absolute top-1 bottom-1 bg-emerald-600 rounded-full shadow-sm"
								animate={{
									left: language === "en" ? "4px" : "50%",
									width: language === "en" ? "calc(50% - 4px)" : "calc(50% - 4px)",
								}}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							/>

							{/* Button container */}
							<div className="relative flex">
								<button
									onClick={() => setLanguage("en")}
									className={`relative z-10 px-3 py-1 rounded-full text-sm font-bold transition-colors ${
										language === "en" ? "text-white" : "text-emerald-700 hover:text-emerald-800"
									}`}
								>
									EN
								</button>
								<button
									onClick={() => setLanguage("de")}
									className={`relative z-10 px-3 py-1 rounded-full text-sm font-bold transition-colors ${
										language === "de" ? "text-white" : "text-emerald-700 hover:text-emerald-800"
									}`}
								>
									DE
								</button>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Main Content - Split into separate boxes */}
				<div className="flex-1 flex flex-col max-w-5xl mx-auto w-full py-12">
					{/* Hero Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12">
						<div className="text-center">
							<motion.h2
								className="text-4xl md:text-6xl font-black mb-6 text-emerald-900 drop-shadow-sm tracking-tight"
								variants={titleVariants}
							>
								{currentContent.hero.title}
							</motion.h2>
							<motion.p
								className="text-lg md:text-xl max-w-3xl mx-auto text-emerald-800 font-medium drop-shadow-sm"
								variants={paragraphVariants}
							>
								{currentContent.hero.subtitle}
							</motion.p>
						</div>
					</AnimatedSection>

					{/* Badge Generator Section - NEW */}
					<AnimatedSection className="bg-gradient-to-br from-purple-50/40 to-pink-50/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 border border-purple-100/30">
						<div className="text-center">
							<motion.div
								className="inline-flex items-center gap-2 bg-purple-100/60 text-purple-800 px-4 py-2 rounded-full mb-4 font-bold text-sm"
								variants={titleVariants}
							>
								<Sparkles size={16} />
								<span>NEW LAB EXPERIMENT</span>
							</motion.div>
							
							<motion.h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent" variants={titleVariants}>
								{currentContent.badgeGenerator.title}
							</motion.h3>
							
							<motion.p className="text-lg font-medium max-w-3xl mx-auto mb-8" variants={paragraphVariants}>
								{currentContent.badgeGenerator.description}
							</motion.p>
							
							<motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto" variants={containerVariants}>
								<motion.div
									className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-purple-100"
									variants={cardVariants}
									custom={0}
								>
									<div className="text-2xl mb-2">🎨</div>
									<p className="text-sm font-bold">{currentContent.badgeGenerator.features.style}</p>
								</motion.div>
								<motion.div
									className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-purple-100"
									variants={cardVariants}
									custom={1}
								>
									<div className="text-2xl mb-2">⚙️</div>
									<p className="text-sm font-bold">{currentContent.badgeGenerator.features.physics}</p>
								</motion.div>
								<motion.div
									className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-purple-100"
									variants={cardVariants}
									custom={2}
								>
									<div className="text-2xl mb-2">💫</div>
									<p className="text-sm font-bold">{currentContent.badgeGenerator.features.motion}</p>
								</motion.div>
								<motion.div
									className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-purple-100"
									variants={cardVariants}
									custom={3}
								>
									<div className="text-2xl mb-2">🎭</div>
									<p className="text-sm font-bold">{currentContent.badgeGenerator.features.animation}</p>
								</motion.div>
							</motion.div>
							
							<motion.div className="space-y-4" variants={containerVariants}>
								<motion.p className="text-xl font-bold text-purple-900" variants={paragraphVariants}>
									{currentContent.badgeGenerator.cta}
								</motion.p>
								<motion.div variants={cardVariants} custom={5}>
									<Link
										href="https://badge.twelve-balloons.com/"
										className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Sparkles size={20} />
										{currentContent.badgeGenerator.buttonText}
										<ExternalLink size={16} />
									</Link>
								</motion.div>
							</motion.div>
						</div>
					</AnimatedSection>

					{/* About Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight" variants={titleVariants}>
							{currentContent.about.title}
						</motion.h3>

						<motion.h4 className="text-xl font-bold mb-3" variants={subtitleVariants}>
							{currentContent.about.whoWeAre}
						</motion.h4>
						<motion.p className="text-lg mb-6 font-medium max-w-3xl mx-auto" variants={paragraphVariants}>
							{currentContent.about.description1}
						</motion.p>
						<motion.p
							className="text-lg mb-6 font-medium max-w-3xl mx-auto"
							variants={paragraphVariants}
							transition={{ delay: 0.2 }}
						>
							{currentContent.about.description2}
						</motion.p>
					</AnimatedSection>

					{/* Mission Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight" variants={titleVariants}>
							{currentContent.mission.title}
						</motion.h3>
						<motion.ul className="space-y-3 text-lg font-medium max-w-3xl mx-auto" variants={containerVariants}>
							{currentContent.mission.items.map((item, index) => (
								<motion.li key={index} className="flex flex-col items-center" variants={itemVariants} custom={index}>
									<span className="font-bold mb-1">{item}</span>
								</motion.li>
							))}
						</motion.ul>
					</AnimatedSection>

					{/* Featured Projects Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12">
						<motion.h3
							className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight text-center"
							variants={titleVariants}
						>
							{currentContent.projects.title}
						</motion.h3>

						<motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col h-full"
								variants={cardVariants}
								custom={0}
								whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h4 className="text-xl font-bold mb-2">{currentContent.projects.spotify.title}</h4>
								<p className="mb-4 font-medium">{currentContent.projects.spotify.description}</p>
								<div className="flex flex-col gap-3 mt-auto">
									<span className="text-sm bg-amber-100 px-3 py-1 rounded-full font-bold self-start">
										{currentContent.projects.spotify.status}
									</span>
									<div className="flex gap-2">
										<Link
											href="https://v0.dev/community/neumorphic-design-system-ChCGgi8RVyO"
											className="flex-1 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md text-sm font-bold transition-colors text-center flex items-center justify-center gap-2"
										>
											<span className="text-white font-bold">▲</span>
											v0
										</Link>
										<Link
											href="https://miketwelveballoons.substack.com/p/when-conversation-becomes-the-ui"
											className="flex-1 px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md text-sm font-bold transition-colors flex items-center justify-center gap-1"
										>
											<Link2 size={14} />
											Substack post
										</Link>
									</div>
								</div>
							</motion.div>

							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col h-full"
								variants={cardVariants}
								custom={1}
								whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h4 className="text-xl font-bold mb-2">{currentContent.projects.badge.title}</h4>
								<p className="mb-4 font-medium">{currentContent.projects.badge.description}</p>
								<div className="flex flex-col gap-3 mt-auto">
									<span className="text-sm bg-green-100 px-3 py-1 rounded-full font-bold self-start text-green-700">
										{currentContent.projects.badge.status}
									</span>
									<Link
										href="https://badge.twelve-balloons.com/"
										className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-md text-sm font-bold transition-all text-center flex items-center justify-center gap-2"
										target="_blank"
										rel="noopener noreferrer"
									>
										Try it now
										<ExternalLink size={14} />
									</Link>
								</div>
							</motion.div>
						</motion.div>
					</AnimatedSection>

					{/* What We're Building Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight" variants={titleVariants}>
							{currentContent.building.title}
						</motion.h3>

						<motion.h4
							className="text-xl md:text-2xl font-bold mb-8 tracking-tight text-emerald-800"
							variants={subtitleVariants}
						>
							{currentContent.building.subtitle}
						</motion.h4>
						<motion.ul className="space-y-6 text-lg mb-0 font-medium max-w-3xl mx-auto" variants={containerVariants}>
							{currentContent.building.items.map((item, index) => (
								<motion.li key={index} className="flex flex-col items-center" variants={itemVariants} custom={index}>
									<span className="font-bold mb-1">{item.title}</span>
									<span className="text-emerald-700/80 text-base">{item.description}</span>
								</motion.li>
							))}
						</motion.ul>
					</AnimatedSection>

					{/* Community Section */}
					<AnimatedSection className="bg-white/40 backdrop-blur-sm rounded-xl p-8 md:p-12 mb-12 text-center">
						<motion.h3 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight" variants={titleVariants}>
							{currentContent.community.title}
						</motion.h3>

						<motion.p className="text-lg mb-6 font-medium max-w-3xl mx-auto" variants={paragraphVariants}>
							{currentContent.community.description}
						</motion.p>

						<motion.div className="grid md:grid-cols-3 gap-8 mb-8" variants={containerVariants}>
							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center"
								variants={cardVariants}
								custom={0}
								whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
									<Github size={24} className="text-emerald-700" />
								</div>
								<h4 className="text-xl font-bold mb-2">{currentContent.community.openSource.title}</h4>
								<p className="mb-4 font-medium">{currentContent.community.openSource.description}</p>
								<div className="text-gray-400 mt-auto font-bold cursor-not-allowed">
									<span>{currentContent.community.openSource.link}</span>
								</div>
							</motion.div>

							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center"
								variants={cardVariants}
								custom={1}
								whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
									<Calendar size={24} className="text-emerald-700" />
								</div>
								<h4 className="text-xl font-bold mb-2">{currentContent.community.events.title}</h4>
								<p className="mb-4 font-medium">{currentContent.community.events.description}</p>
								<div className="text-gray-400 mt-auto font-bold cursor-not-allowed">
									<span>{currentContent.community.events.link}</span>
								</div>
							</motion.div>

							<motion.div
								className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-emerald-100 flex flex-col items-center text-center"
								variants={cardVariants}
								custom={2}
								whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
									<Newspaper size={24} className="text-emerald-700" />
								</div>
								<h4 className="text-xl font-bold mb-2">{currentContent.community.news.title}</h4>
								<p className="mb-4 font-medium">{currentContent.community.news.description}</p>
								<div className="flex gap-4 mt-auto">
									<Link
										href="https://miketwelveballoons.substack.com/s/twelve-balloons"
										className="text-emerald-700 hover:text-emerald-900 font-bold"
									>
										<Newspaper size={24} />
										<span className="sr-only">Substack</span>
									</Link>
									<Link
										href="https://www.linkedin.com/company/twelve-balloons"
										className="text-emerald-700 hover:text-emerald-900 font-bold"
									>
										<Linkedin size={24} />
										<span className="sr-only">LinkedIn</span>
									</Link>
								</div>
							</motion.div>
						</motion.div>
					</AnimatedSection>
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
								<h3 className="text-xl font-black tracking-tight">Twelve Balloons</h3>
								<p className="font-bold">Let ideas fly.</p>
							</div>
							<div className="flex gap-6">
								<div className="text-gray-400 font-bold cursor-not-allowed">GitHub</div>
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
function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
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
