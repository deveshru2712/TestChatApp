import React from "react";

const MessageBox = ({ message }) => {
  return (
    <div className="w-full h-fit px-2 py-2 text-slate-700 border border-green-500">
      {message}
    </div>
  );
};

export default MessageBox;
