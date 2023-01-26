import React, { useEffect, useState, createContext } from 'react';
import Login from './components/login/login';
import Menu from './components/dashboard/menupage/menu';
import NavBar from './components/navbar/NavBar';
import { timestamp } from './unixTimeStamp';
import jwtDecode from 'jwt-decode';
import { unauthorizedaxios } from './axiosinit';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export const Auth = createContext();

function App() {
  const [token, setToken] = useState(null);
  const [isauth, setIsauth] = useState(false);
  const [tokenexp, settokenExp] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    setScreenWidth(window.screen.width);

    if (localStorage.getItem("access_token")) {
      setToken(JSON.parse(localStorage.getItem("access_token")));
      settokenExp(jwtDecode(JSON.parse(localStorage.getItem("access_token"))).exp)
      setIsauth(true)
    }

    regianAcessToken();
  }, [])

  const regianAcessToken = () => {
    if (localStorage.getItem("access_token")) {
      if (timestamp() >= jwtDecode(JSON.parse(localStorage.getItem("access_token"))).exp) {
        let data = { "refreshToken": JSON.parse(localStorage.getItem("refresh_token")) }
        //console.log(data)
        unauthorizedaxios.post('/refresh-token', data)
          .then(res => {
            console.log('inside');

            if (res.status === 200) {
              try {
                if (localStorage.getItem("access_token")) {
                  console.log("token changed")
                  setIsauth(true);
                  setToken(res.data['access_token']);
                  localStorage.setItem("access_token", JSON.stringify(res.data['access_token']));
                  localStorage.setItem("refresh_token", JSON.stringify(res.data['refresh_token']));
                  localStorage.setItem("businessId", JSON.stringify(res.data['businessId']));
                }
              }
              catch (err) {
                console.log(err)
              }
            }
            else {
              if (localStorage.getItem("access_token")) {
                console.log('refresh expired')
                setIsauth(false);
                setToken(null);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("businessId");
              }
            }
          })
          .catch(err => {
            if (localStorage.getItem("access_token")) {
              setIsauth(false);
              setToken(null);
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("businessId");
            }
          })
      }
    }
  }

  if (isauth) {
    const data = { "token": token, "screenWidth": screenWidth, "businessId": JSON.parse(localStorage.getItem("businessId")), 'currentTimestamp': timestamp(), 'tokenexp': tokenexp };

    return (
      <>
        <Auth.Provider value={data}>
          <Router>
            <NavBar setIsauth={setIsauth} />
            <div className="flex flex-col items-center">
              <div className="2xs:w-[95%] xs:w-[87%] md:w-[82%] xl:w-[75%] my-10">
                <Routes>
                  <Route exact path='/menu' element={<Menu />} />
                </Routes>
              </div>
            </div>
          </Router>
        </Auth.Provider>
      </>
    )
  }

  return (
    <>
      <Login setIsauth={setIsauth} setToken={setToken} />
    </>
  );
}

export default App
