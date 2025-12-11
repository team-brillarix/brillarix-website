import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import OurClients from '@/components/OurClients';
import OurImpact from '@/components/OurImpact/OurImpact';
import OurProcess from '@/components/OurProcess/OurProcess';
import FAQ from '@/components/FAQ/FAQ';
import InnovativeSolutions from '@/components/InnovativeSolutions';
import IndustryExpertise from '@/components/IndustryExpertise';
import ContactUs from '@/components/ContactUs';
import TrustedByInnovators from '@/components/TrustedByInnovators/TrustedByInnovators';
import SchemaScript from '@/components/SchemaScript';
import { faqs } from '@/constants/faqs';
import { generateFAQPageSchema } from '@/lib/schema';

export default function Home() {
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <div className="min-h-screen bg-background">
      <SchemaScript schema={faqSchema} id="faq-schema" />
      <Hero />
      <OurClients />
      <OurImpact />
      <InnovativeSolutions />
      <TechStack />
      <OurProcess />
      <TrustedByInnovators />
      <IndustryExpertise />
      <FAQ />
      <ContactUs />
    </div>
  );
}
