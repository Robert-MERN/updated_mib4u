import React from 'react'
import Image from 'next/image'
import logo from "../../public/images/mib4u-logo.png";
import IconButton from '@mui/material/IconButton';

const Logo = ({ footer, loader }) => {
  return (
    <IconButton>
      <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`${footer ? "w-[120px] h-[120px]" : "w-[50px] h-[50px] lg:w-[60px] lg:h-[60px]"} ${loader ? "rounded-full" : "rounded-md"} bg-gradient-to-br from-violet-800 to-cyan-900 grid place-items-center hover:opacity-80 transition-all duration-200`} >
        <Image
          alt="Logo"
          src={logo}
          objectFit="contain"
          width={footer ? "80" : "40"}
          height={footer ? "80" : "40"}
        />
      </div>
    </IconButton>
  )
}

export default Logo