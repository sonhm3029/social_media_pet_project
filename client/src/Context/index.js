import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import UserAccess from "@data-access/users";
import pinsAccess from '@src/data-access/pins';


export const Context = createContext();
export default function ContextProvider({children}) {

    const [user, setUser] = useState({});
    const [pins, setPins] = useState([]);
    const [loadingPins, setLoadingPins] = useState(true);

    const getUser = async(id) => {
        const response = await UserAccess.get(`/${id}`);
        return response;
    }

    const getPins = async(categoryId) => {
        var param="";
        if(categoryId) {
            param = `?category=${categoryId}`
        }
        const res = await pinsAccess.get(param);
        if(res) {
          setPins(res?.data?.data);
          setLoadingPins(false);
        }
      }


    // useEffect(()=> {
    //     const userProfile = JSON.parse(localStorage.getItem("user"));
        
    //     if(userProfile?.id) {
    //         const response = getUser(userProfile?.id);
    //         response
    //         .then(res => {  
    //             if(res?.data?.data?.id) {
    //                 setUser(res?.data?.data)
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }
    //     getPins();
    // },[])

    

    return (
        <Context.Provider value={
            {
                user: {
                    user, 
                    setUser
                },
                pins: {
                    pins,
                    getPins,
                    loadingPins
                }
            }
        }>
            {children}
        </Context.Provider>
    )
}