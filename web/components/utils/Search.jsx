import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';




const Search = ({ changeBg, slider, click, trigger, func, val, editWork, navigate }) => {
    const [sizeInc, setsizeInc] = useState(false)
    const sizeControl = (val) => {
        setsizeInc(val)
    }
    const [hoverInput, setHoverInput] = useState(false);
    return (
        <div onMouseOver={() => setHoverInput(true)} onMouseLeave={() => setHoverInput(false)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`${hoverInput ? "bg-neutral-700" : (changeBg ? "bg-zinc-700" : "bg-neutral-700")} px-[6px] ${slider || editWork ? "flex" : "lg:flex hidden"} transition-all duration-300 rounded-md`} >
            <Tooltip title="Search" arrow>
                <IconButton
                    onClick={() => {
                        trigger("search");
                        slider && click();
                    }}
                >
                    <SearchIcon className={`text-gray-300 scale-90`} />
                </IconButton>
            </Tooltip>
            <input
                type="search"
                placeholder='Search...'
                value={val}
                onChange={func}
                autoFocus={true}
                onFocus={() => sizeControl(true)}
                onBlur={() => sizeControl(false)}
                onKeyDown={(e) => {
                    trigger(e);
                }}
                className={`${hoverInput ? "bg-neutral-700" : (changeBg ? "bg-zinc-700" : "bg-neutral-700")} outline-none border-none  text-white caret-gray-400 text-[16px] transition-all duration-300 font-bold ${slider ? "w-full" : (sizeInc ? "w-[20rem]" : "w-[12rem]")} `}
            />
        </div>
    )
}

export default Search