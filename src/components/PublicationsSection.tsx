import { getContent, parsePublicationsContent } from '@/lib/content';

export function PublicationsSection() {
  const content = getContent('publications');
  const { title, publications } = parsePublicationsContent(content);

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
    <section className="section-page">
      <div className="section-container">
        <div className="section-content">
          <h1 className="section-title">
            {title}
          </h1>

          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8 text-muted-foreground">
                {year}
              </h2>

              <div className="space-y-8">
                {pubsByYear[year].map((pub, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
