import React from 'react';
import { useTranslation } from 'react-i18next';
import TeamCard from './TeamCard';
import TeamLanguage from './TeamLanguage';

const TeamContainer = () => {
  const { t } = useTranslation('team');
  const team = t('team', { returnObjects: true });
  const heading = t('heading', { returnObjects: true });
  const languages = t('languages', { returnObjects: true });

  return (
    <div>
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src="https://res.cloudinary.com/dyozsy6wx/image/upload/v1736993741/team-background_fnyd0m.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('title')}
          </h1>
        </div>
      </div>

      <div
        className="flex pt-16 relative flex-col max-w-screen-2xl mx-auto"
        id="team"
      >
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto"
          data-aos="fade-right"
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        <TeamLanguage languages={languages} language={heading.language} />
      </div>
    </div>
  );
};

export default TeamContainer;
