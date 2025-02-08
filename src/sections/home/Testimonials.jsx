import React from 'react';
import { Carousel } from 'flowbite-react';
import { Blockquote } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation('main');
  const reviews = t('reviews', { returnObjects: true });

  return (
    <div
      className="w-full h-2/3 md:h-1/2"
      data-aos="zoom-out"
      data-aos-duration="1200"
      data-aos-easing="ease-in-out"
    >
      <Carousel
        className="bg-gradient-to-r from-[#10284e] to-[#0a1e3a] p-8 text-center"
        slideInterval={4000}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col items-center py-20 rounded-lg w-5/6"
          >
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
                  <p className="text-lg md:text-xl font-medium italic text-white">
                    {review.review}
                  </p>
                </Blockquote>
                <figcaption className="mt-10 flex items-center justify-center space-x-3">
                  <div className="flex items-center flex-col divide-x-2 divide-white">
                    <cite className="font-medium text-white">
                      - {review.author}
                    </cite>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
