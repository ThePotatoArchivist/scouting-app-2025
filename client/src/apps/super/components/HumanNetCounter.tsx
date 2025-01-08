import React, { useState } from "react";

const HumanButton: React.FC = () => {
  // Declare a state variable to keep track of the count
  const [count, setCount] = useState<number>(0);

  // Function to increment the count by 1
  const increment = () => setCount(count + 1);

  return (
    <div className="py-5 my-10 text-white text-4xl"> 
    Human Net Count:
    <br/>
    <button
      className="mt-10 p-10 bg-green-500 text-white text-2xl rounded"
      onClick={increment}
    >
      {count}
    </button>
    </div>
  );
};

export default HumanButton;