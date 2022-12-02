import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Image from "next/image";
import useStateContext from '../context/ContextProvider';

const PictureSolo = ({ close, modalState }) => {
  const { imageSrc, loading, blurBgParent } = useStateContext();

  useEffect(() => {
    const clickCheck = (e) => {
      console.log(e.target.id)
      if (e.target.id === "pictureSolo-modal") {
        close("pictureSolo")
      }
    }
    const modal = document.getElementById("pictureSolo-modal")
    modal.addEventListener("click", clickCheck);

    return () => {
      modal.removeEventListener("click", clickCheck);
    }
  });
  return (
    <div className={`fixed inset-0 w-screen h-screen z-[16] ${blurBgParent ? "blur-[8px]" : ""} ${modalState.pictureSolo ? styles.modalOpen : styles.modalOff}`} >
      <div className='relative w-full h-full grid place-items-center' >
        <div onClick={() => close("pictureSolo")} className='absolute right-0 top-0 bg-glare md:px-1 z-[2]' >
          <IconButton className='' >
            <CloseIcon className='text-gray-300 hover:opacity-75 scale-90 md:scale-100 transition-all' />
          </IconButton>
        </div>
        <div id="pictureSolo-modal" className='w-full h-full flex justify-center items-center' >
          <div className='w-[90%] h-[90%] relative' >
            <Image
              src={imageSrc.image || "/images/mib4u-logo.png"}
              alt={imageSrc.title}
              layout="fill"
              objectFit='contain'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PictureSolo