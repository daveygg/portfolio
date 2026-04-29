import SocialMedia from '@/features/SocialMedia'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/socialMedia/')({
  component: SocialMedia,
})
