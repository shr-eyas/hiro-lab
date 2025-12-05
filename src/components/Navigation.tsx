import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'lab', label: 'Lab', path: '/lab' },
  { id: 'research', label: 'Research', path: '/research' },
  { id: 'publications', label: 'Publications', path: '/publications' },
  { id: 'positions', label: 'Positions', path: '/positions' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'nav-link whitespace-nowrap py-4',
                activeTab === tab.id && 'nav-link-active'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
