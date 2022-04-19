import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({children}) {

    const [user, setUser] = useState({});
    
    useEffect(()=> {
        const userId = localStorage.getItem("user")?.id;
        console.log("id", userId);
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}