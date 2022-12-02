import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from "../styles/Home.module.css";
import Search from './utils/Search';
import Link from "next/link";
import useStateContext from '../context/ContextProvider';
import { useRouter } from "next/router"





const MenuSlider = ({ close, open, modalState }) => {
    const { chooseCategory, fetchWork, user, pickCategory, setChooseCategory } = useStateContext()
    const router = useRouter();
    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "menuSlider-modal") {
                close("menuSlider")
            }
        }
        const modal = document.getElementById("menuSlider-modal")
        modal.addEventListener("click", clickCheck);

        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });


    const categoryOptions = [
        {
            name: "All media",
            value: "",
        },
        {
            name: "Digital",
            value: "category=digital&",
        },
        {
            name: "Analouge",
            value: "category=analouge&",
        },
        {
            name: "Best of both worlds",
            value: "category=bestOfBothWorld&",
        },
        {
            name: "Wallpapers",
            value: "category=wallpaper&",
        },
        {
            name: "Graphic designs",
            value: "category=graphicDesign&",
        }
    ];




    const members = [
        "Login",
        "Register",
    ];
    const generals = [
        {
            name: "Home",
            link: "",
        },
        {
            name: "About us",
            link: "about-us",
        },
        {
            name: "Privacy",
            link: "privacy",
        },
        {
            name: "Terms & conditions",
            link: "terms-conditions",
        }
    ];

    // Login/Register
    const pickMembers = (target) => {
        if (target === "login") {
            open("login")
        } else {
            open("register")
        }
        close("menuSlider");
    }
    // About/Privacy/Terms & conditions.
    const pickGeneral = (target) => {
        close("menuSlider");

    }

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
        <div className={`fixed  w-screen h-screen z-[15] transition-all duration-300 ${modalState.menuSlider ? "translate-x-0" : " translate-x-[150%]"}`} >
            <div id="menuSlider-modal" className='relative w-full h-full' >
                <div className={`absolute right-0 overflow-x-auto bg-black px-[30px] py-[60px] md:px-[60px] md:py-[100px] h-screen w-screen md:w-[65vw] ${styles.specifiedScroll}`} >

                    <div className={`fixed z-[2] right-0 top-0 p-4 md:p-6 ${modalState.menuSlider ? "opacity-100" : "opacity-0"} transition-all duration-200 delay-300`} >
                        <IconButton onClick={() => close("menuSlider")}>
                            <CloseIcon className='text-gray-400 scale-[1.8] hover:opacity-75 transition-all' />
                        </IconButton>
                    </div>
                    <div className={`${modalState.menuSlider ? "opacity-100" : "opacity-0"} transition-all duration-200 delay-300`} >
                        <div className='mb-8' >
                            <Search
                                val={searchKeywords}
                                func={handleSearch}
                                trigger={triggerSearch}
                                click={() => close("menuSlider")}
                                slider
                            />

                        </div>
                        <div className='mb-12' >
                            <h1 className='text-[19px] font-bold text-neutral-500 tracking-wide mb-3' >Artworks</h1>

                            {categoryOptions.map((e, ind) => (
                                <p onClick={() => { pickCategory(e.name, e.value); close("menuSlider"); router.push("/"); }} key={ind} className={`text-[19px] font-bold my-2 cursor-pointer ${chooseCategory.name === e.name ? "border-b-gray-100 text-gray-100" : "border-b-transparent select-none text-white"}`} >{e.name}</p>
                            ))
                            }
                        </div>
                        <div className='mb-12' >
                            <h1 className='text-[19px] font-bold text-neutral-500 tracking-wide mb-3' >Members</h1>
                            {user ?
                                <p onClick={() => open("logout")} className='text-white text-[19px] font-bold my-2 cursor-pointer' >Logout</p>
                                :
                                <>
                                    {members.map((e, ind) => (
                                        <p onClick={() => pickMembers(e)} key={ind} className='text-white text-[19px] font-bold my-2 cursor-pointer' >{e}</p>
                                    ))
                                    }
                                </>
                            }
                        </div>

                        <div>
                            <h1 className='text-[19px] font-bold text-neutral-500 tracking-wide mb-3' >General</h1>

                            {generals.map((e, ind) => (
                                <div key={ind}>
                                    <Link href={`/${e.link}`} >
                                        <a onClick={() => pickGeneral(e.name)} className='text-white text-[19px] font-bold my-2 cursor-pointer' >{e.name}</a>
                                    </Link>
                                </div>
                            ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuSlider

