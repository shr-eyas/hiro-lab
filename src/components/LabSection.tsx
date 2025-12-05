import { useState, useEffect, useCallback } from 'react';
import { getContent, parseLabContent } from '@/lib/content';

interface LabSectionProps {
  onFacultyClick?: () => void;
}

export function LabSection({ onFacultyClick }: LabSectionProps) {
  const content = getContent('lab');
  const { sections, carouselImages } = parseLabContent(content);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Page mount fade-in control
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Component becomes visible AFTER it mounts
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Carousel logic
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, carouselImages.length]);

  return (
    <section
      className={`
        min-h-[calc(100vh-65px)] pt-8
        transition-opacity duration-500
        ${mounted ? 'opacity-100' : 'opacity-0'}
      `}
    >

      {/* ------------------------- */}
      {/* Carousel */}
      {/* ------------------------- */}
      {carouselImages.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-md relative">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselImages.map((img, index) => (
                <div
                  key={index}
                  className="min-w-full aspect-[2/1] bg-black/5"
                >
                  <img
                    src={img}
                    alt={`Lab photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------- */}
      {/* Members Sections */}
      {/* ------------------------- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={sectionIndex < sections.length - 1 ? 'mb-16' : ''}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8">
              {section.title}
            </h2>

            <div
              className={`grid gap-10 ${
                section.title === 'Faculty'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center'
              }`}
            >
              {section.members.map((member, index) => {
                const isInternal = member.link.startsWith('/');

                const Card = (
                  <>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 object-cover rounded mb-3 mx-auto"
                    />
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {section.title === 'Faculty'
                        ? member.role.split(',')[0]
                        : member.role}
                    </p>
                  </>
                );

                // INTERNAL → Scroll to top instantly, then navigate
                if (isInternal && onFacultyClick) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        window.scrollTo(0, 0); // no animation
                        onFacultyClick();
                      }}
                      className="group text-center focus:outline-none"
                    >
                      {Card}
                    </button>
                  );
                }

                // EXTERNAL
                return (
                  <a
                    key={index}
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    {Card}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
