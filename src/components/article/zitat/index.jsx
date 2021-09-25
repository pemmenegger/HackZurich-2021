import React from "react";

const QuoteBlock = ({ text, author }) => {
  return (
    <>
      <div className="content-container mt-10 mb-10">
        <p className="text-h2 leading-9 mb-2">«{text}»</p>
        <span className="text-tinyText italic">
          Ein Zitat von <b className="font-bold">{author}</b>.
        </span>
      </div>
    </>
  );
};

export default QuoteBlock;
