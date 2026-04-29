import CurveDividerRight from "../shared/CurveDividerRight";
import SkillsGrid from "./SkillsGrid";

export default function Skillset() {
  return (
    <section className="flex flex-col w-full">
      <CurveDividerRight
        title="skillset"
        fillColor="#FFFFFF"
        bgColor="#58BB90" />
        <div className="p-4 sm:p-8 md:p-12 lg:p-16">
          <SkillsGrid />
        </div>        
    </section>
  );
}
