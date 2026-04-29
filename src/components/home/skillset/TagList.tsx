import type { FC } from 'react';

interface TagProps {
  label: string;
  color?: string;
}

const Tag: FC<TagProps> = ({ label }) => (
  <span className={`bg-black px-1 py-0.5 lg:px-3 lg:py-1 rounded-full text-white text-xs sm:text-xs lg:text-sm font-medium whitespace-nowrap`}>
    {label}
  </span>
);

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1 md:gap-2">
      {tags.map((tag, index) => (
        <Tag key={`${tag}-${index}`} label={tag} />
      ))}
    </div>
  );
}