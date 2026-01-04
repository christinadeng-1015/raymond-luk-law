import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Card from "../../components/Card";

const FAQ = ({ faq, isOpen }) => {
  const [showAnswer, setShowAnswer] = useState(isOpen);

  return (
    <Card
      className={showAnswer ? "h-full" : ""}
      onClick={() => setShowAnswer((prev) => !prev)}
    >
      <div className="flex justify-between items-start text-gray-900">
        <p className="font-bold text-base">{faq.question}</p>
        <button className="text-2xl">
          {showAnswer ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showAnswer && (
        <div
          className="mt-4 font-light text-gray-700 [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      )}
    </Card>
  );
};

export default FAQ;
