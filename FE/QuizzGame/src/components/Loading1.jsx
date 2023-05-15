import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="animate-pulse">
        {" "}
        <div className="w-20 h-20  text-black bg-blue-400 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default Loading;
