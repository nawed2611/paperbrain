import React from "react";
import Navbar from "../components/navbar";

const write = () => {
  return (
    <div>
      <Navbar heading={true} />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-700'>Write a paper</h1>
      </div>
    </div>
  );
};

export default write;
