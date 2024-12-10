import {createContext, useEffect, useState } from "react";



export const Appcontext =createContext();
 

export default function AppProvider({children}){
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState(null);

 

    async function getUser(params) {
        const res = await fetch('api/user',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        const data = await res.json();
        if(res.ok){
            setUser(data);
        }

        
    }

    useEffect(() => {
        if (token) {
            getUser();
        }

    }, [token]);


    return (
        <Appcontext.Provider value={{ token,setToken, user, setUser}}>
        {children}

        </Appcontext.Provider>
    )

}