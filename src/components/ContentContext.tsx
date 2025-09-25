import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PortfolioItem {
  id: string;
  title: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  image: string;
  link?: string;
  videoUrl?: string;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: {
    en: string;
    de: string;
  };
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  title: {
    en: string;
    de: string;
  };
  period: string;
}

interface ContentContextType {
  portfolioItems: PortfolioItem[];
  skillCategories: SkillCategory[];
  experienceItems: ExperienceItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, item: Omit<PortfolioItem, 'id'>) => void;
  deletePortfolioItem: (id: string) => void;
  updateSkillCategories: (categories: SkillCategory[]) => void;
  updateExperienceItems: (items: ExperienceItem[]) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetToDefault: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial data
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: {
      en: 'akjsfdakkf',
      de: 'Kreatives Design-Projekt'
    },
    description: {
      en: 'A minimalist design approach showcasing modern aesthetics',
      de: 'Ein minimalistischer Designansatz mit modernen Ästhetik'
    },
    image: 'https://images.unsplash.com/photo-1700887937204-69f8b8400ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHByb2plY3R8ZW58MXx8fHwxNzU2NTg2MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '#'
  },
  {
    id: '2',
    title: {
      en: 'Web Development',
      de: 'Web-Entwicklung'
    },
    description: {
      en: 'Full-stack web application with modern technologies',
      de: 'Full-Stack-Webanwendung mit modernen Technologien'
    },
    image: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzU2NTg1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '#'
  },
  {
    id: '3',
    title: {
      en: 'Sound Engineering',
      de: 'Sound Engineering'
    },
    description: {
      en: 'Professional audio production and mixing projects',
      de: 'Professionelle Audioproduktion und Mixing-Projekte'
    },
    image: 'https://images.unsplash.com/photo-1635961074197-47a7d7c15938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMGVuZ2luZWVyaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc1NjY1ODYzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '#'
  },
  {
    id: '4',
    title: {
      en: 'Motion Graphics',
      de: 'Motion Graphics'
    },
    description: {
      en: 'Dynamic visual storytelling through motion design',
      de: 'Dynamisches visuelles Storytelling durch Motion Design'
    },
    image: 'https://images.unsplash.com/photo-1676238560626-45d35b63b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGRlc2lnbnxlbnwxfHx8fDE3NTY2MzQ4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '#'
  },
  {
    id: '5',
    title: {
      en: 'AI Integration',
      de: 'KI-Integration'
    },
    description: {
      en: 'Innovative AI-powered creative solutions',
      de: 'Innovative KI-gestützte kreative Lösungen'
    },
    image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY2Mjc2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '#'
  },
  {
    id: '6',
    title: {
      en: 'Digital Workspace',
      de: 'Digitaler Arbeitsplatz'
    },
    description: {
      en: 'Clean and efficient digital workspace design',
      de: 'Sauberes und effizientes digitales Arbeitsplatz-Design'
    },
    image: 'https://images.unsplash.com/photo-1511752229301-31156e2e6b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcG9ydGZvbGlvJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NjY1ODYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '#'
  }
];

