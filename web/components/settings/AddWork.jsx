import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Logo from "../utils/Logo"
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import styles from '../../styles/Home.module.css'
import useStateContext from '../../context/ContextProvider';



const AddWork = ({ submitWorkForm, switchState }) => {

    // Add work input values
    const [addWorkInputData, setAddWorkInputData] = useState({
        title: "",
        price: "",
        sale: false,
        status: "forSale",
        size: "",
        about: "",
        file: "",
        category: ""
    });
    const handleInputAddWork = (e) => {
        if (e.target.name === "file") {
            setAddWorkInputData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
        } else if (e.target.name === "sale") {
            setAddWorkInputData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
            if (!e.target.checked) {
                const { deletedPrice, ...others } = addWorkInputData;
                setAddWorkInputData({ ...others, sale: false });
            }
        } else {
            setAddWorkInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }
    // focused input valid and invalid
    const [focus, setfocus] = useState({
        title: "false",
        price: "false",
        status: "false",
        size: "false",
        about: "false",
        category: "false",
    });
    const handleFocus = (target) => {
        setfocus(prev => ({ ...prev, [target]: "true" }))
    }

    // <----------------reseting all the states back------------------>


    useEffect(() => {

        // resetting add work state
        document.getElementById("addWork").reset();
        setAddWorkInputData({
            title: "",
            price: "",
            sale: false,
            status: "forSale",
            size: "",
            about: "",
            category: "",
            file: ""
        })
        // reseting focused state
        setfocus({
            title: "false",
            price: "false",
            status: "false",
            size: "false",
            about: "false",
            category: "false"
        })
    }, [switchState]);

    const { sale, ...other } = addWorkInputData;

    return (
        <form id="addWork" onSubmit={(e) => submitWorkForm(e, other)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`w-full lg:w-[40vw] h-full transition-all bg-zinc-800 px-[20px] py-[40px] rounded-md ${switchState === "addWork" ? styles.modalOpen : styles.modalOff}`}>
            <div className='w-full flex flex-col justify-center items-center mb-4' >

                <div className={`${addWorkInputData.file ? styles.modalOff : styles.modalOpen}`} >
                    <Logo footer />
                </div>
                <div className={`${addWorkInputData.file ? styles.modalOpen : styles.modalOff}`}>
                    <Image
                        src={addWorkInputData.file ? URL.createObjectURL(addWorkInputData.file) : "/images/mib4u-logo.png"}
                        alt='Project'
                        width="200"
                        height="200"
                        objectFit='contain'
                    />
                </div>

                <IconButton className='text-[16px]'>
                    <label htmlFor="file" className={`px-[20px] md:px-[80px] py-[8px] rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-emerald-600 hover:opacity-80 duration-300 cursor-pointer text-[16px]`}>Choose image</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleInputAddWork}
                        required
                        className='hidden cursor-pointer'
                    />
                </IconButton>
            </div>
            <div className='flex gap-x-6 md:flex-row flex-col md:justify-between' >

                <div className='mb-2 flex-1' >
                    <label className='text-gray-200 text-[15px] font-bold' >Title</label>
                    <input
                        type="text"
                        placeholder='Title'
                        name="title"
                        onBlur={() => handleFocus("title")}
                        focused={focus.title}
                        onChange={handleInputAddWork}
                        required
                        className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                    />
                    <p className='text-red-400 text-[13px] italic' >Enter the title of your work.</p>
                </div>
                <div className='mb-2 flex-1' >
                    <label className='text-gray-200 text-[15px] font-bold' >Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder='00.00'
                        onBlur={() => handleFocus("price")}
                        focused={focus.price}
                        onChange={handleInputAddWork}
                        required
                        className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                    />
                    <p className='text-red-400 text-[13px] italic' >Enter the price.</p>
                </div>
            </div>

            <div className='flex gap-x-6 md:flex-row flex-col md:justify-between' >

                <div className='mb-2 flex-1' >
                    <label className='text-gray-200 text-[15px] font-bold' >Status</label>
                    <select
                        name="status"
                        onBlur={() => handleFocus("status")}
                        focused={focus.status}
                        onChange={handleInputAddWork}
                        required
                        defaultValue="For sale"
                        className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${styles.specifiedScroll}`}
                    >
                        <option value="For sale">For sale</option>
                        <option value="Not for sale">For sale</option>
                        <option value="Free">Free</option>
                        <option value="Sold">Sold</option>
                    </select>
                    <p className='text-red-400 text-[13px] italic' >Select the status of your work.</p>
                </div>
                <div className='mb-2 flex-1' >
                    <label className='text-gray-200 text-[15px] font-bold' >Size</label>
                    <input
                        type="text"
                        name="size"
                        placeholder='27x27x3.5 inch (w/h/d)'
                        onBlur={() => handleFocus("size")}
                        focused={focus.size}
                        onChange={handleInputAddWork}
                        required
                        className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300`}
                    />
                    <p className='text-red-400 text-[13px] italic' >Enter the image size.</p>
                </div>
            </div>


            <div className='flex gap-x-6 md:flex-row flex-col md:justify-between' >

                <div className='mb-2 flex-1' >
                    <label className='text-gray-200 text-[15px] font-bold' >Deleted price</label>
                    <input
                        type="number"
                        name="deletedPrice"
                        placeholder='00.00'
                        value={addWorkInputData.deletedPrice || ""}
                        disabled={addWorkInputData.sale ? false : true}
                        onBlur={() => handleFocus("deletedPrice")}
                        focused={focus.deletedPrice}
                        onChange={handleInputAddWork}
                        required
                        className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${styles.specifiedScroll} ${addWorkInputData.sale ? "cursor-[text]" : "cursor-[not-allowed]"}`}
                    />
                    <p className='text-red-400 text-[13px] italic' >Enter the sale price.</p>
                    <div>
                        <Switch
                            color="secondary"
                            checked={addWorkInputData.sale}
                            name="sale"
                            onChange={handleInputAddWork}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p className={`text-violet-500 text-[13px] italic ${addWorkInputData.sale ? styles.modalOpen : styles.modalOff}`} >Sale price is on, click on switch to disable it back.</p>
                        <p className={`text-zinc-400 text-[13px] italic ${addWorkInputData.sale ? styles.modalOff : styles.modalOpen}`} >To enable sale price, click on switch.</p>
                    </div>
                </div>

                <div className='mb-2 flex-1' >
                    <label className='text-gray-200 text-[15px] font-bold' >Category</label>
                    <select
                        name="category"
                        onBlur={() => handleFocus("category")}
                        focused={focus.category}
                        onChange={handleInputAddWork}
                        required
                        defaultValue=""
                        className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${styles.specifiedScroll}`}
                    >
                        <option value="" disabled>Select your category</option>
                        <option value="digital">Digital</option>
                        <option value="analouge">Analouge</option>
                        <option value="wallpaper">Wallpaper</option>
                        <option value="bestOfBothWorld">Best of both worlds</option>
                        <option value="graphicDesign">Graphic design</option>
                    </select>
                    <p className='text-red-400 text-[13px] italic' >Select the category of your work.</p>
                </div>

            </div>



            <div className='mb-5' >
                <label className='text-gray-200 text-[15px] font-bold' >About the work</label>
                <textarea
                    placeholder='Tell people about your work...'
                    name="about"
                    onBlur={() => handleFocus("about")}
                    focused={focus.about}
                    onChange={handleInputAddWork}
                    required
                    className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 resize-none h-[100px] ${styles.specifiedScroll}`}
                />
                <p className='text-red-400 text-[13px] italic' >Do mention about your work.</p>
            </div>

            <div className='w-full flex items-center justify-center' >
                <IconButton
                    type='submit'
                    disabled={Object.values(addWorkInputData).every(e => e !== "") ? false : true}
                    className='text-[16px] w-full lg:w-[50%]'
                >
                    <p className={`px-[80px] py-[8px] rounded-md text-[16px]  bg-zinc-600 text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-gradient-to-br from-violet-800 to-cyan-900 hover:opacity-80 duration-300`}>Add work</p>
                </IconButton>
            </div>

        </form>
    )
}

export default AddWork