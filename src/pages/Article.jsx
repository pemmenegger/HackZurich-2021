import React from "react";
import ArticleIntro from "../components/article/intro";
import TextBlock from "../components/article/textblock";
import Video from "../components/article/video";
import QuoteBlock from "../components/article/zitat";
import AudioBlock from "../components/article/audio";
import ImageBlock from "../components/article/image";
import BackIcon from "../components/icons/backicon";
import { useHistory } from "react-router-dom";

const Article = () => {
  const history = useHistory();

  return (
    <>
      <div
        onClick={() => history.push("/questions")}
        className="fixed top-5 left-5 z-50 w-7 h-7 transform rotate-180"
      >
        <BackIcon />
      </div>
      <ArticleIntro />
      <TextBlock type="lead" />
      <TextBlock />
      <TextBlock />
      <ImageBlock />
      <TextBlock />
      <QuoteBlock />
      <TextBlock />
      <TextBlock />
      <Video />
      <TextBlock />
      <AudioBlock />
      <QuoteBlock />
      <TextBlock />
    </>
  );
};

export default Article;
