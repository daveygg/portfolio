import type { FC } from 'react';

interface TagProps {
  label: string;
  color?: string;
}

const Tag: FC<TagProps> = ({ label, color = "pastel-cream" }) => (
  <span className={`bg-black px-3 py-1 rounded-full text-white text-sm font-medium whitespace-nowrap`}>
    {label}
  </span>
);

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag key={`${tag}-${index}`} label={tag} />
      ))}
    </div>
  );
}