import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom"; // Import useLocation
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineRead,
  AiOutlineComment,
  AiOutlineAudit,
  AiOutlineTranslation,
  AiOutlineTeam,
} from "react-icons/ai";
import RLLogo from "../../assets/RL_logo.png";

const Nav = () => {
  const { t, i18n } = useTranslation("navbar");
  const navbar = t("navbar", { returnObjects: true });
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const location = useLocation(); // Get current location
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true); // Track visibilit

  const iconMap = useMemo(
    () => ({
      AiOutlineClose: <AiOutlineClose size={24} />,
      AiOutlineHome: <AiOutlineHome size={24} />,
      AiOutlineTeam: <AiOutlineTeam size={24} />,
      AiOutlineTool: <AiOutlineTool size={24} />,
      AiOutlineComment: <AiOutlineComment size={24} />,
      AiOutlineTranslation: <AiOutlineTranslation size={24} />,
      AiOutlineRead: <AiOutlineRead size={24} />,
      AiOutlineAudit: <AiOutlineAudit size={24} />,
    }),
    []
  );

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Show navbar when scrolling up, hide when scrolling down
      setVisible(isScrollingUp || currentScrollPos < 50);

      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > 50); // Set scrolled state for styling
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Navbar
      fluid
      rounded
      className={`fixed w-full z-50 transition-all duration-700 ${
        scrolled || location.pathname !== "/"
          ? "bg-[#10284e] shadow-lg"
          : "bg-transparent"
      } ${visible ? "translate-y-0" : "-translate-y-full"} ease-in-out`}
    >
      <Navbar.Brand href="/" className="py-4 pl-4">
        <button className="flex items-center">
          <img src={RLLogo} alt="logo" className="w-32 object-contain" />
        </button>
      </Navbar.Brand>
      {/* Set the toggle button to have no background color */}
      <Navbar.Toggle
        onClick={toggleNavbar}
        className="text-white bg-transparent border-none"
      />
      {/* Mobile drawer full-screen, full-height (100vh), from left, and with background color #10284e */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#10284e] transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-50`}
        style={{ height: "100vh" }} // Ensure full height
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={closeNavbar}
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navbar.links.map((item) => (
            <Navbar.Link
              href={item.url}
              key={item.key}
              className="text-white text-2xl font-semibold"
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
                <div className="flex items-center">
                  {iconMap[item.icon]}
                  <span className="ml-2">{item.label}</span>
                </div>
              )}
            </Navbar.Link>
          ))}
        </div>
      </div>
      <Navbar.Collapse
        className={`lg:flex ${
          isOpen ? "block" : "hidden"
        } lg:flex lg:bg-transparent`}
      >
        {/* Desktop links go here */}
        {navbar.links.map((item) => (
          <Navbar.Link
            href={item.url}
            key={item.key}
            className="cursor-pointer transition-colors duration-500 p2 text-white text-base"
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
              <div className="flex items-center">
                {iconMap[item.icon]}
                <span className="ml-2">{item.label}</span>
              </div>
            )}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
