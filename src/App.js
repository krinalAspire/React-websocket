import React, { useEffect, useState } from "react";
import './App.css';
import io from 'socket.io-client';
const socket=io.connect("http://localhost:5000");

function App() {
  const [message, setmessage]=useState(""); 
  const[received, messagereceived]=useState("");
 
  const sendMessage=()=>{
      socket.emit("send_message",{ message})
      setmessage("");
  }

  useEffect(()=>{
     socket.on("receive_message",(data)=>{
      // alert(data.message);
      messagereceived(data.message);
     })
  },[socket])

  return (
    <div className="App">
      <input value={message} onChange={(e)=> setmessage(e.target.value)} placeholder="Message...." />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {received}
    </div>
  );
}

export default App;
