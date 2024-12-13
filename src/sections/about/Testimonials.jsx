import React from "react";
import { Carousel } from "flowbite-react";
import { Avatar, Blockquote } from "flowbite-react";

const Testimonials = () => {
  return (
    <div className="w-full h-1/2">
      <Carousel className="bg-gradient-to-r from-[#10284e] to-[#0a1e3a] p-8 text-center">
        <div className="flex flex-col items-center bg-white bg-opacity-10 py-20 rounded-lg w-5/6">
          <div className="max-w-2xl">
            <figure className="mx-auto text-center">
              <svg
                className="mx-auto mb-3 h-10 w-10 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <Blockquote>
                <p className="text-2xl font-medium italic text-white">
                  "Flowbite is just awesome. It contains tons of predesigned
                  components and pages starting from login screen to complex
                  dashboard. Perfect choice for your next SaaS application."
                </p>
              </Blockquote>
              <figcaption className="mt-6 flex items-center justify-center space-x-3">
                <Avatar
                  rounded
                  size="xs"
                  img="/images/people/profile-picture-5.jpg"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-white">
                  <cite className="pr-3 font-medium text-white">
                    Micheal Gough
                  </cite>
                  <cite className="pl-3 text-sm text-white">CEO at Google</cite>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
