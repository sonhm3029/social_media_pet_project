import React, {
    useState,
    useContext
} from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {MdDownloadForOffline} from "react-icons/md";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsFillArrowUpRightCircleFill} from "react-icons/bs";
import { Context } from '@src/Context';
import savesAccess from '@src/data-access/saves';
import pinsAccess from '@src/data-access/pins';
import { toast } from 'react-toastify';

const Pin = ({pin: {id, title, about, destination, category, image, postedby, savers}}) => {
    
    const categoryId = useParams().categoryId;
    const [postHovered, setPostHovered] = useState(false);
    const {
        user: {user, setUser},
        pins: {getPins}
    } = useContext(Context);

    const navigate = useNavigate();
    const alreadySaved = !!savers?.filter( saver_id => saver_id ===user?.id)?.length;
  
    const handleSavePin = async () => {
        try {
            const res = await savesAccess.post({
                savedby: user?.id,
                pin_id:id
            });
            if(res?.data?.data) {
                getPins(categoryId);
                toast.success("Save success!");
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const handleDeletePin = async(pinId) => {
        try {
            const res = await pinsAccess.delete(pinId);
            if(res?.data?.data) {
                getPins(categoryId);
                toast.success("Delete success!");
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }

    return (
    <div className='m-2'>
        <div
            onMouseEnter={()=>setPostHovered(true)}
            onMouseLeave={()=>setPostHovered(false)}
            onClick={()=> navigate(`/pin-detail/${id}`)}
            className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
            <img className='rounded-lg w-full' alt='user-post' src={image}/>
            {
                postHovered && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{
                            height:"100%"
                        }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a
                                    href={`${image?.replace("/upload", "/upload/fl_attachment/")}`}
                                    download
                                    onClick={(e)=> e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                                >
                                   { savers?.length} Saved
                                </button>
                            ):(
                                <button
                                    onClick={(e)=> {
                                        e.stopPropagation();
                                        handleSavePin(id);
                                    }}
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            {destination&& (
                                <a
                                    href={destination} 
                                    target="_blank"
                                    rel='noreferrer'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length>15?`${destination.slice(0,15)}...`:destination} 
                                </a>
                            )}
                            {postedby?.id === user?.id && (
                                <button
                                    type='button'
                                    onClick={(e)=> {
                                        e.stopPropagation();
                                        handleDeletePin(id);
                                    }}
                                    className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outlined-none'
                                >
                                    <AiTwotoneDelete/>
                                </button>
                            )}
                        </div>

                    </div>
                )
            }
        </div>
        <Link to={`/user-profile/${postedby?.id}`} className="flex gap-2 mt-2 items-center">
            <img
                className='w-8 h-8 rounded-full object-cover'
                alt='user-profile'
                src={postedby?.image}
            />
            <p className='font-semibold capitalize'>
                {postedby?.name}
            </p>
        </Link>
    </div>
  )
}

export default Pin ;