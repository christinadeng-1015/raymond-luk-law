import image from "../../assets/about.jpg";
import { useTranslation } from "react-i18next";

const Blogs = () => {
  const { t } = useTranslation("main");
  const blogs = t("blogs", { returnObjects: true });

  return (
    <section
      id="blogs"
      className="flex justify-center items-center shadow-lg relative z-10 flex-col py-48"
    >
      <h3 className="text-2xl text-center text-gray-800 py-8 font-semibold">
        {t("blogTitle")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-8">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <img className="rounded-t-lg" src={image} alt={blog.title} />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blog.excerpt}
              </p>
              <a
                href={blog.url || "#"}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[#10284e] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
