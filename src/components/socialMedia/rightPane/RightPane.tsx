import StickyBox from "react-sticky-box";
import HappeningBox from "./happening/HappeningBox";
import NewsBox from "./news/NewsBox";
import SearchBox from "./SearchBox";
import WhoToFollowBox from "./whoToFollow/WhoToFollowBox";
import Subscribe from "./Subscribe";

export default function RightPane() {
    const newsItems = [
        {
            title: "Breaking News",
            time: "2 hours ago",
            category: "Politics",
            postsCount: 150
        },
        {
            title: "Tech Update",
            time: "4 hours ago",
            category: "Technology",
            postsCount: 80
        },
        {
            title: "Sports Highlights",
            time: "6 hours ago",
            category: "Sports",
            postsCount: 200
        }
    ];

    const happeningItems = [
        {
            category: "Entertainment",
            topic: "New Movie Release",
            amountOfInteractions: "1.2K interactions"
        },
        {
            category: "Technology",
            topic: "Latest Smartphone Launch",
            amountOfInteractions: "800 interactions"
        },
        {
            category: "Sports",
            topic: "Championship Finals",
            amountOfInteractions: "2.5K interactions"
        }
    ];

    const users = [
                {
                    id: 1,
                    username: "johndoe",
                    displayName: "John Doe",
                    bio: "Software Developer",
                    avatarUrl: "/avatars/avatar1.jpg",
                    bannerUrl: "/avatars/avatar1.jpg"
                },
                {
                    id: 2,
                    username: "janedoe",
                    displayName: "Jane Doe",
                    bio: "UX Designer",
                    avatarUrl: "/avatars/avatar4.jpg",
                    bannerUrl: "/avatars/avatar4.jpg"
                },
                {
                    id: 3,
                    username: "samsmith",
                    displayName: "Sam Smith",
                    bio: "Product Manager",
                    avatarUrl: "/avatars/avatar3.jpg",
                    bannerUrl: "/avatars/avatar3.jpg"
                }
            ]

    return (
        <div className="flex flex-col w-full pb-2 px-4 bg-background">
            <div className="flex w-full @container">
                <SearchBox />
            </div>
            <div className="flex flex-col gap-5 mt-16">
            <Subscribe />
            <NewsBox newsItems={newsItems} />
            <HappeningBox happeningItems={happeningItems} />
            <WhoToFollowBox users={users} />
            </div>
        </div>
    );
}