import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Logo from './utils/Logo';
import styles from '../styles/Home.module.css'
import useStateContext from '../context/ContextProvider';
import CountryNames from "../utils/data";


const Payment = ({ close, modalState }) => {

    const { blurBgParent, imageSrc, user, submitPaymentForm } = useStateContext();

    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "payment-modal") {
                close("payment")
            }
        }
        const modal = document.getElementById("payment-modal")
        modal.addEventListener("click", clickCheck);
        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });


    const [paymentInputData, setPaymentInputData] = useState({
        phoneNo: "",
        zipCode: "",
        houseNo: "",
        street: "",
        city: "",
        country: "",
    });
    const handleInputPayment = (e) => {
        setPaymentInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    }

    const [focus, setfocus] = useState({
        phoneNo: "",
        zipCode: "",
        houseNo: "",
        street: "",
        city: "",
        country: "",
    });
    const handleFocus = (target) => {
        setfocus(prev => ({ ...prev, [target]: "true" }))
    }

    // resetting all the states back
    useEffect(() => {
        document.getElementById("payment-form").reset();
        // resetting message input data
        setPaymentInputData({
            phoneNo: "",
            zipCode: "",
            houseNo: "",
            street: "",
            city: "",
            country: "",
        })
        // resetting focused inputs
        setfocus({
            phoneNo: "false",
            zipCode: "false",
            houseNo: "false",
            street: "false",
            city: "false",
            country: "false",
        })
    }, [modalState.message])
    return (
        <div className={`fixed inset-0 w-screen h-screen z-[16] ${blurBgParent ? "blur-[8px]" : ""} ${modalState.payment ? styles.modalOpen : styles.modalOff}`} >
            <div id="payment-modal" className='relative w-full h-full grid place-items-center' >
                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-screen h-screen md:h-auto md:w-[45rem]  rounded-md pb-6 ' >
                    <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
                        <Logo />
                        <div onClick={() => close("payment")} className='absolute right-[8px]' >
                            <IconButton>
                                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
                            </IconButton>
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => submitPaymentForm(e,
                            {
                                name: user.fullName,
                                userId: user._id,
                                workId: imageSrc._id,
                                price: imageSrc.price,
                                ...paymentInputData,
                            }
                        )}
                        id="payment-form"
                        className={`px-[2rem] md:px-[3.5rem] max-h-[75vh] overflow-y-auto ${styles.specifiedScroll}`}
                    >
                        <h1 className='text-center text-[24px] font-bold text-gray-200 my-4' >We are almost here!</h1>
                        <p className='text-zinc-400 text-[16px] text-center mb-6' >To confirm your purchase, we need a few final details from you once.</p>
                        <div className='mb-2' >
                            <label className='text-gray-200 text-[14px]' >Phone number</label>
                            <input
                                type="tel"
                                name="phoneNo"
                                onBlur={() => handleFocus("phoneNo")}
                                focused={focus.phoneNo}
                                onChange={handleInputPayment}
                                required
                                className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                            />
                            <p className='text-red-400 text-[13px] italic' >Enter your phone number.</p>
                        </div>
                        <div className='flex gap-x-6 md:flex-row flex-col md:justify-between' >

                            <div className='mb-2 flex-1' >
                                <label className='text-gray-200 text-[14px]' >Zip code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    onBlur={() => handleFocus("zipCode")}
                                    focused={focus.zipCode}
                                    onChange={handleInputPayment}
                                    required
                                    className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                                />
                                <p className='text-red-400 text-[13px] italic' >Enter your zip code.</p>
                            </div>
                            <div className='mb-2 flex-1' >
                                <label className='text-gray-200 text-[14px]' >House number</label>
                                <input
                                    type="text"
                                    name="houseNo"
                                    onBlur={() => handleFocus("houseNo")}
                                    focused={focus.houseNo}
                                    onChange={handleInputPayment}
                                    required
                                    className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                                />
                                <p className='text-red-400 text-[13px] italic' >Enter your house number.</p>
                            </div>
                        </div>
                        <div className='flex gap-x-6 md:flex-row flex-col md:justify-between' >

                            <div className='mb-2 flex-1' >
                                <label className='text-gray-200 text-[14px]' >Street</label>
                                <input
                                    type="text"
                                    name="street"
                                    onBlur={() => handleFocus("street")}
                                    focused={focus.street}
                                    onChange={handleInputPayment}
                                    required
                                    className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                                />
                                <p className='text-red-400 text-[13px] italic' >Enter your street.</p>
                            </div>
                            <div className='mb-5 flex-1' >
                                <label className='text-gray-200 text-[14px]' >City name</label>
                                <input
                                    type="text"
                                    name="city"
                                    onBlur={() => handleFocus("city")}
                                    focused={focus.city}
                                    onChange={handleInputPayment}
                                    required
                                    className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                                />
                                <p className='text-red-400 text-[13px] italic' >Enter your city Name.</p>
                            </div>
                        </div>

                        <div className='mb-2' >
                            <label className='text-gray-200 text-[14px]' >Country</label>
                            <select
                                name="country"
                                defaultValue=""
                                onBlur={() => handleFocus("country")}
                                focused={focus.country}
                                onChange={handleInputPayment}
                                required
                                className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${styles.specifiedScroll}`}
                            >
                                <option disabled value="">Country</option>
                                {CountryNames.map((e, index) => (
                                    <option key={index} value={e}>{e}</option>
                                ))
                                }
                            </select>
                            <p className='text-red-400 text-[13px] italic' >Select a country.</p>
                        </div>

                        <p className='text-neutral-300 font-bold text-[24px]' >€ {imageSrc.price},-</p>

                        <div className='w-full flex items-center justify-center' >

                            <IconButton type="submit" className='text-[16px] w-full' >
                                <p className={`px-[80px] py-[8px] rounded-md  bg-zinc-600 text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full text-[16px] bg-gradient-to-r from-violet-800 to-cyan-900 hover:opacity-80 duration-300`}>Buy</p>
                            </IconButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment