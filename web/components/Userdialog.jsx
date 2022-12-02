import React, { useEffect, useRef } from 'react'
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import useStateContext from '../context/ContextProvider';
const Userdialog = () => {
    const { modalState, closeModal, openModal, user } = useStateContext();

    const router = useRouter()
    const action = (location) => {
        if (location !== "logout") {
            router.push(location)
        } else {
            openModal("logout")
        }
        closeModal("userDialog");
    }

    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className={`fixed lg:right-[20px] right-[50px] bg-zinc-700 rounded-md w-[145px] h-fit z-[15] text-[16px] px-[15px] py-[5px] ${modalState.userDialog ? styles.userDialogOpen : styles.modalOff}`} >
            <p className={`text-gray-200 font-bold py-[10px] text-[13px] overflow-hidden whitespace-nowrap text-ellipsis mb-[5px] ${styles.tapHighlight}`} >{user.fullName}</p>
            <p onClick={() => action("/my-account")} className={`py-[10px] border-y border-zinc-600 text-[14px] font-bold text-neutral-400 cursor-pointer hover:text-violet-500 transition-all ${styles.tapHighlight}`} >My account</p>

            <p onClick={() => action("/about-us")} className={`py-[10px] border-b border-zinc-600 text-[14px] font-bold text-neutral-400 cursor-pointer hover:text-violet-500 transition-all ${styles.tapHighlight}`} >About</p>

            <p onClick={() => action("logout")} className={`py-[10px] text-[14px] font-bold text-neutral-400 cursor-pointer hover:text-violet-500 transition-all ${styles.tapHighlight}`} >Logout</p>
        </div>
    )
}

export default Userdialog