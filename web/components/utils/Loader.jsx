import React from 'react'
import styles from '../../styles/Home.module.css'
import Logo from './Logo'


const Loader = ({ modalState }) => {
    return (
        <div className={`fixed inset-0 w-screen h-screen z-[17] ${modalState.loading ? styles.modalOpen : styles.modalOff}`} >
            <div className='w-full h-full relative grid place-items-center' >
                <div className={`w-fit h-fit ${styles.loading}`} >
                    <Logo loader footer />
                </div>
            </div>

        </div>
    )
}

export default Loader