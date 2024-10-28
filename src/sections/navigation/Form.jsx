const Form = () => {
  return (
    <div className="w-full md:w-full lg:w-1/2">
      <h2 className="text-lg text-white mb-4 font-semibold">Get in Touch</h2>
      <form className="space-y-4 max-w-lg mx-auto lg:mx-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label
              className="block text-sm text-white mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 rounded bg-gray-100 text-gray-900"
              placeholder="First Name"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm text-white mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-2 rounded bg-gray-100 text-gray-900"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-white mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 rounded bg-gray-100 text-gray-900"
            placeholder="Your Phone Number"
          />
        </div>
        <div>
          <label className="block text-sm text-white mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded bg-gray-100 text-gray-900"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label className="block text-sm text-white mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="w-full p-2 rounded bg-gray-100 text-gray-900"
            rows="4"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold bg-white text-[#10284e] rounded hover:bg-gray-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
