import React from 'react';
import { useTranslation } from 'react-i18next';
import TeamCard from './TeamCard';
import TeamLanguage from './TeamLanguage';

const TeamContainer = () => {
  const { t } = useTranslation('team');
  const team = t('team', { returnObjects: true });
  const heading = t('heading', { returnObjects: true });
  const languages = t('languages', { returnObjects: true });
  const categoriesOrder = t('categoriesOrder', { returnObjects: true });
  const categories = t('categories', { returnObjects: true });

  const groupedTeam = categoriesOrder.map((categoryKey) => ({
    key: categoryKey,
    label: categories[categoryKey],
    members: team.filter((member) => member.category === categoryKey),
  }));

  return (
    <section className="max-w-screen-xl mx-auto py-16">
      <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16 text-black">
        {t('title')}
      </h3>
      <div
        className="flex relative flex-col max-w-screen-2xl mx-auto"
        id="team"
      >
        {groupedTeam.map((group) =>
          group.members.length > 0 ? (
            <div key={group.key} className="mb-10">
              <div className="px-4 mb-6">
                <h4 className="text-2xl font-bold tracking-wide text-blue-900 mb-2 uppercase">
                  {group.label}
                </h4>
                <div className="h-0.5 w-full rounded-full bg-yellow-400/90" />
              </div>
              <div
                className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto"
                data-aos="fade-right"
              >
                {group.members.map((member) => (
                  <TeamCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          ) : null
        )}
        <TeamLanguage languages={languages} language={heading.language} />
      </div>
    </section>
  );
};

export default TeamContainer;
