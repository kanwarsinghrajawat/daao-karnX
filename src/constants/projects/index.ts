import { ProjectStaticInfo } from '@/types/project';
import { supportedChainIds } from '../chains';
import { bscProjects } from './bsc';

export const projectsBySlug: { [chainId: number]: { [slug: string]: ProjectStaticInfo } } = {
  [supportedChainIds.bsc]: bscProjects.reduce(
    (acc, project) => {
      acc[project.slug] = project;
      return acc;
    },
    {} as { [slug: string]: ProjectStaticInfo },
  ),
};

export const projectsById: { [chainId: number]: { [id: string]: ProjectStaticInfo } } = {
  [supportedChainIds.bsc]: bscProjects.reduce(
    (acc, project) => {
      acc[project.id] = project;
      return acc;
    },
    {} as { [id: string]: ProjectStaticInfo },
  ),
};

export const projectsByAddress: { [chainId: number]: { [address: string]: ProjectStaticInfo } } = {
  [supportedChainIds.bsc]: bscProjects.reduce(
    (acc, project) => {
      if (project.status === 'upcoming') return acc; // Skip upcoming projects
      acc[project.address] = project;
      return acc;
    },
    {} as { [address: string]: ProjectStaticInfo },
  ),
};