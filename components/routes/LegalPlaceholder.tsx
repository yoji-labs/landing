import { SectionEyebrow } from "@/components/landing/SectionEyebrow";

interface LegalPlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function LegalPlaceholder({
  eyebrow,
  title,
  description,
}: LegalPlaceholderProps) {
  return (
    <section className="container-shell py-14 lg:py-18">
      <div className="mx-auto max-w-4xl space-y-8">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1 className="max-w-full text-[2.5rem] sm:max-w-[12ch] sm:text-6xl">{title}</h1>
        <div className="card-surface px-6 py-8 sm:px-8">
          <p className="mx-auto max-w-[68ch] break-words text-base leading-8 text-text-muted">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
