import React, { useState, useEffect } from 'react'
import Image from "next/image";
import styles from '../../styles/Home.module.css'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useStateContext from "../../context/ContextProvider";



const ImageList = ({ source }) => {
    const { openModal, setImageSrc, user, likeWork, dislikeWork } = useStateContext();
    const [hover, sethover] = useState(false)
    const [fakeLike, setFakeLike] = useState("");
    useEffect(() => {
        if (user) {
            setFakeLike(source.favorite.find(e => e.userId === user._id));
        } else {
            setFakeLike("");
        }
    }, [user, source.favorite])

    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} onClick={() => setImageSrc(source)} onMouseOver={() => sethover(true)} onMouseLeave={() => sethover(false)} className={`relative cursor-pointer ${styles.tapHighlight} ${styles.fadeinAnime} ${hover ? "opacity-80" : "opacity-100"} transition-all duration-300 overflow-hidden rounded-md`} >
            <div className={`flex justify-end p-3 z-[3] absolute right-0 ${hover ? "opacity-100" : "opacity-0"} transition-all duration-300`} >
                {user ?
                    <>
                        <Tooltip title="Favorite" arrow >
                            {fakeLike ?
                                <div className='w-fit h-fit rounded-full bg-zinc-600 hover:bg-zinc-500 transition-all duration-300' >
                                    <IconButton
                                        onClick={() => {
                                            dislikeWork(source._id);
                                            setFakeLike("");
                                        }}
                                        className='text-zinc-600 hover:text-pink-500 bg-zinc-600 hover:bg-pink-500'
                                    >
                                        <FavoriteIcon className='text-pink-600' />
                                    </IconButton>
                                </div>
                                :
                                <div className='w-fit h-fit rounded-full bg-zinc-600 hover:bg-zinc-500 transition-all duration-300' >

                                    <IconButton
                                        onClick={() => {
                                            likeWork(source._id);
                                            setFakeLike("liked");
                                        }}
                                        className='text-zinc-600 hover:text-zinc-500 bg-zinc-600 hover:bg-zinc-500'
                                    >
                                        <FavoriteBorderIcon className='text-gray-200' />
                                    </IconButton>
                                </div>
                            }
                        </Tooltip>
                    </>
                    :
                    <Tooltip title="Favorite" arrow >
                        <div className='w-fit h-fit rounded-full bg-zinc-600 hover:bg-zinc-500 transition-all duration-300' >
                            <IconButton
                                onClick={() => {
                                    openModal("login")
                                }}
                                className='text-zinc-600 hover:text-zinc-500 bg-zinc-600 hover:bg-zinc-500'
                            >
                                <FavoriteBorderIcon className='text-gray-200 ' />
                            </IconButton>
                        </div>
                    </Tooltip>
                }
            </div>
            <div onClick={() => openModal("pictureMenu")} className={`absolute items-end  w-full h-full z-[2] flex ${hover ? "opacity-100" : "opacity-0"}  transition-all duration-300`} >
                <div className='h-[90px] bg-gradient-to-b from-transparent to-black flex flex-col justify-end p-3 w-full' >
                    <p className='text-gray-200 font-extrabold text-[18px]' >{source.title}</p>
                    <div className='flex items-center gap-2' >
                        {source.deletedPrice > 0 &&
                            <del className='text-gray-300 text-[13px] font-thin' >{source.deletedPrice}€</del>
                        }
                        {source.price === 0 ?
                            <p className='text-gray-200 text-[20px] font-thin' >Free</p>
                            :
                            <p className='text-gray-200 text-[20px] font-thin' >{source.price}€</p>
                        }

                    </div>
                </div>
            </div>
            <Image
                layout="responsive"
                alt={source.title}
                width={250}
                height={250}
                objectFit="cover"
                src={source.image || "/images/mib4u-logo.png"}
            />
        </div>
    )
}

export default ImageList