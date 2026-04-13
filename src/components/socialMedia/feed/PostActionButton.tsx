import formatNumber from '@/lib/numberFormatter';
import "@/index.css";

interface PostActionButtonProps {
    icon: React.ComponentType<any>;
    hoverColor: 'social-media-primary' | 'social-media-like' | 'social-media-retweet';
    count: number;
}

const colorStyles = {
    'social-media-primary': 'hover:bg-social-media-primary/10 hover:text-social-media-primary',
    'social-media-like': 'hover:bg-social-media-like/10 hover:text-social-media-like',
    'social-media-retweet': 'hover:bg-social-media-retweet/10 hover:text-social-media-retweet',
};

export default function PostActionButton({ icon: Icon, hoverColor, count }: PostActionButtonProps) {
    return (
        <div className={`rounded-full transition-all duration-duration ease-out p-1.5 relative flex items-center ${colorStyles[hoverColor]}`}>
            <Icon fontSize="small" />
            <div className="absolute left-7 text-sm">{formatNumber(count)}</div>
        </div>
    );
}