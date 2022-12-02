import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from '../../styles/Home.module.css'
import Logo from '../utils/Logo';
import useStateContext from '../../context/ContextProvider';


const LogoutDialog = ({ close, modalState }) => {
    const { deleteWork, toUpdateWork } = useStateContext();
    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "deleteWork-modal") {
                close("deleteWork")
            }
        }
        const modal = document.getElementById("deleteWork-modal")
        modal.addEventListener("click", clickCheck);
        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });
    return (
        <div className={`fixed inset-0 w-screen h-screen z-[16] ${modalState.deleteWork ? styles.modalOpen : styles.modalOff}`} >
            <div id="deleteWork-modal" className='relative w-full h-full grid place-items-center' >
                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-[90vw] md:h-auto md:w-[36rem]  rounded-md pb-6 ' >
                    <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
                        <Logo />
                        <div onClick={() => close("deleteWork")} className='absolute right-[8px]' >
                            <IconButton>
                                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
                            </IconButton>
                        </div>
                    </div>
                    <div>

                        <p className={`text-[14px] font-semibold md:text-[18px] text-zinc-300 pb-2 text-center my-6`}>
                            Are you sure, do you want to delete this work?
                        </p>
                    </div>
                    <div className='px-[15px] md:px-[40px] flex justify-between items-center' >
                        <IconButton onClick={() => close("deleteWork")} className='text-[14px]' >
                            <p className={`px-[30px] py-[6px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-zinc-500 hover:opacity-80 duration-300 text-[14px]`}>Cancel</p>
                        </IconButton>
                        <IconButton onClick={() => { deleteWork(toUpdateWork._id || ""); close("deleteWork") }} className='text-[14px]' >
                            <p className={`px-[30px] py-[6px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-red-500 hover:opacity-80 duration-300 text-[14px]`}>Delete</p>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutDialog