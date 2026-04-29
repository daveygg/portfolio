interface CurveDividerLeftProps {
  title: string;
  bgColor: string;
  fillColor: string;
}

export default function CurveDividerLeft({
  title,
  bgColor,
  fillColor,
}: CurveDividerLeftProps) {
  return (
    <div
      className="relative w-full h-10 lg:h-20 md:h-15 z-10 -mt-1"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="absolute top-0 w-full h-[102%]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The Fill Area */}
        <path        
          d="M0,2 H20 C30,2 30,98 40,98 H100 V102 H0 Z"
          fill={fillColor}
        />
        {/* The Black Stroke Line */}
        <path
          d="M0,2 H20 C30,2 30,98 40,98 H100"
          stroke="black"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <h1
        className="text-md sm:text-xl font-semibold tracking-wider uppercase z-10
          relative px-4 sm:px-8 md:px-10 lg:px-20 h-full flex items-center right-0"
      >
        {title}
      </h1>
    </div>
  );
}
