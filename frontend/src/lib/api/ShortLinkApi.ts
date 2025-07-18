import { createShortLink } from '@/lib/api/createShortLink/createShortLink.ts'
import { getLinkInfo } from '@/lib/api/getLinkInfo/getLinkInfo.ts'
import { deleteLink } from '@/lib/api/deleteLink/deleteLink.ts'
import { analyticsAboutLink } from '@/lib/api/analyticsAboutLink/analyticsAboutLink.ts'
import { redirectShortUrl } from '@/lib/api/redirectShortUrl/redirectShortUrl.ts'

export default {
  createShortLink,
  getLinkInfo,
  deleteLink,
  analyticsAboutLink,
  redirectShortUrl,
}
