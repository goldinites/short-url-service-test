import { Request, Response } from 'express';
import { CreateLinkDtoRequest, CreateLinkDtoResponse, GetInfoLinkDtoResponse } from '../dto/linkDto';
import { nanoid } from 'nanoid';
import { links } from '../models/linkModel';
import { linkClicks } from '../models/analyticsModel';
import { AnalyticsDtoResponse } from '../dto/analyticsDto';

export const redirectLink = (req: Request, res: Response) => {

}

export const getLinkInfo = (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;

  if (!shortUrl) {
    res.status(400).json({ message: 'Не указан url' });
  }

  const link = links.find((link) => link.shortUrl === shortUrl);

  if (!link) {
    res.status(400).json({ message: 'Такой ссылки не существует' });
    return;
  }

  const response: GetInfoLinkDtoResponse =  {
    originalUrl: link.originalUrl,
    createdAt: link.createdAt,
    clickCount: link.clicks.length
  }

  res.status(200).json(response);
};

export const getLinkAnalytics = (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;

  if (!shortUrl) {
    res.status(400).json({ message: 'Не указан url' });
  }

  const analytics = linkClicks.find((link) => link.link.shortUrl === shortUrl);

  if (!analytics) {
    res.status(400).json({ message: 'Такой ссылки не существует' });
    return;
  }

  const response: AnalyticsDtoResponse = {
    totalClicks: analytics.link.clicks.length,
    recentClicks: analytics.link.clicks.slice(0, 5),
  }

  res.status(200).json(response);
};

export const createShortLink = (req: Request, res: Response) => {
  const body: CreateLinkDtoRequest = req.body
  const { originalUrl, expiresAt, alias } = body;

  if (!originalUrl) {
    res.status(400).json({ message: 'Не указан оригинальный url' });
    return;
  }

  const urlIsExist = links.some((link) => link.originalUrl === originalUrl);

  if (urlIsExist) {
    res.status(400).json({ message: 'Этот url уже используется' });
    return;
  }

  let shortUrl = alias || nanoid(8);

  links.push({
    id: links.length + 1,
    originalUrl,
    shortUrl,
    expiresAt,
    createdAt: new Date(),
    clicks: []
  })

  const response: CreateLinkDtoResponse = {
    shortUrl,
  }

  res.status(200).json(response)
};

export const deleteLink = (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;

  if (!shortUrl) {
    res.status(400).json({ message: 'Не указан url' });
    return;
  }

  const idx = links.findIndex((link) => link.shortUrl === shortUrl);

  if (!idx) {
    res.status(400).json({ message: 'Такой ссылки не существует' });
    return;
  }

  links.splice(idx, 1);

  res.status(200).json({
    success: true,
  })
}; 