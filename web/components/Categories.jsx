import React, { useEffect } from 'react'
import { FiFilter } from "react-icons/fi"
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import styles from '../styles/Home.module.css'
import useStateContext from "../context/ContextProvider";


const Categories = () => {
    const { openModal, chooseCategory, pickCategory } = useStateContext();

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





    return (
        <div className='flex items-center w-full gap-3 lg:gap-6 pr-2' >
            <Tooltip title="Filter" arrow>
                <IconButton onClick={() => openModal("filter")} >
                    <p style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`flex text-gray-200 items-center gap-2 text-[15px] lg:text-[17px] bg-zinc-800 px-[20px] py-[12px] rounded-md hover:bg-zinc-700 transition-all duration-300 hover:text-gray-100 font-semibold`} >
                        <FiFilter className='text-[19px]' />
                        Filter
                    </p>
                </IconButton>
            </Tooltip>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`flex flex-1 gap-4 lg:justify-between lg:gap-0 items-center text-[15px] lg:text-[17px] bg-zinc-800 px-[20px] py-[12px] rounded-md hover:text-gray-100  overflow-x-auto ${styles.optionScroll} transition-all duration-300`} >
                {categoryOptions.map((e, ind) => (
                    <Tooltip key={ind} title={e.name} arrow>
                        <button id={e.name} onClick={() => pickCategory(e.name, e.value)} className={`lg:mx-4 mr-4 hover:text-gray-100 font-semibold transition-all duration-300 whitespace-nowrap border-b-[3px] border-transparent ${chooseCategory.name === e.name ? "border-b-gray-100 text-gray-100" : "border-b-transparent select-none text-gray-500"} ${styles.tapHighlight}`} >{e.name}</button>
                    </Tooltip>
                ))
                }

            </div>
        </div>
    )
}

export default Categories