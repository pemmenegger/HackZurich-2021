import React, { useEffect, useState } from "react";
import ArticleIntro from "../components/article/intro";
import TextBlock from "../components/article/textblock";
import Video from "../components/article/video";
import QuoteBlock from "../components/article/zitat";
import AudioBlock from "../components/article/audio";
import ImageBlock from "../components/article/image";
import BackIcon from "../components/icons/backicon";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const renderComponents = (components) => (entry) => {
  const Component = components[entry.type];

  if (Component === undefined) {
    return null;
  }

  return <Component key={entry.id} {...entry} />;
};

const Components = {
  paragraph: TextBlock,
  video: Video,
  quote: QuoteBlock,
  audio: AudioBlock,
  images: ImageBlock,
};

const renderSectionEntry = renderComponents(Components);

const api = axios.create({
  baseURL: "https://hbr26fk6lf.execute-api.eu-central-1.amazonaws.com",
  headers: { "Content-Type": "application/json" },
});

const Article = () => {
  const [story, setStory] = useState(undefined);
  const history = useHistory();
  const { id } = useParams();

  const fetchArticles = async () => {
    try {
      const response = await api.get(`/stage/story/${id}`);
      const { story } = response.data;
      setStory(story);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    console.log("stories", story);
  }, [story]);

  return (
    <>
      {story && (
        <>
          <div
            onClick={() => history.push("/questions")}
            className="fixed top-5 left-5 z-50 w-7 h-7 transform rotate-180"
          >
            <BackIcon />
          </div>
          <ArticleIntro
            title={story.title}
            author="Merlin Gelpeko"
            duration={`${story.consume_time} Sekunden`}
            bg={story.thumbnail}
          />
          {story.body.map((block, i) => {
            return <>{renderSectionEntry({ ...block, id: i })}</>;
          })}
        </>
      )}
    </>
  );
};

export default Article;
