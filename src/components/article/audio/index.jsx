import React from "react";

const AudioBlock = () => {
  return (
    <>
      <div className="w-full overflow-hidden relative container mt-20 mb-20">
        <div className="">
          <iframe
            title="audio"
            src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
            width="100%"
            height="550px"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AudioBlock;
