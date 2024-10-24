import { useTranslation } from "react-i18next";
import TeamCard from "./TeamCard";

const Team = () => {
  const { t } = useTranslation("team");
  const title = t("title", { returnObjects: false });
  const team = t("team", { returnObjects: true });

  return (
    <div
      className="flex py-24 relative flex-col max-w-screen-2xl mx-auto"
      id="team"
    >
      <div className="w-full p-8 flex flex-col justify-center">
        <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16">
          {title}
        </h3>
      </div>

      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto"
        data-aos="fade-right"
      >
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
