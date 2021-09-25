import React from "react";

const ArticleIntro = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-black relative flex flex-col justify-end content-container mb-10">
        <img
          src="https://www.srf.ch/static/cms/images/640ws/3dcb61.jpg"
          title="Article Image"
          className="w-full h-full absolute top-0 left-0 object-cover object-center"
          alt="Article"
        />
        <div className="bg-gradient-to-t from-black w-full h-full absolute top-0 left-0"></div>
        <div className="mb-8 mt-96">
          <div className="text-white font-serif font-black text-h1 relative mb-4">
            16 Jahre Angela Merkel: Was wird aus den Deutschen, wenn Mutti weg
            ist?
          </div>
          <div className="text-white text-tinyText italic relative">
            Eine <b className="font-bold">Marlon Gelpke</b> Story. <br />
            Dauer ca. 15 Minuten.
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleIntro;
