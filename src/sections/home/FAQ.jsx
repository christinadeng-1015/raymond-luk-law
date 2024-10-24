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
        <p className="font-medium text-base">{faq.question}</p>
        <button className="text-2xl">
          {showAnswer ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showAnswer && (
        <p className="mt-4 italic font-light text-gray-900">{faq.answer}</p>
      )}
    </Card>
  );
};

export default FAQ;
