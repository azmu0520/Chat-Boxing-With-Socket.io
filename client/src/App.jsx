import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');
function App() {
  const [state, setState] = useState({
    name: '',
    room: '',
  });
  const [login, setLogin] = useState(false);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onAdd = () => {
    socket.emit('join_room', state.room);
    console.log(state.name, state.room);
    setLogin(true);
  };
  return (
    <div className='App'>
      {!login ? (
        <div className='join-chat'>
          <h3>Join The chat</h3>
          <input
            type='text'
            name='name'
            required
            placeholder='Enter your name'
            onChange={handleChange}
          />
          <input
            type='text'
            name='room'
            required
            placeholder='Enter your roomId'
            onChange={handleChange}
          />
          <button onClick={onAdd}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} name={state.name} room={state.room} />
      )}
    </div>
  );
}

export default App;
