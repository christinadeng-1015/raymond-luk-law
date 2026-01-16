import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 ' +
  'bg-white focus:outline-none focus:ring-2 focus:ring-[#10284e] focus:border-[#10284e]';

function Modal({ open, onClose, title, subtitle, children, footer }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">{children}</div>
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-md border px-4 py-2 text-sm font-medium',
        active
          ? 'border-[#10284e] bg-[#10284e] text-white'
          : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default function JoinTalentPool() {
  const { t } = useTranslation('career');

  const roles = t('joinThePool.roles', { returnObjects: true });
  const languages = t('joinThePool.languages', { returnObjects: true });
  const comfortOptions = t('joinThePool.comfortOptions', {
    returnObjects: true,
  });

  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [result, setResult] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    roles: [],
    language: 'Mandarin',
    comfortSpoken: 'Comfortable',
    comfortWritten: 'Comfortable',
    earliestStart: '',
    availability: '',
    linkedIn: '',
    message: '',
  });

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleRole = (id) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(id)
        ? prev.roles.filter((r) => r !== id)
        : [...prev.roles, id],
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');

    try {
      const formData = new FormData(event.target);
      formData.append('access_key', '53403ed3-d089-4103-b336-6573c7f77eec');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        setShowSuccess(true);
        setOpen(false);
        event.target.reset();
        setForm({
          name: '',
          email: '',
          phone: '',
          roles: [],
          language: 'Mandarin',
          comfortSpoken: 'Comfortable',
          comfortWritten: 'Comfortable',
          earliestStart: '',
          availability: '',
          linkedIn: '',
          message: '',
        });
      } else {
        setResult(data.message || 'Submission failed.');
      }
    } catch (err) {
      setResult(err?.message || 'Submission failed.');
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-900">
          {t('joinThePool.page.title')}
        </h2>
        <p className="mt-2 text-gray-700">
          {t('joinThePool.page.description')}
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg bg-[#10284e] px-6 py-3 font-semibold text-white"
          >
            {t('joinThePool.page.cta')}
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t('joinThePool.modal.title')}
        subtitle={t('joinThePool.modal.subtitle')}
        footer={
          <div className="flex justify-between gap-6">
            <p className="text-xs text-gray-500">
              {t('joinThePool.modal.disclaimer')}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-5 py-2.5"
              >
                {t('joinThePool.modal.cancel')}
              </button>
              <button
                type="submit"
                form="talent-pool-form"
                className="rounded-lg bg-[#10284e] px-6 py-2.5 text-white"
              >
                {t('joinThePool.modal.submit')}
              </button>
            </div>
          </div>
        }
      >
        <form id="talent-pool-form" onSubmit={onSubmit} className="space-y-10">
          <input type="hidden" name="subject" value="Talent Pool Application" />

          <Section title={t('joinThePool.sections.contact.title')}>
            <input
              name="name"
              className={inputClass}
              placeholder={t('joinThePool.fields.name.label')}
              value={form.name}
              onChange={setField('name')}
              required
            />
            <input
              name="email"
              type="email"
              className={inputClass}
              placeholder={t('joinThePool.fields.email.label')}
              value={form.email}
              onChange={setField('email')}
              required
            />
            <input
              name="phone"
              className={inputClass}
              placeholder={t('joinThePool.fields.phone.label')}
              value={form.phone}
              onChange={setField('phone')}
            />
          </Section>

          <Section title={t('joinThePool.sections.roles.title')}>
            <div className="flex flex-wrap gap-3">
              {roles.map((r) => (
                <Pill
                  key={r.id}
                  active={form.roles.includes(r.id)}
                  onClick={() => toggleRole(r.id)}
                >
                  {r.label}
                </Pill>
              ))}
            </div>
            <input type="hidden" name="roles" value={form.roles.join(', ')} />
          </Section>

          <Section title={t('joinThePool.sections.language.title')}>
            <select
              name="language"
              className={inputClass}
              value={form.language}
              onChange={setField('language')}
              required
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <select
              name="comfortSpoken"
              className={inputClass}
              value={form.comfortSpoken}
              onChange={setField('comfortSpoken')}
              required
            >
              {comfortOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="comfortWritten"
              className={inputClass}
              value={form.comfortWritten}
              onChange={setField('comfortWritten')}
              required
            >
              {comfortOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Section>

          <Section title={t('joinThePool.sections.availability.title')}>
            <input
              name="earliestStart"
              type="date"
              className={inputClass}
              value={form.earliestStart}
              onChange={setField('earliestStart')}
            />
            <input
              name="availability"
              className={inputClass}
              value={form.availability}
              onChange={setField('availability')}
            />
          </Section>

          <Section title={t('joinThePool.sections.materials.title')}>
            <input
              name="resume"
              type="file"
              accept=".pdf"
              className={inputClass}
              required
            />
            <textarea
              name="message"
              className={`${inputClass} min-h-[140px]`}
              value={form.message}
              onChange={setField('message')}
              required
            />
            <input
              name="linkedIn"
              className={inputClass}
              value={form.linkedIn}
              onChange={setField('linkedIn')}
            />
          </Section>

          {result && <div className="text-sm text-gray-700">{result}</div>}
        </form>
      </Modal>

      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Application received"
        subtitle={result}
        footer={
          <div className="flex justify-end">
            <button
              onClick={() => setShowSuccess(false)}
              className="rounded-lg bg-[#10284e] px-6 py-2.5 text-white"
            >
              Close
            </button>
          </div>
        }
      >
        <p className="text-sm text-gray-700">
          {t('joinThePool.modal.disclaimer')}
        </p>
      </Modal>
    </section>
  );
}
