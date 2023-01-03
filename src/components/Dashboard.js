import React from 'react'
import { useAuth } from '../utils/auth'

const Dashboard = () => {
    const auth = useAuth();
    const handleLogout = () =>
    {
        auth.logout();
    }
  if(auth.accessToken){
    return (
    <>
            <p>Welcome {auth.accessToken}</p>
            <button onClick={handleLogout}> Logout</button>
    </>
  )
    }
  else
  {
    return <p>Please login</p>
  }
}

export default Dashboard