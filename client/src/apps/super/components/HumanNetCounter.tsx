//import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { SuperScores } from "../SuperApp";

  type countKeys = keyof SuperScores;


  function HumanButton({
    // Declare a state variable to keep track of the count
    handleCount,
    successKey,
    failKey,
    count,
    className,
  
  }:{
    handleCount: (key: countKeys) => void;
    successKey: countKeys;
    failKey: countKeys;
    count: SuperScores;
    className?:string;
  }){
   return (
    <>
      <button
        // className="mt-10 p-10 mx-4 bg-green-500 text-white text-2xl rounded"
        onClick={() => handleCount(successKey)}
        className={className}
        id='one'>
          <p>
            {count[successKey]}
          </p>
     </button>
     <button
        className={className}
        onClick={() => handleCount(failKey)}
        id='one'>
          <p>
            {count[failKey]}
          </p>
     </button>
    </>
   ); 
  };

function HumanCounter({
    count, 
    className,
    setCount,
     
  }:{
    
    count: SuperScores;
    className?:string;
    setCount:Dispatch<SetStateAction<SuperScores>>;
    
  }){

    const handleCount = (key: countKeys) => {
          setCount(prevCount => ({
              ...prevCount,
              [key]: prevCount[key] + 1,
          }));
    //  }
  };

return(
    <>
      <HumanButton
        handleCount={handleCount}
        successKey='Success'
        failKey='Failed'
        count={count}
        className={className}
      />
    </>
  );


};

export default HumanCounter;

//mt-10 p-10 mx-4 bg-red-500 text-white text-2xl rounded