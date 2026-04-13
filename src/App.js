import './App.css';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import Signup from "./components/Signup";
import Login from './components/Login';
import { clearAuthUser, setAuthLoading, setAuthUser, setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';
import store from './redux/store';
import io from 'socket.io-client';

const appBackgroundStyle = {
  backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.45)), url(${process.env.PUBLIC_URL}/bg.jpg)`,
};

const AuthLoader = () => (
  <div className="text-center text-white">
    Checking your session...
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.user);

  if (isCheckingAuth) {
    return <AuthLoader />;
  }

  return authUser ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.user);

  if (isCheckingAuth) {
    return <AuthLoader />;
  }

  return authUser ? <Navigate to="/" replace /> : children;
};

function App() {
  const dispatch = useDispatch();
  const authCheckStarted = useRef(false);
  const { authUser } = useSelector((state) => state.user);


  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8080', {
        withCredentials: true,
        auth: {
          userId: authUser._id,
          username: authUser.username,
          fullName: authUser.fullName,
        },
      });
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server:', socket.id);
        dispatch(setSocket(socket));
      });

      socket.on('getOnlineUsers', (userIds) => {
        dispatch(setOnlineUsers(userIds));
      });

      socket.on('newMessage', (newMessage) => {
        const state = store.getState();
        const selectedChatUser = state.user?.selectedChatUser;
        if (selectedChatUser && (newMessage.sender === selectedChatUser._id || newMessage.sender?._id === selectedChatUser._id)) {
          store.dispatch({ type: 'message/addMessage', payload: newMessage });
        }
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
        dispatch(setSocket(null));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [authUser]);
  useEffect(() => {
    if (authCheckStarted.current) {
      return;
    }

    authCheckStarted.current = true;

    const checkAuth = async () => {
      dispatch(setAuthLoading(true));

      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/me', {
          withCredentials: true,
        });
        dispatch(setAuthUser(response.data.user));
      } catch (error) {
        dispatch(clearAuthUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <div
      className="app-shell p-4 min-h-screen flex items-center justify-center"
      style={appBackgroundStyle}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
