import type { FeedType } from "@/types/enums/FeedType";

interface FeedViewSelectorProps {
    tabs: { id: FeedType; title: string; }[];
    activeId: FeedType;
    setActiveId: React.Dispatch<React.SetStateAction<FeedType>>;
}

export default function FeedViewSelector({ tabs, activeId, setActiveId }: FeedViewSelectorProps) {
    return (
        <div className="flex flex-row border-b border-border bg-background/85 backdrop-blur-sm sticky top-0 z-10">
            {tabs.map((tab, index) => {
                const isActive = activeId === tab.id;
                return (
                    <div key={tab.id}
                        onClick={() => setActiveId(tab.id)}
                        className={`flex-1 flex justify-center cursor-pointer hover:bg-accent/70 ${index < tabs.length - 1 ? 'border-r border-border' : ''}`}>
                        <div className="inline-flex flex-col">
                            <span className={`py-3 items-center ${isActive ? 'font-bold' : 'text-muted-foreground'}`}>{tab.title}</span>
                            <div className={` h-1 w-full rounded-full ${isActive ? 'bg-social-media-primary' : 'bg-transparent'}`}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}