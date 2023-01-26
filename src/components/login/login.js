import React, { useState } from 'react';
import AlertDanger from '../AlertDanger.js';
import { unauthorizedaxios } from '../../axiosinit.js';

function Login({ setIsauth, setToken }) {
  const [error, setError] = useState('');
  const [iserr, setErr] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (username && !password) {
      setErr(false);
      setError('');
      setErr(true);
      setError('Must Enter your password!');
    } else if (password && !username) {
      setErr(false);
      setError('');
      setErr(true);
      setError('Must Enter your username!');
    } else if (!username && !password) {
      console.log("log 1")
      setErr(true)
      setError('Must Enter your username and password!')
    }

    if (username && password) {
      unauthorizedaxios.post('/authenticate', {
        'username': username,
        'password': password
      })
        .then((res) => {
          if (res) {
            try {
              setIsauth(true);
              setToken(res.data['access_token']);
              localStorage.setItem("access_token", JSON.stringify(res.data['access_token']));
              localStorage.setItem("refresh_token", JSON.stringify(res.data['refresh_token']));
              localStorage.setItem("businessId", JSON.stringify(res.data['businessId']));

            }
            catch (err) {
              console.log(err)
            }
          }
        })
        .catch((err) => {
          if (err) {
            setErr(false)
            setError('')
            setErr(true)
            setError('Wrong username or password!')
          }
        })
    }
  }

  const viewPassword = () => {
    window.document.getElementById("password").type = "text";
    window.document.getElementById("hidden-password").classList.add("hidden");
    window.document.getElementById("open-password").classList.remove("hidden");
  };

  const hidePassword = () => {
    window.document.getElementById("password").type = "password";
    window.document.getElementById("open-password").classList.add("hidden");
    window.document.getElementById("hidden-password").classList.remove("hidden");
  };

  return (
    <>
      {/* Alert for wrong credentials  and Alert for missing credentials */}
      <AlertDanger isToastDanger={iserr} setToastDanger={setErr} message={error} setAllertmsg={setError} />

      <div className="w-[95%] sm:w-[60%] lg:w-[40%] xl:w-[30%] form-font absolute px-10 py-10 rounded top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] duration-200 hover:border hover:shadow-lg hover:shadow-slate-400">
        <div className="py-2 mb-6 flex flex-col items-center">
          <div className="mb-4 px-5 py-5 border-2 rounded-full border-orange-500">
            <i className="fa-solid fa-key text-4xl text-orange-500" />
          </div>
          <div className="font-medium text-slate-800">Login to your account</div>
          <div className="text-[14px] text-slate-500">Your credentials</div>
        </div>
        <div className="mb-4 flex flex-col justify-center items-start">
          <div className="ml-4 absolute">
            <i className="fa-solid fa-user text-slate-500" />
          </div>
          <input className="py-2 pr-4 pl-10 w-full text-sm rounded outline outline-1 outline-slate-300 text-slate-700 placeholder:text-slate-700 focus:outline-1 focus:shadow-md focus:outline-orange-500" type="text" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
        </div>
        <div className="flex justify-between items-center">
          <div className="ml-4 absolute">
            <i className="fa-solid fa-lock text-slate-500" />
          </div>
          <input className="py-2 pl-10 pr-4 w-full text-sm outline outline-1 outline-slate-300 rounded-l text-slate-700 placeholder:text-slate-700 focus:outline-1 focus:shadow-md focus:outline-orange-500" type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          <button id="hidden-password" className="px-3 py-1.5 outline outline-1 outline-slate-300 rounded-r bg-[#eeeeee]" onClick={viewPassword}>
            <i className="fa-solid fa-eye text-slate-500" />
          </button>
          <button id="open-password" className="hidden px-3 py-1.5 outline outline-1 outline-slate-300 rounded-r bg-[#eeeeee]" onClick={hidePassword}>
            <i className="fa-solid fa-eye-slash text-slate-500" />
          </button>
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={() => submit()} className="w-full py-1.5 rounded hover:shadow-md hover:shadow-slate-400 focus:shadow-none focus:bg-orange-600 text-white bg-orange-500">Login</button>
        </div>
      </div>
    </>
  );
}

export default Login