import { Router } from 'express';
import {
  redirectLink,
  getLinkInfo,
  getLinkAnalytics,
  createShortLink,
  deleteLink,
} from '../controllers/linkController';

const router = Router();

router.get('/:shortUrl', redirectLink)
router.get('/info/:shortUrl', getLinkInfo);
router.get('/analytics/:shortUrl', getLinkAnalytics);
router.post('/shorten', createShortLink);
router.delete('/delete/:shortUrl', deleteLink);

export default router; 