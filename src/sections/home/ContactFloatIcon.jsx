import React, { useState, useEffect, useRef } from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaGlobeAmericas } from 'react-icons/fa';
import i18n from 'i18next';

function ContactFloatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLanguage] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const containerRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setLanguage(lng);
    setShowLangMenu(false);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng') || 'en';
    changeLanguage(storedLang);
  }, []);

  const togglePhoneNumbers = () => {
    setIsOpen((prev) => !prev);
    setShowLangMenu(false);
  };

  const toggleLangMenu = () => {
    setShowLangMenu((prev) => !prev);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2"
    >
      {showLangMenu && (
        <div className="bg-white shadow-lg p-3 rounded-md w-40 mb-2">
          <button
            onClick={() => changeLanguage('en')}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('zh')}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            中文
          </button>
        </div>
      )}
      {isOpen && (
        <div className="bg-white shadow-lg p-4 rounded-md w-52 mb-2">
          <div className="text-gray-800 mb-2">
            <strong>English:</strong>
            <a
              href="tel:+9056676496"
              className="block text-blue-700 hover:underline font-bold"
            >
              905-667-6496
            </a>
          </div>
          <div className="text-gray-800">
            <strong>中文:</strong>
            <a
              href="tel:+9056676499"
              className="block text-blue-700 hover:underline font-bold"
            >
              905-667-6499
            </a>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={toggleLangMenu}
          className="w-12 h-12 flex items-center justify-center bg-white text-[#10284e] rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 opacity-90"
          aria-label="Change Language"
        >
          <FaGlobeAmericas size={24} />
        </button>

        <button
          onClick={togglePhoneNumbers}
          className="w-12 h-12 flex items-center justify-center bg-[#10284e] text-white rounded-full shadow-lg border-2 border-white hover:bg-blue-800 opacity-90"
          aria-label="Contact Us"
        >
          <FiPhone size={24} />
        </button>
      </div>
    </div>
  );
}

export default ContactFloatIcon;
