import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination } from "swiper";
import testimonials from "./data";
import Card from "../../components/Card";
import { FaGoogle } from "react-icons/fa6";
import { Blockquote } from "flowbite-react";

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className="text-center pt-32 relative z-10 pb-0 max-w-screen-2xl mx-auto"
    >
      <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16">
        What People Say
      </h3>
      <div className="pb-8 md:pb-20">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            601: { slidesPerView: 2 },
            1025: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="h-[30rem] pt-4 mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="cursor-grab">
              <Card className="flex flex-col items-center text-center shadow-lg h-auto overflow-hidden relative z-10">
                <figure className="mx-auto max-w-screen-md text-center flex flex-col justify-center h-full">
                  <svg
                    className="mx-auto mb-3 h-10 w-10 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                  <Blockquote className="h-48 overflow-scroll">
                    <p className="text-sm font-thin text-gray-900 font-mono antialiased">
                      {testimonial.quote}
                    </p>
                  </Blockquote>
                  <figcaption className="mt-6 flex items-center justify-center">
                    <FaGoogle className="h-5 w-5" />
                    <div className="flex items-center divide-x-2 divide-white">
                      <cite className="pr-3 font-medium text-base">
                        {testimonial.name}
                      </cite>
                    </div>
                  </figcaption>
                </figure>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
