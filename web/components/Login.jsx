import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Logo from './utils/Logo';
import styles from '../styles/Home.module.css'
import useStateContext from '../context/ContextProvider';
import Link from "next/link";
import GoogleIcon from '@mui/icons-material/Google';



const Login = ({ open, close, modalState }) => {

  const { submitLoginForm, loading, blurBgParent } = useStateContext();

  // Login input values
  const [loginInputData, setLoginInputData] = useState({
    email: "",
    password: ""
  });
  const handleInputLogin = (e) => {
    setLoginInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const [focus, setfocus] = useState({
    email: "false",
    password: "false",
  });
  const handleFocus = (target) => {
    setfocus(prev => ({ ...prev, [target]: "true" }))
  }

  // resetting all the states back
  const allClosed = () => {
    close("login");
    // resetting login input data
    document.getElementById("login-form").reset();
    setLoginInputData({
      email: "",
      password: ""
    })
    // resetting focused inputs
    setfocus({
      email: "false",
      password: "false",
    })
  }

  // click prevent
  useEffect(() => {
    const clickCheck = (e) => {
      if (e.target.id === "login-modal") {
        allClosed()
      }
    }
    const modal = document.getElementById("login-modal")
    modal.addEventListener("click", clickCheck);

    return () => {
      modal.removeEventListener("click", clickCheck);
    }
  });


  return (
    <div className={`fixed inset-0 w-screen h-screen z-[16] ${blurBgParent ? "blur-[8px]" : ""} ${modalState.login ? styles.modalOpen : styles.modalOff}`} >
      <div id="login-modal" className='relative w-full h-full grid place-items-center' >
        <form id="login-form" onSubmit={(e) => submitLoginForm(e, loginInputData)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='fixed  bg-zinc-800 w-screen h-screen md:h-auto md:w-[28rem]  rounded-md pb-6 ' >
          <div className='flex items-center justify-center w-full border-b border-zinc-700 px-2 relative py-1' >
            <Logo />
            <div onClick={allClosed} className='absolute right-[8px]' >
              <IconButton>
                <CloseIcon className='text-gray-300 scale-[1.35] hover:opacity-75 transition-all' />
              </IconButton>
            </div>
          </div>

          <div className={`px-[2rem] md:px-[3.5rem] max-h-[75vh] overflow-y-auto ${styles.specifiedScroll}`} >
            <h1 className='text-center text-[24px] font-bold text-gray-200 my-8' >Login</h1>
            <div className='mb-5' >
              <label className='text-gray-200 text-[14px]' >Email address</label>
              <input
                type="email"
                name="email"
                value={loginInputData.email}
                onBlur={() => handleFocus("email")}
                focused={focus.email}
                onChange={handleInputLogin}
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
                value={loginInputData.password}
                onBlur={() => handleFocus("password")}
                focused={focus.password}
                onChange={handleInputLogin}
                required
                className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-zinc-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
              />
              <p className='text-red-400 text-[13px] italic' >Enter your password.</p>
            </div>
            <div className={``} >
              <IconButton type="submit" className='w-full' >
                <p className={`w-full py-[12px] outline-none rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all bg-gradient-to-r from-violet-800 to-cyan-900 hover:opacity-80 duration-300 text-[16px]`}>Sign In</p>
              </IconButton>
            </div>
            <div className='w-full flex justify-center items-center' >

              <IconButton onClick={() => { open("register") }} >
                <p className='border-b border-zinc-400 text-gray-200 text-[14px] hover:text-violet-300 transition-all' >
                  Register
                </p>
              </IconButton>

            </div>
            <Link href="/api/google" >
              <IconButton onClick={() => { close("login") }} className='w-full' >
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

export default Login