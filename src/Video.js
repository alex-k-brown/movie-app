import React from "react";
import "./styles/_video.scss";

const Video = ({ video, videoClick }) => {
  if (video.length === 0) {
    return "";
  }

  return (
    <div className="video-container" onClick={videoClick}>
      <div className="play"></div>
      <iframe
        id="vid-player"
        src={`//www.youtube.com/embed/${video[0].key}?version=3&enablejsapi=1`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Video;
