import React, { useState, useEffect } from "react";
import socket from "./socket";

function App() {

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {

    socket.on("chat_message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

    return () => {
      socket.off("chat_message");
    };

  }, []);

  const joinChat = () => {

    if(username !== "") {

      socket.emit("join_chat", username);

      setJoined(true);

    }

  };

  const sendMessage = () => {

    if(message !== "") {

      socket.emit("send_message", message);

      setMessage("");

    }

  };

  if(!joined) {

    return (
      <div style={{padding:20}}>
        <h2>Join Chat</h2>

        <input
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={joinChat}>
          Join
        </button>

      </div>
    );
  }

  return (
    <div style={{padding:20}}>

      <h2>Chat App - {username}</h2>

      <div style={{
        height:300,
        border:"1px solid gray",
        overflowY:"scroll",
        marginBottom:10
      }}>
        {messages.map((msg, index) => (

          <div key={index}>
            <b>{msg.user}:</b> {msg.message}
          </div>

        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}

export default App;