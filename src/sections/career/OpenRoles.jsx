import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiBriefcase,
  FiChevronDown,
  FiMail,
  FiAward,
  FiTarget,
  FiCheckCircle,
} from 'react-icons/fi';

const OpenRoles = () => {
  const { t } = useTranslation('career');
  const [openRoleId, setOpenRoleId] = useState(null);

  const openRoles = t('openRoles.roles', { returnObjects: true });
  const title = t('openRoles.title');
  const subtitle = t(
    'openRoles.subtitle',
    'Explore current opportunities and find the role that fits your skills and goals.'
  );
  const instruction = t('openRoles.instruction', 'Click a role to learn more.');

  if (!Array.isArray(openRoles)) return null;

  const toggleRole = (id) => {
    setOpenRoleId(openRoleId === id ? null : id);
  };

  return (
    <section className="max-w-6xl mx-auto py-0 pb-12 px-4 space-y-6 font-sans antialiased">
      <div className="space-y-4">
        <div className="space-y-3">
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            {title}
          </h2>
          <div className="w-10 h-[2px] bg-amber-600/80" />
        </div>
        <div className="text-sm text-gray-600 space-y-1 pt-1">
          <p>{subtitle}</p>
          <p>{instruction}</p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {openRoles.map((role) => {
          const isOpen = openRoleId === role.id;

          return (
            <div
              key={role.id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleRole(role.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50/50 transition-colors focus:outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex-shrink-0 flex items-center justify-center text-[#10284e]">
                    <FiBriefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 inline-block">
                      {role.title}
                    </h3>
                    {role.employmentType && (
                      <span className="text-sm text-gray-400 font-normal ml-2">
                        ({role.employmentType.join(' / ')})
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-orange-100 bg-orange-50/30 flex items-center justify-center text-amber-600">
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen
                        ? 'transform rotate-180 text-amber-600'
                        : 'text-gray-400'
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 p-6 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 text-[14px]/relaxed text-slate-700">
                  <div className="space-y-6">
                    {role.bestFor && (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 font-bold text-slate-800">
                          <FiTarget className="w-4 h-4 text-[#10284e]" />
                          <h4>Best for:</h4>
                        </div>
                        <p className="text-gray-600 pl-6">{role.bestFor}</p>
                      </div>
                    )}

                    {Array.isArray(role.responsibilities) && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 font-bold text-slate-800">
                          <FiCheckCircle className="w-4 h-4 text-[#10284e]" />
                          <h4>You’ll do things like:</h4>
                        </div>
                        <ul className="list-disc pl-11 space-y-1.5 text-gray-600">
                          {role.responsibilities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {Array.isArray(role.fitIf) && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 font-bold text-slate-800">
                          <FiAward className="w-4 h-4 text-[#10284e]" />
                          <h4>You’ll be a fit if you’re:</h4>
                        </div>
                        <ul className="list-disc pl-11 space-y-1.5 text-gray-600">
                          {role.fitIf.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 md:border-l md:border-gray-100 md:pl-8">
                    {role.requirements && (
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800">Required:</h4>
                        <div
                          className="text-gray-600 prose prose-sm max-w-none pl-1"
                          dangerouslySetInnerHTML={{
                            __html: role.requirements,
                          }}
                        />
                      </div>
                    )}

                    {Array.isArray(role.success90Days) && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-800">
                          90-day success looks like:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                          {role.success90Days.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#f0f4f8] rounded-xl p-6 sm:p-8 flex items-center space-x-6 border border-slate-100">
        <div className="w-12 h-12 bg-white rounded-full flex-shrink-0 flex items-center justify-center shadow-sm text-slate-600">
          <FiMail className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-slate-900">
            Don't see the right role?
          </h4>
          <p className="text-sm text-gray-600">
            We're always looking for talented people.
          </p>
          <a
            href="mailto:info@luklaw.ca?subject=Career%20Inquiry%20-%20General%20Application"
            className="inline-flex items-center text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900 group pt-1"
          >
            Send us your resume
            <span className="inline-block transform translate-x-1 group-hover:translate-x-2 transition-transform duration-150 ml-1">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpenRoles;
