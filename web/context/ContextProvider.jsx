import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const modalValues = {
        filter: false,
        login: false,
        logout: false,
        register: false,
        pictureMenu: false,
        message: false,
        pictureSolo: false,
        payment: false,
        menuSlider: false,
        userDialog: false,
        deleteWork: false,
        loading: false,
        paypal: false,
    }
    // modal states
    const [modalState, setModalState] = useState(modalValues);
    // background blur states
    const [blurBg, setBlurBg] = useState(false);
    const [blurBgExtra, setBlurBgExtra] = useState(false);
    const [blurBgParent, setBlurBgParent] = useState(false);
    // open modals
    const openModal = (val) => {
        if (val === "message" || val === "pictureSolo" || val === "login" || val === "register" || val === "payment" || val === "paypal") {
            if (val === "login") {
                setModalState(prev => ({ ...prev, [val]: true, register: false }));
            } else if (val === "register") {
                setModalState(prev => ({ ...prev, [val]: true, login: false }));
            }
            setModalState(prev => ({ ...prev, [val]: true }));
            setBlurBgExtra(true);
        } else if (val === "loading") {
            setBlurBgParent(true);
            setModalState(prev => ({ ...prev, [val]: true }));
        } else {
            setModalState({ ...modalValues, [val]: true });
            if (val !== "userDialog") {
                setBlurBg(true);
            }
        }
    }
    // close modals
    const closeModal = (val) => {
        setModalState(prev => ({ ...prev, [val]: false }));
        if (val === "message" || val === "pictureSolo" || val === "login" || val === "register" || val === "payment" || val === "paypal") {
            setBlurBgExtra(false);
        } else if (val !== "userDialog" && val !== "loading") {
            setBlurBg(false);
        } else if (val === "loading") {
            setBlurBgParent(false);
        }
    }

    // toggle modals
    const toggleModal = (val) => {
        setModalState(prev => ({ ...prev, [val]: !prev[val] }))
    }
    // preventing background to be srolled
    // useEffect(() => {
    //     document.querySelector("body").style.overflowX = 'hidden';
    //     if (!modalState.userDialog || window.screen.width <= 500) {
    //         if (Object.values(modalState).every(e => e === false)) {
    //             document.querySelector("body").style.overflowY = 'visible';
    //         } else {
    //             document.querySelector("body").style.overflowY = 'hidden';
    //         }
    //     }
    // });

    // "pictures migration" to be appeared on every component
    const [imageSrc, setImageSrc] = useState("");



    // ******************************** API controller for user, adding work, favorite, payment, message ****************************
    // alert notifications 
    const settings = {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    }
    const notifySuccess = msg => toast.success(msg, settings);
    const notifyError = msg => toast.error(msg, settings);
    const notifyInfo = msg => toast.info(msg, settings);
    const notifyWarn = msg => toast.warn(msg, settings);
    // user api
    const [user, setUser] = useState("");
    const [work, setwork] = useState("");
    const [favoriteWork, setFavoriteWork] = useState("");

    // error
    const [error, seterror] = useState("");

    // loding

    // screen loading handler
    const startLoading = () => {
        openModal("loading")
    }

    const stopLoading = () => {
        closeModal("loading")
    }




    //<---------------- input data received ---------------->
    // Login request handler
    const submitLoginForm = async (e, data) => {
        e.preventDefault();
        const form = document.getElementById("login-form");
        startLoading();
        try {
            const res = await axios.post("/api/loginUser", data);
            setUser(res.data);
            closeModal("login");
            stopLoading();
            notifySuccess("You have logged in!");
            form.reset();
            // fetchWork("", "");
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // Register request handler
    const submitRegisterForm = async (e, data) => {
        e.preventDefault();
        const form = document.getElementById("register-form");
        startLoading();
        try {
            const res = await axios.post("/api/registerUser", data);
            setUser(res.data);
            closeModal("register");
            stopLoading();
            notifySuccess("Your account has registered!");
            form.reset();
            // fetchWork("", "");
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // Message request handler
    const submitMessageForm = async (e, data) => {
        e.preventDefault();
        startLoading();
        try {
            const res = await axios.post("/api/sendMessage", data);
            closeModal("message");
            stopLoading();
            notifySuccess(res.data.message)
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);

        }
    };

    // Payment request handler
    const submitPaymentForm = async (e, data) => {
        e.preventDefault();
        startLoading();
        try {
            await axios.post("/api/paymentMessage", data);
            const res = await axios.post("/api/payment", data);
            closeModal("payment");
            notifySuccess(res.data.message);
            stopLoading();
            openModal("paypal");
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // Edit user request handler
    const submitEditUserForm = async (e, data) => {
        e.preventDefault();
        startLoading();
        try {
            const res = await axios.put(`/api/updateUser/${user._id}`, data)
            stopLoading();
            notifySuccess(res.data.message);
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // Add work request handler
    const submitWorkForm = async (e, data) => {
        e.preventDefault();
        startLoading();
        const form = document.getElementById("addWork");
        try {
            const { file, ...other } = data;
            const fileData = new FormData()
            fileData.append("file", file);
            fileData.append("upload_preset", "my-uploads");
            const response = await axios.post("https://api.cloudinary.com/v1_1/dizu245lm/image/upload", fileData);
            const res = await axios.post("/api/addWork", { image: response.data.secure_url, ...other });
            stopLoading();
            form.reset();
            notifySuccess(res.data.message)
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // Get one work request handler
    const [toUpdateWork, setToUpdateWork] = useState("")
    const findOneWork = async (id) => {
        startLoading();
        try {
            const res = await axios.get(`/api/getOneWork/${id}`);
            setToUpdateWork(res.data);
            stopLoading();
            notifyInfo("The work has been found!");
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // Update work request handler
    const updateWork = async (e, data) => {
        e.preventDefault();
        startLoading();
        const form = document.getElementById("editWorkForm");
        try {
            let objUpdate = {}
            const { file, ...other } = data;
            if (file) {
                const fileData = new FormData()
                fileData.append("file", file);
                fileData.append("upload_preset", "my-uploads");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dizu245lm/image/upload", fileData);
                objUpdate.image = response.data.secure_url
            }
            const res = await axios.put(`/api/updateWork/${toUpdateWork._id}`, { ...objUpdate, ...other });
            stopLoading();
            form.reset();
            notifySuccess(res.data.message)
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };

    // delete Work
    const deleteWork = async (id) => {
        startLoading();
        try {
            const res = await axios.delete(`/api/deleteWork/${id}`);
            stopLoading();
            notifyInfo(res.data.message);
        } catch (err) {
            seterror(err);
            stopLoading();
            notifyError(err.response.data.message);
        }
    };
    // like specific work 
    const likeWork = async (id) => {
        try {
            const res = await axios.put(`/api/updateWork/${id}?favorite=like`, { favorite: { userId: user._id } });
            notifyInfo(res.data.message);

        } catch (err) {
            notifyError(err.response.data.message);
        }
    }
    // dislike specific work 
    const dislikeWork = async (id) => {
        try {
            const res = await axios.put(`/api/updateWork/${id}?favorite=dislike`, { favorite: { userId: user._id } });
            notifyInfo(res.data.message);

        } catch (err) {
            notifyError(err.response.data.message);
        }
    }

    // get all favorite work 
    const getFavoriteWork = async () => {
        startLoading();
        try {
            const res = await axios.get(`/api/getFavorite/${user._id}`);
            setFavoriteWork(res.data);
            stopLoading();
        } catch (err) {
            notifyError(err.response.data.message);
            stopLoading();
        }
    }
    // ---------------->>>>filters api<<<<<------------------ 


    // filter
    const [copyFilter, setCopyFilter] = useState({});
    const [copyKeyOrCat, setCopyKeyOrCat] = useState({});
    const [Url, setUrl] = useState("")
    let customURL = "";
    let copyCustomURL = "";
    // limit
    const [limit, setlimit] = useState(64);
    const limitIncrement = () => {
        setlimit(limit + 16)
        fetchWork("", "", limit);
    }
    const fetchWork = async (data, data2, limitVal) => {
        let obj = {};
        let obj2 = {};

        if (data) {
            obj = data;
            obj2 = copyKeyOrCat;
            setCopyFilter(data);

        } else {
            obj = copyFilter;
            obj2 = data2;
            setCopyKeyOrCat(data2);
        }

        const MinPrice = obj.minPrice || "minPrice=&";
        const MaxPrice = obj.maxPrice || "maxPrice=&";
        const Type = obj.type || "type=&";

        const Category = obj2.category || "category=&";
        const Keywords = obj2.keywords || "keywords=&";

        customURL = `/api/getWork/?${Category}${MinPrice}${MaxPrice}${Type}${Keywords}limit=32`;
        copyCustomURL = `/api/getWork/?${Category}${MinPrice}${MaxPrice}${Type}${Keywords}`;
        setUrl(`${copyCustomURL}limit=${limitVal || 48}`);


        startLoading();
        try {
            const finalUrl = (!data && !data2) ? (Url || customURL) : customURL;
            const res = await axios.get(finalUrl);
            setwork(res.data);
            stopLoading();
        } catch (err) {
            seterror(err);
            stopLoading();
        }
    };




    // caategories management on menuslider as well as on the main screen category bar

    const [chooseCategory, setChooseCategory] = useState({
        name: "All media",
        value: "",
    })
    const pickCategory = (name, value) => {
        fetchWork("", { category: value });
        setChooseCategory({ name, value });
    }

    return (
        <StateContext.Provider
            value={{
                openModal, closeModal, toggleModal, modalState,
                blurBg, blurBgExtra, blurBgParent,
                user, setUser, error,
                fetchWork, work, toUpdateWork, deleteWork, updateWork, setChooseCategory,
                likeWork, dislikeWork, getFavoriteWork, favoriteWork,
                limit, limitIncrement,
                imageSrc, setImageSrc,
                chooseCategory, pickCategory,
                submitLoginForm, submitRegisterForm, submitMessageForm, submitPaymentForm, submitEditUserForm, submitWorkForm, findOneWork,
                notifyInfo, notifyWarn, notifySuccess, notifyError
            }}
        >
            {children}
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </StateContext.Provider>
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;