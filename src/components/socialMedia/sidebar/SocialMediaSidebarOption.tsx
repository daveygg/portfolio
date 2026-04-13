export interface SocialMediaSideBarOptionProps {
  id: string;
  active: boolean;
  title?: string;
  Icon: React.ElementType;
  onClick?: () => void;
}

export default function SocialMediaSideBarOption({ active, title, Icon, onClick }: SocialMediaSideBarOptionProps) {
  return (
    <div className="mx-2 my-1"
      onClick={onClick}
    >
      <div
        className="inline-flex items-center space-x-2 px-3 py-3 rounded-full cursor-pointer hover:bg-accent transition-all duration-duration ease-out"
      >
        <Icon sx={{stroke: "foreground", strokeWidth: 0 }} fontSize="large" className="text-foreground" />
        {title && <span className={`pr-1 text-lg ${active === true ? "font-bold" : "font-normal"}`}>{title}</span>}
      </div>
    </div>
  );
}