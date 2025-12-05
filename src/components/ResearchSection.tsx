import { getContent, parseResearchContent } from '@/lib/content';

interface ResearchSectionProps {
  onAreaClick: (slug: string) => void;
}

export function ResearchSection({ onAreaClick }: ResearchSectionProps) {
  const content = getContent('research');
  const { title, intro, areas } = parseResearchContent(content);

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-normal leading-tight mb-8">
            {title}
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed mb-16 text-muted-foreground max-w-4xl">
            {intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {areas.map((area) => (
              <button
                key={area.slug}
                onClick={() => onAreaClick(area.slug)}
                className="group text-left"
              >
                <div className="bg-card rounded-lg shadow-sm overflow-hidden mb-4 border border-border/50 transition-shadow group-hover:shadow-md">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-serif text-accent text-center leading-snug group-hover:text-accent/80 transition-colors">
                  {area.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
