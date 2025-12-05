import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomeSection } from '@/components/HomeSection';
import { MarkdownSection } from '@/components/MarkdownSection';
import { ResearchSection } from '@/components/ResearchSection';
import { ResearchDetailSection } from '@/components/ResearchDetailSection';
import { LabSection } from '@/components/LabSection';
import { PublicationsSection } from '@/components/PublicationsSection';
import { FacultySection } from '@/components/FacultySection';
import type { ContentKey } from '@/lib/content';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [researchAreaSlug, setResearchAreaSlug] = useState<string | null>(null);
  const [showFaculty, setShowFaculty] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setResearchAreaSlug(null);
    setShowFaculty(false);
  };

  const handleAreaClick = (slug: string) => {
    setResearchAreaSlug(slug);
  };

  const handleBackToResearch = () => {
    setResearchAreaSlug(null);
  };

  const handleFacultyClick = () => {
    setShowFaculty(true);
  };

  const handleBackToLab = () => {
    setShowFaculty(false);
  };

  const renderContent = () => {
    // Handle faculty subpage
    if (activeTab === 'lab' && showFaculty) {
      return <FacultySection key="faculty" onBack={handleBackToLab} />;
    }

    if (activeTab === 'research' && researchAreaSlug) {
      return <ResearchDetailSection key={researchAreaSlug} areaSlug={researchAreaSlug} onBack={handleBackToResearch} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeSection key="home" />;
      case 'lab':
        return <LabSection key="lab" onFacultyClick={handleFacultyClick} />;
      case 'research':
        return <ResearchSection key="research" onAreaClick={handleAreaClick} />;
      case 'publications':
        return <PublicationsSection key="publications" />;
      case 'positions':
        return <MarkdownSection key="positions" contentKey="positions" />;
      case 'contact':
        return <MarkdownSection key="contact" contentKey="contact" />;
      default:
        return <HomeSection key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
