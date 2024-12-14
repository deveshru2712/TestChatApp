const Message = ({ message }) => {
  return (
    <div className="w-full h-fit text-xl bg-gray-200 font-semibold text-slate-800 px-2 py-2 rounded-lg">
      {message}
    </div>
  );
};

export default Message;
