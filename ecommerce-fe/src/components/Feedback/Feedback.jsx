import React from "react";
import FeedbackCard from "./FeedbackCard/FeedbackCard";
const Feedback = () => {
  return (
    <div className=" bg-light-blue border rounded-3xl">
      <section className="flex items-center bg-transparent dark:bg-gray-800">
        <div className="p-2 mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h1 className="mb-4 text-3xl font-bold dark:text-white">
              Feedback
            </h1>
            <p className="max-w-xl mx-auto text-white-500">Thank for trust</p>
          </div>
          <FeedbackCard></FeedbackCard>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
