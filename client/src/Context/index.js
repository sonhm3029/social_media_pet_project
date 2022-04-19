import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import UserAccess from "@data-access/users";


export const Context = createContext();
export default function ContextProvider({children}) {

    const [user, setUser] = useState({});
    const getUser = async(id) => {
        const response = await UserAccess.get(`/${id}`);
        return response;
    }


    useEffect(()=> {
        const userProfile = JSON.parse(localStorage.getItem("user"));
        
        if(userProfile?.id) {
            const response = getUser(userProfile?.id);
            response
            .then(res => {  
                if(res?.data?.data?.id) {
                    setUser(res?.data?.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[])
    

    return (
        <Context.Provider value={
            {
                user: {
                    user, 
                    setUser
                }
            }
        }>
            {children}
        </Context.Provider>
    )
}