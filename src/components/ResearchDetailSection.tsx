import { getResearchAreaBySlug, getPublicationsByArea } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';

interface ResearchDetailSectionProps {
  areaSlug: string;
  onBack: () => void;
}

export function ResearchDetailSection({ areaSlug, onBack }: ResearchDetailSectionProps) {
  const area = getResearchAreaBySlug(areaSlug);
  const publications = getPublicationsByArea(areaSlug);

  if (!area) {
    return (
      <section className="section-page">
        <div className="section-container">
          <button onClick={onBack} className="link-button mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </button>
          <p>Research area not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-page">
      <div className="section-container">
        <div className="section-content">
          <button onClick={onBack} className="link-button mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </button>

          <h1 className="section-title">{area.title}</h1>

          <div className="mb-12">
            <img
              src={area.image}
              alt={area.title}
              className="w-full max-w-3xl h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              {area.description}
            </p>
          </div>

          {publications.length > 0 && (
            <div>
              <h2 className="faculty-section-title">Related Publications</h2>
              <div className="space-y-8">
                {publications.map((pub, index) => (
                  <div key={index} className="publication-card">
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="publication-image"
                    />
                    <div className="publication-content">
                      <h3 className="font-serif text-lg font-medium text-foreground mb-1 leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
                      <p className="text-sm text-muted-foreground italic mb-2">{pub.venue}</p>
                      {pub.links.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {pub.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-accent hover:text-accent/80 transition-colors"
                            >
                              [{link.text}]
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
