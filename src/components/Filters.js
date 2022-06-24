import React, { memo, useState } from "react";

const Filter = ({ filterByGender }) => {
  const [hasFilter, setHasFilter] = useState(false);

  const setGender = (gender) => {
    filterByGender(gender);
    setHasFilter(true);
  };

  const reset = () => {
    setHasFilter(false);
    filterByGender("");
  };

  return (
    <div className="flex items-center justify-center gap-4 my-10">
      <p className="text-white">Filter current data to show : </p>
      <button
        data-testid="maleButton"
        className="px-4 py-2 text-white bg-transparent bg-gray-700 border-2 rounded dark:border-gray-300"
        onClick={() => setGender("male")}
      >
        Only Male
      </button>
      <button
        data-testid="femaleButton"
        className="px-4 py-2 text-white bg-transparent bg-gray-700 border-2 rounded dark:border-gray-300"
        onClick={() => setGender("female")}
      >
        Only Female
      </button>
      <button
        data-testid="resetButton"
        disabled={!hasFilter}
        className="px-4 py-2 text-white bg-transparent border-2 rounded dark:border-gray-300 disabled:border-gray-800 disabled:cursor-not-allowed"
        onClick={() => reset()}
      >
        Reset
      </button>
    </div>
  );
};

export const Filters = memo(Filter);
