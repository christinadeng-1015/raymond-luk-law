import { useState } from "react";
import { Button, Card } from "flowbite-react";
import { useTranslation } from "react-i18next";

const Tools = () => {
  const { t } = useTranslation("main");
  const tools = t("tools", { returnObjects: true });
  const categories = t("categories", { returnObjects: true });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    if (selectedCategory === "All") return true;
    return tool.category === selectedCategory;
  });

  return (
    <div className="flex flex-col items-center py-24 lg:py-32  bg-white shadow-lg relative z-10">
      <h3 className="text-2xl text-center text-gray-800 pb-10 font-semibold px-12">
        {t("toolsTitle")}
      </h3>
      <div className="hidden md:flex justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`mx-2 border border-gray-300 text-black bg-transparent shadow-xl hover:shadow-xl transition-shadow ${
              selectedCategory === category ? "font-bold shadow-xl" : ""
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="md:hidden mb-8 w-2/3 px-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 bg-white text-black rounded-lg shadow-md"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 px-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl">
        {filteredTools.map((tool) => (
          <Card
            href={tool.url}
            key={tool.key}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-sm m-auto text-left shadow-xl flex flex-col h-full m-4"
          >
            <div className="flex-grow">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {tool.label}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {tool.desc}
              </p>
            </div>
            <div className="mt-auto">
              <Button
                style={{
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                  background: "#10284e",
                }}
              >
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tools;
