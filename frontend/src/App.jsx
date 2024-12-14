import React, { useEffect, useState } from "react";
import Message from "./Components/Message";
import { useSocket } from "./Context/SocketContext";

const App = () => {
  const { socket } = useSocket();
  const [room, setRoom] = useState("");
  const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("receive-message", (message) => {
      setMessageList((prevState) => [...prevState, message]);
    });

    socket.on("connect", () => {
      setUserId(socket.id);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() == "") {
      return;
    } else {
      socket.emit("send-message", input);
      setMessageList((prevState) => [...prevState, input]);
      setInput("");
    }
  };

  return (
    <div className="w-screen h-screen flex  justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-semibold text-slate-800">Chat App</h1>
        <div className="text-2xl bg-slate-700 text-white font-semibold px-2 py-2 rounded-lg">
          {userId ? <h1>{userId}</h1> : <span>Not connected ...</span>}
        </div>
        <div className="border overflow border-red-600 w-[600px] h-[400px] rounded-lg px-2 py-2 flex flex-col justify-start items-center gap-2">
          {messageList && messageList.length > 0 ? (
            messageList.map((items, index) => (
              <div className="w-full" key={index}>
                <Message message={items} />
              </div>
            ))
          ) : (
            <span className="w-full h-fit text-xl bg-gray-200 font-semibold text-slate-800 px-2 py-2 rounded-lg text-center">
              No message...
            </span>
          )}
        </div>
        <form
          className="w-full flex flex-col justify-start items-center gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full flex justify-between items-center gap-2 ">
            <input
              type="text"
              placeholder="Enter the text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full text-xl font-semibold text-slate-700 border px-2 py-2 rounded-lg active:outline-none"
            />
            <button
              type="submit"
              className="w-fit h-fit bg-green-500 px-2 py-2 rounded-lg text-white"
            >
              Send Message
            </button>
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <input
              type="text"
              value={room}
              placeholder="Enter the room id..."
              onChange={(e) => setRoom(e.target.value)}
              className="w-full text-xl font-semibold text-slate-700 border px-2 py-2 rounded-lg active:outline-none"
            />
            <button className="w-fit h-fit bg-blue-500 px-2 py-2 rounded-lg text-white">
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
