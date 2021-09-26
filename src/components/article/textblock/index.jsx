import cls from "classnames";
import React from "react";

const TextBlock = ({ value, type = "text" }) => {
  return (
    <>
      <div
        className={cls(
          `content-container mb-10 text-body`,
          type === "lead" && `font-bold`
        )}
      >
        <p>{value}</p>
      </div>
    </>
  );
};

export default TextBlock;
