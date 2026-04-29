export interface NavSectionProps {
    mainText: string;
    subText: string;
}

export default function NavSection({ mainText, subText } : NavSectionProps){
    return(
        <div className="flex flex-col lg:text-2xl md:text-xl sm:text-lg text-xs lg:px-4 md:px-3 sm:px-2 px-1">
            <span className="reveal-text">
                {mainText}
            </span>
            <span className="text-muted-foreground reveal-text">
                {subText}
            </span>
        </div>
    )
}