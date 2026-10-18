import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
});

const title = "Twelve Balloons: The Future of Apps Is Conversational";
const description =
	"A collective of builders exploring how large language models can shape the way humans interact with technology. Let ideas fly.";

// The social preview image is app/opengraph-image.jpg (picked up by file convention).
export const metadata: Metadata = {
	metadataBase: new URL("https://www.twelve-balloons.com"),
	title,
	description,
	openGraph: {
		type: "website",
		url: "/",
		siteName: "Twelve Balloons",
		title,
		description,
		locale: "en_US",
		alternateLocale: ["de_CH"],
	},
	twitter: { card: "summary_large_image", title, description },
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
			{/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject attributes into <body> */}
			<body className="min-h-screen" suppressHydrationWarning>
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
