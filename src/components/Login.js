import React, { useEffect, useRef, useState }  from 'react'
import '../css/Login.css'

const Login=()=>{
    const [email,setEmail]=useState(''); 
    const [passw, setPassw]=useState('');
    const [errMsg, setErrMsg]=useState('Wrong username / password');
    const [dataInput, setDataInput]=useState('');
    const userRef = useRef()

    useEffect(() => {
        setErrMsg('');
    },[email,passw])

    useEffect(() => {
        userRef.current.focus();
    },[])

    let errMsgElement = errMsg ? <p className = 'error-msg'>{errMsg}</p> : '' 

    const submitThis=()=>{
        const info={email:email,passw:passw}; 
        setDataInput([info]);
    }

	return(
	<div className='container'>
		<div >
        <p>Welcome to Foodersway.</p>
        <form onSubmit={submitThis}> 
                <div> 
                    <input ref={userRef} className ='login-input' type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Username' /> 
                </div> 
                <div> 
                    <input className ='login-input' type="password" name="passw" id="passw" value={passw} onChange={(e)=>setPassw(e.target.value)} placeholder = 'Password'/> 
                </div>  
                <button className= 'login-button' type="submit">Login</button>
        </form>
        {errMsgElement}
		</div>
	</div>
	)
}

export default Login  