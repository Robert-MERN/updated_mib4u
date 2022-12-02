import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useStateContext from '../context/ContextProvider';




const Filter = ({ close, modalState }) => {

    const { fetchWork } = useStateContext();

    useEffect(() => {
        const clickCheck = (e) => {
            if (e.target.id === "filter-modal") {
                close("filter")
            }
        }
        const modal = document.getElementById("filter-modal")
        modal.addEventListener("click", clickCheck);

        return () => {
            modal.removeEventListener("click", clickCheck);
        }
    });
    const types = ["All", "New", "Sale", "Free"];
    const prices = [
        {
            range: "Under 500€",
            minPrice: "",
            maxPrice: "maxPrice=500&"
        },
        {
            range: "500€ - 1000€",
            minPrice: "minPrice=500&",
            maxPrice: "maxPrice=1000&"
        },
        {
            range: "1000€ - 2000€",
            minPrice: "minPrice=1000&",
            maxPrice: "maxPrice=2000&"
        },
        {
            range: "2000€ - 5000€",
            minPrice: "minPrice=2000&",
            maxPrice: "maxPrice=5000&"
        },
    ];
    const [filterInputData, setFilterInputData] = useState({
        minPrice: "minPrice=&",
        maxPrice: "maxPrice=&",
        type: "type=all&",
    });
    const [selectCircle, setSelectCircle] = useState("")

    const handleInputFilter = (e, target, minPrice, maxPrice) => {
        if (target === "types") {
            setFilterInputData(prev => ({ ...prev, type: `type=${e.toLowerCase()}&` }));

        } else if (target === "price") {
            setFilterInputData(prev => ({ ...prev, minPrice, maxPrice }));
            setSelectCircle(e);

        } else {
            setFilterInputData(prev => ({ ...prev, [e.target.name]: `${e.target.name}=${e.target.value}&` }));
            setSelectCircle("");

        }
    }

    return (
        <div className={`fixed inset-0 w-screen h-screen z-[15] transition-all duration-300 ${modalState.filter ? "translate-x-0" : " -translate-x-full"}`} >
            <div id="filter-modal" className='relative w-full h-full' >
                <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", top: "50%", transform: "translate(-50%, -50%)" }} className='fixed overflow-y-auto left-[10rem] h-[90vh] md:h-[80vh] lg:h-[70vh] bg-black w-[18rem]  rounded-md py-2' >
                    <div className={`flex justify-end w-full px-2 ${modalState.filter ? "opacity-100" : "opacity-0"} transition-all duration-200 delay-300`} >
                        <IconButton onClick={() => close("filter")}>
                            <CloseIcon className='text-gray-200 scale-110 hover:opacity-75 transition-all' />
                        </IconButton>
                    </div>
                    <div className={`px-6 ${modalState.filter ? "opacity-100" : "opacity-0"} transition-all duration-200 delay-300`} >
                        <div className='mb-8' >
                            <h1 className='text-[19px] font-bold text-gray-200 tracking-wide mb-3' >Type</h1>
                            {types.map((e, ind) => (
                                <div
                                    onClick={() => {
                                        handleInputFilter(e, "types");
                                    }}
                                    key={ind}
                                    className='flex items-center gap-2 my-2 cursor-pointer'
                                >
                                    <div className={`w-[12px] h-[12px] rounded-full border border-gray-200 ${filterInputData.type.includes(e.toLowerCase()) ? "bg-gray-200" : ""} transition-all`} ></div>
                                    <p className='text-white text-[14px] font-semibold' >{e}</p>
                                </div>
                            ))
                            }
                        </div>
                        <div className='mb-8' >
                            <h1 className='text-[19px] font-bold text-gray-200 tracking-wide mb-4' >Price</h1>
                            <div className='flex items-center gap-3 justify-between text-white my-4' >
                                <input
                                    onChange={handleInputFilter}
                                    type="number"
                                    name="minPrice"
                                    pattern='^(?:\d{0,5}|.*?\D.*)$'
                                    className='bg-white w-[105px] px-2 py-[8px] text-zinc-900  outline-none rounded-md'
                                    placeholder='Min (€)'
                                />
                                -
                                <input
                                    onChange={handleInputFilter}
                                    type="number"
                                    name="maxPrice"
                                    pattern='^(?:\d{0,5}|.*?\D.*)$'
                                    className='bg-white w-[105px] px-2 py-[8px] text-zinc-900 outline-none rounded-md'
                                    placeholder='Max (€)'
                                />
                            </div>
                            {prices.map((e, ind) => (
                                <div
                                    onClick={() => {
                                        handleInputFilter(e.range, "price", e.minPrice, e.maxPrice);
                                    }}
                                    key={ind}
                                    className='flex items-center gap-2 my-2 cursor-pointer'
                                >
                                    <div className={`w-[10px] h-[10px] rounded-full border border-gray-200 ${selectCircle === e.range ? "bg-gray-200" : ""} transition-all`} ></div>
                                    <p className={`text-white text-[11px] my-1 cursor-pointer`}>{e.range}</p>
                                </div>

                            ))
                            }
                            <IconButton
                                className='text-[16px] mt-4'
                                onClick={() => {
                                    close("filter")
                                    fetchWork(filterInputData);
                                }}
                            >
                                <p className={`px-[20px] py-[6px] text-[13px] rounded-md my-1 border border-transparent transition-all w-full bg-emerald-500 text-white hover:opacity-80 duration-300`}>Apply</p>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter