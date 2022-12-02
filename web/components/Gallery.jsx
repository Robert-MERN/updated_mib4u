import React, { useEffect } from 'react'
import ImageList from './utils/ImageList'
import useStateContext from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';


const Gallery = ({ findAll, findFavorite }) => {

  const { fetchWork, work, favoriteWork, getFavoriteWork } = useStateContext();

  useEffect(() => {
    if (findAll) {
      fetchWork("", "");
    } else if (findFavorite) {
      getFavoriteWork();
    }
  }, []);



  return (
    <>

      {findAll ?

        <>
          {
            work === "" ?
              <div className='w-full flex justify-center h-[60vh] items-center'>
                <CircularProgress size={"4rem"} />
              </div>
              :
              <>
                {work &&
                  work.Work.length ?
                  <div className='grid w-screen h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 flex-wrap justify-center py-12 pl-4 pr-8' >
                    {work.Work.map((item) => (
                      <ImageList key={item._id} source={item} />
                    ))
                    }
                  </div>
                  :
                  <div className='w-full flex justify-center h-[60vh] items-center' >
                    <p className={`px-[60px] py-[6px] outline-none rounded-md text-zinc-400 font-semibold text-[20px] md:text-[24px] lg:text-[28px] text-center`}>Sorry, no result found with such filters, keywords or category...</p>
                  </div>
                }
              </>
          }
        </>
        :
        <>
          {
            favoriteWork === "" ?
              <div className='w-full flex justify-center h-[60vh] items-center'>
                <CircularProgress size={"4rem"} />
              </div>
              :
              <>
                {favoriteWork &&
                  favoriteWork.length ?
                  <div className='grid w-screen h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 flex-wrap justify-center py-12 pl-4 pr-8' >
                    {favoriteWork.map((item) => (
                      <ImageList key={item._id} source={item} />
                    ))
                    }
                  </div>
                  :
                  <div className='w-full flex justify-center h-[60vh] items-center' >
                    <p className={`px-[60px] py-[6px] outline-none rounded-md text-zinc-400 font-semibold text-[20px] md:text-[24px] lg:text-[28px] text-center`}>No favorites...</p>
                  </div>
                }
              </>
          }
        </>
      }


    </>
  )
}

export default Gallery