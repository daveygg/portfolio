import type UserType from "@/types/UserType";
import WhoToFollow from "./WhoToFollow";
import { SidebarCard } from "../components/SidebarCard";
interface WhoToFollowBoxProps {
    users: UserType[];
}
export default function WhoToFollowBox({ users }: WhoToFollowBoxProps) {
    return (
        <SidebarCard title="Who to follow" includeShowMore={true}>
            {users.map((user) => (
                <WhoToFollow key={user.id} user={user} />
            ))}
        </SidebarCard>
    );
}