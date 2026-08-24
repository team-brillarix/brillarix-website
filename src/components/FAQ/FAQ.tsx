import { faqs } from '@/constants/faqs';
import SchemaScript from '@/components/SchemaScript';
import { generateFAQPageSchema } from '@/lib/schema';
import FAQClient from './FAQClient';

export default function FAQ() {
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <SchemaScript schema={faqSchema} id="faq-schema" />
      <FAQClient faqs={faqs} />
    </>
  );
}

