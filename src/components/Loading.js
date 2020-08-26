import React from 'react';
function Loading() {
  return (
    <div className="center-mode fixed-loading">
      <svg aria-label="Loading" role="img" id="loading-anim" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 20" preserveAspectRatio="xMidYMid meet" fill="#666666">
        <circle r="5" cx="5" cy="15" fill="blue"></circle>
        <circle r="5" cx="20" cy="15" fill="red"></circle>
        <circle r="5" cx="35" cy="15" fill="#ff00b3"></circle>
        <circle r="5" cx="50" cy="15" fill="green"></circle>
      </svg>
      <p>Loading</p>
    </div>
  );
}

export default Loading;
