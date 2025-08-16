import { projectsByAddress, projectsById, projectsBySlug } from '@/constants/projects';
import { DeployedProjectStaticInfo, ProjectStaticInfo } from '@/types/project';

export const getProjectStaticInfoById = ({ projectId, chainId }: { projectId: string; chainId: number }) => {
  const projectsForChain = projectsBySlug[chainId];
  if (!projectsForChain) return null;
  return projectsById[chainId][projectId] || null;
};

export const getProjectStaticInfoBySlug = ({ slug, chainId }: { slug: string; chainId: number }) => {
  const projectsForChain = projectsBySlug[chainId];
  if (!projectsForChain) return null;
  return projectsForChain[slug] || null;
};

export const getProjectStaticInfoByAddress = ({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}): DeployedProjectStaticInfo | null => {
  const projectsForChain = projectsByAddress[chainId];
  if (!projectsForChain) return null;
  return (projectsForChain[address] as DeployedProjectStaticInfo) || null;
};

// Enhanced project filtering and search utilities
export const filterProjectsByCategory = (projects: ProjectStaticInfo[], category: string): ProjectStaticInfo[] => {
  if (!category || category === 'all') return projects;
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
};

export const filterProjectsByTags = (projects: ProjectStaticInfo[], tags: string[]): ProjectStaticInfo[] => {
  if (!tags || tags.length === 0) return projects;
  return projects.filter(project => 
    tags.some(tag => project.tags.some(projectTag => 
      projectTag.toLowerCase().includes(tag.toLowerCase())
    ))
  );
};

export const searchProjects = (projects: ProjectStaticInfo[], query: string): ProjectStaticInfo[] => {
  if (!query || query.trim() === '') return projects;
  
  const lowerQuery = query.toLowerCase().trim();
  return projects.filter(project => 
    project.name.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.symbol.toLowerCase().includes(lowerQuery) ||
    project.category.toLowerCase().includes(lowerQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    project.team.some(member => 
      member.name.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery)
    )
  );
};

export const sortProjectsByFunding = (projects: ProjectStaticInfo[], order: 'asc' | 'desc' = 'desc'): ProjectStaticInfo[] => {
  return [...projects].sort((a, b) => {
    const aFunding = parseFloat(a.fundingGoal);
    const bFunding = parseFloat(b.fundingGoal);
    return order === 'desc' ? bFunding - aFunding : aFunding - bFunding;
  });
};

export const getProjectsByStatus = (projects: ProjectStaticInfo[], status: 'deployed' | 'upcoming'): ProjectStaticInfo[] => {
  return projects.filter(project => project.status === status);
};

// Media content handling utilities
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getVideoThumbnail = (videoUrl: string): string | null => {
  if (!videoUrl || !isValidUrl(videoUrl)) return null;
  
  // YouTube thumbnail extraction
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const youtubeMatch = videoUrl.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }
  
  // Vimeo thumbnail would require API call, return null for now
  return null;
};

export const getMediaType = (url: string): 'video' | 'image' | 'document' | 'unknown' => {
  if (!url || !isValidUrl(url)) return 'unknown';
  
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') || lowerUrl.includes('vimeo.com')) {
    return 'video';
  }
  
  if (lowerUrl.endsWith('.pdf') || lowerUrl.includes('pitch') || lowerUrl.includes('whitepaper')) {
    return 'document';
  }
  
  if (lowerUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    return 'image';
  }
  
  return 'unknown';
};

export const formatFundingAmount = (amount: string): string => {
  const num = parseFloat(amount);
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num.toLocaleString()}`;
};

export const calculateFundingProgress = (project: ProjectStaticInfo): number => {
  if (project.status === 'deployed') {
    return project.marketData.fundingProgress;
  }
  return 0; // Upcoming projects haven't started funding yet
};

export const getProjectCategories = (projects: ProjectStaticInfo[]): string[] => {
  const categories = new Set(projects.map(project => project.category));
  return Array.from(categories).sort();
};

export const getProjectTags = (projects: ProjectStaticInfo[]): string[] => {
  const tags = new Set(projects.flatMap(project => project.tags));
  return Array.from(tags).sort();
};