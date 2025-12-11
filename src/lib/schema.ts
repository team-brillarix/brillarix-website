import { FAQ } from '@/types/faq';
import { Innovator } from '@/types/innovator';
import {
  FAQPageSchema,
  Question,
  SchemaType,
  OrganizationSchema,
  WebSiteSchema,
  ServiceSchema,
  ArticleSchema,
  ReviewSchema,
  CreativeWorkSchema,
  ContactPoint,
} from '@/types/schema';

function validateFAQ(faq: FAQ): boolean {
  return !!(
    faq.question?.trim() &&
    faq.answer?.trim() &&
    faq.question.length > 0 &&
    faq.answer.length > 0
  );
}

function sanitizeText(text: string): string {
  if (typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function createQuestion(faq: FAQ): Question | null {
  if (!validateFAQ(faq)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid FAQ item skipped: ${faq.id}`, faq);
    }
    return null;
  }

  return {
    '@type': 'Question',
    name: sanitizeText(faq.question),
    acceptedAnswer: {
      '@type': 'Answer',
      text: sanitizeText(faq.answer),
    },
  };
}

export function generateFAQPageSchema(faqs: FAQ[]): FAQPageSchema {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('generateFAQPageSchema: Empty or invalid FAQs array');
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [],
    };
  }

  const questions = faqs
    .map(createQuestion)
    .filter((q): q is Question => q !== null);

  if (questions.length === 0 && process.env.NODE_ENV === 'development') {
    console.warn('generateFAQPageSchema: No valid questions generated from FAQs');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
  };
}

export function validateSchema(schema: SchemaType): boolean {
  if (!schema || typeof schema !== 'object') return false;
  if (schema['@context'] !== 'https://schema.org') return false;
  if (!schema['@type']) return false;
  return true;
}

export function generateOrganizationSchema(
  name: string,
  url: string,
  options?: {
    logo?: string;
    description?: string;
    sameAs?: string[];
    contactPoint?: ContactPoint;
  }
): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: sanitizeText(name),
    url,
    ...(options?.logo && { logo: options.logo }),
    ...(options?.description && { description: sanitizeText(options.description) }),
    ...(options?.sameAs && { sameAs: options.sameAs }),
    ...(options?.contactPoint && { contactPoint: options.contactPoint }),
  };
}

export function generateWebSiteSchema(
  name: string,
  url: string,
  options?: {
    description?: string;
    publisher?: OrganizationSchema;
  }
): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: sanitizeText(name),
    url,
    ...(options?.description && { description: sanitizeText(options.description) }),
    ...(options?.publisher && { publisher: options.publisher }),
  };
}

export function generateServiceSchema(
  serviceType: string,
  providerName: string,
  options?: {
    areaServed?: string;
    description?: string;
    offerDescription?: string;
  }
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: sanitizeText(serviceType),
    provider: {
      '@type': 'Organization',
      name: sanitizeText(providerName),
    },
    ...(options?.areaServed && { areaServed: options.areaServed }),
    ...(options?.description && { description: sanitizeText(options.description) }),
    ...(options?.offerDescription && {
      offers: {
        '@type': 'Offer',
        description: sanitizeText(options.offerDescription),
      },
    }),
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  authorName: string,
  publisherName: string,
  publisherLogo: string,
  pageUrl: string,
  options?: {
    authorUrl?: string;
    authorType?: 'Organization' | 'Person';
  }
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: sanitizeText(headline),
    description: sanitizeText(description),
    image,
    datePublished,
    author: {
      '@type': options?.authorType || 'Organization',
      name: sanitizeText(authorName),
      ...(options?.authorUrl && { url: options.authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: sanitizeText(publisherName),
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}

export function generateReviewSchema(
  organizationName: string,
  innovators: Innovator[],
  serviceName: string,
  serviceProviderName: string,
  options?: {
    ratingValue?: string;
    bestRating?: string;
    worstRating?: string;
  }
): ReviewSchema {
  const ratingValue = options?.ratingValue || '5';
  const bestRating = options?.bestRating || '5';
  const worstRating = options?.worstRating || '5';

  const reviews = innovators
    .filter((innovator) => innovator.testimonialText?.trim())
    .map((innovator) => ({
      '@type': 'Review' as const,
      author: {
        '@type': 'Person' as const,
        name: sanitizeText(innovator.name),
        ...(innovator.position && { jobTitle: sanitizeText(innovator.position) }),
      },
      reviewBody: sanitizeText(innovator.testimonialText),
      reviewRating: {
        '@type': 'Rating' as const,
        ratingValue,
        bestRating,
        worstRating,
      },
      itemReviewed: {
        '@type': 'Service' as const,
        name: sanitizeText(serviceName),
        provider: {
          '@type': 'Organization' as const,
          name: sanitizeText(serviceProviderName),
        },
      },
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: sanitizeText(organizationName),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount: reviews.length.toString(),
      bestRating,
      worstRating,
    },
    review: reviews,
  };
}

export function generateCreativeWorkSchema(
  name: string,
  description: string,
  url: string,
  creatorName: string,
  creatorUrl: string,
  publisherName: string,
  publisherLogo: string
): CreativeWorkSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: sanitizeText(name),
    description: sanitizeText(description),
    url,
    creator: {
      '@type': 'Organization',
      name: sanitizeText(creatorName),
      url: creatorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: sanitizeText(publisherName),
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
  };
}

export function stringifySchema(schema: SchemaType): string {
  try {
    if (!validateSchema(schema)) {
      throw new Error('Invalid schema structure');
    }
    return JSON.stringify(schema, null, 0);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error stringifying schema:', error, schema);
    }
    return '{}';
  }
}
