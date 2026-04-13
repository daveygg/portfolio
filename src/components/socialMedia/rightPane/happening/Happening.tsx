
import type HappeningType from '@/types/HappeningType';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Happening({ category, topic, amountOfInteractions }: HappeningType) {
    return (
        <article className="flex flex-col py-2 px-4 hover:bg-accent-muted hover:cursor-pointer">
          <div className="flex flex-row justify-between items-center text-muted-foreground text-sm">
            {category}
              <MoreHorizIcon className="hover:bg-social-media-primary/10 hover:text-social-media-primary rounded-full transition-all duration-duration ease-out size-6!" />
          </div>
          <div className="font-semibold">{topic}</div>
          <div className="text-muted-foreground text-sm">{amountOfInteractions}</div>
      </article>
    )
}