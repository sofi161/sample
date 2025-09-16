import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <i className="fa-solid text-slate-900 fa-spinner animate-spin text-4xl sm:text-5xl"></i>
    </div>
  );
};

export default Loading;
