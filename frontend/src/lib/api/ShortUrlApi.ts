import { createShortUrl } from '@/lib/api/createShortUrl/createShortUrl.ts'
import { getLinkInfo } from '@/lib/api/getLinkInfo/getLinkInfo.ts'
import { deleteLink } from '@/lib/api/deleteLink/deleteLink.ts'
import { analyticsAboutLink } from '@/lib/api/analyticsAboutLink/analyticsAboutLink.ts'

export default {
  createShortUrl,
  getLinkInfo,
  deleteLink,
  analyticsAboutLink,
}
