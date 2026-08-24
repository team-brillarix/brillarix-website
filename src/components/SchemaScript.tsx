import { SchemaType } from '@/types/schema';
import { stringifySchema, validateSchema } from '@/lib/schema';

interface SchemaScriptProps {
  schema: SchemaType;
  id?: string;
}

export default function SchemaScript({ schema, id }: SchemaScriptProps) {
  if (process.env.NODE_ENV === 'development' && !validateSchema(schema)) {
    console.error('SchemaScript: Invalid schema provided', schema);
    return null;
  }

  const jsonLd = stringifySchema(schema);

  if (!jsonLd || jsonLd === '{}') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SchemaScript: Empty or invalid schema, not rendering');
    }
    return null;
  }

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
    />
  );
}
