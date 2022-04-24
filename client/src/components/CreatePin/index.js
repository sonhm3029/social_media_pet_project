import React, {
  useState
} from 'react';
import {AiOutlineCloudUpload} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
// categories
import { categories } from '@src/constants';
import uploadAccess from '@src/data-access/upload';
import pinsAccess from '@src/data-access/pins';
import { toast } from 'react-toastify';
import FormValidate from '../FormValidate';

const CreatePin = ({user}) => {

  const initState = {
    title:"",
    about:"",
    destination:"",
    loading:false,
    fields:null,
    category:null,
    imageAsset:null,
    wrongImageType:false,
  };
  const [state, setState] = useState(initState);
  

  const navigate = useNavigate();

  const handleUploadImage = async (e) => {
    console.log(e);
    const {type} = e.target.files[0];

    if(["image/png","image/svg", "image/jpeg", "image/gif", "image/tiff"].includes(type)) {
      setState(pre => ({
        ...pre,
        wrongImageType:false,
        loading:true,
      }));

      const response = await uploadAccess.uploadFile(e.target?.files[0]);
      if(response) {
        setState(pre => ({
          ...pre,
          imageAsset: response?.data?.data,
          loading:false
        }))
      }
    }else {
      toast.error("Wrong type of file upload!");
      setState(pre => ({
        ...pre,
        wrongImageType:true
      })); 
    }
  }

  const handleDeleteImage = async() => {
    try {
      const response = await uploadAccess.delete(state.imageAsset?.id);
      console.log(response?.data?.data);
      setState(pre => ({...pre, imageAsset:null}));
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleInputChange = (e,field) => {
    setState(pre => ({
      ...pre,
      [field]:e.target.value
    }))
  }
  
  const handleSavePin = async() => {
    const {title, about, destination, imageAsset, category} = state;
    if(title && imageAsset?.url) {
      try {
        const body = {
          title,
          about,
          destination,
          image: imageAsset?.url,
          category: category||"Others",
          postedby: user?.id,
        }
        const result = await pinsAccess.post(body);
        if(result?.data?.data) {
          toast.success("Add pin success!");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.message)
      }

    }
    else {
      setState(pre => ({
        ...pre, 
        fields:true
      }))
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {
        state.fields && (
          <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
            Please fill in all the fields.
          </p>
        )
      }
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {state.loading && <Spinner/>}
            {state.wrongImageType && (<p>Wrong image type</p>)}
            {!state.imageAsset ? (
              <label className='cursor-pointer'>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload/>
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    Use high-quality JPG, SVG, PNG, GIF less than 20 MB
                  </p>
                </div>
                <input
                  type={'file'}
                  name="uploadImage"
                  onChange={handleUploadImage}
                  className="w-0 h-0"
                />
              </label>
            ):(
              <div className='relative h-full'>
                <img 
                  src={state?.imageAsset?.url} 
                  alt="uploaded-pic"
                  className='w-full h-full'
                />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={handleDeleteImage}
                >
                  <MdDelete/>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input
            type={"text"}
            value={state.title}
            onChange= {(e)=> handleInputChange(e, "title")}
            placeholder="Add your title"
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
              <img 
                src={user?.image}
                className="w-10 h-10 rounded-full"
                alt='user-profile'
              />
              <p className='font-bold'>{user.userName}</p>
            </div>
          )}
          <input
            type={"text"}
            value={state.about}
            onChange= {(e)=> handleInputChange(e, "about")}
            placeholder="Waht is your pin about?"
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <input
            type={"text"}
            value={state.destination}
            onChange= {(e)=> handleInputChange(e, "destination")}
            placeholder="Add a destination link"
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className='flex flex-col text-left'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'> Choose Pin Category</p>
              <select
                onChange= {(e)=> handleInputChange(e, "category")}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value={"other"} className='bg-white'>Select category</option>
                {
                  categories.map(category => (
                    <option 
                      className='text-base border-0 outline-none capitalize bg-white text-black'
                      value={category.name}
                      key={category.name}
                    >
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='flex justify-end items-end mt-5'>
              <button
                type='button'
                onClick={handleSavePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin