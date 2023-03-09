import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        if (localStorageToken) {
            const decoded = jwt(localStorageToken);
            setToken(localStorageToken);
            setName(decoded.username);
            setPicture(decoded.picture);
            // navigate('/timeline');
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            token, setToken,
            name, setName,
            picture, setPicture,
            API_URL
        }}>
            {children}
        </AuthContext.Provider>
    )
}