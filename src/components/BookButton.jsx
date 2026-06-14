"use client";

import React from "react";

const BookButton = ({ onOpen }) => {
  return (
    <button
      className="btn bg-[#EC6530] text-white"
     onClick={onOpen} >
      Ready to Book
    </button>
  );
};

export default BookButton;