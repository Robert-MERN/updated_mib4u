import React, { useState, useEffect } from 'react'
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import styles from '../styles/Home.module.css'
import useStateContext from '../context/ContextProvider';
import Login from "../components/Login";
import Filter from '../components/Filter';
import Register from '../components/Register';
import PictureMenu from '../components/PictureMenu';
import Message from '../components/Message';
import PictureSolo from '../components/PictureSolo';
import Payment from '../components/Payment';
import MenuSlider from '../components/MenuSlider';
import LogoutDialog from '../components/LogoutDialog';
import DeleteWorkDialog from "../components/settings/DeleteWorkDialog";
import Loader from '../components/utils/Loader';
import Paypal from '../components/Paypal';


const Layout = ({ children }) => {

    const { blurBg, blurBgExtra, blurBgParent, closeModal, openModal, modalState, notificationTrigger } = useStateContext();
    const [showNavBG, setShowNavBG] = useState(false);
    const controlNavbar = () => {
        if (window.scrollY > 160) {
            setShowNavBG(true);
        } else {
            setShowNavBG(false);

        }
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    }, []);
    return (
        <div className={`${styles.container} bg-zinc-900 relative w-screen min-h-screen`} >
            <Filter modalState={modalState} close={closeModal} />
            <Login open={openModal} modalState={modalState} close={closeModal} />
            <Register open={openModal} modalState={modalState} close={closeModal} />
            <PictureMenu modalState={modalState} close={closeModal} />
            <Navbar navBg={showNavBG} />
            <Message modalState={modalState} close={closeModal} />
            <PictureSolo modalState={modalState} close={closeModal} />
            <Payment modalState={modalState} close={closeModal} />
            <LogoutDialog modalState={modalState} close={closeModal} />
            <Paypal modalState={modalState} close={closeModal} />
            <DeleteWorkDialog modalState={modalState} close={closeModal} />
            <MenuSlider modalState={modalState} close={closeModal} open={openModal} />
            <Loader modalState={modalState} />
            <div className={` bg-zinc-900 ${blurBgExtra || blurBgParent ? "blur-[8px] opacity-30" : (blurBg ? "blur-[7px] opacity-40" : "blur-none opacity-100")} transition-all duration-200`} >
                {children}
                <Footer />
            </div>

        </div>
    )
}

export default Layout