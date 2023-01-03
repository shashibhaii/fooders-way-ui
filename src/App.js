import Login from "./components/Login";
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import { useAuth } from "./utils/auth";
import React, { useEffect}  from 'react'



function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.login(localStorage.getItem('access_token'))
  },[])

  return (
    <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
    </Routes>
  );
}

export default App;
