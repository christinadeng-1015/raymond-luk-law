import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Navbar } from "flowbite-react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineRead,
  AiOutlineComment,
  AiOutlineAudit,
  AiOutlineTranslation,
  AiOutlineTeam,
} from "react-icons/ai";
import RLLogo from "../../assets/RL_logo.png";

const iconMap = {
  AiOutlineClose: <AiOutlineClose size={24} />,
  AiOutlineHome: <AiOutlineHome size={24} />,
  AiOutlineTeam: <AiOutlineTeam size={24} />,
  AiOutlineTool: <AiOutlineTool size={24} />,
  AiOutlineComment: <AiOutlineComment size={24} />,
  AiOutlineTranslation: <AiOutlineTranslation size={24} />,
  AiOutlineRead: <AiOutlineRead size={24} />,
  AiOutlineAudit: <AiOutlineAudit size={24} />,
};

const Nav = () => {
  const { t, i18n } = useTranslation("navbar");
  const navbar = t("navbar", { returnObjects: true });
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Set background to white if scrolled down past 50px, else keep transparent
      setScrolled(currentScrollPos > 50);

      // Hide navbar if scrolling down, show if scrolling up
      setVisible(currentScrollPos < 50 || prevScrollPos > currentScrollPos);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <Navbar
        fluid
        className={`fixed w-full h-48 z-50 transition-all duration-700 flex ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        } ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <Navbar.Brand href="/" className="absolute left-20">
          <img src={RLLogo} alt={"logo"} className="w-1/2 object-contain" />
        </Navbar.Brand>
        <div className="flex items-center gap-4 px-4 sm:px-8 md:px-0 lg:px-8 ml-auto">
          <button
            aria-label="Toggle navigation"
            className="text-gray-900 text-lg p-4 lg:hidden" // Show on mobile and tablet, hidden on large screens
            onClick={toggleNavbar}
          >
            <AiOutlineMenu size={24} /> {/* Hamburger menu icon */}
          </button>
        </div>

        <Navbar.Collapse
          className={`fixed top-0 left-0 w-full h-screen lg:relative lg:h-auto lg:w-auto z-50 transition-transform duration-500 ease-in-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 flex flex-col justify-start p-6 bg-white lg:bg-transparent`}
        >
          <div
            className="absolute top-5 right-5 cursor-pointer lg:hidden"
            onClick={closeNavbar}
          >
            <AiOutlineClose className="h-6 w-6 text-gray-800" />
          </div>

          {navbar.links.map((item) => (
            <Navbar.Link
              href={item.url}
              key={item.key}
              className={`text-xl cursor-pointer transition-colors duration-500 py-2 ${
                isOpen
                  ? "text-gray-900"
                  : scrolled
                  ? "text-gray-800"
                  : "text-white"
              }`}
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
                  className="w-2/3 md:w-1/3"
                >
                  {item.dropdown.map((subItem) => (
                    <Dropdown.Item
                      href={subItem.url}
                      key={subItem.key}
                      className="text-lg tracking-tighter font-medium"
                      onClick={() => {
                        if (subItem.key === "en" || subItem.key === "zh") {
                          changeLanguage(subItem.key);
                        }
                      }}
                    >
                      <span className="ml-2">{subItem.label}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              ) : (
                <div className="flex items-center">
                  {iconMap[item.icon]}
                  <span className="ml-2">{item.label}</span>
                </div>
              )}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nav;
