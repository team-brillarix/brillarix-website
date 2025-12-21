import SchemaScript from '@/components/SchemaScript';
import { innovatorsData } from '@/constants/innovators';
import { generateReviewSchema } from '@/lib/schema';
import TrustedByInnovatorsClient from './TrustedByInnovatorsClient';

export default function TrustedByInnovators() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.brillarix.com';
  const organizationId = `${baseUrl}#organization`;

  const reviewSchema = generateReviewSchema(innovatorsData, {
    businessId: organizationId,
    businessName: 'Brillarix',
    businessUrl: baseUrl,
  });

  return (
    <>
      <SchemaScript schema={reviewSchema} id="review-schema" />
      <TrustedByInnovatorsClient innovators={innovatorsData} />
    </>
  );
}