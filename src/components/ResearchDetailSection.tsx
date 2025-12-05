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
      <section className="min-h-[calc(100vh-65px)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <button onClick={onBack} className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </button>
          <p className="text-muted-foreground">Research area not found.</p>
        </div>
      </section>
    );
  }

  // Group publications by year
  const pubsByYear = publications.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<string, typeof publications>);

  const years = Object.keys(pubsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-fade-in">
          <button onClick={onBack} className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </button>

          <h1 className="text-4xl md:text-5xl font-serif font-normal leading-tight mb-6">
            {area.title}
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed mb-12 text-muted-foreground max-w-4xl">
            {area.description}
          </p>

          {publications.length > 0 ? (
            <>
              <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8">
                Related Publications
              </h2>

              {years.map((year) => (
                <div key={year} className="mb-12">
                  <h3 className="text-xl font-serif font-normal mb-6 text-muted-foreground">
                    {year}
                  </h3>
                  
                  <div className="space-y-8">
                    {pubsByYear[year].map((pub, index) => (
                      <div key={index} className="flex gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={pub.image}
                            alt={pub.title}
                            className="w-36 h-28 object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg font-medium text-foreground mb-1 leading-snug">
                            {pub.title}
                          </h4>
                          <p className="text-sm text-accent mb-1">
                            {pub.authors}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {pub.venue}
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {pub.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-accent transition-colors"
                              >
                                {link.text}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-muted-foreground">No publications in this area yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
