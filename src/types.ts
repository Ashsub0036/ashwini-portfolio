export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails?: string;
  stack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  comingSoon?: boolean;
}

export interface TimelineEvent {
  id: string;
  period: string;
  role: string;
  company?: string;
  location?: string;
  description: string;
  bullets?: string[];
  highlight?: boolean;
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  proficiency?: number; // percentage glow scale
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
}
