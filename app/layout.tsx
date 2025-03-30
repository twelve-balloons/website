import type React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
});

export const metadata = {
	title: "Twelve Balloon - The Future of Apps is Conversational",
	description:
		"We're a collective of builders exploring how large language models (LLMs) can shape the way humans interact with technology.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${montserrat.className} bg-white`}
		>
			<body className="min-h-screen">
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
