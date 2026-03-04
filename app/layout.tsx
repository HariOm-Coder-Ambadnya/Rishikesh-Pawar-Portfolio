import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: "Rishikesh Pawar — Java Full Stack Developer",
        template: "%s | Rishikesh Pawar",
    },
    description:
        "Java Full Stack Developer specialising in React, Spring Boot, REST APIs and MySQL. Building robust, scalable web applications with clean design.",
    keywords: [
        "Rishikesh Pawar",
        "Java Full Stack Developer",
        "React Developer",
        "Spring Boot",
        "REST API",
        "MySQL",
        "Portfolio",
        "Web Developer India",
    ],
    authors: [{ name: "Rishikesh Pawar", url: "https://github.com" }],
    creator: "Rishikesh Pawar",
    metadataBase: new URL("https://rishikesh-pawar.vercel.app"),
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://rishikesh-pawar.vercel.app",
        siteName: "Rishikesh Pawar Portfolio",
        title: "Rishikesh Pawar — Java Full Stack Developer",
        description:
            "Java Full Stack Developer specialising in React, Spring Boot, REST APIs and MySQL.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rishikesh Pawar — Java Full Stack Developer",
        description:
            "Java Full Stack Developer specialising in React, Spring Boot, REST APIs and MySQL.",
        creator: "@rishikeshpawar",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable} antialiased bg-zinc-950 text-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navigation />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
