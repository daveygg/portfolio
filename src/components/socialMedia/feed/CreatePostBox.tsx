import TextareaAutosize from 'react-textarea-autosize';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import GifBoxIcon from '@mui/icons-material/GifBox'; // Closer to the image
import BallotIcon from "@mui/icons-material/Ballot";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CreatePostBoxProps {
  onPost: (content: string) => void;
}

export default function CreatePostBox({ onPost }: CreatePostBoxProps) {

    const icons = [
    { Icon: InsertPhotoIcon, key: 'photo' },
    { Icon: GifBoxIcon, key: 'gif' },
    { Icon: BallotIcon, key: 'poll' },
    { Icon: SentimentSatisfiedAltIcon, key: 'emoji' },
    { Icon: CalendarMonthIcon, key: 'schedule' },
    { Icon: LocationOnIcon, key: 'location' },
    ];

    const iconStyle = 'hover:cursor-pointer hover:bg-social-media-primary/10 text-social-media-primary rounded-full transition-all duration-duration ease-out m-1 p-1';

    const [content, setContent] = useState("");

    const handlePostClick = () => {
      if (!content.trim()) return;

      onPost(content);
      setContent("");
    };

  return (
    <div className="w-full border-b border-border px-6 pt-6 flex gap-3">
      <Avatar className="size-10">
        <AvatarImage src="/avatars/avatar6.jpg" alt="User" />
        <AvatarFallback>DG</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <TextareaAutosize
          placeholder="What is happening?!"
          value={content}
          className="w-full resize-none bg-transparent text-xl outline-none placeholder:text-gray-500 min-h-14 border-b py-2"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            {icons.map(({ Icon, key }) => (
                <Icon 
                key={key} 
                className={iconStyle}
                sx={{fontSize: 30}}
                />
            ))}
          </div>
          <Button
            className='rounded-full font-bold hover:cursor-pointer'
            onClick={handlePostClick}
            >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}