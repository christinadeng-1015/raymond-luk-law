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
    <section className="max-w-screen-2xl mx-auto px-4 py-16">
      <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16 text-black">
        {t('title')}
      </h3>
      <div
        className="flex relative flex-col max-w-screen-2xl mx-auto"
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
    </section>
  );
};

export default TeamContainer;
