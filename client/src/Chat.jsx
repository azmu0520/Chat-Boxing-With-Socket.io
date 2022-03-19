import React, { useEffect, useState } from 'react';
import './Chat.css';
export default function Chat({ socket, name, room }) {
  const [msg, setMsg] = useState();
  const sendMsg = async () => {
    const msgData = {
      room: room,
      author: name,
      message: msg,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit('send_message', msgData);
  };

  useEffect(() => {
    socket.on(
      'receive_message',
      (data) => {
        console.log(data);
      },
      [socket]
    );
  });
  return (
    <div className='live'>
      <div className='header'>
        <h1>Live Chat</h1>
      </div>
      <div className='chat-body'></div>

      <div className='chat-footer'>
        <input
          type='text'
          required
          placeholder='Hey'
          onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}
