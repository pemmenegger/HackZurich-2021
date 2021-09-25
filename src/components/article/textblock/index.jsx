import cls from "classnames";
import React from "react";

const TextBlock = ({ text, type = "text" }) => {
  return (
    <>
      <div
        className={cls(
          `content-container mb-10 text-body`,
          type === "lead" && `font-bold`
        )}
      >
        <p>{text}</p>
      </div>
    </>
  );
};

export default TextBlock;
