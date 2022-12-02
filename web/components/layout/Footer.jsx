import React, { useState } from 'react'
import Link from "next/link"
import Logo from '../utils/Logo'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from '../../styles/Home.module.css'


const Footer = () => {
  const icons = [
    {
      icon: <TwitterIcon />,
      name: "icon-2",
      link: "https://twitter.com/MIB4u",
    },
    {
      icon: <InstagramIcon />,
      name: "icon-3",
      link: "https://www.instagram.com/mib4u/",
    },
    {
      icon: <MailIcon />,
      name: "icon-4",
      link: "mailto:mib4u@ymail.com",
    }
  ]
  const [hover, sethover] = useState({
    'icon-1': false,
    'icon-2': false,
    'icon-3': false,
  });
  // hover function
  const hoverIcon = (bool, key) => {
    sethover((prev) => ({ ...prev, [key]: bool }))
  }
  return (
    <div className='border-t-2 border-zinc-700 w-screen py-[30px] px-[80px] mt-[80px]' >

      <div className='  flex flex-col lg:flex-row items-center lg:justify-between gap-12' >
        <Link href="/" >
          <a className='flex flex-col lg:flex-row items-center gap-2 lg:gap-5' >
            <Logo footer />
            <p className='text-white font-bold text-[22px] lg:text-[26px] text-center' >arTrebuch by MIB4u</p>

          </a>
        </Link>
        <div className='flex flex-col lg:flex-row gap-10 items-center' >
          <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-0' >
            <Link href="/terms-conditions" >
              <a className='text-white text-[17px] font-semibold hover:text-violet-500 cursor-pointer transition-all lg:border-r-2 border-zinc-700 px-4 text-center' >Terms & conditions</a>
            </Link>
            <Link href="/privacy" >
              <a className='text-white text-[17px] font-semibold hover:text-violet-500 cursor-pointer transition-all lg:border-r-2 border-zinc-700 px-4 text-center' >Privacy</a>
            </Link>
          </div>

          <div className='flex gap-3 items-center' >
            {/* icons */}
            {
              icons.map((i, index) => (
                <a href={i.link} target="__blank" key={index} onMouseOver={() => hoverIcon(true, i.name)} onMouseLeave={() => hoverIcon(false, i.name)} className={`w-[50px] h-[50px] relative rounded-full bg-glare overflow-hidden cursor-pointer border border-gray-300 ${styles.tapHighlight}`} >
                  <div className={`absolute inset-0 w-full h-full grid place-content-center text-gray-200 transition-all rounded-full duration-[400ms] ${hover[i.name] ? "opacity-0" : "opacity-100"}`} >
                    {i.icon}
                  </div>
                  <div className={`absolute inset-0 w-full h-full grid place-content-center bg-gradient-to-r from-violet-800 to-cyan-900 text-gray-300  transition-all duration-[400ms] rounded-full ${hover[i.name] ? "scale-[1]" : "scale-0"}`} >
                    {i.icon}
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center items-center mt-8 lg:mt-10' >
        <p className='text-gray-400 font-medium text-18 text-center'>
          © Copyright 2022. All Rights Reserved by MIB4u.
        </p>
      </div>
    </div>
  )
}

export default Footer