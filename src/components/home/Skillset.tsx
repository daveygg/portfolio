import CurveDividerRight from "./CurveDividerRight";
import SkillsGrid from "./SkillsGrid/SkillsGrid";

export default function Skillset() {
  return (
    <section className="flex flex-col w-full">
      <CurveDividerRight
        title="skillset"
        fillColor="#FFFFFF"
        bgColor="#58BB90" />
        <div className="p-16">
          <SkillsGrid />
        </div>        
    </section>
  );
}
