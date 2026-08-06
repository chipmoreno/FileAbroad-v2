import { SiteDictionary } from "@/lib/i18n/types";

interface Props {
  dict: SiteDictionary;
}

export default function EditorialPolicyPageContent({ dict }: Props) {
  const d = dict.editorialPolicy;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold font-sans text-foreground mt-8 mb-6">
        {d.heroTitle}
      </h1>
      <div className="prose prose-lg prose-fileabroad max-w-none">
        <h2>{d.sectionSources}</h2>
        <p>{d.sectionSourcesContent}</p>
        <h2>{d.sectionCredentials}</h2>
        <p>{d.sectionCredentialsContent}</p>
        <h2>{d.sectionCorrections}</h2>
        <p>{d.sectionCorrectionsContent}</p>
      </div>
    </div>
  );
}
