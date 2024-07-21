import React from 'react';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <div className="App">
      {/* sidebar */}
      <Sidebar />


      {/* chat */}
      <Chat />

    </div>
  );
}

export default App;
