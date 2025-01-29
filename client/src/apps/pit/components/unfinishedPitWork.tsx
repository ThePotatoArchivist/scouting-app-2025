//unintegrated work
import React, { useState } from "react";

const ReconApp: React.FC = () => {
  const [coral, setCoral] = useState<number[]>([]);
  const [algae, setAlgae] = useState<number[]>([]);
  const [movement, setMovement] = useState<boolean[]>([]);

  //add set
  const addAuto = () => {
    setCoral((prev) => [...prev, 0]);
    setAlgae((prev) => [...prev, 0]);
    setMovement((prev) => [...prev, false]);
  };

  //remove set
  const removeAuto = (index: number) => {
    setCoral((prev) => prev.filter((_, i) => i !== index));
    setAlgae((prev) => prev.filter((_, i) => i !== index));
    setMovement((prev) => prev.filter((_, i) => i !== index));
  };

  const updateValue = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    newValue: number
  ) => {
    setter((prev) =>
      prev.map((value, i) => (i === index ? newValue : value))
    );
  };

  // Toggle a boolean value (for movement)
  const toggleMovement = (index: number) => {
    setMovement((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div className="">
      

      <button
        onClick={addAuto}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-4"
      >
        Add Auto
      </button>

      <div className="">
        {coral.map((_, index) => (
          <div key={index} className="">
            <h2 className="text-lg font-semibold mb-2">Auto {index + 1}</h2>

            {/* Algae n Coral Controls */}
            {[
              { label: "Coral", state: coral, setter: setCoral},
              { label: "Algae", state: algae, setter: setAlgae},
            ].map(({label, state, setter}) => (
              <div key={label} className="flex item-center justify-between mb-2">
                <p className="text-md font-medium">{label}:</p>
                <p className="text-md">{state[index]}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateValue(setter, index, state[index] - 1)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateValue(setter, index, state[index] + 1)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Movement Control */}
            <div className="flex algae-center justify-between mb-2">
              <p className="text-md font-medium">Movement</p>
              <p className="text-md">
                {movement[index] ? "Movement" : "No Movement"}
              </p>
              <button
                onClick={() => toggleMovement(index)}
                className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Toggle
              </button>
            </div>

            {/* Remove Data Set Button */}
            <button
              onClick={() => removeAuto(index)}
              className="mt-2 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Remove Auto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconApp;
