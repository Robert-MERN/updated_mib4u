import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Image from "next/image";
import Logo from './utils/Logo';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useStateContext from "../context/ContextProvider";



const PictureMenu = ({ close, modalState }) => {
  const { openModal, blurBgExtra, imageSrc, blurBgParent, user, likeWork, dislikeWork } = useStateContext();
  const optionHeight = useRef();
  const [readMore, setReadMore] = useState(false);
  const [targetHeight, setTargetHeight] = useState(0);

  useEffect(() => {
    if (optionHeight.current.scrollHeight) {
      setTargetHeight(optionHeight.current?.scrollHeight)
    }
  });

  useEffect(() => {
    const clickCheck = (e) => {
      if (e.target.id === "pictureMenu-modal") {
        close("pictureMenu")
      }
    }
    const modal = document.getElementById("pictureMenu-modal")
    modal.addEventListener("click", clickCheck);

    return () => {
      modal.removeEventListener("click", clickCheck);
    }
  });
  useEffect(() => {
    if (modalState.pictureMenu === false) {
      setReadMore(false)
    }
  }, [modalState.pictureMenu]);
  const { title, status, _id, size, price, deletedPrice, about, createdAt, image } = imageSrc;
  const date = createdAt?.toString().split("T")[0] || "";

  const [fakeLike, setFakeLike] = useState("");
  useEffect(() => {
    if (user) {
      setFakeLike(imageSrc.favorite.find(e => e.userId === user._id));
    } else {
      setFakeLike("");
    }
  }, [modalState.pictureMenu, imageSrc.favorite])

  return (
    <div className={`fixed inset-0 w-screen h-screen z-[15] ${modalState.pictureMenu ? styles.modalOpen : styles.modalOff} ${blurBgExtra || blurBgParent ? "blur-[8px]" : "blur-none"} transition-all duration-300`} >
      <div id="pictureMenu-modal" className='relative w-full h-full grid place-items-center' >
        <div onClick={() => close("pictureMenu")} className='absolute right-0 top-0 bg-glare md:px-1 z-[2]' >
          <IconButton className='' >
            <CloseIcon className='text-gray-300 hover:opacity-75 scale-90 md:scale-100 transition-all' />
          </IconButton>
        </div>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='h-[95vh] w-[90vw] lg:w-[80vw] justify-center flex lg:flex-row flex-col fixed items-center rounded-md overflow-hidden' >
          <div onClick={() => openModal("pictureSolo")} className='w-full lg:flex-[5] h-full bg-black flex justify-center items-center' >
            <div className='w-[90%] h-[90%] relative' >
              <Image
                src={image || "/images/mib4u-logo.png"}
                alt={imageSrc.title}
                layout="fill"
                objectFit='contain'
              />
            </div>
          </div>
          <div className={`w-full lg:flex-[2.5] h-full bg-zinc-800 ${styles.specifiedScroll} overflow-y-auto overflow-x-hidden`} >
            <div className='w-full h-full p-8' >
              <div className='flex gap-3 items-center mb-6 md:mb-8 p-1 border-b border-zinc-700' >
                <Logo />
                <p className={`text-zinc-400 font-bold text-[17px] md:text-[20px] lg:text-[22px] ${styles.tapHighlight}`} >arTrebuch by MIB4u</p>
              </div>
              <h1 className={`text-gray-300 font-bold text-[22px] md:text-[26px] px-3 ${styles.tapHighlight} mb-4`} >{title}</h1>
              <div className={`mb-8 border-b border-zinc-700 pb-4 md:pb-8`} >
                <table className='mb-8' >
                  <tbody>
                    <tr>
                      <td className={`text-[14px] md:text-[16px] text-gray-300 w-[90px] px-4 pb-2`} >Status</td>
                      <td className={`text-[14px] md:text-[16px] text-zinc-500 pb-2`} >{status}</td>
                    </tr>
                    <tr>
                      <td className={`text-[14px] md:text-[16px] text-gray-300 px-4 pb-2`} >Size</td>
                      <td className={`text-[14px] md:text-[16px] text-zinc-500 pb-2`} >{size}</td>
                    </tr>
                    <tr>
                      <td className={`text-[14px] md:text-[16px] text-gray-300 px-4 pb-2`} >Id</td>
                      <td className={`text-[14px] md:text-[16px] text-zinc-500 pb-2`} >{_id}</td>
                    </tr>
                    <tr >
                      <td className={`text-[14px] md:text-[16px] text-gray-300 px-4 pb-2`} >Date</td>
                      <td className={`text-[14px] md:text-[16px] text-zinc-500 pb-2`} >{date}</td>
                    </tr>


                    {
                      deletedPrice > 0 && (
                        <tr>
                          <td className={`text-[14px] md:text-[16px] text-gray-300 px-4 pb-2`} >sale</td>
                          <td className={`text-[14px] md:text-[16px] text-zinc-500 pb-2`} ><del>${deletedPrice},-</del></td>
                        </tr>
                      )
                    }
                    <tr>
                      <td className={`text-[14px] md:text-[16px] text-gray-300 px-4`} >Price</td>
                      {price === 0 ?
                        <td className={`text-[14px] md:text-[16px] text-zinc-500`} >Free</td>
                        :
                        <td className={`text-[14px] md:text-[16px] text-zinc-500`} >${price},-</td>
                      }
                    </tr>
                  </tbody>
                </table>
                {user ?
                  <>
                    {fakeLike ?

                      <IconButton
                        onClick={() => {
                          dislikeWork(_id);
                          setFakeLike("");
                        }}
                      >
                        <div className='flex gap-2 items-center text-gray-200 text-[14px] font-semibold px-[13px] md:px-[30px] py-[6px] md:py-[7px] cursor-pointer transition-all hover:opacity-80 duration-300 rounded-md bg-gray-600' >
                          <ThumbDownIcon className='scale-[0.7]' />
                          <p>Dislike</p>
                        </div>
                      </IconButton>
                      :
                      <IconButton
                        onClick={() => {
                          likeWork(_id);
                          setFakeLike("liked");
                        }}
                      >
                        <div className='flex gap-2 items-center text-gray-200 text-[14px] font-semibold px-[13px] md:px-[30px] py-[6px] md:py-[7px] cursor-pointer transition-all hover:opacity-80 duration-300 rounded-md bg-pink-600' >
                          <ThumbUpIcon className='scale-[0.7]' />
                          <p>Like artwork</p>
                        </div>
                      </IconButton>
                    }
                  </>
                  :
                  <IconButton
                    onClick={() => {
                      openModal("login")
                    }}
                  >
                    <div className='flex gap-2 items-center text-gray-200 text-[14px] font-semibold px-[13px] md:px-[30px] py-[6px] md:py-[7px] cursor-pointer transition-all hover:opacity-80 duration-300 rounded-md bg-pink-600' >
                      <ThumbUpIcon className='scale-[0.7]' />
                      <p>Like artwork</p>
                    </div>
                  </IconButton>

                }
              </div>
              <div className='mb-4 lg:mb-8' >
                <p className={`text-[16px] text-gray-300 font-bold mb-2`}>About the work</p>
                <div ref={optionHeight} style={{ height: `${readMore ? optionHeight.current?.scrollHeight + "px" : "75px"}` }} className=" overflow-y-hidden transition-all duration-[400ms]"  >

                  <p className={`text-[13px] md:text-[16px] text-zinc-500 pb-2`}>
                    {about}
                  </p>
                </div>
              </div>
              {targetHeight > 75 &&
                <div className={`w-full justify-center mb-12 lg:mb-20 ${readMore ? "hidden" : "flex"}`} >
                  <IconButton onClick={() => setReadMore(prev => !prev)} >
                    <p className='text-gray-300 border-b-[2px] border-b-gray-300 text-[13px] lg:text-[15px] ' >Read more</p>
                  </IconButton>
                </div>
              }
              <div className={`flex w-full flex-col xl:flex-row ${price > 0 ? "justify-between" : "justify-center"} items-center pb-8 box-border`} >
                <IconButton onClick={() => openModal("message")} className='w-full xl:w-fit' >
                  <p style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`text-white text-[14px] md:text-[15px] font-semibold d py-[10px] flex-1 md:py-[12px] px-[30px] cursor-pointer transition-all bg-teal-500 hover:opacity-80 duration-300 rounded-md w-full`}>Send a message</p>
                </IconButton>
                {price > 0 &&
                  <IconButton onClick={() => user ? openModal("payment") : openModal("login")} className='w-full xl:w-fit' >
                    <p style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`text-white text-[14px] md:text-[15px]  font-semibold  py-[10px] flex-1 md:py-[12px] px-[30px] cursor-pointer transition-all bg-blue-600 hover:opacity-80 duration-300 rounded-md w-full`}>Buy now - ${price},-</p>
                  </IconButton>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PictureMenu