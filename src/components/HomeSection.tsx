import { getContent, parseHomeContent } from '@/lib/content';
import ReactMarkdown from 'react-markdown';

export function HomeSection() {
  const content = getContent('home');
  const { titleLines, description, links } = parseHomeContent(content);

  return (
    <section className="section-page flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="section-content">
            <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-8">
              {titleLines.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="prose-academic mb-8">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>

            <div className="flex flex-wrap gap-6">
              {links.map((link) => (
                <a
                  key={link.text}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop"
              alt="Robot arm"
              className="max-w-md w-full h-auto section-content rounded-lg shadow-lg"
              style={{ animationDelay: '0.15s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
