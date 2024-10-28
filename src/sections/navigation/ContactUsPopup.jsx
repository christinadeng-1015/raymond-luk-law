import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const ContactUsPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={togglePopup}
          className="bg-white text-[#10284e] p-3 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
        >
          <FaPhoneAlt size={32} />
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed bottom-28 right-16 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center pb-4 border-b">
            <h3 className="text-lg font-semibold text-gray-700">Contact Us</h3>
            <button
              onClick={togglePopup}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ×
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <FaPhoneAlt className="text-[#10284e] mr-2" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-[#10284e] mr-2" />
              <span>email@example.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-[#10284e] mr-2" />
              <span>123 Main St, City, Country</span>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10284e] hover:text-blue-600 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10284e] hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10284e] hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUsPopup;
