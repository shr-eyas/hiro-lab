import { useState, useEffect, useCallback } from 'react';
import { getContent, parseLabContent } from '@/lib/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LabSectionProps {
  onFacultyClick?: () => void;
}

export function LabSection({ onFacultyClick }: LabSectionProps) {
  const content = getContent('lab');
  const { sections, carouselImages } = parseLabContent(content);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    if (carouselImages.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, carouselImages.length]);

  return (
    <section className="section-page">
      {/* Carousel */}
      {carouselImages.length > 0 && (
        <div className="carousel-container relative group">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((img, index) => (
              <div key={index} className="carousel-slide">
                <img
                  src={img}
                  alt={`Lab photo ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          {carouselImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="carousel-dots">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`carousel-dot ${index === currentSlide ? 'carousel-dot-active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Members Sections */}
      <div className="section-container">
        <div className="section-content">
          {sections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex < sections.length - 1 ? 'mb-16' : ''}>
              <h2 className="faculty-section-title">
                {section.title}
              </h2>
              <div className={`grid gap-8 ${
                section.title === 'Faculty'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              }`}>
                {section.members.map((member, index) => {
                  const isInternalLink = member.link.startsWith('/');
                  const CardContent = (
                    <>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="member-image"
                      />
                      <p className="member-name">
                        {member.name}
                      </p>
                      <p className="member-role">
                        {section.title === 'Faculty' ? member.role.split(',')[0] : member.role}
                      </p>
                    </>
                  );

                  if (isInternalLink && onFacultyClick) {
                    return (
                      <button
                        key={index}
                        onClick={onFacultyClick}
                        className="member-card group"
                      >
                        {CardContent}
                      </button>
                    );
                  }

                  return (
                    <a
                      key={index}
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="member-card group"
                    >
                      {CardContent}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
