import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Navbar } from "flowbite-react";
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
} from "react-icons/ai";
import RLLogo from "../../assets/RL_logo.png";

const Nav = () => {
  const { t, i18n } = useTranslation("navbar");
  const navbar = t("navbar", { returnObjects: true });
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const location = useLocation();
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
        <AiOutlineTranslation size={24} className="text-white" />
      ),
      AiOutlineRead: <AiOutlineRead size={24} className="text-white" />,
      AiOutlineAudit: <AiOutlineAudit size={24} className="text-white" />,
    }),
    []
  );

  const toggleNavbar = () => setIsOpen(!isOpen); // Toggle state

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setVisible(isScrollingUp || currentScrollPos < 50);

      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <Navbar
        className={`fixed w-full h-32 z-50 px-16 transition-all duration-700 flex items-center ${
          scrolled || location.pathname !== "/"
            ? "bg-[#10284e] shadow-lg"
            : "bg-transparent"
        } ${visible ? "translate-y-0" : "-translate-y-full"} ease-in-out`}
      >
        <Navbar.Brand href="/" className="flex-shrink-0 flex flex-start">
          <img src={RLLogo} alt={"logo"} className="w-24 object-contain" />
        </Navbar.Brand>

        <button
          aria-label="Toggle navigation"
          className="text-white text-lg p-4 lg:hidden"
          onClick={toggleNavbar}
        >
          <AiOutlineMenu size={24} />
        </button>
        <div
          className={`${
            isOpen
              ? "fixed top-0 left-0 right-0 bottom-0 bg-[#10284e] z-100 flex justify-center items-center w-screen h-screen"
              : "hidden"
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
            {navbar.links.map((item) => (
              <Navbar.Link
                href={item.url}
                key={item.key}
                className={
                  "text-xl cursor-pointer transition-colors duration-500 py-2 text-white"
                }
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {item.dropdown ? (
                  <Dropdown
                    inline
                    label={
                      <div className="flex items-center text-white text-base p-2">
                        {iconMap[item.icon]}
                        <span className="ml-2">{item.label}</span>
                      </div>
                    }
                    dismissOnClick={true}
                    className="w-1/2 md:w-1/4 lg:w-1/6"
                  >
                    {item.dropdown.map((subItem) => (
                      <Dropdown.Item
                        href={subItem.url}
                        key={subItem.key}
                        className="text-base tracking-tighter font-medium"
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
                  <Link
                    to={item.url}
                    className="flex items-center text-white text-base p-2"
                    onClick={() => setIsOpen(false)} // Close drawer on navigation click
                  >
                    {iconMap[item.icon]}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                )}
              </Navbar.Link>
            ))}
          </ul>
        </div>
      </Navbar>
    </>
  );
};

export default Nav;
