import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import styles from '../../styles/Home.module.css'
import IconButton from '@mui/material/IconButton';
import Search from "../utils/Search";
import Image from 'next/image';




const EditWork = ({ submitEditUserForm, switchState, open, findOneWork, toUpdateWork, updateWork }) => {
    const [editField, setEditField] = useState({
        title: false,
        price: false,
        deletedPrice: false,
        status: false,
        size: false,
        about: false,
        file: false,
        category: false
    });

    const handleField = (key) => {
        setEditField(prev => ({ ...prev, [key]: !prev[key] }))
    }


    // Edit user input values
    const [editWorkInputData, setEditWorkInputData] = useState({});
    const handleInputEditUser = (e) => {
        if (e.target.name === "file") {
            setEditWorkInputData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
        } else {
            setEditWorkInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    // search work function
    const [searchKeywords, setSearchKeywords] = useState("");
    const handleSearch = (e) => {
        setSearchKeywords(e.target.value);
    }
    const triggerSearch = (e) => {
        if (e.code === "Enter" && searchKeywords) {
            findOneWork(searchKeywords);
        } else if (e === "search" && searchKeywords) {
            findOneWork(searchKeywords);
        }
    }

    useEffect(() => {
        // <----------------reseting all the states back------------------>
        // reseting edituser state
        document.getElementById("editWorkForm").reset();
        setEditWorkInputData({});
        // reseting editField state pointer
        setEditField({
            title: false,
            price: false,
            deletedPrice: false,
            status: false,
            size: false,
            about: false,
            file: false,
            category: false
        });
    }, [switchState])
    return (
        <form id='editWorkForm' onSubmit={(e) => updateWork(e, editWorkInputData)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`w-full lg:w-[40vw] h-full transition-all bg-zinc-800 pt-[40px] pb-[30px] rounded-md ${switchState === "editWork" ? styles.modalOpen : styles.modalOff}`} >
            <div className='mb-8' >
                <div className='w-full flex justify-center items-center mb-4' >
                    <Search
                        val={searchKeywords}
                        func={handleSearch}
                        trigger={triggerSearch}
                        editWork
                    />
                </div>
                <p className='text-zinc-400 text-[16px] md:text-[18px] font-bold text-center px-[10px]'>Paste the ID of your work, in order to update or delete it.</p>
                <div className='w-full flex items-center justify-center' >
                    <IconButton
                        className='text-[16px]'
                        onClick={() => triggerSearch("search")}
                    >
                        <p className={`px-[25px] py-[8px] rounded-md  bg-zinc-600 text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-gradient-to-br from-violet-800 to-cyan-900 hover:opacity-80 duration-300 text-[16px]`}>Search</p>
                    </IconButton>
                </div>
            </div>
            {toUpdateWork &&
                <div className='w-full flex justify-center items-center' >
                    <div className={` ${toUpdateWork.image ? styles.modalOpen : styles.modalOff}`}>
                        <Image
                            src={toUpdateWork.image || "/images/mib4u-logo.png"}
                            alt='Project'
                            width="200"
                            height="200"
                            objectFit='contain'
                        />
                    </div>
                </div>
            }



            {toUpdateWork &&
                <div>
                    <div className='flex flex-col gap-4 py-[10px] px-[20px] md:px-[30px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Image:</label>
                                <a href={toUpdateWork.image} target="__blank" className='text-14 text-neutral-500 text-[14px] font-semibold w-[10rem] md:w-[25rem] hover:underline whitespace-nowrap overflow-hidden text-ellipsis' >{toUpdateWork.image || ""}</a>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("file")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <div className={` ${editField.file ? styles.modalOpen : styles.modalOff}`}>
                            <div className={`w-full flex flex-col justify-center items-center mb-4`} >
                                {editWorkInputData.file &&

                                    <Image
                                        src={URL.createObjectURL(editWorkInputData.file) || "/images/mib4u-logo.png"}
                                        alt='Project'
                                        width="200"
                                        height="200"
                                        objectFit='contain'
                                    />

                                }
                                <IconButton className='text-[16px]'>
                                    <label htmlFor="updatedFile" className={`px-[20px] md:px-[80px] py-[8px] text-[16px] rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-emerald-600 hover:opacity-80 duration-300 cursor-pointer`}>Choose image</label>
                                    <input
                                        type="file"
                                        id="updatedFile"
                                        name="file"
                                        onChange={handleInputEditUser}
                                        className='hidden cursor-pointer'
                                    />
                                </IconButton>
                            </div>
                        </div>

                    </div>


                    <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Title:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.title || ""}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("title")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <input
                            name="title"
                            type="text"
                            placeholder="Title"
                            autoComplete="false"
                            autoCorrect='false'
                            onChange={handleInputEditUser}
                            className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 mb-3 ${editField.title ? styles.modalOpen : styles.modalOff}`}
                        />
                    </div>

                    <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Price:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.price || ""}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("price")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <input
                            type="number"
                            name='price'
                            placeholder="00.00"
                            onChange={handleInputEditUser}
                            className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${editField.price ? styles.modalOpen : styles.modalOff}`}
                        />

                    </div>


                    <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Deleted price:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.deletedPrice || "No sale price"}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("deletedPrice")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <input
                            type="number"
                            name='deletedPrice'
                            placeholder="00.00"
                            onChange={handleInputEditUser}
                            className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${editField.deletedPrice ? styles.modalOpen : styles.modalOff}`}
                        />

                    </div>


                    <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Status:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.status || ""}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("status")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <select
                            name="status"
                            onChange={handleInputEditUser}
                            defaultValue="For sale"
                            className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${styles.specifiedScroll} ${editField.status ? styles.modalOpen : styles.modalOff}`}
                        >
                            <option value="For sale">For sale</option>
                            <option value="Not for sale">For sale</option>
                            <option value="Free">Free</option>
                            <option value="Sold">Sold</option>
                        </select>


                    </div>



                    <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Category:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.category || ""}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("category")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <select
                            name="category"
                            defaultValue=""
                            onChange={handleInputEditUser}
                            className={`w-full px-[18px] py-[8px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${styles.specifiedScroll} ${editField.category ? styles.modalOpen : styles.modalOff}`}
                        >
                            <option value="" disabled>Select your category</option>
                            <option value="digital">Digital</option>
                            <option value="analouge">Analouge</option>
                            <option value="wallpaper">Wallpaper</option>
                            <option value="bestOfBothWorld">Best of both worlds</option>
                            <option value="graphicDesign">Graphic design</option>
                        </select>


                    </div>



                    <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-center justify-between" >
                            <div className="flex items-center gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>Size:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.size || ""}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("size")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            autoComplete="false"
                            autoCorrect='false'
                            name='size'
                            placeholder="27x27x3.5 inch (w/h/d)"
                            onChange={handleInputEditUser}
                            className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${editField.size ? styles.modalOpen : styles.modalOff}`}
                        />

                    </div>


                    <div className='mb-8 flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                        <div className="flex items-start justify-between" >
                            <div className="flex gap-4" >
                                <label className='text-gray-300 text-[14px] font-bold'>About:</label>
                                <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{toUpdateWork.about || ""}</p>
                            </div>
                            <Tooltip title="Edit" arrow >
                                <IconButton className='hover:text-blue-500' onClick={() => handleField("about")} >
                                    <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <textarea
                            name="about"
                            placeholder='About your work...'
                            onChange={handleInputEditUser}
                            className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 resize-none h-[100px] ${styles.specifiedScroll} ${editField.about ? styles.modalOpen : styles.modalOff}`}
                        />

                    </div>



                    <div className='w-full flex-col md:flex-row md:justify-between flex items-center justify-center md:px-[20px]' >
                        <IconButton
                            type="submit"
                            disabled={Object.values(editWorkInputData).some(e => e !== "") ? false : true}
                            className='text-[16px]'
                        >
                            <p className={`py-[8px] md:px-[100px] rounded-md  bg-zinc-600 text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-gradient-to-br text-[16px] from-violet-800 to-cyan-900 hover:opacity-80 duration-300`}>Update</p>
                        </IconButton>
                        <IconButton
                            className='text-[16px]'
                            onClick={() => open("deleteWork")}
                        >
                            <p className={`py-[8px] md:px-[100px] rounded-md text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-red-500 hover:opacity-80 duration-300 text-[16px]`}>Delete</p>
                        </IconButton>
                    </div>
                </div>
            }
        </form>
    )
}

export default EditWork