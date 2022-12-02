import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Logo from './utils/Logo';
import styles from '../styles/Home.module.css'
import useStateContext from '../context/ContextProvider';


const Message = ({ close, modalState }) => {
    const { submitMessageForm, loading, blurBgParent, imageSrc } = useStateContext();


    const [messageInputData, setMessageInputData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const handleInputMessage = (e) => {
        setMessageInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const [focus, setfocus] = useState({
        name: "false",
        email: "false",
        message: "false",
    });
    const handleFocus = (target) => {
        setfocus(prev => ({ ...prev, [target]: "true" }))
    }


    // resetting all the states back
    useEffect(() => {
        document.getElementById("message-form").reset();
        // resetting message input data
        setMessageInputData({
            name: "",
            email: "",
            message: ""
        })
        // resetting focused inputs
        setfocus({
            name: "false",
            email: "false",
            message: "false",
        })
    }, [modalState.message])
    const allClosed = () => {
        close("message");
    }

    //   click prevent
    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "message-modal") {
                allClosed();
            }
        }
        const modal = document.getElementById("message-modal")
        modal.addEventListener("click", clickCheck);
        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });
    return (
        <div className={`fixed inset-0 w-screen h-screen z-[16] ${blurBgParent ? "blur-[8px]" : ""} ${modalState.message ? styles.modalOpen : styles.modalOff}`} >
            <div id="message-modal" className='relative w-full h-full grid place-items-center' >
                <form
                    id="message-form"
                    onSubmit={(e) => submitMessageForm(e, {
                        title: imageSrc.title,
                        workId: imageSrc._id,
                        price: imageSrc.price,
                        ...messageInputData,
                    }
                    )}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-screen h-screen md:h-auto md:w-[45rem]  rounded-md pb-6 '
                >
                    <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
                        <Logo />
                        <div onClick={allClosed} className='absolute right-[8px]' >
                            <IconButton>
                                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
                            </IconButton>
                        </div>
                    </div>

                    <div className={`px-[2rem] md:px-[3.5rem] max-h-[75vh] overflow-y-auto ${styles.specifiedScroll}`} >
                        <h1 className='text-center text-[24px] font-bold text-gray-200 my-8' >Message</h1>
                        <p className='text-zinc-400 text-[16px] text-center mb-8' >The more information you share, the more likely you&apos;ll get a response</p>
                        <div className='flex md:flex-row flex-col md:justify-between' >

                            <div className='mb-5' >
                                <label className='text-gray-200 text-[14px]' >Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={messageInputData.name}
                                    onBlur={() => handleFocus("name")}
                                    focused={focus.name}
                                    onChange={handleInputMessage}
                                    required
                                    className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                                />
                                <p className='text-red-400 text-[13px] italic' >Enter your name.</p>
                            </div>
                            <div className='mb-5' >
                                <label className='text-gray-200 text-[14px]' >Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={messageInputData.email}
                                    onBlur={() => handleFocus("email")}
                                    focused={focus.email}
                                    onChange={handleInputMessage}
                                    required
                                    className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                                />
                                <p className='text-red-400 text-[13px] italic' >Enter your e-mail address.</p>
                            </div>
                        </div>

                        <div className='mb-5' >
                            <label className='text-gray-200 text-[14px]' >Message</label>
                            <textarea
                                name="message"
                                onBlur={() => handleFocus("message")}
                                value={messageInputData.message}
                                focused={focus.message}
                                onChange={handleInputMessage}
                                required
                                className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 resize-none h-[100px] ${styles.specifiedScroll}`}
                            />
                            <p className='text-red-400 text-[13px] italic' >Type message.</p>
                        </div>
                        <div className='w-full flex items-center justify-center' >
                            <IconButton
                                type="submit"
                                disabled={Object.values(messageInputData).every(e => e !== "") ? false : true}
                                className='text-[16px]'
                            >
                                <p className={`px-[80px] py-[12px] outline-none rounded-md  bg-zinc-600 text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-gradient-to-r from-violet-800 to-cyan-900 hover:opacity-80 duration-300 text-[16px]`}>Send a message</p>
                            </IconButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Message
