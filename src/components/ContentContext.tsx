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
      en: 'UI/UX Portfolio (Figma)',
      de: 'UI/UX‑Portfolio (Figma)'
    },
    description: {
      en: 'Selected UI kits, component libraries and product screens designed in Figma.',
      de: 'Ausgewählte UI‑Kits, Komponenten‑Bibliotheken und Produkt‑Screens in Figma.'
    },
    image: '/images/portfolio/figma-ui-kit.jpg',
    link: 'https://www.figma.com/board/fU2P2Vg1moT018IPE4hUku/Alfred-Klimov-Portfolio?node-id=0-1&p=f&t=rrYyfGgfMcV40GMb-0'
  },
  {
    id: '2',
    title: {
      en: '3D Product Visuals (Blender)',
      de: '3D‑Produktvisualisierungen (Blender)'
    },
    description: {
      en: 'Hard‑surface models, lighting and renders for product & motion use.',
      de: 'Hard‑Surface‑Modelle, Beleuchtung und Renderings für Produkt & Motion.'
    },
    image: '/images/portfolio/blender-product-visual.jpg',
    link: 'https://www.figma.com/board/fU2P2Vg1moT018IPE4hUku/Alfred-Klimov-Portfolio?node-id=0-1&p=f&t=rrYyfGgfMcV40GMb-0'
  },
  {
    id: '3',
    title: {
      en: '2D Graphic Design (Photoshop)',
      de: '2D‑Grafikdesign (Photoshop)'
    },
    description: {
      en: 'Posters, promo assets, photo retouching and compositing.',
      de: 'Poster, Promo‑Assets, Fotoretusche und Compositing.'
    },
    image: '/images/portfolio/photoshop-retouch.jpg',
    link: 'https://www.figma.com/board/fU2P2Vg1moT018IPE4hUku/Alfred-Klimov-Portfolio?node-id=0-1&p=f&t=rrYyfGgfMcV40GMb-0'
  },
  {
    id: '4',
    title: {
      en: 'Web Development — Laguna Paradise',
      de: 'Web‑Entwicklung — Laguna Paradise'
    },
    description: {
      en: 'Booking platform UI and backend integration (Next.js/Django).',
      de: 'Buchungs‑Plattform‑UI und Backend‑Integration (Next.js/Django).'
    },
    image: '/images/portfolio/laguna-paradise-web.jpg',
    link: '#'
  },
  {
    id: '5',
    title: {
      en: "DROP’EM ALL — Telegram WebApp",
      de: "DROP’EM ALL — Telegram‑WebApp"
    },
    description: {
      en: 'Referral flows, payment UX and roulette mechanics for a Telegram app.',
      de: 'Referral‑Flows, Payment‑UX und Roulette‑Mechaniken für eine Telegram‑App.'
    },
    image: '/images/portfolio/dropemall-webapp.jpg',
    link: '#'
  },
  {
    id: '6',
    title: {
      en: 'Social Media Posts & Campaigns',
      de: 'Social‑Media‑Posts & Kampagnen'
    },
    description: {
      en: 'Content design for posts/stories, motion snippets and ad creatives.',
      de: 'Content‑Design für Posts/Stories, Motion‑Snippets und Anzeigen‑Creatives.'
    },
    image: '/images/portfolio/social-posts-grid.jpg',
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