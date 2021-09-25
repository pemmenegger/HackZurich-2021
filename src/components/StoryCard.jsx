import React from "react";

class StoryCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="story-card">
        <div
          className="wrapper"
          style={{
            backgroundImage: "url(" + this.props.imgUrl + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="overlay"></div>
          <div className="headlines">
            <p className="subheadline">{this.props.subheadline}</p>
            <p className="headline">{this.props.headline}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default StoryCard;
