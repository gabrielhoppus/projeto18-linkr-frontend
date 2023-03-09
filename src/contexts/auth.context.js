import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    return (
        <AuthContext.Provider value={{ token, setToken, name, setName, API_URL, picture, setPicture }}>
            {children}
        </AuthContext.Provider>
    )
}