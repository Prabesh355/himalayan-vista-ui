import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import logoIcon from "@/assets/nomads-logo-official.png?url";
import { CurrencyProvider } from "@/context/CurrencyProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { MessageCircle } from "lucide-react";
import { AnalyticsScripts, getVerificationMeta } from "@/components/Analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nomads Navigate Nepal — Himalayan Treks & Adventures" },
      {
        name: "description",
        content:
          "Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011.",
      },
      { name: "keywords", content: "Nepal Trekking, Everest Base Camp Trek, Annapurna Base Camp, Peak Climbing, Nepal Tours, Himalayan Adventures" },
      { name: "author", content: "Nomads Navigate Nepal" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#f59e0b" },
      { property: "og:title", content: "Nomads Navigate Nepal — Himalayan Treks & Adventures" },
      {
        property: "og:description",
        content: "Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoIcon },
      { property: "og:site_name", content: "Nomads Navigate Nepal" },
      { property: "og:url", content: "https://nomadsnavigatenepal.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@NomadsNepal" },
      { name: "twitter:title", content: "Nomads Navigate Nepal — Himalayan Treks & Adventures" },
      { name: "twitter:description", content: "Premium Himalayan trekking and adventure travel, locally led." },
      { name: "twitter:image", content: logoIcon },
      ...getVerificationMeta(),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon-192x192.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark theme-sunset" style={{ colorScheme: "dark" }}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <AnalyticsScripts />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const isAdminRoute = router.state.location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        {isAdminRoute ? (
          <div className="min-h-screen bg-background">
            <Outlet />
          </div>
        ) : (
          <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 pt-[88px] pb-20">
              <Outlet />
            </main>
            <Footer />
            <WhatsAppShortcut />
          </div>
        )}
      </CurrencyProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

function WhatsAppShortcut() {
  const router = useRouter();
  const isPackageDetailsRoute = router.state.location.pathname.startsWith("/packages/");
  const whatsappNumber = "+9779769364689";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20have%20an%20inquiry.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Send inquiry on WhatsApp"
      title="Need help"
      className={`group fixed right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant ring-1 ring-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 sm:right-5 sm:h-14 sm:w-14 ${
        isPackageDetailsRoute ? "hidden lg:inline-flex bottom-20 sm:bottom-24" : "bottom-4 sm:bottom-5"
      }`}
    >
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 shadow-lg transition-all duration-200 group-hover:block group-focus-visible:block sm:block sm:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
        Need help
      </span>
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
