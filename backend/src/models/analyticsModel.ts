import { Link } from './linkModel';

export interface LinkClick {
  id: number;
  ipAddress: string;
  clickedAt: Date;
  link: Link;
}

export const linkClicks: LinkClick[] = []