import React from "react";

const AudioBlock = ({ value }) => {
  return (
    <>
      <div className="w-full overflow-hidden relative container mt-20 mb-20">
        <div className="">
          <iframe
            title="audio"
            src={value}
            width="100%"
            height="550px"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AudioBlock;
