import React, { useEffect, useRef, useState }  from 'react'
import '../css/Login.css'
import api from '../api/axios'
import { useAuth } from '../utils/auth'
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    const [username,setUsername]=useState(''); 
    const [password, setPassword]=useState('');
    const [errMsg, setErrMsg]=useState('');
    const [loginDetails, setDataInput]=useState('');
    const userRef = useRef();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setErrMsg('');
    },[username,password])

    useEffect(() => {
        userRef.current.focus();
    },[])

    let errMsgElement = errMsg ? <p className = 'error-msg'>{errMsg}</p> : '' 

    const submitThis= async (e)=>{
        e.preventDefault();
        setDataInput({username,password});
        try{
            const resp = await api.post('/authenticate',JSON.stringify(loginDetails), { headers :{
                'Content-Type': 'application/json'}});
            if(resp?.data)
            {   
                let {access_token, refresh_token, businessId} = resp.data
                localStorage.setItem('access_token',access_token);
                localStorage.setItem('refresh_token',refresh_token);
                localStorage.setItem('businessId',businessId);
                auth.login(access_token);
                navigate('/dashboard');
            }
        }
        catch(err)
        {
            if (err?.response?.data?.responseCode == 401)
                setErrMsg(err?.response?.data?.errorMessage)
            if (err?.response?.data?.responseCode == 500)
            setErrMsg('Something went wrong. Please contact the Administrator.')
            console.warn("Error in authentication")
        }

    }

	return(
	<div className='container'>
		<div >
        <p>Welcome to Foodersway.</p>
        <form onSubmit={submitThis}> 
                <div> 
                    <input ref={userRef} className ='login-input' type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' /> 
                </div> 
                <div> 
                    <input className ='login-input' type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder = 'Password'/> 
                </div>  
                <button className= 'login-button' type="submit">Login</button>
        </form>
        {errMsgElement}
		</div>
	</div>
	)
}

export default Login  