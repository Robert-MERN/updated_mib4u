import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/Home.module.css'
import Logo from './utils/Logo';
import useStateContext from '../context/ContextProvider';
import { removeCookies } from "cookies-next";
import { useRouter } from 'next/router';



const LogoutDialog = ({ close, modalState }) => {
    const { setUser, notifyWarn } = useStateContext();
    const router = useRouter();
    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "logout-modal") {
                close("logout")
            }
        }
        const modal = document.getElementById("logout-modal")
        modal.addEventListener("click", clickCheck);
        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });
    return (
        <div className={`fixed inset-0 w-screen h-screen z-[16] ${modalState.logout ? styles.modalOpen : styles.modalOff}`} >
            <div id="logout-modal" className='relative w-full h-full grid place-items-center' >
                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-[90vw] md:h-auto md:w-[36rem]  rounded-md pb-6 ' >
                    <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
                        <Logo />
                        <div onClick={() => close("logout")} className='absolute right-[8px]' >
                            <IconButton>
                                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
                            </IconButton>
                        </div>
                    </div>
                    <div>

                        <p className={`text-[14px] font-semibold md:text-[18px] text-zinc-300 pb-2 text-center my-6`}>
                            Are you sure, do you want to log out?
                        </p>
                    </div>
                    <div className='px-[15px] md:px-[40px] flex justify-between items-center' >
                        <IconButton onClick={() => close("logout")} className='text-[14px]' >
                            <p className={`px-[30px] py-[6px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-zinc-500 hover:opacity-80 duration-300 text-[14px]`}>Cancel</p>
                        </IconButton>
                        <IconButton onClick={() => { setUser(""); removeCookies("token"); close("logout"); notifyWarn("You have logged out!"); router.replace("/") }} className='text-[14px]' >
                            <p className={`px-[30px] py-[6px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-red-500 hover:opacity-80 duration-300 text-[14px]`}>Logout</p>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutDialog