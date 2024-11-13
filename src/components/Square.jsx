/* eslint-disable react/prop-types */

const Square = ({ value, onClick }) => (
  <button
    className="w-16 h-16 border-2 border-gray-500 text-2xl font-bold flex items-center justify-center"
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;
