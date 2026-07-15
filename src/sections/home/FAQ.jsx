import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const FAQ = ({ faq, isOpen }) => {
  const [showAnswer, setShowAnswer] = useState(isOpen);

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => setShowAnswer((prev) => !prev)}
    >
      <div className="flex justify-between items-center gap-4 text-[#10284e]">
        <h4 className="font-serif text-base leading-snug">{faq.question}</h4>
        <button
          className="text-amber-500 transition-transform duration-300"
          aria-label={showAnswer ? 'Hide answer' : 'Show answer'}
        >
          {showAnswer ? (
            <AiOutlineMinus size={20} />
          ) : (
            <AiOutlinePlus size={20} />
          )}
        </button>
      </div>

      {showAnswer && (
        <div
          className="mt-4 font-sans text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300 [&_ul]:list-disc [&_ul]:ml-4 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      )}
    </div>
  );
};

export default FAQ;
