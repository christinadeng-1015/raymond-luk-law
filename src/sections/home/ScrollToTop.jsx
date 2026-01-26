import { RxDoubleArrowUp } from 'react-icons/rx';

const ScrollToTop = () => {
  return (
    <div className="flex flex-col items-center pb-10 lg:hidden">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="p-3 animate-bounce text-gray-500 hover:text-gray-900"
        aria-label="Scroll to top"
      >
        <RxDoubleArrowUp size={24} />
      </button>
      <span className="text-sm font-semibold">Scroll to Top</span>
    </div>
  );
};

export default ScrollToTop;
