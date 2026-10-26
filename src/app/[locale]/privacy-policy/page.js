import { LegalPage } from "@/components/shared/LegalPage";
import { privacyPolicy } from "@/data/legal";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/privacy-policy", title: dict.meta.privacy.title, description: dict.meta.privacy.description });
}

export default async function PrivacyPolicyPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return <LegalPage locale={locale} dict={dict} path="/privacy-policy" title={dict.legal.privacyTitle} document={privacyPolicy} />;
}
