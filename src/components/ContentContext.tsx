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
      en: 'Web Development Portfolio page (Vercel/react)',
      de: 'Web Entwicklung Portfolio page (Vercel/react)'
    },
    description: {
      en: 'A personal portfolio website built with React and deployed on Vercel to showcase design and development projects.',
      de: 'Eine persönliche Portfolio-Website, erstellt mit React und auf Vercel bereitgestellt, um Design- und Entwicklungsprojekte zu präsentieren.'
    },
    image: 'https://i.imgur.com/vcrQ7Qh.png',
    link: '#'
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
    image: 'https://i.imgur.com/7rqC1wq.jpeg',
    link: 'https://i.imgur.com/cqgJbUc.mp4'
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
    image: 'https://i.imgur.com/6Am4Q0m.jpeg',
    link: 'https://www.figma.com/board/fU2P2Vg1moT018IPE4hUku/Alfred-Klimov-Portfolio?node-id=0-1&p=f&t=rrYyfGgfMcV40GMb-0'
  },
{
    id: '4',
    title: {
      en: 'Music Video Editing',
      de: 'Musikvideo-Schnitt'
    },
    description: {
      en: 'Creative editing and post-production of a music video project.',
      de: 'Kreativer Schnitt und Postproduktion eines Musikvideoprojekts.'
    },
    image: 'https://i.imgur.com/7rqC1wq.jpeg',
    link: 'https://i.imgur.com/6IACu3Y.mp4'
  },
{
  id: '5',
  title: {
    en: 'UI/UX Design — Crypto Landing Page',
    de: 'UI/UX-Design — Krypto-Landingpage'
  },
  description: {
    en: 'Landing page concept designed in Figma for a crypto website, focusing on clean UI and user experience.',
    de: 'In Figma entworfenes Landingpage-Konzept für eine Krypto-Website mit Fokus auf klares UI und Benutzererlebnis.'
  },
  image: 'https://i.imgur.com/vSUqjHN.png',
  link: 'https://www.figma.com/design/GSPoKXF3w8wg2nH2ULTpNV/CAPITAL8?node-id=344-13006&p=f&t=qLbPKJG9PWq7kbZs-0'
},
{
  id: '6',
  title: {
    en: 'UI/UX Design — Capital8 Platform',
    de: 'UI/UX-Design — Capital8-Plattform'
  },
  description: {
    en: 'Figma project for the Capital8 platform with a modern interface and consistent design system.',
    de: 'Figma-Projekt für die Capital8-Plattform mit moderner Benutzeroberfläche und konsistentem Designsystem.'
  },
  image: 'https://i.imgur.com/KOeajhB.png',
  link: 'https://www.figma.com/design/GSPoKXF3w8wg2nH2ULTpNV/CAPITAL8?node-id=0-1&t=qLbPKJG9PWq7kbZs-1'
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