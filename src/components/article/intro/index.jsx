import React from "react";

const ArticleIntro = ({ title, author, duration, bg }) => {
  return (
    <>
      <div className="w-full min-h-screen bg-black relative flex flex-col justify-end content-container mb-10">
        <img
          src={bg}
          title={title}
          className="w-full h-full absolute top-0 left-0 object-cover object-center"
          alt={title}
        />
        <div className="bg-gradient-to-t from-black w-full h-full absolute top-0 left-0"></div>
        <div className="mb-8 mt-96">
          <div className="text-white font-serif font-black text-h1 relative mb-4">
            {title}
          </div>
          <div className="text-white text-tinyText italic relative">
            Eine <b className="font-bold">{author}</b> Story. <br />
            Dauer ca. {duration}.
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleIntro;
