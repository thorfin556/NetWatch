import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    useEffect(()=>{
        const initializeAuth = async ()=>{
            const token = localStorage.getItem("token");
            if(!token){
                setIsLoading(false);
                return;
            }
            try {
                const response = await api.get('/user/me');
                setUser(response.data.user);
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
            }finally{
                setIsLoading(false);
            }
        };
        initializeAuth();
    },[]);
    
    const login = async(email,password)=>{
        const response = await api.post('/user/login',{
            email,
            password
        });

        const {token, user:userData} = response.data;

        localStorage.setItem('token',token);
        setUser(userData);

        return response.data
    };

    const register = async(name,email,password)=>{
        const response = await api.post('/user/register',{
            name,
            email,
            password
        });

        const {token, user: userData} = response.data;

        localStorage.setItem('token',token);
        setUser(userData);

        return response.data
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ 
            user,
            isLoading,
            isAuthenticated,
            login,
            register,
            logout,
            
            }}>
            {children}
        </AuthContext.Provider>
    );
}