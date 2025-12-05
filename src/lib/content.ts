// Content loader for markdown files
import homeContent from '@/content/home.md?raw';
import labContent from '@/content/lab.md?raw';
import researchContent from '@/content/research.md?raw';
import publicationsContent from '@/content/publications.md?raw';
import positionsContent from '@/content/positions.md?raw';
import contactContent from '@/content/contact.md?raw';
import facultyContent from '@/content/faculty.md?raw';

export type ContentKey = 'home' | 'lab' | 'research' | 'publications' | 'positions' | 'contact' | 'faculty';

const contentMap: Record<ContentKey, string> = {
  home: homeContent,
  lab: labContent,
  research: researchContent,
  publications: publicationsContent,
  positions: positionsContent,
  contact: contactContent,
  faculty: facultyContent,
};

export function getContent(key: ContentKey): string {
  return contentMap[key] || '';
}

export function parseHomeContent(content: string) {
  const lines = content.split('\n');
  const titleLines: string[] = [];
  let description = '';
  const links: { text: string; url: string }[] = [];

  let inLinks = false;

  for (const line of lines) {
    if (line.startsWith('# ') && !inLinks) {
      titleLines.push(line.replace('# ', ''));
    } else if (line.startsWith('## Links')) {
      inLinks = true;
    } else if (inLinks && line.startsWith('- [')) {
      const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        links.push({ text: match[1], url: match[2] });
      }
    } else if (line.trim() && !line.startsWith('#') && !line.startsWith('-')) {
      if (!inLinks) {
        description = line;
      }
    }
  }

  return { titleLines, description, links };
}

export interface ResearchArea {
  title: string;
  image: string;
  description: string;
  slug: string;
}

export interface ResearchContent {
  title: string;
  intro: string;
  areas: ResearchArea[];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function parseResearchContent(content: string): ResearchContent {
  const lines = content.split('\n');
  let title = '';
  let intro = '';
  const areas: ResearchArea[] = [];

  let currentArea: Partial<ResearchArea> | null = null;
  let inAreas = false;
  let collectingIntro = false;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '');
      collectingIntro = true;
    } else if (line.startsWith('## Areas')) {
      inAreas = true;
      collectingIntro = false;
    } else if (collectingIntro && line.trim() && !line.startsWith('#')) {
      intro = line;
      collectingIntro = false;
    } else if (inAreas && line.startsWith('### ')) {
      if (currentArea?.title) {
        areas.push(currentArea as ResearchArea);
      }
      const areaTitle = line.replace('### ', '');
      currentArea = { title: areaTitle, image: '', description: '', slug: slugify(areaTitle) };
    } else if (currentArea && line.startsWith('image: ')) {
      currentArea.image = line.replace('image: ', '');
    } else if (currentArea && line.trim() && !line.startsWith('image:')) {
      currentArea.description = line;
    }
  }

  if (currentArea?.title) {
    areas.push(currentArea as ResearchArea);
  }

  return { title, intro, areas };
}

export interface LabMember {
  name: string;
  image: string;
  role: string;
  link: string;
}

export interface LabSection {
  title: string;
  members: LabMember[];
}

export interface LabContent {
  sections: LabSection[];
  carouselImages: string[];
}

