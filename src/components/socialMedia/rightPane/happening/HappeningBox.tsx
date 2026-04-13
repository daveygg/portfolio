import type HappeningType from "@/types/HappeningType";
import Happening from "./Happening";
import { SidebarCard } from "../components/SidebarCard";

interface HappeningBoxProps {
    happeningItems: HappeningType[];
}
export default function HappeningBox({ happeningItems }: HappeningBoxProps) {
    return (
        <SidebarCard title="What's Happening" includeShowMore={true}>
            {happeningItems.map((happening, index) => (
                <Happening
                    key={index}
                    {...happening} />
            ))}
        </SidebarCard>
    );    
}