import type { Metadata, Viewport } from "next";
import { Figtree, Karla, Newsreader } from "next/font/google";
import { themeInitScript } from "@/lib/theme";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "./globals.css";

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const karla = Karla({ variable: "--font-karla", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Familie", template: "%s · Familie" },
  description: "Handleliste, oppgaver og oversikt for familien.",
  applicationName: "Familie",
  appleWebApp: { capable: true, title: "Familie", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1c1a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nb"
      data-theme="lin"
      data-mode="light"
      suppressHydrationWarning
      className={`${figtree.variable} ${karla.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