export function parseLabContent(content: string): LabContent {
  const lines = content.split('\n');
  const sections: LabSection[] = [];
  const carouselImages: string[] = [];

  let currentSection: LabSection | null = null;
  let currentMember: Partial<LabMember> | null = null;
  let inCarousel = false;

  for (const line of lines) {
    if (line.startsWith('## Carousel')) {
      inCarousel = true;
      continue;
    }
    
    if (inCarousel && line.startsWith('- ')) {
      carouselImages.push(line.replace('- ', '').trim());
      continue;
    }

    if (line.startsWith('## ') && !line.startsWith('### ')) {
      inCarousel = false;
      // Save previous member if exists
      if (currentMember?.name && currentSection) {
        currentSection.members.push(currentMember as LabMember);
      }
      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start new section
      currentSection = { title: line.replace('## ', ''), members: [] };
      currentMember = null;
    } else if (line.startsWith('### ')) {
      // Save previous member if exists
      if (currentMember?.name && currentSection) {
        currentSection.members.push(currentMember as LabMember);
      }
      currentMember = { name: line.replace('### ', ''), image: '', role: '', link: '' };
    } else if (currentMember && line.startsWith('image: ')) {
      currentMember.image = line.replace('image: ', '');
    } else if (currentMember && line.startsWith('role: ')) {
      currentMember.role = line.replace('role: ', '');
    } else if (currentMember && line.startsWith('link: ')) {
      currentMember.link = line.replace('link: ', '');
    }
  }

  // Save last member and section
  if (currentMember?.name && currentSection) {
    currentSection.members.push(currentMember as LabMember);
  }
  if (currentSection) {
    sections.push(currentSection);
  }

  return { sections, carouselImages };
}

export interface Publication {
  title: string;
  image: string;
  authors: string;
  venue: string;
  links: { text: string; url: string }[];
  year: string;
  researchArea?: string;
}

export function parsePublicationsContent(content: string): { title: string; publications: Publication[] } {
  const lines = content.split('\n');
  let title = '';
  const publications: Publication[] = [];

  let currentYear = '';
  let currentPub: Partial<Publication> | null = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '');
    } else if (line.startsWith('## ')) {
      currentYear = line.replace('## ', '');
    } else if (line.startsWith('### ')) {
      if (currentPub?.title) {
        publications.push(currentPub as Publication);
      }
      currentPub = { title: line.replace('### ', ''), year: currentYear, image: '', authors: '', venue: '', links: [] };
    } else if (currentPub && line.startsWith('image: ')) {
      currentPub.image = line.replace('image: ', '');
    } else if (currentPub && line.startsWith('authors: ')) {
      currentPub.authors = line.replace('authors: ', '');
    } else if (currentPub && line.startsWith('venue: ')) {
      currentPub.venue = line.replace('venue: ', '');
    } else if (currentPub && line.startsWith('area: ')) {
      currentPub.researchArea = line.replace('area: ', '');
    } else if (currentPub && line.startsWith('links: ')) {
      const linksStr = line.replace('links: ', '');
      const linkMatches = linksStr.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      currentPub.links = Array.from(linkMatches).map(m => ({ text: m[1], url: m[2] }));
    }
  }

  if (currentPub?.title) {
    publications.push(currentPub as Publication);
  }

  return { title, publications };
}

export function getPublicationsByArea(areaSlug: string): Publication[] {
  const { publications } = parsePublicationsContent(getContent('publications'));
  return publications.filter(pub => {
    if (pub.researchArea) {
      return slugify(pub.researchArea) === areaSlug;
    }
    return false;
  });
}

export function getResearchAreaBySlug(slug: string): ResearchArea | undefined {
  const { areas } = parseResearchContent(getContent('research'));
  return areas.find(area => area.slug === slug);
}

// Faculty content parsing
export interface FacultyBook {
  title: string;
  image: string;
  authors: string;
  venue: string;
  links: { text: string; url: string }[];
}

export interface FacultyPublication {
  title: string;
  image: string;
  authors: string;
  venue: string;
  links: { text: string; url: string }[];
}

export interface ResearchProject {
  title: string;
  image: string;
  description: string;
}

export interface RoboticsChallenge {
  title: string;
  image: string;
  description: string;
}

export interface FacultyContent {
  name: string;
  email: string;
  image: string;
  bio: string;
  socialLinks: { type: string; url: string }[];
  courses: { date: string; name: string }[];
  books: FacultyBook[];
  journalPublications: FacultyPublication[];
  conferencePublications: FacultyPublication[];
  researchProjects: ResearchProject[];
  roboticsChallenges: RoboticsChallenge[];
}

