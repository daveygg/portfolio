import type NewsType from "@/types/NewsType";
import News from "./News";
import { SidebarCard } from "../components/SidebarCard";

interface NewsBoxProps {
    newsItems: NewsType[];
}

export default function NewsBox({ newsItems }: NewsBoxProps) {
    return (
        <SidebarCard title="Latest News" includeShowMore={false}>
            {newsItems.map((news, index) => (
                <News
                    key={index}
                    {...news} />
            ))}
        </SidebarCard>
    );
}