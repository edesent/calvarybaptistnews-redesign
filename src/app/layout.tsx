import type { Metadata, Viewport } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import { SITE, SERVICES } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.city}, Tennessee`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Calvary Baptist Church McMinnville",
    "Independent Baptist church McMinnville TN",
    "Baptist church Warren County Tennessee",
    "KJV church McMinnville",
    "King James Bible church Tennessee",
    "church near me McMinnville TN",
    "Sunday School McMinnville",
    "Bible preaching church",
    "610 Myers Lane McMinnville",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.city}, Tennessee`,
    description: SITE.description,
    url: SITE.url,
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    images: [
      {
        url: "/img/tabernacle.jpg",
        width: 1728,
        height: 741,
        alt: "The Tabernacle at Calvary Baptist Church, 610 Myers Lane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.city}, Tennessee`,
    description: SITE.description,
    images: ["/img/tabernacle.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true },
  category: "religion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#84284d",
  colorScheme: "light",
};

/**
 * Structured data. Search engines read this to show service times and the map
 * pin directly in results. The church's phone lives here on purpose — it is
 * the church office line the congregation already publishes.
 */
function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${SITE.url}/#church`,
    name: SITE.name,
    alternateName: "Calvary Baptist McMinnville",
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    foundingDate: String(SITE.founded),
    slogan: SITE.tagline,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/img/tabernacle.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 35.6584, longitude: -85.7183 },
    sameAs: [SITE.facebookUrl, SITE.youtubeUrl],
    employee: { "@type": "Person", name: SITE.pastor, jobTitle: "Pastor" },
    event: SERVICES.map((s) => ({
      "@type": "Event",
      name: s.name,
      startDate: s.time,
      eventSchedule: {
        "@type": "Schedule",
        byDay: `https://schema.org/${s.day}`,
        repeatFrequency: "P1W",
      },
      location: {
        "@type": "Place",
        name: SITE.name,
        address: SITE.address.full,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lora.variable} ${source.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-wine focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
