import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "./ProgressBarCustomize.css";
const ProgressBarCustomize = ({ value, numRate }) => {
  return (
    <div className=" flex ml-4 h-3 w-full items-center">
      <ProgressBar
        isLabelVisible={false}
        className="wrapper"
        barContainerClassName="container"
        completedClassName="barCompleted"
        completed={value}
      />
      <div className=" ml-4 text-lg text-gray-400 ">{numRate}</div>
    </div>
  );
};

export default ProgressBarCustomize;
