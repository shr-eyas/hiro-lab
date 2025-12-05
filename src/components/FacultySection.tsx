import { getContent, parseFacultyContent } from '@/lib/content';
import { ArrowLeft, FileText, Linkedin, Github, GraduationCap, Twitter, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface FacultySectionProps {
  onBack: () => void;
}

const socialIcons: Record<string, typeof FileText> = {
  CV: FileText,
  LinkedIn: Linkedin,
  GitHub: Github,
  'Google Scholar': GraduationCap,
  Twitter: Twitter,
  Email: Mail,
};

export function FacultySection({ onBack }: FacultySectionProps) {
  const content = getContent('faculty');
  const faculty = parseFacultyContent(content);

  return (
    <section className="section-page">
      <div className="section-container">
        <div className="section-content">
          <button onClick={onBack} className="link-button mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Lab
          </button>

          {/* Header with photo and bio */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="flex-shrink-0">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>
            <div className="flex-1">
              <h1 className="section-title mb-2">{faculty.name}</h1>
              <p className="text-muted-foreground mb-4">{faculty.email.replace('[at]', '@').replace('[dot]', '.')}</p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-4 mb-6">
                {faculty.socialLinks.map((link, index) => {
                  const Icon = socialIcons[link.type] || FileText;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {link.type}
                    </a>
                  );
                })}
              </div>

              {/* Bio */}
              <div className="faculty-bio prose-academic">
                <ReactMarkdown>{faculty.bio}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Teaching */}
          {faculty.courses.length > 0 && (
            <div className="faculty-section">
              <h2 className="faculty-section-title">Teaching</h2>
              <div className="space-y-3">
                {faculty.courses.map((course, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-muted-foreground whitespace-nowrap">{course.date}</span>
                    <span className="text-foreground">{course.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books */}
          {faculty.books.length > 0 && (
            <div className="faculty-section">
              <h2 className="faculty-section-title">Books</h2>
              <div className="space-y-8">
                {faculty.books.map((book, index) => (
                  <div key={index} className="publication-card">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="publication-image"
                    />
                    <div className="publication-content">
                      <h3 className="font-serif text-lg font-medium text-foreground mb-1 leading-snug">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">{book.authors}</p>
                      <p className="text-sm text-muted-foreground italic mb-2">{book.venue}</p>
                      {book.links.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {book.links.map((link, linkIndex) => (
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

          {/* Journal Publications */}
          {faculty.journalPublications.length > 0 && (
            <div className="faculty-section">
              <h2 className="faculty-section-title">Journal Publications</h2>
              <div className="space-y-8">
                {faculty.journalPublications.map((pub, index) => (
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

          {/* Conference Publications */}
          {faculty.conferencePublications.length > 0 && (
            <div className="faculty-section">
              <h2 className="faculty-section-title">Conference Publications</h2>
              <div className="space-y-8">
                {faculty.conferencePublications.map((pub, index) => (
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

          {/* Research Projects */}
          {faculty.researchProjects.length > 0 && (
            <div className="faculty-section">
              <h2 className="faculty-section-title">Research Projects</h2>
              <div className="space-y-8">
                {faculty.researchProjects.map((project, index) => (
                  <div key={index} className="publication-card">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="publication-image"
                    />
                    <div className="publication-content">
                      <h3 className="font-serif text-lg font-medium text-foreground mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* International Robotics Challenges */}
          {faculty.roboticsChallenges.length > 0 && (
            <div className="faculty-section">
              <h2 className="faculty-section-title">International Robotics Challenges</h2>
              <div className="space-y-8">
                {faculty.roboticsChallenges.map((challenge, index) => (
                  <div key={index} className="publication-card">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="publication-image"
                    />
                    <div className="publication-content">
                      <h3 className="font-serif text-lg font-medium text-foreground mb-2 leading-snug">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
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
