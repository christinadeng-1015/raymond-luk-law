import { Table } from "flowbite-react";
import "./contact.css";
import Form from "./Form";

const Contact = () => {
  return (
    <div id="contact" className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row relative z-20">
        <div className="contact_section w-full md:w-3/4 h-auto flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-3xl md:max-w-4xl">
            <h3 className="text-center pb-4 text-xl font-semibold">
              Submit Your Inquiry
            </h3>
            <Form />
          </div>
        </div>

        <div className="w-full md:w-1/4 py-12 relative z-10">
          <h2 className="text-center text-xl font-semibold mb-6 p-4 text-white bg-[#10284e] w-auto">
            Business Hours
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md flex flex-col">
              <div className="w-full opacity-80">
                <Table
                  className="text-center text-sm"
                  style={{ border: "none", opacity: 0.8 }}
                >
                  <Table.Body className="divide-y text-xs font-medium">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <Table.Row key={day} className="border-none">
                        <Table.Cell className="border-none">{day}</Table.Cell>
                        <Table.Cell className="border-none">
                          10:00 AM - 6:00 PM
                        </Table.Cell>
                      </Table.Row>
                    ))}
                    <Table.Row className="border-none">
                      <Table.Cell className="border-none">Saturday</Table.Cell>
                      <Table.Cell className="border-none">
                        By appointment only
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row className="border-none">
                      <Table.Cell className="border-none">Sunday</Table.Cell>
                      <Table.Cell className="border-none">
                        By appointment only
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-center pt-8 italic text-xs">
            Holiday hours may vary. Closed Monday, October 14, 2024, for
            Thanksgiving Holiday.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
