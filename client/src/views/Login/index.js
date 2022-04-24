import React, {
    useContext
} from 'react';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from "react-icons/fc";
// import dotenv from "dotenv";
import { toast } from 'react-toastify';
import userAccess from "@data-access/users";
import { useNavigate } from 'react-router-dom';
import { Context } from '@src/Context';

const Login = () => {
    const {user: {setUser}} = useContext(Context);
    const navigate = useNavigate();

    const isExist = async(id) => {
        const res = await userAccess.get(`/${id}`);
        if(res?.data?.data?.id && res?.data?.data?.total!==0 ) {
            return true;
        }
        return false;
    }

    const responseGoogle = async(response) => {
        try {
            if(response?.profileObj) {
                const profile = response?.profileObj;
                const name = profile?.name;
                const image = profile?.imageUrl;
                const id = profile?.googleId;
                
                if(!await isExist(id)) {
                    const newUser = 
                        await userAccess.post({id, name, image});
                }
                setUser({
                    id,
                    name,
                    image
                })
                localStorage.setItem('user', JSON.stringify({id, name, image, token: response?.tokenObj?.access_token}));
                toast.success("Login success!");
                navigate("/");
            }else {
                throw Error({
                    message:"Auth failed!"
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='h-full w-full relative'>
                <video
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    src={require("@videos/share.mp4")}
                    className="w-full h-full object-cover"
                />
                <div
                    className='absolute flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'
                >
                    <div className='p-5'>
                        <img
                            src={require("@images/logowhite.png")}
                            width={"130px"}
                        />
                    </div>
                    <div>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_CLIENT_ID}
                            render= {renderProps => (
                                <button 
                                    type='button'
                                    className='bg-mainColor flex items-center p-2 rounded-lg cursor-pointer'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle/> Sign in with google
                                </button>
                            )
                            }
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login