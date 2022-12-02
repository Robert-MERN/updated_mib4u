import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import styles from '../../styles/Home.module.css'
import IconButton from '@mui/material/IconButton';




const EditUser = ({ submitEditUserForm, switchState, user }) => {
    const [editField, setEditField] = useState({
        email: false,
        fullName: false,
        password: false,
    });

    const handleField = (key) => {
        if(!user.googleAuth){
            setEditField(prev => ({ ...prev, [key]: !prev[key] }))
        }
    }


    // Edit user input values
    const [editUserInputData, setEditUserInputData] = useState({});
    const handleInputEditUser = (e) => {
        setEditUserInputData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    }

    useEffect(() => {
        // <----------------reseting all the states back------------------>
        // reseting edituser state
        document.getElementById("editUser").reset();
        setEditUserInputData({});
        // reseting editField state pointer
        setEditField({
            email: false,
            fullName: false,
            password: false,
        });
    }, [switchState])
    return (
        <form id="editUser" onSubmit={(e) => submitEditUserForm(e, editUserInputData)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`w-full lg:w-[40vw] h-full transition-all bg-zinc-800 pt-[40px] pb-[30px] rounded-md ${switchState === "edit" ? styles.modalOpen : styles.modalOff}`} >
            <div>
                <div className='flex flex-col gap-4 py-[10px] px-[20px] md:px-[30px]' >
                    <div className="flex items-center justify-between" >
                        <div className="flex items-center gap-4" >
                            <label className='text-gray-300 text-[14px] font-bold'>Email:</label>
                            <p className='text-14 text-neutral-500 text-[14px] font-semibold   break-words' >{user.email || ""}</p>
                        </div>
                        <Tooltip title={user.googleAuth ? "Can't edit" : "Edit"} arrow placement='right'>
                            <IconButton className='hover:text-blue-500' onClick={() => handleField("email")} >
                                <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <input
                        type="email"
                        autoComplete="false"
                        autoCorrect='false'
                        name="email"
                        onChange={handleInputEditUser}
                        placeholder="Email"
                        className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${editField.email ? styles.modalOpen : styles.modalOff}`}
                    />

                </div>


                <div className='flex flex-col gap-4 border-zinc-700 border-t px-[20px] md:px-[30px] py-[10px]' >
                    <div className="flex items-center justify-between" >
                        <div className="flex items-center gap-4" >
                            <label className='text-gray-300 text-[14px] font-bold'>Full Name:</label>
                            <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{user.fullName || ""}</p>
                        </div>
                        <Tooltip title={user.googleAuth ? "Can't edit" : "Edit"} arrow placement='right' >
                            <IconButton className='hover:text-blue-500' onClick={() => handleField("fullName")} >
                                <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <input
                        name="fullName"
                        autoComplete="false"
                        autoCorrect='false'
                        onChange={handleInputEditUser}
                        className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 mb-3 ${editField.fullName ? styles.modalOpen : styles.modalOff}`}
                        placeholder="Full name"
                        type="text"
                    />
                </div>

                <div className='mb-8 flex flex-col gap-4 border-zinc-700 border-t py-[10px] px-[20px] md:px-[30px]' >
                    <div className="flex items-center justify-between" >
                        <div className="flex items-center gap-4" >
                            <label className='text-gray-300 text-[14px] font-bold'>Password:</label>
                            <p className='text-14 text-neutral-500 text-[14px] font-semibold' >{"**********"}</p>
                        </div>
                        <Tooltip title={user.googleAuth ? "Can't edit" : "Edit"} arrow placement='right' >
                            <IconButton className='hover:text-blue-500' onClick={() => handleField("password")} >
                                <EditIcon className="cursor-pointer hover:text-blue-500 transition-all scale-75 text-gray-300" />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <input
                        type="text"
                        autoComplete="false"
                        autoCorrect='false'
                        name='password'
                        placeholder="Password"
                        onChange={handleInputEditUser}
                        className={`w-full px-[18px] py-[12px] outline-none rounded-md  bg-neutral-600 text-white my-1 border border-transparent focus:border-violet-300 transition-all duration-300 ${editField.password ? styles.modalOpen : styles.modalOff}`}
                    />

                </div>




                <Tooltip title={user.googleAuth ? "You can't update your account because, you have signed up with google" : "Updates your account"} placement='left' >
                    <div className='w-full flex items-center justify-center' >
                        <IconButton
                            type="submit"
                            disabled={Object.values(editUserInputData).some(e => e !== "") && !user.googleAuth ? false : true}
                            className='text-[16px] w-full lg:w-[50%]'
                        >
                            <p className={`px-[80px] py-[8px] rounded-md text-[16px] bg-zinc-600 text-gray-200 my-1 border border-transparent  font-semibold transition-all w-full bg-gradient-to-br from-violet-800 to-cyan-900 hover:opacity-80 duration-300`}>Update</p>
                        </IconButton>
                    </div>
                </Tooltip>
            </div>
        </form>
    )
}

export default EditUser