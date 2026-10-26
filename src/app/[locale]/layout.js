import "../globals.css";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site, whatsappHref } from "@/data/site";
import { getDictionary } from "@/lib/dictionaries";
import { fontVariables } from "@/lib/fonts";
import { getDirection, hasLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  const base = buildMetadata({
    locale,
    path: "/",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    absoluteTitle: true,
  });

  return {
    ...base,
    metadataBase: new URL(site.url),
    title: { default: dict.meta.home.title, template: `%s | ${site.name}` },
    applicationName: site.name,
    robots: { index: true, follow: true },
    // Google Search Console ownership check (renders <meta name="google-site-verification">).
    verification: { google: "CWD7XdRq_sC7j4vcmQQtd0hfaCc4T-fyIiHNMH3Ykvs" },
  };
}

export const viewport = {
  themeColor: "#1c252d",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={getDirection(locale)} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <NextTopLoader color="#c5a052" height={3} showSpinner={false} shadow={false} zIndex={1600} />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-charcoal px-4 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
        >
          {dict.common.skipToContent}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <FloatingActions
          whatsappHref={whatsappHref(dict.contact.form.messageIntro)}
          labels={{
            whatsapp: dict.common.chatOnWhatsapp,
            scrollToTop: dict.common.scrollToTop,
            scrollToBottom: dict.common.scrollToBottom,
          }}
        />
      </body>
    </html>
  );
}
