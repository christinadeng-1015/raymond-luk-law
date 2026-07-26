import React from 'react';
import { useTranslation } from 'react-i18next';
import TeamCard from './TeamCard';
import TeamLanguage from './TeamLanguage';

const TeamContainer = () => {
  const { t } = useTranslation('team');
  const team = t('team', { returnObjects: true }) || [];
  const heading = t('heading', { returnObjects: true }) || {};
  const languages = t('languages', { returnObjects: true }) || [];
  const categoriesOrder = t('categoriesOrder', { returnObjects: true }) || [];
  const categories = t('categories', { returnObjects: true }) || {};

  const groupedTeam = categoriesOrder.map((categoryKey) => ({
    key: categoryKey,
    label: categories[categoryKey],
    members: team.filter((member) => member.category === categoryKey),
  }));

  return (
    <section className="relative w-full py-24 bg-white antialiased overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#10284e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-sans font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            The Experts
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#10284e] mb-6">
            {t('title')}
          </h3>
          <div className="w-20 h-[1px] bg-amber-500/50 mx-auto" />
        </div>

        <div className="relative flex flex-col gap-12" id="team">
          {groupedTeam.map((group) =>
            group.members.length > 0 ? (
              <div key={group.key} className="relative">
                <div className="mb-10 flex items-center gap-4 px-2">
                  <h4 className="text-md font-sans font-bold tracking-[0.2em] uppercase text-[#10284e]/80">
                    {group.label}
                  </h4>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/40 via-slate-100 to-transparent" />
                </div>

                <div
                  className={`flex flex-wrap gap-x-8 gap-y-16 justify-center ${
                    group.members.length < 3
                      ? 'sm:justify-center'
                      : 'sm:justify-start'
                  }`}
                >
                  {group.members.map((member) => (
                    <div
                      key={member.name}
                      className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)] max-w-xs flex justify-center"
                    >
                      <div className="w-full transition-transform duration-700 hover:-translate-y-2">
                        <TeamCard member={member} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}

          <div className="mx-auto w-full max-w-lg border-t border-amber-500/30" />
          <TeamLanguage languages={languages} language={heading.language} />
        </div>
      </div>
    </section>
  );
};

export default TeamContainer;
