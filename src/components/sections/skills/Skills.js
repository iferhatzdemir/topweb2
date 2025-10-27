import SkillProgross from "@/components/shared/skills/SkillProgross";
import Image from "next/image";

const Skills = () => {
  return (
    <div className="ltn__progress-bar-area pt-115 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <SkillProgross />
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-img-right">
              <Image
                src="/img/team/t-4.jpg"
                alt="Image"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Skills;
