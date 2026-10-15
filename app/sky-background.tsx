"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Balloon layers cut from the original painting (public/images/balloons).
// x/y/w/h are percentages of the square artwork; d = drift cycle (s), o = phase offset (s),
// r = how fast the balloon rises while scrolling (parallax depth).
const BALLOONS = [
	{ src: "balloon-01.png", x: 28.418, y: 18.164, w: 5.664, h: 17.773, d: 9.5, o: 1.2, r: 1.15 },
	{ src: "balloon-02.png", x: 34.18, y: 10.059, w: 6.055, h: 16.309, d: 11, o: 4.1, r: 0.85 },
	{ src: "balloon-03.png", x: 37.207, y: 24.512, w: 5.664, h: 17.969, d: 8.2, o: 2.7, r: 1.3 },
	{ src: "balloon-04.png", x: 40.918, y: 5.371, w: 5.762, h: 14.258, d: 10.4, o: 6.3, r: 0.75 },
	{ src: "balloon-05.png", x: 44.043, y: 16.406, w: 5.762, h: 17.383, d: 7.6, o: 0.4, r: 1.0 },
	{ src: "balloon-06.png", x: 48.633, y: 4.59, w: 5.762, h: 18.848, d: 12, o: 3.5, r: 0.9 },
	{ src: "balloon-07.png", x: 48.73, y: 28.809, w: 5.078, h: 16.699, d: 9, o: 5.2, r: 1.4 },
	{ src: "balloon-08.png", x: 52.051, y: 18.359, w: 5.566, h: 19.141, d: 10.8, o: 1.9, r: 1.1 },
	{ src: "balloon-09.png", x: 57.227, y: 10.156, w: 5.078, h: 16.504, d: 8.7, o: 7.1, r: 0.8 },
	{ src: "balloon-10.png", x: 59.277, y: 24.414, w: 5.273, h: 18.262, d: 11.6, o: 2.2, r: 1.25 },
	{ src: "balloon-11.png", x: 63.77, y: 15.039, w: 5.469, h: 18.457, d: 9.8, o: 4.8, r: 0.95 },
];

export default function SkyBackground() {
	const reduce = useReducedMotion();

	// Balloons rise faster than the mountains while scrolling, each at its own speed.
	const { scrollY } = useScroll();

	// Very subtle pointer follow, desktop only.
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, { stiffness: 40, damping: 20 });
	const sy = useSpring(my, { stiffness: 40, damping: 20 });

	useEffect(() => {
		if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
		const onMove = (e: PointerEvent) => {
			mx.set((e.clientX / window.innerWidth - 0.5) * 14);
			my.set((e.clientY / window.innerHeight - 0.5) * 8);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, [reduce, mx, my]);

	return (
		<div className="fixed inset-0 z-0 overflow-hidden bg-paper" aria-hidden="true">
			<MeadowScrub reduce={!!reduce} />
			{/* Balloon box: starts below the header; square, phones min(64vh,145vw), from md min(82vh,120vw), so the cluster stays in the sky and clear of the hero text */}
			<div className="absolute left-1/2 top-16 aspect-square h-[min(64vh,145vw)] md:h-[min(82vh,120vw)] -translate-x-1/2">
				<motion.div className="absolute inset-0" style={reduce ? undefined : { x: sx, y: sy }}>
					{BALLOONS.map((b) => (
						<Balloon key={b.src} balloon={b} scrollY={scrollY} reduce={!!reduce} />
					))}
				</motion.div>
			</div>
		</div>
	);
}

type BalloonSpec = (typeof BALLOONS)[number];

// One balloon: own parallax layer (rise) wrapping the CSS drift/sway layer.
function Balloon({ balloon: b, scrollY, reduce }: { balloon: BalloonSpec; scrollY: MotionValue<number>; reduce: boolean }) {
	const y = useTransform(scrollY, [0, 1600], [0, -240 * b.r], { clamp: true });
	return (
		<motion.div
			className="absolute"
			style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, ...(reduce ? {} : { y }) }}
		>
			<div
				className="balloon-drift absolute inset-0"
				style={{ animationDuration: `${b.d}s`, animationDelay: `-${b.o}s` }}
			>
				<Image src={`/images/balloons/${b.src}`} alt="" fill sizes="8vw" className="object-contain" />
			</div>
		</motion.div>
	);
}

// Phones and touch devices get two images instead of the video: iOS Safari ignores preload and
// does not paint a seeked, never-played video, so the background stayed empty there.
const TOUCH_QUERY = "(pointer: coarse), (max-width: 767px)";

function useTouchLayout() {
	const [touch, setTouch] = useState<boolean | null>(null);
	useEffect(() => {
		const mq = window.matchMedia(TOUCH_QUERY);
		const update = () => setTouch(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return touch;
}

// Background painting: an 8 s transition video (meadow blooms) scrubbed by page scroll.
// Poster = start frame, so the page looks right before the video has loaded.
function MeadowScrub({ reduce }: { reduce: boolean }) {
	const touch = useTouchLayout();
	if (reduce || touch === null) {
		return <Image src="/media/meadow-start.jpg" alt="" fill priority sizes="100vw" className="object-cover object-top" />;
	}
	return touch ? <MeadowCrossfade /> : <MeadowVideo />;
}

// Touch: the bloomed end frame fades in over the start frame as the page scrolls.
function MeadowCrossfade() {
	const { scrollYProgress } = useScroll();
	const opacity = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
	return (
		<>
			<Image src="/media/meadow-start.jpg" alt="" fill priority sizes="100vw" className="object-cover object-top" />
			<motion.div className="absolute inset-0" style={{ opacity }}>
				<Image src="/media/meadow-end.jpg" alt="" fill sizes="100vw" className="object-cover object-top" />
			</motion.div>
			{/* Phones crop deep into the painting, so it reads louder: a light paper wash calms it behind the text. */}
			<div className="absolute inset-0 bg-paper/35" />
		</>
	);
}

function MeadowVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const { scrollYProgress } = useScroll();

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		let frame = 0;
		let target = scrollYProgress.get();
		// One seek at a time: fast trackpad scrolling (Safari) would otherwise queue seeks
		// that resolve late and show older frames. After each seek, catch up to the latest target.
		const seek = () => {
			frame = 0;
			if (video.readyState < 1 || !Number.isFinite(video.duration) || video.seeking) return;
			const t = Math.min(target * video.duration, video.duration - 0.05);
			if (Math.abs(video.currentTime - t) > 1 / 48) video.currentTime = t;
		};
		const unsubscribe = scrollYProgress.on("change", (p) => {
			target = p;
			if (!frame) frame = requestAnimationFrame(seek);
		});
		video.addEventListener("loadedmetadata", seek);
		video.addEventListener("seeked", seek);
		return () => {
			unsubscribe();
			cancelAnimationFrame(frame);
			video.removeEventListener("loadedmetadata", seek);
			video.removeEventListener("seeked", seek);
		};
	}, [scrollYProgress]);

	return (
		<video
			ref={videoRef}
			src="/media/meadow-bloom.mp4"
			poster="/media/meadow-start.jpg"
			muted
			playsInline
			preload="auto"
			className="absolute inset-0 h-full w-full object-cover object-top"
		/>
	);
}