export function parseFacultyContent(content: string): FacultyContent {
  const lines = content.split('\n');
  const result: FacultyContent = {
    name: '',
    email: '',
    image: '',
    bio: '',
    socialLinks: [],
    courses: [],
    books: [],
    journalPublications: [],
    conferencePublications: [],
    researchProjects: [],
    roboticsChallenges: [],
  };

  let currentSection = '';
  let currentItem: any = null;
  let collectingBio = false;
  let bioLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      result.name = line.replace('# ', '');
    } else if (line.startsWith('email: ')) {
      result.email = line.replace('email: ', '');
    } else if (line.startsWith('image: ') && currentSection === '') {
      result.image = line.replace('image: ', '');
    } else if (line.startsWith('## Bio')) {
      currentSection = 'bio';
      collectingBio = true;
    } else if (line.startsWith('## Social')) {
      currentSection = 'social';
      collectingBio = false;
      if (bioLines.length > 0) {
        result.bio = bioLines.join('\n');
      }
    } else if (line.startsWith('## Teaching')) {
      currentSection = 'teaching';
    } else if (line.startsWith('## Books')) {
      currentSection = 'books';
    } else if (line.startsWith('## Journal Publications')) {
      currentSection = 'journal';
    } else if (line.startsWith('## Conference Publications')) {
      currentSection = 'conference';
    } else if (line.startsWith('## Research Projects')) {
      currentSection = 'projects';
    } else if (line.startsWith('## International Robotics')) {
      currentSection = 'challenges';
    } else if (collectingBio && line.trim() && !line.startsWith('##')) {
      bioLines.push(line);
    } else if (currentSection === 'social' && line.startsWith('- ')) {
      const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        result.socialLinks.push({ type: match[1], url: match[2] });
      }
    } else if (currentSection === 'teaching' && line.startsWith('- ')) {
      const match = line.match(/\[([^\]]+)\]\s*(.+)/);
      if (match) {
        result.courses.push({ date: match[1], name: match[2] });
      }
    } else if ((currentSection === 'books' || currentSection === 'journal' || currentSection === 'conference') && line.startsWith('### ')) {
      if (currentItem) {
        if (currentSection === 'books') result.books.push(currentItem);
        else if (currentSection === 'journal') result.journalPublications.push(currentItem);
        else if (currentSection === 'conference') result.conferencePublications.push(currentItem);
      }
      currentItem = { title: line.replace('### ', ''), image: '', authors: '', venue: '', links: [] };
    } else if (currentItem && line.startsWith('image: ')) {
      currentItem.image = line.replace('image: ', '');
    } else if (currentItem && line.startsWith('authors: ')) {
      currentItem.authors = line.replace('authors: ', '');
    } else if (currentItem && line.startsWith('venue: ')) {
      currentItem.venue = line.replace('venue: ', '');
    } else if (currentItem && line.startsWith('links: ')) {
      const linksStr = line.replace('links: ', '');
      const linkMatches = linksStr.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      currentItem.links = Array.from(linkMatches).map(m => ({ text: m[1], url: m[2] }));
    } else if ((currentSection === 'projects' || currentSection === 'challenges') && line.startsWith('### ')) {
      if (currentItem) {
        if (currentSection === 'projects') result.researchProjects.push(currentItem);
        else result.roboticsChallenges.push(currentItem);
      }
      currentItem = { title: line.replace('### ', ''), image: '', description: '' };
    } else if (currentItem && (currentSection === 'projects' || currentSection === 'challenges') && line.startsWith('description: ')) {
      currentItem.description = line.replace('description: ', '');
    }
  }

  // Save last item
  if (currentItem) {
    if (currentSection === 'books') result.books.push(currentItem);
    else if (currentSection === 'journal') result.journalPublications.push(currentItem);
    else if (currentSection === 'conference') result.conferencePublications.push(currentItem);
    else if (currentSection === 'projects') result.researchProjects.push(currentItem);
    else if (currentSection === 'challenges') result.roboticsChallenges.push(currentItem);
  }

  return result;
}
