import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Head from 'next/head'



const aboutUs = () => {
  return (
    <div className={`w-screen  min-h-screen lg:pt-[130px] pt-[85px] text-gray-300 flex justify-center items-center px-[20px] ${styles.fadeinAnime}`} >
      <Head>
        <title>MIB4u | About us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className='lg:w-[65vw] w-full' >
        <h1 className='text-[28px] md:text-[36px] font-bold text-center text-zinc-200 mb-[30px] md:mb-[80px]' >About us</h1>
        <h1 className='text-[20px] font-bold text-zinc-200 mb-4' >MIB4u</h1>
        <p className='text-[15px] text-zinc-500 mb-4' >
          Well, welcome! Come, come in! What have you stumbled upon? Well ... is it a place of ... chaos and order, good and evil ...? Look closely into my world, and you might realize that what you see you have had inside you for a long time already ...
        </p>
        <p className='text-[15px] text-zinc-500 mb-4' >
          WHO AM I?
        </p>
        <p className='text-[15px] text-zinc-500 mb-4' >
          The handle "MIB4u" is mine since school, and yes, there are impostors, but they are few.
          So, I finally secured the mib4u.com domain ... of course I would use it as a gallery. I'm a visual artist, after all.
          Martin Trebuch is my name, I live in Austria, if you're just a little internet savvy, you might even find out where exactly I live; not that it matters, especially in this context. I will try to work internationally, not that I really plan to travel anywhere ... but the internet makes it possible!
        </p>
        <p className='text-[15px] text-zinc-500 mb-4' >
          F.A.Q.
        </p>
        <p className='text-[15px] text-zinc-500 mb-4' >
          0. Zero. Nada. I have not gotten ANY questions so far, so I end this here.
          20221020033400
        </p>

        <Image
          src="/images/about-cover.jpg"
          width="550"
          height="350"
          alt="About Section Image"
          objectFit='contain'
        />
      </div>
    </div>
  )
}

export default aboutUs