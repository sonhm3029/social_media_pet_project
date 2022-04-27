import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import {AiOutlineLogout} from "react-icons/ai";
import MasonaryLayout from '../MasonaryLayout';
import Spinner from '../Spinner';
import usersAccess from '@src/data-access/users';
import pinsAccess from '@src/data-access/pins';
import { toast } from 'react-toastify';


const randImg = 'https://source.unsplash.com/1600x900/?nature,photography,technology';


const activeBtnStyles= 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary text-black mr-4 font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = ({currentUser}) => {

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const {userId} = useParams();

  useEffect(()=> {
    usersAccess.get(`/${userId}`)
      .then(res => {
        setUser(res?.data?.data);
      })
      .catch(err => {
        toast.error(err.message)
      })
  }, [userId]);

  useEffect(() => {
    if(text ==='Created') {
      pinsAccess.get(`?userId=${userId}`)
        .then(res => {
          setPins(res?.data?.data);
        })
        .catch(err => {
          toast.error(err.message);
        })
    }else {
      pinsAccess.get(`?saveById=${userId}`)
        .then(res => {
          setPins(res?.data?.data);
        })
        .catch(err => {
          toast.error(err.message);
        })
    }
  },[text, userId])

  const logout = () => {
    try {
      localStorage.clear();
      navigate('/login');
      toast.success("Logout success!")
    } catch (error) {
      toast.error(error.message);
    }
  }

  if(!user) {
    return <Spinner message={"Loading profile..."}/>
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randImg}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt="banner-pic"
            />
            <img
              src={user?.image}
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user?.name}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {currentUser?.id === userId && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_CLIENT_ID}
                  render= {renderProps => (
                      <button 
                          type='button'
                          className='bg-white  p-2 rounded-full cursor-pointer outline-none shadow-md'
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                      >
                          <AiOutlineLogout color='red' fontSize={21}/>
                      </button>
                  )
                  }
                  onLogoutSuccess={logout}
                  cookiePolicy={'single_host_origin'}
                />
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button 
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${activeBtn ==='created'?activeBtnStyles:notActiveBtnStyles}`}
            >
              Created
            </button>
            <button 
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              disabled={!(currentUser?.id ===userId)}
              className={`${activeBtn ==='saved'?activeBtnStyles:notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {
            pins?.length ? (
              <div className='px-2'>
                <MasonaryLayout pins={pins}/>
              </div>
            ):(
              <div 
                className='flex justify-center font-bold items-center text-xl mt-2'
              >
                No pins founded
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserProfile;