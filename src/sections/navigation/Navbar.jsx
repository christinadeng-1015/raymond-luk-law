import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Dropdown } from 'flowbite-react';
import OptimizedImage from '../../components/OptimizedImage';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

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

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setVisible(isScrollingUp || currentScrollPos < 50);

      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <Navbar
        className={`relative fixed w-full h-32 z-30 px-4 md:px-16 transition-all duration-700 flex items-center ${
          scrolled
            ? 'bg-gradient-to-b from-slate-900 to-[#10284e] shadow-lg'
            : 'bg-transparent'
        } ${visible ? 'translate-y-0' : '-translate-y-full'} ease-in-out overflow-visible`}
      >
        <Navbar.Brand href="/" className="flex-shrink-0 flex flex-start">
          <div className="w-24 aspect-[4/1]">
            <OptimizedImage
              src="/assets/home/logo.png"
              alt="Luk & Associates logo"
              originalFormat="png"
              className="object-contain"
            />
          </div>
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
              ? 'fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-900 to-[#10284e]  z-100 flex justify-center items-center w-screen h-screen'
              : 'hidden'
          } lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:px-16 lg:flex lg:flex-row lg:items-center lg:justify-center`}
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

          <ul className="flex flex-col justify-center items-center h-full space-y-4 lg:space-y-0 lg:flex-row lg:space-x-1 lg:items-center">
            {navbar.links.map((item) => {
              if (item.key === 'language') {
                return (
                  <div
                    key={item.key}
                    className="flex items-center bg-black/20 rounded-full px-2 py-1 lg:absolute lg:right-8"
                  >
                    <button
                      onClick={() => changeLanguage('zh')}
                      className={`px-4 py-1.5 text-[11px] font-bold rounded-full transition-all ${i18n.language === 'zh' ? 'bg-amber-500 text-white' : 'text-white'}`}
                    >
                      中
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`px-4 py-1.5 text-[11px] font-bold rounded-full transition-all ${i18n.language === 'en' ? 'bg-amber-500 text-white' : 'text-white'}`}
                    >
                      EN
                    </button>
                  </div>
                );
              }

              if (item.dropdown) {
                return (
                  <div
                    key={item.key}
                    className={`
                      cursor-pointer transition-all duration-300
                      text-[20px] px-8 py-4 text-left w-full
                      lg:text-[16px] lg:px-5 lg:py-2 lg:text-center lg:w-auto
                      font-serif tracking-wide text-white hover:text-amber-500 hover:bg-transparent
                      border-b-2 border-transparent transition-all duration-300
                    `}
                  >
                    <Dropdown
                      inline
                      label={
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                        </div>
                      }
                      dismissOnClick={true}
                      className="z-[150] fixed left-1/2 -translate-x-1/2 w-[90%] max-h-[60vh] overflow-y-auto rounded-none shadow-2xl border border-white/20 text-white lg:static lg:left-0 lg:translate-x-0 md:w-[40%] lg:w-52 bg-slate-100/90 backdrop-blur-md"
                    >
                      <div className="max-h-72 overflow-y-auto lg:max-h-none lg:overflow-visible">
                        {item.dropdown.map((subItem) => (
                          <Dropdown.Item
                            href={subItem.url}
                            key={subItem.key}
                            className="text-[18px] lg:text-[14px] normal-case font-medium hover:text-amber-500 hover:bg-white/5 border-b border-white/5 last:border-0 py-4 px-8 lg:py-3 lg:px-6"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            onClick={() => {
                              if (
                                subItem.key === 'en' ||
                                subItem.key === 'zh'
                              ) {
                                changeLanguage(subItem.key);
                              }
                            }}
                          >
                            {subItem.label}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </Dropdown>
                  </div>
                );
              }

              return (
                <Navbar.Link
                  href={item.url}
                  key={item.key}
                  className={`
                    cursor-pointer transition-all duration-300
                    text-[20px] px-8 py-4 text-left w-full
                    lg:text-[16px] lg:px-5 lg:py-2 lg:text-center lg:w-auto
                    font-serif tracking-wide text-white hover:text-amber-500 hover:bg-transparent
                    border-b-2 border-transparent transition-all duration-300
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>
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
