import SocialMedia from '@/features/socialMedia/SocialMedia'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/socialMedia/')({
  component: SocialMedia,
})
