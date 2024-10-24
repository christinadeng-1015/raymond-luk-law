import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import disclaimerLogo from "../../assets/disclaimer-logo.png";

const FooterHome = () => {
  const footer = {
    icon: disclaimerLogo,
    corporation: "© 2024 by Raymond Luk Law Professional Corporation ",
    disclaimer:
      "DISCLAIMER: The information obtained on this site is not intended to be legal advice. Please consult a legal professional for advice regarding your individual situation. Please be advised that contacting the firm does not create a solicitor-client nor a legal relationship of any kind. Please do not send any confidential information until such relationship has been established and a retainer has been signed",
    services: [
      { service: "Real Estate Law", link: "" },
      { service: "Family Law", link: "" },
      { service: "Will & Estates", link: "" },
      { service: "Personal Injury Law", link: "" },
      { service: "Immigration Law", link: "" },
      { service: "Notary Services", link: "" },
    ],
    contacts: [
      { id: 1, link: "#", title: "English: 905-667-6496" },
      { id: 2, link: "#about", title: "中文: 905 -667-6499" },
      { id: 3, link: "#services", title: "Email: info@luklawpc.com" },
      { id: 4, link: "#portfolio", title: "Fax: 905-849-3583" },
      {
        id: 5,
        link: "#contact",
        title:
          "HSBC Tower, Liberty Square, 3601 Highway 7, Unit 803, Markham, ON, L3R 0M3",
      },
    ],
  };

  return (
    <Footer
      container
      className="pt-16 pb-8 bg-[#10284e] text-white"
      id="footer"
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-8">
          <div className="flex flex-col md:w-1/3 w-full space-y-6">
            <div className="flex-shrink-0">
              <Footer.Brand
                src={footer.icon}
                alt="Law Society"
                className="max-w-xs h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="map"
                aria-label="Google Map showing the location of Raymond Luk Law Office"
                className="w-full h-64 md:h-48 border-0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=HSBC%20Tower,%20Liberty%20Square%203601%20Highway%207,%20Unit%20803%20Markham,%20ON%20L3R%200M3+(Raymond%20Luk%20Law)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                allowFullScreen=""
              ></iframe>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row w-full md:w-2/5 space-y-6 md:space-y-0 md:space-x-12"
            style={{
              color: "#3C5B6F",
            }}
          >
            <div className="flex-grow sm:w-3/5">
              <Footer.Title
                title="Contact Us"
                className="underline text-white"
              />
              <Footer.LinkGroup col>
                {footer.contacts.map((item) => (
                  <Footer.Link href="#" key={item.title} className="text-white">
                    {item.title}
                  </Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>
            <div className="flex-grow sm:w-2/5">
              <Footer.Title
                title="Areas of Practice"
                className="underline text-white"
              />
              <Footer.LinkGroup col>
                {footer.services.map((item) => (
                  <Footer.Link
                    href="#"
                    key={item.service}
                    className="text-white"
                  >
                    {item.service}
                  </Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <div className="w-full pt-8 flex justify-start space-x-8">
          {[BsFacebook, BsInstagram, BsTwitter, BsDribbble].map(
            (Icon, index) => (
              <Footer.Icon
                href="#"
                icon={Icon}
                key={index}
                style={{
                  color: "white",
                }}
              />
            )
          )}
        </div>
        <div className="w-full text-white mt-4">
          <p>{footer.corporation}</p>
          <p className="text-sm">{footer.disclaimer}</p>
        </div>
      </div>
    </Footer>
  );
};

export default FooterHome;
