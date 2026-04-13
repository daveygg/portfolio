interface SidebarCardProps {
  title: string;
  children: React.ReactNode;
  includeShowMore?: boolean;
}

export function SidebarCard({ title, children, includeShowMore }: SidebarCardProps) {
  return (
    <section className="flex flex-col pt-4 border-border border rounded-2xl overflow-hidden">
      <h2 className="text-xl font-extrabold! font-chirp-bold px-4 pb-2">{title}</h2>      
      <div className="flex flex-col">
        {children}
      </div>
      {includeShowMore === true && (
        <div className="text-social-media-primary p-4 hover:bg-accent-muted hover:cursor-pointer text-sm">
          Show more
        </div>
      )}
    </section>
  );
}