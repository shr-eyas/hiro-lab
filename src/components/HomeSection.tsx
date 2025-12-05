import { useEffect, useState } from 'react';
import { getContent, parseHomeContent } from '@/lib/content';
import ReactMarkdown from 'react-markdown';

export function HomeSection() {
  const content = getContent('home');
  const { titleLines, description, links } = parseHomeContent(content);

  // Ensures animation runs ONLY after the component mounts (prevents double fade-in)
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="section-page flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-opacity duration-700 ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}>

          {/* Left side content */}
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

          {/* Right image */}
          <div className="hidden lg:flex justify-end">
            <img
              src="src/assets/hiro_lab.jpg"
              alt="HiRo Lab"
              className={`max-w-md w-full h-auto transition-opacity duration-700 delay-150 ${
                animate ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
