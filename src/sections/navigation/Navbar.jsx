import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Dropdown } from 'flowbite-react';
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineRead,
  AiOutlineComment,
  AiOutlineAudit,
  AiOutlineTranslation,
  AiOutlineTeam,
  AiOutlineMenu,
  AiOutlineMail,
  AiOutlineSolution,
} from 'react-icons/ai';

const Nav = () => {
  const { t, i18n } = useTranslation('navbar');
  const navbar = t('navbar', { returnObjects: true });
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const iconMap = useMemo(
    () => ({
      AiOutlineClose: <AiOutlineClose size={24} className="text-white" />,
      AiOutlineHome: <AiOutlineHome size={24} className="text-white" />,
      AiOutlineTeam: <AiOutlineTeam size={24} className="text-white" />,
      AiOutlineTool: <AiOutlineTool size={24} className="text-white" />,
      AiOutlineComment: <AiOutlineComment size={24} className="text-white" />,
      AiOutlineTranslation: (
        <AiOutlineTranslation size={24} className="text-gray-900" />
      ),
      AiOutlineRead: <AiOutlineRead size={24} className="text-white" />,
      AiOutlineAudit: <AiOutlineAudit size={24} className="text-white" />,
      AiOutlineMail: <AiOutlineMail size={24} className="text-white" />,
      AiOutlineSolution: <AiOutlineSolution size={24} className="text-white" />,
    }),
    []
  );

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setVisible(isScrollingUp || currentScrollPos < 50);

      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <Navbar
        className={`fixed w-full h-32 z-30 px-4 md:px-16 transition-all duration-700 flex items-center ${
          scrolled ? 'bg-[#10284e] shadow-lg' : 'bg-transparent'
        } ${visible ? 'translate-y-0' : '-translate-y-full'} ease-in-out overflow-visible`}
      >
        <Navbar.Brand href="/" className="flex-shrink-0 flex flex-start">
          <img loading="lazy"
            src="assets/home/logo.png"
            alt="Luk & Associates logo"
            className="w-24 object-contain"
          />
        </Navbar.Brand>

        <button
          aria-label="Toggle navigation"
          className="text-white text-lg p-8 lg:hidden"
          onClick={toggleNavbar}
        >
          <AiOutlineMenu size={24} />
        </button>
        <div
          className={`${
            isOpen
              ? 'fixed top-0 left-0 right-0 bottom-0 bg-[#10284e] z-100 flex justify-center items-center w-screen h-screen'
              : 'hidden'
          } lg:flex lg:w-auto lg:flex-row lg:items-center`}
          style={{ zIndex: 100 }}
        >
          <button
            aria-label="Close navigation"
            className="absolute top-4 right-4 text-white lg:hidden"
            onClick={toggleNavbar}
            style={{ zIndex: 70 }}
          >
            <AiOutlineClose size={32} />
          </button>

          <ul className="flex flex-col justify-center items-center h-full space-y-6 lg:space-y-0 lg:flex-row lg:space-x-6 lg:items-center">
            {navbar.links.map((item) => {
              if (item.key === 'language') {
                return (
                  <div
                    key={item.key}
                    className="flex items-center bg-white rounded-full px-2 py-1"
                  >
                    <button
                      className={`px-4 py-2 rounded-full transition-all ${
                        i18n.language === 'zh'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-500'
                      }`}
                      onClick={() => changeLanguage('zh')}
                    >
                      中文
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full transition-all ${
                        i18n.language === 'en'
                          ? 'bg-gray-200 text-gray-800'
                          : 'text-gray-500'
                      }`}
                      onClick={() => changeLanguage('en')}
                    >
                      English
                    </button>
                  </div>
                );
              }

              return (
                <Navbar.Link
                  href={item.url}
                  key={item.key}
                  className={`text-xl cursor-pointer transition-colors duration-500 py-2 ${
                    item.key === 'language'
                      ? 'bg-white text-gray-900'
                      : 'text-white'
                  } hover:bg-transparent`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {item.dropdown ? (
                    <Dropdown
                      inline
                      label={
                        <div className="flex items-center">
                          {iconMap[item.icon]}
                          <span className="ml-2">{item.label}</span>
                        </div>
                      }
                      dismissOnClick={true}
                      className="w-1/2 md:w-1/4 lg:w-1/6 lg:opacity-90"
                    >
                      <div className="max-h-72 overflow-y-auto lg:max-h-none lg:overflow-visible text-center">
                        {item.dropdown.map((subItem) => (
                          <Dropdown.Item
                            href={subItem.url}
                            key={subItem.key}
                            className="text-base tracking-tighter font-medium"
                            onClick={() => {
                              if (
                                subItem.key === 'en' ||
                                subItem.key === 'zh'
                              ) {
                                changeLanguage(subItem.key);
                              }
                            }}
                          >
                            <span className="ml-4">{subItem.label}</span>
                          </Dropdown.Item>
                        ))}
                      </div>
                    </Dropdown>
                  ) : (
                    <div className="flex items-center">
                      {iconMap[item.icon]}
                      <span className="ml-2">{item.label}</span>
                    </div>
                  )}
                </Navbar.Link>
              );
            })}
          </ul>
        </div>
      </Navbar>
    </>
  );
};

export default Nav;
