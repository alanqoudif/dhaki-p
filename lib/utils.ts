// /lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Globe, Book, YoutubeIcon, Mountain, Brain, TrendingUp } from 'lucide-react'
import { ChatsCircle, Code, Memory, XLogo, AlignLeft, Users } from '@phosphor-icons/react'
import { v4 as uuidv4 } from 'uuid'
import { LucideIcon } from 'lucide-react'
import { useLanguage } from '@/app/providers'
import { translations } from '@/app/translations'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`;
}

export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('mem0_user_id');
  if (!userId) {
    userId = generateId('user');
    localStorage.setItem('mem0_user_id', userId);
  }
  return userId;
}

export type SearchGroupId = 'web' | 'academic' | 'x' | 'analysis' | 'chat' | 'extreme' | 'buddy';

export interface SearchGroup {
  id: SearchGroupId;
  name: string;
  description: string;
  icon: LucideIcon;
  show: boolean;
}

export const searchGroups: SearchGroup[] = [
  {
    id: 'web',
    name: 'Web',
    description: 'Search across the entire internet',
    icon: Globe,
    show: true
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Search academic papers powered by Exa',
    icon: Book,
    show: true
  },
  {
    id: 'x',
    name: 'X',
    description: 'Search X posts and content powered by Exa',
    icon: XLogo,
    show: true
  },
  {
    id: 'analysis',
    name: 'Analysis',
    description: 'Code, stock and currency stuff',
    icon: TrendingUp,
    show: true
  },
  {
    id: 'chat',
    name: 'Chat',
    description: 'Talk to the model directly',
    icon: AlignLeft,
    show: true
  },
  {
    id: 'extreme',
    name: 'Extreme',
    description: 'Deep research with multiple sources and analysis',
    icon: Brain,
    show: true
  },
  {
    id: 'buddy',
    name: 'Buddy',
    description: 'Your personal memory companion',
    icon: Users,
    show: true
  },
];

// Function to get localized search group
export function getLocalizedSearchGroups(language: 'en' | 'ar'): SearchGroup[] {
  return searchGroups.map(group => ({
    ...group,
    name: translations[language].searchGroups[group.id],
    description: translations[language].searchGroups[`${group.id}Desc`]
  }));
}
