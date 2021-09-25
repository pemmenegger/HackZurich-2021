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
      <ArticleIntro
        title="16 Jahre Angela Merkel: Was wird aus den Deutschen, wenn Mutti weg
        ist?"
        author="Merlin Gelpeko"
        duration="20 Minuten"
        bg="https://www.srf.ch/static/cms/images/640ws/3dcb61.jpg"
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
        type="lead"
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
      <ImageBlock
        images={[
          "https://www.srf.ch/static/cms/images/640ws/3dcb61.jpg",
          "https://www.srf.ch/static/cms/images/640ws/7f0233.jpg",
          "https://www.srf.ch/static/cms/images/480ws/afc7cc.jpg",
        ]}
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
      <QuoteBlock
        text="... 16 Jahre Angela Merkel: Was wird aus den Deutschen, wenn Mutti weg ist? ..."
        author="Pascal Emmengegger"
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
      <Video video="https://player.vimeo.com/video/614783445?h=e2b585d7d8" />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
      <AudioBlock audio="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" />
      <QuoteBlock
        text="... 16 Jahre Angela Merkel: Was wird aus den Deutschen, wenn Mutti weg ist? ..."
        author="Pascal Emmengegger"
      />
      <TextBlock
        text="Drohende Bundestagswahlen versetzen den allgemeinen Gemütszustand in
          kollektive Schwingungen. Was derzeit vor allem auffällt: wie
          steigerungsfähig die sprichwörtliche schlechte Laune noch ist im Land
          der Schwarzseher und Nörgler. Mit Pandemiemüdigkeit alleine lässt sich
          das nicht erklären."
      />
    </>
  );
};

export default Article;
