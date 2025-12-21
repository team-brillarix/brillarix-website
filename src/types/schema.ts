export interface SchemaContext {
    '@context': 'https://schema.org';
}

export interface IdReference {
    '@id': string;
}

export interface Question {
    '@type': 'Question';
    name: string;
    acceptedAnswer: Answer;
}

export interface Answer {
    '@type': 'Answer';
    text: string;
}

export interface FAQPageSchema extends SchemaContext {
    '@type': 'FAQPage';
    mainEntity: Question[];
}

export interface OrganizationSchema extends SchemaContext {
    '@type': 'Organization';
    '@id'?: string;
    name: string;
    url: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    contactPoint?: ContactPoint;
    founder?: {
        '@type': 'Person';
        name: string;
        jobTitle?: string;
        url?: string;
        sameAs?: string[];
    };
}

export interface ContactPoint {
    '@type': 'ContactPoint';
    contactType: string;
    email?: string;
    telephone?: string;
    availableLanguage?: string;
}

export interface PostalAddress {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
}

export interface WebSiteSchema extends SchemaContext {
    '@type': 'WebSite';
    '@id'?: string;
    name: string;
    url: string;
    description?: string;
    publisher?: OrganizationSchema | IdReference;
}

export interface ServiceSchema extends SchemaContext {
    '@type': 'Service';
    '@id'?: string;
    serviceType: string;
    provider: OrganizationSchema | IdReference;
    areaServed?: string;
    description?: string;
    offers?: {
        '@type': 'Offer';
        description: string;
    };
}

export interface LocalBusinessSchema extends SchemaContext {
    '@type': 'LocalBusiness';
    '@id': string;
    name: string;
    url: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    email?: string;
    address?: PostalAddress;
    contactPoint?: ContactPoint;
    parentOrganization?: IdReference;
    areaServed?: string;
    aggregateRating?: {
        '@type': 'AggregateRating';
        ratingValue: string;
        reviewCount: string;
        bestRating: string;
        worstRating: string;
    };
    review?: Array<{
        '@type': 'Review';
        author: {
            '@type': 'Person';
            name: string;
            jobTitle?: string;
        };
        reviewBody: string;
        reviewRating: {
            '@type': 'Rating';
            ratingValue: string;
            bestRating: string;
            worstRating: string;
        };
    }>;
}

export type SchemaType =
    | FAQPageSchema
    | OrganizationSchema
    | LocalBusinessSchema
    | WebSiteSchema
    | ServiceSchema
    ;
