"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Balloon layers cut from the original painting (public/images/balloons).
// x/y/w/h are percentages of the square artwork; d = drift cycle (s), o = phase offset (s).
const BALLOONS = [
	{ src: "balloon-01.png", x: 28.418, y: 18.164, w: 5.664, h: 17.773, d: 9.5, o: 1.2 },
	{ src: "balloon-02.png", x: 34.18, y: 10.059, w: 6.055, h: 16.309, d: 11, o: 4.1 },
	{ src: "balloon-03.png", x: 37.207, y: 24.512, w: 5.664, h: 17.969, d: 8.2, o: 2.7 },
	{ src: "balloon-04.png", x: 40.918, y: 5.371, w: 5.762, h: 14.258, d: 10.4, o: 6.3 },
	{ src: "balloon-05.png", x: 44.043, y: 16.406, w: 5.762, h: 17.383, d: 7.6, o: 0.4 },
	{ src: "balloon-06.png", x: 48.633, y: 4.59, w: 5.762, h: 18.848, d: 12, o: 3.5 },
	{ src: "balloon-07.png", x: 48.73, y: 28.809, w: 5.078, h: 16.699, d: 9, o: 5.2 },
	{ src: "balloon-08.png", x: 52.051, y: 18.359, w: 5.566, h: 19.141, d: 10.8, o: 1.9 },
	{ src: "balloon-09.png", x: 57.227, y: 10.156, w: 5.078, h: 16.504, d: 8.7, o: 7.1 },
	{ src: "balloon-10.png", x: 59.277, y: 24.414, w: 5.273, h: 18.262, d: 11.6, o: 2.2 },
	{ src: "balloon-11.png", x: 63.77, y: 15.039, w: 5.469, h: 18.457, d: 9.8, o: 4.8 },
];

export default function SkyBackground() {
	const reduce = useReducedMotion();

	// Balloons rise faster than the mountains while scrolling.
	const { scrollY } = useScroll();
	const rise = useTransform(scrollY, [0, 1600], [0, -220], { clamp: true });

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
			{/* Square artwork sized like object-cover, anchored to the top so the balloons stay in view */}
			<div className="absolute left-1/2 top-0 aspect-square w-[max(100vw,100vh)] -translate-x-1/2">
				<Image src="/images/mountain-sky.png" alt="" fill priority sizes="100vw" className="object-cover" />
				<motion.div className="absolute inset-0" style={reduce ? undefined : { y: rise }}>
					<motion.div className="absolute inset-0" style={reduce ? undefined : { x: sx, y: sy }}>
						{BALLOONS.map((b) => (
							<div
								key={b.src}
								className="balloon-drift absolute"
								style={{
									left: `${b.x}%`,
									top: `${b.y}%`,
									width: `${b.w}%`,
									height: `${b.h}%`,
									animationDuration: `${b.d}s`,
									animationDelay: `-${b.o}s`,
								}}
							>
								<Image src={`/images/balloons/${b.src}`} alt="" fill sizes="8vw" className="object-contain" />
							</div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
