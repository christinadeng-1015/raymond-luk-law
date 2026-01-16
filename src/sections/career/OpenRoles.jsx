import { useTranslation } from 'react-i18next';

const OpenRoles = () => {
  const { t } = useTranslation('career');

  const openRoles = t('openRoles.roles', { returnObjects: true });
  const title = t('openRoles.title');

  if (!Array.isArray(openRoles)) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {openRoles.map((role) => (
          <div key={role.id} className="border-t pt-8 space-y-4">
            <h3 className="text-xl font-semibold">
              {role.title}{' '}
              {role.employmentType && (
                <span className="text-gray-500 font-normal">
                  ({role.employmentType.join(' / ')})
                </span>
              )}
            </h3>

            {role.bestFor && (
              <p>
                <strong>Best for:</strong> {role.bestFor}
              </p>
            )}

            {Array.isArray(role.responsibilities) && (
              <div>
                <p className="font-semibold">You’ll do things like:</p>
                <ul className="list-disc pl-6 space-y-1">
                  {role.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(role.fitIf) && (
              <div>
                <p className="font-semibold">You’ll be a fit if you’re:</p>
                <ul className="list-disc pl-6 space-y-1">
                  {role.fitIf.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="text-base leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: role.requirements }}
            />

            {Array.isArray(role.success90Days) && (
              <div>
                <p className="font-semibold">90-day success looks like:</p>
                <ul className="list-disc pl-6 space-y-1">
                  {role.success90Days.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpenRoles;
