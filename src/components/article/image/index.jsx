import React from "react";

const ImageBlock = () => {
  return (
    <>
      <div className="container overflow-hidden mt-20 mb-20">
        <div className="w-60 h-60 relative">
          <img
            src="https://www.srf.ch/static/cms/images/640ws/3dcb61.jpg"
            alt="Schönes Bild – Wow"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
        </div>
        <div className="w-96 h-96 ml-20 -mt-10 relative">
          <img
            src="https://www.srf.ch/static/cms/images/640ws/7f0233.jpg"
            alt="Schönes Bild – Wow"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
        </div>
        <div className="w-72 h-72 ml-8 -mt-24 relative">
          <img
            src="https://www.srf.ch/static/cms/images/480ws/afc7cc.jpg"
            alt="Schönes Bild – Wow"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
        </div>
      </div>
    </>
  );
};

export default ImageBlock;
