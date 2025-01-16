import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { HiMail, HiUser } from "react-icons/hi";

const Form = () => {
  return (
    <form className="flex flex-col gap-4 p-4 w-full mx-auto">
      <div>
        <Label htmlFor="name" value="Your Name" />
        <TextInput
          id="name"
          type="text"
          placeholder="Raymond Luk"
          required
          className="mt-2 w-full"
          rightIcon={HiUser}
        />
      </div>

      <div>
        <Label htmlFor="email" value="Your Email" />
        <TextInput
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          className="mt-2 w-full"
          rightIcon={HiMail}
        />
      </div>

      <div>
        <Label htmlFor="phone" value="Your Phone Number" />
        <TextInput
          id="phone"
          type="phone"
          placeholder=""
          required
          className="mt-2 w-full"
          rightIcon={HiMail}
        />
      </div>

      <div>
        <Label htmlFor="inquiry" value="Reason for Inquiry" />
        <select
          id="inquiry"
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a reason</option>
          <option value="general">General Inquiry</option>
          <option value="support">Support Request</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message" value="Your Message" />
        <Textarea
          id="message"
          placeholder="Enter your message here..."
          required
          rows={8}
          className="mt-2 w-full"
        />
      </div>

      <Button
        type="submit"
        className="mt-4 w-full shadow-lg bg-[#10284e]"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
