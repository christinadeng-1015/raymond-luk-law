import { Footer, Tooltip } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import Form from './Form';

const FooterHome = () => {
  const footer = {
    corporation: '© 2024 by Raymond Luk Law Professional Corporation',
    disclaimer:
      'DISCLAIMER: The information obtained on this site is not intended to be legal advice. Please consult a legal professional for advice regarding your individual situation. Please be advised that contacting the firm does not create a solicitor-client nor a legal relationship of any kind. Please do not send any confidential information until such relationship has been established and a retainer has been signed.',
    services: [
      { service: 'Real Estate Law', link: '#' },
      { service: 'Family Law', link: '#' },
      { service: 'Will & Estates', link: '#' },
      { service: 'Personal Injury Law', link: '#' },
      { service: 'Immigration Law', link: '#' },
      { service: 'Notary Services', link: '#' },
    ],
    contacts: [
      { id: 1, link: '#', title: 'English: 905-667-6496' },
      { id: 2, link: '#about', title: '中文: 905-667-6499' },
      { id: 3, link: '#services', title: 'Email: info@luklawpc.com' },
      { id: 4, link: '#portfolio', title: 'Fax: 905-849-3583' },
      {
        id: 5,
        link: '#contact',
        title:
          'HSBC Tower, Liberty Square, 3601 Highway 7, Unit 803, Markham, ON, L3R 0M3',
      },
    ],
    quickLinks: [
      { title: 'Home', link: '#' },
      { title: 'About Us', link: '#' },
      { title: 'Our Services', link: '#' },
      { title: 'Contact', link: '#' },
    ],
    socialLinks: [
      { icon: BsFacebook, link: 'https://facebook.com' },
      { icon: BsInstagram, link: 'https://instagram.com' },
      { icon: BsTwitter, link: 'https://twitter.com' },
      { icon: BsDribbble, link: 'https://dribbble.com' },
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
            src="https://res.cloudinary.com/dyozsy6wx/image/upload/v1736993348/RL_logo_edvn9k.png"
            alt="logo"
            className="w-40 object-contain mb-4 md:mb-0"
          />
          <a
            href="https://legaldirectorate.ca/family-law-attorneys/markham-on/"
            target="_blank"
            style={{ display: 'inline-block', border: 0 }}
            rel="noreferrer"
          >
            <Tooltip
              content="Best in Markham for Family Law"
              placement="bottom"
              // eslint-disable-next-line react/style-prop-object
              style="light"
            >
              <img
                src="https://legaldirectorate.ca/awards/2024/2/31/3e407a83b4ab1ea59f324a758d86d312/BestOf-Markham-i250-2024.svg"
                style={{ width: 250, display: 'block' }}
                width="250"
                height="100"
                alt="Best Family Law Attorneys in Markham"
              />
            </Tooltip>
          </a>
          <img
            src="https://res.cloudinary.com/dyozsy6wx/image/upload/v1736993359/law_zu7rqc.png"
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

            <div className="flex lg:space-x-8 pt-10 justify-center">
              {footer.socialLinks.map((social, index) => (
                <a
                  href={social.link}
                  key={index}
                  className="px-10 text-white text-3xl hover:text-gray-300 transition-transform transform hover:scale-110"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-200 to-transparent opacity-100" />

        {/* Social Links and Disclaimer */}
        <div className="w-full flex flex-col md:flex-col items-center md:justify-center text-center">
          {/* Corporation and Disclaimer */}
          <div className="flex flex-col items-center md:flex-row text-white text-sm">
            <p className="font-light">{footer.corporation}</p>
            <span className="px-2 hidden md:inline">|</span>
            <span className="relative group cursor-pointer">
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
