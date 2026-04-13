export interface NavSectionProps {
    mainText: string;
    subText: string;
}

export default function NavSection({ mainText, subText } : NavSectionProps){
    return(
        <div className="flex flex-col text-2xl px-4">
            <span className="reveal-text">
                {mainText}
            </span>
            <span className="text-muted-foreground reveal-text">
                {subText}
            </span>
        </div>
    )
}