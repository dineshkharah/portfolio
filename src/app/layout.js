import "./globals.css";
import { profile, site } from "@/content/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
