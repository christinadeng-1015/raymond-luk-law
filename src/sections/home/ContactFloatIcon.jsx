import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";

function ContactFloatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePhoneNumbers = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {/* Phone Numbers */}
      {isOpen && (
        <div className="bg-white shadow-lg p-4 rounded-md mb-2 w-48">
          <div className="text-gray-800 mb-2">
            <strong>English:</strong>
            <a href="tel:+1234567890" className="block text-blue-600 hover:underline">
              +1 234-567-890
            </a>
          </div>
          <div className="text-gray-800">
            <strong>中文:</strong>
            <a href="tel:+0123456789" className="block text-blue-600 hover:underline">
              +0 123-456-789
            </a>
          </div>
        </div>
      )}

      {/* Floating Phone Icon */}
      <button
        onClick={togglePhoneNumbers}
        className="bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none hover:bg-blue-800"
        aria-label="Contact Us"
      >
        <FiPhone size={28} />
      </button>
    </div>
  );
}

export default ContactFloatIcon;
