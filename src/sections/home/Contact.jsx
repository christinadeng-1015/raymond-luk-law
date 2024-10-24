import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineCalendar,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("navbar");

  return (
    <div
      className="flex flex-col items-center justify-center text-center text-gray-200 py-16 shadow-lg relative z-10 py-32"
      style={{
        background: "#10284e",
      }}
    >
      <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16 text-white">
        Contact Us
      </h3>
      <div
        className="flex flex-col md:flex-row items-center justify-center"
        data-aos="flip-down"
        data-aos-duration="2000"
      >
        {/* Phone Section */}
        <div className="my-6 md:mx-10 lg:mx-20 w-64">
          {" "}
          <div className="flex items-center justify-center mb-4">
            <AiOutlinePhone size={42} />
          </div>
          <h5 className="pb-2 text-gray-200">{t("Phone")}</h5>
          <p className="text-lg antialiased italic">+1 234 567 890</p>
        </div>

        {/* Email Section */}
        <div className="my-6 md:mx-10 lg:mx-20 w-64">
          {" "}
          <div className="flex items-center justify-center mb-4">
            <AiOutlineMail size={42} />
          </div>
          <h5 className="pb-2 text-gray-200">{t("Email")}</h5>
          <p className="text-lg antialiased italic">contact@domain.com</p>
        </div>

        {/* Schedule Meeting Section */}
        <div className="my-6 md:mx-10 lg:mx-20 w-64">
          {" "}
          <div className="flex items-center justify-center mb-4">
            <AiOutlineCalendar size={42} />
          </div>
          <h5 className="pb-2 text-gray-200">{t("Make An Appointment")}</h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
