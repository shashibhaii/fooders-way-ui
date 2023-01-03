import { useState ,createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const login = (accessToken ) => { setAccessToken(accessToken)};
    const logout = () => { 
        setAccessToken(null)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('businessId');
    };

    return <AuthContext.Provider value = {{accessToken, login,logout}}>{children}</AuthContext.Provider>
} 

export const useAuth = () => {return useContext(AuthContext)}