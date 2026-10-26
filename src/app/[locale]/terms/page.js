import { LegalPage } from "@/components/shared/LegalPage";
import { termsAndConditions } from "@/data/legal";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/terms", title: dict.meta.terms.title, description: dict.meta.terms.description });
}

export default async function TermsPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return <LegalPage locale={locale} dict={dict} path="/terms" title={dict.legal.termsTitle} document={termsAndConditions} />;
}
