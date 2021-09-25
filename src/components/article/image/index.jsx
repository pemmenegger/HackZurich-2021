import React from "react";

const ImageBlock = ({ images }) => {
  return (
    <>
      <div className="container overflow-hidden mt-20 mb-20">
        <div className="w-60 h-60 relative">
          <img
            src={images[0]}
            alt="Schönes Bild – Wow"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
        </div>
        <div className="w-96 h-96 ml-20 -mt-10 relative">
          <img
            src={images[1]}
            alt="Schönes Bild – Wow"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
        </div>
        <div className="w-72 h-72 ml-8 -mt-24 relative">
          <img
            src={images[2]}
            alt="Schönes Bild – Wow"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
        </div>
      </div>
    </>
  );
};

export default ImageBlock;
