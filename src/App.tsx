import React, { useEffect } from 'react';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login, { login, logout } from './components/login/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';

function App() {
  const user = useAppSelector((state) => state.user);
  console.log(user);

  const dispatch = useAppDispatch();

useEffect(() => {
  auth.onAuthStateChanged((loginUser) => {
    if(loginUser) {
      dispatch(
        login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName,
        })
      );
    } else {
      dispatch(logout());
    }
  });
}, [dispatch]);


  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
