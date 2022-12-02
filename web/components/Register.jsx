import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Logo from './utils/Logo';
import styles from '../styles/Home.module.css'
import useStateContext from '../context/ContextProvider';
import Link from "next/link";
import GoogleIcon from '@mui/icons-material/Google';





const Register = ({ open, close, modalState }) => {
  const { submitRegisterForm, loading, blurBgParent } = useStateContext();

  // Register input values
  const [registerInputData, setRegisterInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleInputRegister = (e) => {
    setRegisterInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  }
  const [focus, setfocus] = useState({
    fullName: "false",
    email: "false",
    password: "false",
  });
  const handleFocus = (target) => {
    setfocus(prev => ({ ...prev, [target]: "true" }))
  }


  // resetting all the states back
  const allClosed = () => {
    close("register");
    document.getElementById("register-form").reset();
    // resetting register input data
    setRegisterInputData({
      fullName: "",
      email: "",
      password: ""
    })
    // resetting focused inputs
    setfocus({
      fullName: "false",
      email: "false",
      password: "false",
    })
  }
  // click prevent
  useEffect(() => {
    const clickCheck = (e) => {
      if (e.target.id === "register-modal") {
        allClosed();
      }
    }
    const modal = document.getElementById("register-modal")
    modal.addEventListener("click", clickCheck);

    return () => {
      modal.removeEventListener("click", clickCheck);
    }
  });

  return (
    <div className={`fixed inset-0 w-screen h-screen z-[16] ${blurBgParent ? "blur-[8px]" : ""} ${modalState.register ? styles.modalOpen : styles.modalOff}`} >
      <div id="register-modal" className='relative w-full h-full grid place-items-center' >
        <form id="register-form" onSubmit={(e) => submitRegisterForm(e, registerInputData)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-screen h-screen md:h-auto md:w-[28rem] rounded-md pb-6 ' >
          <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
            <Logo />
            <div onClick={allClosed} className='absolute right-[8px]' >
              <IconButton>
                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
              </IconButton>
            </div>
          </div>

          <div className={`px-[2rem] md:px-[3.5rem] max-h-[75vh] overflow-y-auto ${styles.specifiedScroll}`} >
            <h1 className='text-center text-[24px] font-bold text-gray-200 mt-8 mb-4' >Register</h1>
            <p className='text-zinc-400 text-[16px] text-center mb-8' >Become part of our community and experience the unlimited possibilities of <span className='font-bold text-zinc-300' > Online Gallery!</span></p>
            <div className='mb-5' >
              <label className='text-gray-200 text-[14px]' >Full name</label>
              <input
                type="text"
                name="fullName"
                value={registerInputData.fullName}
                onBlur={() => handleFocus("fullName")}
                focused={focus.fullName}
                onChange={handleInputRegister}
                required
                className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
              />
              <p className='text-red-400 text-[13px] italic' >Enter your full name.</p>
            </div>
            <div className='mb-5' >
              <label className='text-gray-200 text-[14px]' >Email address</label>
              <input
                type="email"
                name="email"
                value={registerInputData.email}
                onBlur={() => handleFocus("email")}
                focused={focus.email}
                onChange={handleInputRegister}
                required
                className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
              />
              <p className='text-red-400 text-[13px] italic' >Enter your e-mail address.</p>
            </div>
            <div className='mb-5' >
              <label className='text-gray-200 text-[14px]' >Password</label>
              <input
                type="password"
                name="password"
                value={registerInputData.password}
                onBlur={() => handleFocus("password")}
                focused={focus.password}
                onChange={handleInputRegister}
                required
                className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
              />
              <p className='text-red-400 text-[13px] italic' >Enter your password.</p>
            </div>
            <IconButton
              type="submit"
              disabled={Object.values(registerInputData).every(e => e !== "") ? false : true}
              className='w-full text-[16px]'
            >
              <p className={`w-full py-[12px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-gradient-to-r from-violet-800 to-cyan-900 hover:opacity-80 duration-300 text-[16px]`}>Register</p>
            </IconButton>
            <div className='w-full flex justify-center items-center' >
              <IconButton onClick={() => open("login")} >
                <p className='border-b border-zinc-400 text-gray-200 text-[14px] hover:text-violet-300 transition-all' >
                  Login
                </p>
              </IconButton>
            </div>
            <Link href="/api/google" >
              <IconButton onClick={() => close("register")} className='w-full text-[16px]' >
              <p className={`w-full flex gap-2 justify-center py-[12px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-red-500 hover:opacity-80 duration-300 text-[16px]`}>
                  <GoogleIcon className='text-gray-200'  />
                  Google
                  </p>
              </IconButton>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register