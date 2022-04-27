import React, {useState, useEffect} from 'react';
import {MdDownloadForOffline} from "react-icons/md";
import {Link, useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import MasonaryLayout from '../MasonaryLayout';
import Spinner from '../Spinner';
import pinsAccess from '@src/data-access/pins';
import commentsAccess from '@src/data-access/comments';
import { toast } from 'react-toastify';

const PinDetail = ({user}) => {

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [pinComments, setPinComments] = useState([]);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const {pinId} = useParams(); 

  const getPinById = async() => {
    let res = await pinsAccess.get(`/${pinId}`);

    if(res?.data?.data) {
      // get related pin
      let currentPin = res?.data?.data[0];
      let category = currentPin?.category;
      let relatedRes = await pinsAccess.get(`?category=${category}`);
      if(relatedRes?.data?.data?.length >1) {
        let relatedPinsArr = 
          relatedRes?.data?.data?.filter( item => item?.id!==currentPin?.id);
        setPins(relatedPinsArr);
      }
      setPinDetail(currentPin);
    }
  }


  const getCommentsByPinId = async()=> {
    let res = await commentsAccess.get(`?pinId=${pinId}`);

    if(res?.data?.data) {
      const reverseArr = res?.data?.data?.reverse();
      console.log(reverseArr);
      console.log(res?.data?.data);
      setPinComments(reverseArr);
    }
  }

  const handleAddComment = async() => {
    try {
      if(comment !=="") {
        setAddingComment(true);
        let body = {
          content: comment,
          pin_id: pinId,
          postedby: user.id
        }

        let res = await commentsAccess.post(body);
        if(res?.data?.data) {
          setTimeout(()=> {
            getCommentsByPinId();
            setAddingComment(false);
            setComment('');
          }, 3000);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    getPinById();
    getCommentsByPinId();
  }, [pinId])

  if(!pinDetail) return <Spinner message={"Loading pin..."}/>

  return (
    <>
    <div 
      className='flex xl-flex-row flex-col m-auto bg-white'
      style={{
        maxWidth: '1500px',
        borderRadius: '32px'
      }}
    >
      <div 
        className='flex justify-center items-center md:items-start flex-initial'
      >
        <img
          src={pinDetail?.image}
          className="rounded-t-3xl rounded-b-lg"
          alt='user-post'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a 
              href={pinDetail?.image?.cloudinaryDownloadFormat()}
              download
              onClick={(e)=> e.stopPropagation()}
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a 
            href={pinDetail?.destination}
            target="_blank"
            rel='noreferrer'
            className='break-words'  
          >
            {pinDetail?.destination}
          </a>
        </div>
        <div className='text-left'>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetail?.title}
          </h1>
          <p className='mt-3'>{pinDetail?.about}</p>
        </div>
        <Link to={`/user-profile/${pinDetail?.postedby?.id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
          <img
              className='w-8 h-8 rounded-full object-cover'
              alt='user-profile'
              src={pinDetail?.postedby?.image}
          />
          <p className='font-semibold capitalize'>
              {pinDetail?.postedby?.name}
          </p>
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto'>
          {
            pinComments?.map( (comment, index) => (
              <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={index}>
                <Link to={`/user-profile/${comment?.postedby?.id}`}>
                  <img
                    src={comment?.postedby?.image}
                    alt="user-profile"
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                </Link>
                <div
                  className='flex flex-col'
                >
                  <p className='font-bold'>{comment?.postedby?.name}</p>
                  <p>{comment?.content}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className='flex flex-wrap mt-6 gap-3'>
          <Link to={`/user-profile/${user?.id}`}>
            <img
                className='w-10 h-10 rounded-full object-cover cursor-pointer'
                alt='user-profile'
                src={user?.image}
            />
          </Link>
          <input
            className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' 
            type={"text"}
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='button'
            className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            onClick={handleAddComment}
          >
            {addingComment ? 'Postting the comment...':'Post'}
          </button>
        </div>
      </div>
    </div>
    {pins? (
      <>
        <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
          More like this
        </h2>
        <MasonaryLayout pins={pins}/>
      </>
    ):(
      <Spinner message={"Loading more pins..."}/>
    )}
    </>
  )
}

export default PinDetail