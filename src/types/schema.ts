export interface SchemaContext {
    '@context': 'https://schema.org';
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
    name: string;
    url: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    contactPoint?: ContactPoint;
}

export interface ContactPoint {
    '@type': 'ContactPoint';
    contactType: string;
    email?: string;
    telephone?: string;
    availableLanguage?: string;
}

export interface WebSiteSchema extends SchemaContext {
    '@type': 'WebSite';
    name: string;
    url: string;
    description?: string;
    publisher?: OrganizationSchema;
}

export interface ServiceSchema extends SchemaContext {
    '@type': 'Service';
    serviceType: string;
    provider: {
        '@type': 'Organization';
        name: string;
    };
    areaServed?: string;
    description?: string;
    offers?: {
        '@type': 'Offer';
        description: string;
    };
}

export interface ArticleSchema extends SchemaContext {
    '@type': 'Article';
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    author: {
        '@type': 'Organization' | 'Person';
        name: string;
        url?: string;
    };
    publisher: {
        '@type': 'Organization';
        name: string;
        logo: {
            '@type': 'ImageObject';
            url: string;
        };
    };
    mainEntityOfPage: {
        '@type': 'WebPage';
        '@id': string;
    };
}

export interface ReviewSchema extends SchemaContext {
    '@type': 'Organization';
    name: string;
    aggregateRating: {
        '@type': 'AggregateRating';
        ratingValue: string;
        reviewCount: string;
        bestRating: string;
        worstRating: string;
    };
    review: Array<{
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
        itemReviewed: {
            '@type': 'Service';
            name: string;
            provider: {
                '@type': 'Organization';
                name: string;
            };
        };
    }>;
}

export interface CreativeWorkSchema extends SchemaContext {
    '@type': 'CreativeWork';
    name: string;
    description: string;
    url: string;
    creator: {
        '@type': 'Organization';
        name: string;
        url: string;
    };
    publisher: {
        '@type': 'Organization';
        name: string;
        logo: {
            '@type': 'ImageObject';
            url: string;
        };
    };
}

export type SchemaType =
    | FAQPageSchema
    | OrganizationSchema
    | WebSiteSchema
    | ServiceSchema
    | ArticleSchema
    | ReviewSchema
    | CreativeWorkSchema;
