import React, {useEffect, useState} from 'react';
import { Link, Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { LoginCard, RegisterCard, HomePage } from './pages';

const App = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) : null);

  useEffect(() => {
    setUserToken(localStorage.getItem('user-token') ? jwt_decode(localStorage.getItem('user-token')) : null)
  }, [])

  return (
    <Routes>
      <Route path="/" element={userToken ? <Navigate to="/home" /> : <Navigate to="/login" />}/>
      <Route path='/login' element={userToken ? <Navigate to="/home" /> : <LoginCard />}/>
      <Route path='/register' element={<RegisterCard />}/>
      <Route path='/home' element={userToken ? <HomePage /> : <Navigate to="/login" />}/>
    </Routes>
  );
}

export default App;
