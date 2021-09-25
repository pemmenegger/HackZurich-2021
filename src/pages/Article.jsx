import React from "react";
import ArticleIntro from "../components/article/intro";
import TextBlock from "../components/article/textblock";
import Video from "../components/article/video";
import QuoteBlock from "../components/article/zitat";

const Article = () => {
  return (
    <>
      <ArticleIntro />
      <TextBlock type="lead" />
      <TextBlock />
      <Video />
      <TextBlock />
      <QuoteBlock />
    </>
  );
};

export default Article;
