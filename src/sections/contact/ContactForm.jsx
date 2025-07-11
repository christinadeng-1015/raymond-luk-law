import React from 'react';
import { Label, TextInput, Textarea, Button, Modal } from 'flowbite-react';
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

  const [result, setResult] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
  
    const accessKeys = [
      "53403ed3-d089-4103-b336-6573c7f77eec",
      "b54e4df1-f23c-456f-af96-9825f8af8cb2"
    ];
  
    const originalFormData = new FormData(event.target);
  
    try {
      const sendForm = async (key) => {
        const formData = new FormData();
        originalFormData.forEach((value, k) => formData.append(k, value));
        formData.append("access_key", key);
  
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
  
        return response.json();
      };
  
      const results = await Promise.all(accessKeys.map(sendForm));
  
      const allSuccessful = results.every(res => res.success);
  
      if (allSuccessful) {
        setResult("Form Submitted Successfully");
        setShowModal(true);
        event.target.reset();
      } else {
        console.log("Errors:", results);
        setResult("Some submissions failed.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("An error occurred while submitting the form.");
    }
  };  

  return (
    <>
      <div
        className="w-full max-w-2xl mx-auto p-6 rounded-xl shadow-sm bg-white/50 backdrop-blur-lg"
        data-aos="slide-left"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
      >
        <h3 className="text-center text-2xl font-bold text-[#10284e] mb-6">
          {form.title}
        </h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
          {form.fields.map((field) => {
            const IconComponent = iconMapping[field.icon];
            return (
              <div key={field.id} className="relative flex flex-row items-center gap-2">
                <Label
                  htmlFor={field.id}
                  value={field.label}
                  className="text-lg font-medium w-1/5"
                />
                <TextInput
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  className="rounded-lg w-4/5 bg-gray-100 shadow-sm"
                  rightIcon={IconComponent}
                />
              </div>
            );
          })}

          <input
            type="hidden"
            name="subject"
            value="New Client Inquiry Form"
          />

          <div className="relative">
            <Label
              htmlFor={form.message.id}
              value={form.message.label}
              className="text-lg font-medium"
            />
            <Textarea
              id={form.message.id}
              name={form.message.id}
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
        {result && (
          <p className="mt-4 text-center text-sm text-gray-700 font-medium">
            {result}
          </p>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>{form.successTitle}</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <p>{form.successMessage}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactForm;
