import React, { useState } from "react";

const HumanButton: React.FC = () => {
  // Declare a state variable to keep track of the count
  const [count, setCount] = useState<number>(0);
  const [failCount, setFailCount] = useState<number>(0);

  // Function to increment the count by 1
  const increment = () => setCount(count + 1);
  const failIncrement = () => setFailCount(failCount+1)

  return (
    <div className="py-5 my-10 text-white text-4xl"> 
    Human Net:
    <br/>
    <button
      className="mt-10 p-10 mx-4 bg-green-500 text-white text-2xl rounded"
      onClick={increment}>
      Success: {count}
    </button>
    <button
      className="mt-10 p-10 mx-4 bg-red-500 text-white text-2xl rounded"
      onClick={failIncrement}>
      Failed: {failCount}
    </button>
    </div>
  );
};

export default HumanButton;