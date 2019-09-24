
import React from "react";
import ReactPlayer from 'react-player'

export default function video() {

  return (
    <div className="col-md-4 col-sm-12 p-5">
        <p align="center">
      <ReactPlayer url = "https://www.youtube.com/watch?v=hlWiI4xVXKY" playing muted/>
      </p>
    </div>
  );
}

 