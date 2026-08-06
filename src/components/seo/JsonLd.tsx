interface JsonLdProps {
  data: Record<string, unknown>;
}

// Safe: data is always server-generated structured data, never user input
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
