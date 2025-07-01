import { Request, Response } from 'express';
import { CreateLinkDtoRequest, CreateLinkDtoResponse, GetInfoLinkDtoResponse } from '../dto/linkDto';
import { nanoid } from 'nanoid';
import { AnalyticsDtoResponse } from '../dto/analyticsDto';
import prisma from '../prisma';

export const redirectLink = async (req: Request, res: Response) => {
  try {
    const shortUrl = req.params.shortUrl;
    
    if (!shortUrl) {
      res.status(400).json({ message: 'Не указан url' });
      return;
    }

    const link = await prisma.link.findUnique({
      where: { shortUrl },
      include: { clicks: true },
    });

    if (!link) {
      res.status(404).json({ message: 'Ссылка не найдена' });
      return;
    }

    if (link.expiresAt && new Date() > link.expiresAt) {
      res.status(410).json({ message: 'Ссылка истекла' });
      return;
    }

    await prisma.linkClick.create({
      data: {
        ipAddress: req.ip || 'unknown ip',
        linkId: link.id,
      },
    });

    res.status(200).json(link.originalUrl);
  } catch (error) {
    console.error('Error in redirectLink:', error);
    res.status(500).json({ message: 'Ошибка при обработке ссылки' });
  }
};

export const getLinkInfo = async (req: Request, res: Response) => {
  try {
    const shortUrl = req.params.shortUrl;

    if (!shortUrl) {
      res.status(400).json({ message: 'Не указан url' });
      return;
    }

    const link = await prisma.link.findUnique({
      where: { shortUrl },
      include: { clicks: true },
    });

    if (!link) {
      res.status(400).json({ message: 'Такой ссылки не существует' });
      return;
    }

    const response: GetInfoLinkDtoResponse = {
      originalUrl: link.originalUrl,
      createdAt: link.createdAt,
      clickCount: link.clicks.length,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in getLinkInfo:', error);
    res.status(500).json({ message: 'Ошибка при получении информации о ссылке' });
  }
};

export const getLinkAnalytics = async (req: Request, res: Response) => {
  try {
    const shortUrl = req.params.shortUrl;

    if (!shortUrl) {
      res.status(400).json({ message: 'Не указан url' });
      return;
    }

    const link = await prisma.link.findUnique({
      where: { shortUrl },
      include: { 
        clicks: {
          orderBy: { clickedAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!link) {
      res.status(400).json({ message: 'Такой ссылки не существует' });
      return;
    }

    const response: AnalyticsDtoResponse = {
      totalClicks: link.clicks.length,
      recentClicks: link.clicks,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in getLinkAnalytics:', error);
    res.status(500).json({ message: 'Ошибка при получении аналитики' });
  }
};

export const createShortLink = async (req: Request, res: Response) => {
  try {
    const body: CreateLinkDtoRequest = req.body
    const { originalUrl, expiresAt, alias } = body;

    if (!originalUrl) {
      res.status(400).json({ message: 'Не указан оригинальный url' });
      return;
    }

    // Проверка на существование ссылки в БД
    const urlIsExist = await prisma.link.findFirst({ where: { originalUrl } });
    if (urlIsExist) {
      res.status(400).json({ message: 'Этот url уже используется' });
      return;
    }

    let shortUrl = alias || nanoid(8);

    // Проверка на уникальность shortUrl
    const shortUrlExists = await prisma.link.findUnique({ where: { shortUrl } });
    if (shortUrlExists) {
      res.status(400).json({ message: 'Этот alias уже занят' });
      return;
    }

    const newLink = await prisma.link.create({
      data: {
        originalUrl,
        shortUrl,
        expiresAt: new Date(expiresAt),
        createdAt: new Date(),
      },
    });

    const response: CreateLinkDtoResponse = {
      shortUrl: newLink.shortUrl,
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error in createShortLink:', error);
    res.status(500).json({ message: 'Ошибка при создании ссылки' });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const shortUrl = req.params.shortUrl;

    if (!shortUrl) {
      res.status(400).json({ message: 'Не указан url' });
      return;
    }

    // Сначала удаляем связанные клики
    await prisma.linkClick.deleteMany({
      where: {
        link: { shortUrl },
      },
    });

    // Затем удаляем саму ссылку
    await prisma.link.delete({
      where: { shortUrl },
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error in deleteLink:', error);
    res.status(400).json({ message: 'Такой ссылки не существует' });
  }
}; 