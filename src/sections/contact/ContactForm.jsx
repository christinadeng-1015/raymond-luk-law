import { Label, TextInput, Textarea, Button } from 'flowbite-react';
import { HiMail, HiUser, HiPhone } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const iconMapping = {
  HiUser: HiUser,
  HiMail: HiMail,
  HiPhone: HiPhone,
};

const ContactForm = () => {
  const { t } = useTranslation('contact');
  const form = t('form', { returnObjects: true });

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl shadow-sm bg-white/50 backdrop-blur-lg">
      <h3 className="text-center text-2xl font-bold text-[#10284e] mb-6">
        {form.title}
      </h3>
      <form className="flex flex-col gap-6 w-full">
        {form.fields.map((field) => {
          const IconComponent = iconMapping[field.icon];
          return (
            <div key={field.id} className="relative">
              <Label
                htmlFor={field.id}
                value={field.label}
                className="text-lg font-medium"
              />
              <TextInput
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required
                className="mt-2 w-full rounded-lg bg-gray-100 shadow-sm"
                rightIcon={IconComponent}
              />
            </div>
          );
        })}
        <div className="relative">
          <Label
            htmlFor={form.message.id}
            value={form.message.label}
            className="text-lg font-medium"
          />
          <Textarea
            id={form.message.id}
            placeholder={form.message.placeholder}
            required
            rows={6}
            className="mt-2 w-full rounded-lg bg-gray-100 shadow-sm"
          />
        </div>
        <Button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-[#10284e] to-[#0c1d3b] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
        >
          {form.button}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
