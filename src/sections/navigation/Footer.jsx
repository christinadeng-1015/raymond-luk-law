import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import RLLogo from "../../assets/RL_logo.png";
import LawLogo from "../../assets/law.png";
import Form from "./Form";

const FooterHome = () => {
  const footer = {
    corporation: "© 2024 by Raymond Luk Law Professional Corporation",
    disclaimer:
      "DISCLAIMER: The information obtained on this site is not intended to be legal advice. Please consult a legal professional for advice regarding your individual situation. Please be advised that contacting the firm does not create a solicitor-client nor a legal relationship of any kind. Please do not send any confidential information until such relationship has been established and a retainer has been signed.",
    services: [
      { service: "Real Estate Law", link: "#" },
      { service: "Family Law", link: "#" },
      { service: "Will & Estates", link: "#" },
      { service: "Personal Injury Law", link: "#" },
      { service: "Immigration Law", link: "#" },
      { service: "Notary Services", link: "#" },
    ],
    contacts: [
      { id: 1, link: "#", title: "English: 905-667-6496" },
      { id: 2, link: "#about", title: "中文: 905-667-6499" },
      { id: 3, link: "#services", title: "Email: info@luklawpc.com" },
      { id: 4, link: "#portfolio", title: "Fax: 905-849-3583" },
      {
        id: 5,
        link: "#contact",
        title:
          "HSBC Tower, Liberty Square, 3601 Highway 7, Unit 803, Markham, ON, L3R 0M3",
      },
    ],
    quickLinks: [
      { title: "Home", link: "#" },
      { title: "About Us", link: "#" },
      { title: "Our Services", link: "#" },
      { title: "Contact", link: "#" },
    ],
    socialLinks: [
      { icon: BsFacebook, link: "https://facebook.com" },
      { icon: BsInstagram, link: "https://instagram.com" },
      { icon: BsTwitter, link: "https://twitter.com" },
      { icon: BsDribbble, link: "https://dribbble.com" },
    ],
  };

  return (
    <Footer
      container
      className="pt-16 pb-8 bg-[#10284e] text-white"
      id="footer"
    >
      <div className="w-full max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8 items-center gap-8">
          <img
            src={RLLogo}
            alt="logo"
            className="w-40 object-contain mb-4 md:mb-0"
          />
          <a
            href="https://legaldirectorate.ca/family-law-attorneys/markham-on/"
            target="_blank"
            style={{ display: "inline-block", border: 0 }}
            rel="noreferrer"
          >
            <img
              src="https://legaldirectorate.ca/awards/2024/2/31/3e407a83b4ab1ea59f324a758d86d312/BestOf-Markham-i250-2024.svg"
              style={{ width: 250, display: "block" }}
              width="250"
              height="100"
              alt="Best Family Law Attorneys in Markham"
            />
          </a>
          <img
            src={LawLogo}
            alt="Law Logo"
            className="w-48 object-contain mt-4 md:mt-0"
          />
        </div>

        {/* Form and Link Groups */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 py-10 items-center text-center lg:text-left">
          {/* Form on the left */}
          <Form />

          {/* Link Groups on the right */}
          <div className="flex flex-col w-full lg:w-1/2 space-y-6">
            <div className="flex flex-wrap justify-center lg:justify-between w-full">
              <div className="w-full md:w-1/3 mb-4">
                <Footer.Title
                  title="Quick Links"
                  className="underline text-lg text-white mb-4 font-semibold"
                />
                <Footer.LinkGroup col>
                  {footer.quickLinks.map((item) => (
                    <a
                      href={item.link}
                      key={item.title}
                      className="text-white text-sm mb-2 hover:underline"
                    >
                      {item.title}
                    </a>
                  ))}
                </Footer.LinkGroup>
              </div>
              <div className="w-full md:w-1/3 mb-4">
                <Footer.Title
                  title="Areas of Practice"
                  className="underline text-lg text-white mb-4 font-semibold"
                />
                <Footer.LinkGroup col>
                  {footer.services.map((item) => (
                    <a
                      href={item.link}
                      key={item.service}
                      className="text-white text-sm mb-2 hover:underline"
                    >
                      {item.service}
                    </a>
                  ))}
                </Footer.LinkGroup>
              </div>
              <div className="w-full md:w-1/3 mb-4">
                <Footer.Title
                  title="Contact Us"
                  className="underline text-lg text-white mb-4 font-semibold"
                />
                <Footer.LinkGroup col>
                  {footer.contacts.map((item) => (
                    <a
                      href={item.link}
                      key={item.title}
                      className="text-white text-sm mb-2 hover:underline"
                    >
                      {item.title}
                    </a>
                  ))}
                </Footer.LinkGroup>
              </div>
            </div>

            {/* Full Width Office Hours Button with Tooltip */}
            <div className="flex justify-center pt-10 relative group w-full">
              <button className="w-full px-6 py-2 bg-white text-[#10284e] font-semibold rounded hover:bg-gray-200">
                Our Business Hours
              </button>
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white text-gray-900 text-sm p-4 rounded-lg shadow-lg w-full z-20">
                <table className="w-full text-left text-gray-900">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-1">Day</th>
                      <th className="py-1">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">Monday</td>
                      <td className="py-1">10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-1">Tuesday</td>
                      <td className="py-1">10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-1">Wednesday</td>
                      <td className="py-1">10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-1">Thursday</td>
                      <td className="py-1">10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-1">Friday</td>
                      <td className="py-1">10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-1">Saturday</td>
                      <td className="py-1">Closed</td>
                    </tr>
                    <tr>
                      <td className="py-1">Sunday</td>
                      <td className="py-1">Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-200 to-transparent opacity-100" />

        {/* Social Links and Disclaimer */}
        <div className="w-full flex flex-col md:flex-col items-center md:justify-center text-center md:space-y-4">
          {/* Social Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            {footer.socialLinks.map((social, index) => (
              <a
                href={social.link}
                key={index}
                className="text-white text-xl hover:text-gray-300"
              >
                <social.icon />
              </a>
            ))}
          </div>

          {/* Corporation and Disclaimer */}
          <div className="flex flex-col items-center md:flex-row text-white text-sm">
            <p className="font-light">{footer.corporation}</p>
            <span className="px-2 hidden md:inline">|</span>
            <span className="relative group cursor-pointer mt-2 md:mt-0">
              <button className="underline hover:no-underline">
                Disclaimer
              </button>
              <span className="absolute bottom-full right-0 w-64 text-xs text-white bg-gray-700 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                The information obtained on this site is not intended to be
                legal advice. Please consult a legal professional for advice
                regarding your individual situation.
              </span>
            </span>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterHome;
