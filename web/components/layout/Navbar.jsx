import React, { useState, useRef, useEffect } from 'react'
import Logo from "../utils/Logo";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchBar from "../utils/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useStateContext from "../../context/ContextProvider";
import Userdialog from '../Userdialog';
import Link from "next/link"
import { useRouter } from "next/router"





const Navbar = ({ navBg }) => {
  const { openModal, modalState, closeModal, toggleModal, blurBg, blurBgExtra, blurBgParent, fetchWork, user, setChooseCategory } = useStateContext();
  const dialogRef = useRef();
  const router = useRouter();


  useEffect(() => {
    const clickCheck = (e) => {
      if (modalState.userDialog) {
        if (!dialogRef.current.contains(e.target)) {
          closeModal("userDialog")
        }
      }
    }
    document.addEventListener("click", clickCheck);

    return () => {
      document.removeEventListener("click", clickCheck);
    }
  });

  // search work function
  const [searchKeywords, setSearchKeywords] = useState("");
  const handleSearch = (e) => {
    setSearchKeywords(e.target.value);
  }
  const triggerSearch = (e) => {
    if (e.code === "Enter" && searchKeywords) {
      fetchWork("", { keywords: `keywords=${searchKeywords}&` });
      router.push("/");
      setChooseCategory({
        name: "All media",
        value: "",
    })
    } else if (e === "search" && searchKeywords) {
      fetchWork("", { keywords: `keywords=${searchKeywords}&` });
      router.push("/");
      setChooseCategory({
        name: "All media",
        value: "",
    })
    }
  }
  return (
    <div style={{ boxShadow: `${navBg ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none"}` }} className={`fixed top-0 w-screen h-[70px] lg:h-[100px]  ${navBg ? "bg-navbar" : "bg-zinc-900"} ${blurBgExtra || blurBgParent ? "blur-[8px] opacity-30" : (blurBg ? "blur-[7px] opacity-40" : "blur-none opacity-100")} transition-all duration-300 flex justify-between items-center lg:px-[10px]  z-[10]`} >
      <div className='flex items-center lg:gap-12 gap-0' >
        <Link href="/" >
          <a className={`flex md:gap-2 items-center`} >
            <Logo />
            <IconButton >
              <p className='text-white font-bold text-[16px] md:text-[20px] lg:text-[22px]' >MIB4u</p>
            </IconButton>
          </a>
        </Link>
        <div>
          <SearchBar
            val={searchKeywords}
            func={handleSearch}
            trigger={triggerSearch}
            changeBg={navBg}
          />
        </div>
      </div>
      <div className={`flex gap-0 md:gap-3 items-center`} >
        <Tooltip title="Home" arrow>
          <IconButton>
            <Link href="/" >
              <a className={`text-white text-[17px] font-semibold hover:text-violet-500 cursor-pointer transition-all lg:block hidden`} >Home</a>
            </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title="About" arrow>
          <IconButton>
            <Link href="/about-us" >
              <a className={`text-white text-[17px] font-semibold hover:text-violet-500 cursor-pointer transition-all lg:block hidden`} >About</a>
            </Link>
          </IconButton>
        </Tooltip>
        <div className='lg:hidden block' >
          <Tooltip title="Search" arrow>
            <IconButton onClick={() => openModal("menuSlider")} >
              <SearchIcon className={`text-gray-300 hover:text-pink-500 transition-all duration-200 md:scale-110`} />
            </IconButton>
          </Tooltip>
        </div>
        {user ?
          <>
            <Tooltip title="Favorites" arrow>
              <Link href="/favorites" >
                <IconButton className='hover:text-red-500' >
                  <FavoriteBorderIcon className={`text-rose-400 hover:text-red-500 transition-all duration-300 md:scale-125`} />
                </IconButton>
              </Link>
            </Tooltip>
            <div ref={dialogRef} className='relative' >
              <IconButton onClick={() => toggleModal("userDialog")} className='flex items-center hover:text-blue-500 transition-all duration-300 md:scale-125' >
                <AccountCircleIcon className='text-blue-300 hover:text-blue-500 ' />
              </IconButton>
              <Userdialog modalState={modalState} />
            </div>
          </>
          :
          <>
            <Tooltip title="Login" arrow>
              <IconButton onClick={() => openModal("login")} >
                <p style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`text-white text-[14px] md:text-[17px] font-semibold px-[13px] md:px-[30px] py-[6px] md:py-[7px] cursor-pointer transition-all bg-gradient-to-r from-violet-800 to-cyan-900 hover:opacity-80 duration-300 rounded-md`}>Login</p>
              </IconButton>
            </Tooltip>
            <div className='lg:block hidden' >
              <Tooltip title="Register" arrow>
                <IconButton onClick={() => openModal("register")} >
                  <p className={`text-pink-500  text-[17px] font-semibold hover:text-white cursor-pointer transition-all duration-300
            hover:bg-glare px-[20px] py-[7px] rounded-md`}>Register</p>
                </IconButton>
              </Tooltip>
            </div>
          </>
        }
        <div className='lg:hidden block' >
          <Tooltip title="Menu" arrow>
            <IconButton onClick={() => openModal("menuSlider")} >
              <MenuIcon className='text-gray-300 hover:text-pink-500 transition-all duration-200  md:scale-125' />
            </IconButton>
          </Tooltip>
        </div>
      </div>

    </div>
  )
}

export default Navbar