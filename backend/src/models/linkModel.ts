import { LinkClick } from './analyticsModel';

export interface Link {
  id: number;
  shortUrl: string;
  originalUrl: string;
  expiresAt: Date;
  createdAt: Date;
  clicks: LinkClick[];
}
