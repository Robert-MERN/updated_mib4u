import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/Home.module.css'
import Logo from './utils/Logo';
import useStateContext from '../context/ContextProvider';
import PaypalCheckoutBtn from "./utils/PaypalCheckoutBtn";


const Paypal = ({ close, modalState }) => {
    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "paypal-modal") {
                close("paypal")
            }
        }
        const modal = document.getElementById("paypal-modal")
        modal.addEventListener("click", clickCheck);
        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });
    return (
        <div className={`fixed inset-0 w-screen h-screen z-[16] ${modalState.paypal ? styles.modalOpen : styles.modalOff}`} >
            <div id="paypal-modal" className='relative w-full h-full grid place-items-center' >
                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-[90vw] md:h-auto md:w-[36rem]  rounded-md pb-6 ' >
                    <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
                        <Logo />
                        <div onClick={() => close("paypal")} className='absolute right-[8px]' >
                            <IconButton>
                                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
                            </IconButton>
                        </div>
                    </div>
                    <div>

                        <p className={`text-[14px] font-semibold md:text-[18px] text-zinc-300 pb-2 text-center my-6`}>
                            Now, choose any method to pay
                        </p>
                    </div>
                    <div className='px-[30px]' >
                        <PaypalCheckoutBtn />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paypal