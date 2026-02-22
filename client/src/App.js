import React, { useState, useEffect } from "react";
import io from "socket.io-client";

//const socket = io("http://localhost:5000");
const socket = io("http://localhost:5000", {
  transports: ["websocket"],   // force websocket
});


socket.on("connect", () => {
  console.log(socket.io.engine.transport.name);
});

function App() {

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {

    if(message !== "") {

      socket.emit("send_message", message);

      setMessage("");

    }

  };


  
 useEffect(() => {

  socket.on("receive_message", (data) => {
    setMessageList((list) => [...list, data]);
  });

  return () => {
    socket.off("receive_message");
  };

}, []);

  return (
    <div style={{padding:20}}>

      <h2>React Socket.IO Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <h3>Messages:</h3>

      {messageList.map((msg, index) => (
        <div key={index}>
          {msg}
        </div>
      ))}

    </div>
  );
}

export default App;