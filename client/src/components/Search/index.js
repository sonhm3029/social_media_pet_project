import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import MasonaryLayout from '../MasonaryLayout';
import Spinner from '../Spinner';
import { Context } from '@src/Context';

const Search = ({searchTerm}) => {

  const allPins = useContext(Context).pins.pins;

  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if(searchTerm!=="") {
      setLoading(true);
      let filter = searchTerm.toLowerCase();
      let result =
        allPins?.filter(
          pin =>
            (pin?.about?.toLowerCase()?.includes(filter)||
            pin?.title?.toLowerCase()?.includes(filter)));
      if(result){
        setPins(result);
      }
    }else {
      setLoading(false);
      setPins(null);
    }
  }, [searchTerm])

  return (
    <div>
      {loading && <Spinner message={"Searching for pins..."}/>}
      {pins?.length !==0 && <MasonaryLayout pins={pins}/>}
      {
        pins?.length===0 && searchTerm !== "" && !loading &&(
          <div className='mt-10 text-center text-xl'>
            No pins found!
          </div>
        )
      }
    </div>
  )
}

export default Search