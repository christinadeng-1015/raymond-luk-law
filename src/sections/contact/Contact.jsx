import { Table } from "flowbite-react";
import "./contact.css";
import Form from "./Form";
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import officeImage from '../../assets/office/office.jpeg';
import officeHourImage from '../../assets/office/office-hour.jpg';
import office1Image from '../../assets/office/office-1.jpg';
import office2Image from '../../assets/office/office-2.jpg';
import office3Image from '../../assets/office/office-3.jpeg';
import contactBackgroundImg from '../../assets/banner/contact.jpg';

const Contact = () => {

  const socialLinks = [
    { icon: BsFacebook, link: "https://facebook.com" },
    { icon: BsInstagram, link: "https://instagram.com" },
    { icon: BsTwitter, link: "https://twitter.com" },
    { icon: BsDribbble, link: "https://dribbble.com" },
  ];

  const lists = ["office-hour", "office-1", "office-2", "office", "office-3"]
  const images = {
    "office": officeImage,
    "office-hour": officeHourImage,
    "office-1": office1Image,
    "office-2": office2Image,
    "office-3": office3Image,
  };

  const contacts = [
    "HSBC Tower, Liberty Square, 3601 Highway 7, Unit 803, Markham, Ontario, L3R 0M3",
    "English: 905 - 667 - 6496",
    "中文: 905 - 667 - 6499",
    "Email: info@luklawpc.com",
    "Fax: 905 - 849 - 3583"
  ]

  
  return (
    <div id="contact" className="mx-auto">
      <div className="relative w-full h-64 md:h-1/2">
        <img
          src={contactBackgroundImg}
          alt='banner'
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex items-center bg-black bg-opacity-30 pt-24 pl-10 md:pl-24 lg:pl-48">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Contact Us
            </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row relative z-20 min-h-screen shadow-lg">
        <div className="w-full md:w-2/5 lg:w-1/3 py-8 md:py-12 flex items-center justify-center bg-gray-200">
          <div className="text-center w-full max-w-md px-4">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4 text-sm italic">
              If you have questions or are searching for expert legal assistance, please do not hesitate to contact us.
            </p>
            <div className="m-8">
            <iframe
              title="raymond-luk"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.0923667192606!2d-79.34076942381263!3d43.85391417109322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5fbcc8d262d%3A0xafb130d5c8fcdacb!2sRaymond%20Luk%20Law%20Professional%20Corporation!5e0!3m2!1sen!2sca!4v1734198035841!5m2!1sen!2sca"
              width="300"
              height="200"
              className="w-full h-40 md:h-auto"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
            <div className="w-1/2 mx-auto">
            {
              contacts.map((contact)=>
                <h4 className="mt-4 text-xs">{contact}</h4>
              )
            }
            </div>
            <h6 className="mt-10 italic">Feel free to contact us through WhatsApp, WeChat, or text message.</h6>
            <div className="flex space-x-8 md:space-x-16 pt-6 justify-center">
              {socialLinks.map((social, index) => (
                <a
                  href={social.link}
                  key={index}
                  className="text-[#10284e] text-lg hover:text-gray-700"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact_section w-full md:w-3/5 lg:w-2/3 h-auto flex items-center justify-center p-6 md:p-16">
          <div className="w-full max-w-xl md:max-w-2xl">
            <h3 className="text-center pb-4 text-2xl font-semibold">
              Submit Your Inquiry
            </h3>
            <Form />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-3/5 lg:w-2/3 flex items-center justify-center mb-4 md:mb-0">
          <div className="flex overflow-x-auto space-x-6 w-full max-w-screen-2xl">
            {lists.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-96 h-96 cursor-pointer"
              >
                <img
                  src={images[image]}
                  alt={index}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
         </div>
        </div>

        <div className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center bg-gray-200 py-8">
          <div className="w-full max-w-md px-4">
            <h2 className="text-center text-lg md:text-xl font-semibold mb-6">
              Business Hours
            </h2>
            <div className="flex justify-center">
              <Table className="text-center text-xs md:text-sm">
                <Table.Body className="divide-y font-medium">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <Table.Row key={day}>
                      <Table.Cell>{day}</Table.Cell>
                      <Table.Cell>10:00 AM - 6:00 PM</Table.Cell>
                    </Table.Row>
                  ))}
                  <Table.Row>
                    <Table.Cell>Saturday</Table.Cell>
                    <Table.Cell>By appointment only</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Sunday</Table.Cell>
                    <Table.Cell>By appointment only</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <p className="text-gray-200 text-center pt-6 italic text-xs">
              Holiday hours may vary. Closed Monday, October 14, 2024, for Thanksgiving Holiday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;