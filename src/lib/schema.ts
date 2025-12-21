import { FAQ } from '@/types/faq';
import { Innovator } from '@/types/innovator';
import {
  FAQPageSchema,
  Question,
  SchemaType,
  OrganizationSchema,
  IdReference,
  LocalBusinessSchema,
  WebSiteSchema,
  ServiceSchema,
  ContactPoint,
  PostalAddress,
} from '@/types/schema';

const SCHEMA_CONTEXT = 'https://schema.org' as const;

const TAG_RE = /<[^>]*>/g;
const WS_RE = /\s+/g;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function asIdRef(id: unknown): IdReference | undefined {
  if (!isNonEmptyString(id)) return undefined;
  return { '@id': id.trim() };
}

function sanitizeText(value: unknown): string {
  if (!isNonEmptyString(value)) return '';
  return value.replace(TAG_RE, '').replace(WS_RE, ' ').trim();
}

function sanitizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const cleaned = value
    .map(sanitizeText)
    .filter((s) => s.length > 0);

  const unique = Array.from(new Set(cleaned));
  return unique.length > 0 ? unique : undefined;
}

function buildContactPoint(value?: ContactPoint): ContactPoint | undefined {
  if (!value) return undefined;

  const contactType = sanitizeText(value.contactType);
  if (!contactType) return undefined;

  return {
    '@type': 'ContactPoint',
    contactType,
    ...(isNonEmptyString(value.email) && { email: value.email.trim() }),
    ...(isNonEmptyString(value.telephone) && { telephone: value.telephone.trim() }),
    ...(isNonEmptyString(value.availableLanguage) && {
      availableLanguage: sanitizeText(value.availableLanguage),
    }),
  };
}

function sanitizeRatingValue(value: unknown, fallback: string): string {
  return isNonEmptyString(value) ? value.trim() : fallback;
}

function buildPostalAddress(value?: PostalAddress): PostalAddress | undefined {
  if (!value) return undefined;

  const streetAddress = sanitizeText(value.streetAddress);
  const addressLocality = sanitizeText(value.addressLocality);
  const addressRegion = sanitizeText(value.addressRegion);
  const postalCode = sanitizeText(value.postalCode);
  const addressCountry = sanitizeText(value.addressCountry);

  if (!streetAddress || !addressLocality || !addressRegion || !postalCode || !addressCountry) {
    return undefined;
  }

  return {
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
  };
}

