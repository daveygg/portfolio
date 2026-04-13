interface CurveDividerRightProps {
  title: string;
  bgColor: string;
  fillColor: string;
}

export default function CurveDividerRight({
  title,
  bgColor,
  fillColor,
}: CurveDividerRightProps) {
  return (
    <div
      className="relative flex w-full h-20 overflow-hidden justify-end"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="absolute top-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The White Fill Area */}
        <path
          d="M100,2 H80 C70,2 70,98 60,98 H0 V100 H100 Z"
          fill={fillColor}
        />
        {/* The Black Stroke Line */}
        <path
          d="M100,2 H80 C70,2 70,98 60,98 H0 V100 H0"
          stroke="black"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <h1
        className="text-xl font-semibold tracking-wider uppercase z-10
          px-20 h-full flex items-center"
      >
        {title}
      </h1>
    </div>
  );
}