const initialSkillCategories: SkillCategory[] = [
  {
    id: '1',
    icon: '🎨',
    title: {
      en: 'Design',
      de: 'Design'
    },
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Canva', 'Tilda', 'InDesign', 'Sketch']
  },
  {
    id: '2',
    icon: '💻',
    title: {
      en: 'Development',
      de: 'Entwicklung'
    },
    skills: ['CSS', 'TailwindCSS', 'HTML', 'Python', 'Django', 'Flask', 'Next.js', 'React', 'Vue.js', 'Node.js', 'TypeScript', 'JavaScript']
  },
  {
    id: '3',
    icon: '🤖',
    title: {
      en: 'AI & Automation',
      de: 'KI & Automatisierung'
    },
    skills: ['ChatGPT', 'DeepSeek', 'GitHub Copilot', 'v0.dev', 'Vercel', 'Sora', 'MidJourney', 'Stable Diffusion', 'LangChain']
  },
  {
    id: '4',
    icon: '🎧',
    title: {
      en: 'Audio Production',
      de: 'Audio-Produktion'
    },
    skills: ['Ableton Live', 'FL Studio', 'Reaper', 'Cubase', 'Logic Pro', 'Pro Tools', 'Audacity']
  },
  {
    id: '5',
    icon: '🎬',
    title: {
      en: 'Video & Motion',
      de: 'Video & Motion'
    },
    skills: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'Blender', 'Cinema 4D']
  },
  {
    id: '6',
    icon: '🔧',
    title: {
      en: 'Technical Skills',
      de: 'Technische Fähigkeiten'
    },
    skills: ['Git & GitHub', 'Docker', 'Linux/Unix', 'AWS/Cloud', 'Database Design', 'API Development', 'CI/CD', 'Terminal/CLI']
  },
  {
    id: '7',
    icon: '📊',
    title: {
      en: 'Project Management',
      de: 'Projektmanagement'
    },
    skills: ['Agile/Scrum', 'Kanban', 'Jira', 'Trello', 'Notion', 'Slack', 'Teams', 'Time Management', 'Resource Planning']
  }
];

const initialExperienceItems: ExperienceItem[] = [
  {
    id: '1',
    title: {
      en: 'Ahead Media — Internship, Graphic Design',
      de: 'Ahead Media — Praktikum, Grafikdesign'
    },
    period: '2023'
  },
  {
    id: '2',
    title: {
      en: 'Catering — Team Member',
      de: 'Catering — Teammitglied'
    },
    period: '2022-2023'
  },
  {
    id: '3',
    title: {
      en: 'Freelance Projects — Web Design & Development, Creative Projects',
      de: 'Freelance Projekte — Webdesign & Entwicklung, Kreative Projekte'
    },
    period: '2021-Present'
  }
];

interface ContentProviderProps {
  children: ReactNode;
}

const STORAGE_KEYS = {
  PORTFOLIO: 'alfred-portfolio-items',
  SKILLS: 'alfred-skill-categories', 
  EXPERIENCE: 'alfred-experience-items'
};

export function ContentProvider({ children }: ContentProviderProps) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage();
    }
  }, [portfolioItems, skillCategories, experienceItems, isLoaded]);

  const loadFromLocalStorage = () => {
    try {
      const savedPortfolio = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      const savedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      const savedExperience = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);

      setPortfolioItems(savedPortfolio ? JSON.parse(savedPortfolio) : initialPortfolioItems);
      setSkillCategories(savedSkills ? JSON.parse(savedSkills) : initialSkillCategories);
      setExperienceItems(savedExperience ? JSON.parse(savedExperience) : initialExperienceItems);
      
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      // Fallback to default data
      setPortfolioItems(initialPortfolioItems);
      setSkillCategories(initialSkillCategories);
      setExperienceItems(initialExperienceItems);
      setIsLoaded(true);
    }
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolioItems));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillCategories));
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experienceItems));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const resetToDefault = () => {
    setPortfolioItems(initialPortfolioItems);
    setSkillCategories(initialSkillCategories);
    setExperienceItems(initialExperienceItems);
    
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    setPortfolioItems(prev => [...prev, newItem]);
  };

  const updatePortfolioItem = (id: string, item: Omit<PortfolioItem, 'id'>) => {
    setPortfolioItems(prev => prev.map(p => p.id === id ? { ...item, id } : p));
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(p => p.id !== id));
  };

  const updateSkillCategories = (categories: SkillCategory[]) => {
    setSkillCategories(categories);
  };

  const updateExperienceItems = (items: ExperienceItem[]) => {
    setExperienceItems(items);
  };

  return (
    <ContentContext.Provider value={{
      portfolioItems,
      skillCategories,
      experienceItems,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem,
      updateSkillCategories,
      updateExperienceItems,
      saveToLocalStorage,
      loadFromLocalStorage,
      resetToDefault
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}