function createQuestion(faq: FAQ): Question | null {
  if (!isNonEmptyString(faq.question) || !isNonEmptyString(faq.answer)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid FAQ item skipped: ${faq.id ?? '(missing id)'}`);
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
      '@context': SCHEMA_CONTEXT,
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
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: questions,
  };
}

export function validateSchema(schema: unknown): schema is SchemaType {
  if (!schema || typeof schema !== 'object') return false;
  const s = schema as Record<string, unknown>;

  if (s['@context'] !== SCHEMA_CONTEXT) return false;
  if (!isNonEmptyString(s['@type'])) return false;

  return true;
}

export function generateOrganizationSchema(
  name: string,
  url: string,
  options?: {
    id?: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    contactPoint?: ContactPoint;
    founder?: {
      name: string;
      jobTitle?: string;
      url?: string;
      sameAs?: string[];
    };
  }
): OrganizationSchema {
  const sameAs = sanitizeStringArray(options?.sameAs);
  const contactPoint = buildContactPoint(options?.contactPoint);
  const founderSameAs = sanitizeStringArray(options?.founder?.sameAs);
  const description = sanitizeText(options?.description);
  const idRef = asIdRef(options?.id);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    ...(idRef && { '@id': idRef['@id'] }),
    name: sanitizeText(name),
    url: url.trim(),
    ...(isNonEmptyString(options?.logo) && { logo: options.logo.trim() }),
    ...(description && { description }),
    ...(sameAs && { sameAs }),
    ...(contactPoint && { contactPoint }),
    ...(options?.founder && {
      founder: {
        '@type': 'Person',
        name: sanitizeText(options.founder.name),
        ...(options.founder.jobTitle && { jobTitle: sanitizeText(options.founder.jobTitle) }),
        ...(isNonEmptyString(options.founder.url) && { url: options.founder.url.trim() }),
        ...(founderSameAs && { sameAs: founderSameAs }),
      },
    }),
  };
}

export function generateLocalBusinessSchema(options: {
  id: string; // should match the Organization @id so JSON-LD merges the entity
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  email?: string;
  address?: PostalAddress;
  contactPoint?: ContactPoint;
  parentOrganizationId?: string;
  areaServed?: string;
}): LocalBusinessSchema {
  const sameAs = sanitizeStringArray(options.sameAs);
  const description = sanitizeText(options.description);
  const contactPoint = buildContactPoint(options.contactPoint);
  const parentOrganization = asIdRef(options.parentOrganizationId);
  const email = isNonEmptyString(options.email) ? options.email.trim() : undefined;
  const areaServed = sanitizeText(options.areaServed);
  const address = buildPostalAddress(options.address);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'LocalBusiness',
    '@id': options.id.trim(),
    name: sanitizeText(options.name),
    url: options.url.trim(),
    ...(isNonEmptyString(options.logo) && { logo: options.logo.trim() }),
    ...(description && { description }),
    ...(sameAs && { sameAs }),
    ...(email && { email }),
    ...(address && { address }),
    ...(contactPoint && { contactPoint }),
    ...(parentOrganization && { parentOrganization }),
    ...(areaServed && { areaServed }),
  };
}

export function generateWebSiteSchema(
  name: string,
  url: string,
  options?: {
    id?: string;
    description?: string;
    publisher?: OrganizationSchema | IdReference;
  }
): WebSiteSchema {
  const description = sanitizeText(options?.description);
  const idRef = asIdRef(options?.id);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    ...(idRef && { '@id': idRef['@id'] }),
    name: sanitizeText(name),
    url: url.trim(),
    ...(description && { description }),
    ...(options?.publisher && { publisher: options.publisher }),
  };
}

export function generateServiceSchema(
  serviceType: string,
  provider: OrganizationSchema | IdReference,
  options?: {
    id?: string;
    areaServed?: string;
    description?: string;
    offerDescription?: string;
  }
): ServiceSchema {
  const areaServed = sanitizeText(options?.areaServed);
  const description = sanitizeText(options?.description);
  const offerDescription = sanitizeText(options?.offerDescription);
  const idRef = asIdRef(options?.id);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Service',
    ...(idRef && { '@id': idRef['@id'] }),
    serviceType: sanitizeText(serviceType),
    provider,
    ...(areaServed && { areaServed }),
    ...(description && { description }),
    ...(offerDescription && {
      offers: {
        '@type': 'Offer',
        description: offerDescription,
      },
    }),
  };
}

export function generateReviewSchema(
  innovators: Innovator[],
  options: {
    businessId: string;
    businessName: string;
    businessUrl: string;
    ratingValue?: string;
    bestRating?: string;
    worstRating?: string;
  }
): LocalBusinessSchema {
  const ratingValue = sanitizeRatingValue(options.ratingValue, '5');
  const bestRating = sanitizeRatingValue(options.bestRating, '5');
  const worstRating = sanitizeRatingValue(options.worstRating, '5');
  const businessId = options.businessId.trim();

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
    }));

  const base: LocalBusinessSchema = {
    '@context': SCHEMA_CONTEXT,
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: sanitizeText(options.businessName),
    url: options.businessUrl.trim(),
  };

  if (reviews.length === 0) return base;

  return {
    ...base,
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

export function stringifySchema(schema: SchemaType): string {
  if (!validateSchema(schema)) return '{}';

  try {
    return JSON.stringify(schema);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error stringifying schema:', error);
    }
    return '{}';
  }
}
