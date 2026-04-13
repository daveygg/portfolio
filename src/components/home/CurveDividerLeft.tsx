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
      className="relative w-full h-20 z-10"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="absolute top-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The Fill Area */}
        <path        
          d="M0,2 H20 C30,2 30,98 40,98 H100 V100 H0 Z"
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
        className="text-xl font-semibold tracking-wider uppercase z-10
          relative px-20 h-full flex items-center right-0"
      >
        {title}
      </h1>
    </div>
  );
}
