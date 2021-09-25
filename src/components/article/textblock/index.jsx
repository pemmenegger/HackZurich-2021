import cls from "classnames";
import React from "react";

const TextBlock = ({ type = "text" }) => {
  return (
    <>
      <div
        className={cls(
          `content-container mb-10`,
          type === "lead" && `font-bold`
        )}
      >
        <p>
          Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären.
        </p>
      </div>
    </>
  );
};

export default TextBlock;
