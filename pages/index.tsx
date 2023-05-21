import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { RoughNotation } from "react-rough-notation";
import Link from "next/link";
import Layout from './layout';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Logo from '../public/logo.png';

export default function Home() {
  const { user } = useUser();
  const [active, setActive] = useState(false);

  const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
  }, []);

 if (isMobile) {
    return (
      <div>
        <h1>This is the mobile version of the app.</h1>
        <p>Here are some features that are only available on mobile devices:</p>
        <ul>
          <li>A smaller layout that is easier to use on a small screen</li>
          <li>A touch-friendly interface</li>
          <li>Some exclusive content that is not available on the desktop version</li>
        </ul>
        <Layout className='overflow-hidden '>
          <div className="flex flex-col bg items-center justify-center">
            <div className=' flex flex-col w-full h-screen items-center justify-center'>

              <div className='m-6'>
                <Image src={Logo} className="rounded" alt="PaperBrain" width={64} height={64} />
              </div>
              <Toaster />
              <RoughNotation animationDelay={1000} animationDuration={2000} type="box" show={true}>
                <h1 className="font-bold text-8xl">PaperBrain</h1>
              </RoughNotation>
              <p className="mt-4 font-extralight text-xl">Exploring your study papers has never been easier!</p>
              {
                !active ?
                  <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>
                    <Link href='/api/auth/login'>
                      Lets Get Started
                    </Link>
                  </button>
                  :
                  <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>
                    <Link href='/search'>
                      Start Reading!
                    </Link>
                  </button>
              }

              <footer className='absolute bottom-4'>
                <p className='text-sm'>Follow
                  <a className='hover:underline text-blue-600 hover:text-blue-600 transition-all' href="https://twitter.com/__paperbrain"> @__paperbrain</a> for updates
                </p>
              </footer>
            </div>

            
          </div>

        </Layout >
      </div>
    );
  } else {
  return (
    <Layout className='overflow-hidden '>
      <div className="flex flex-col bg items-center justify-center">
        <div className=' flex flex-col w-full h-screen items-center justify-center'>

          <div className='m-6'>
            <Image src={Logo} className="rounded" alt="PaperBrain" width={64} height={64} />
          </div>
          <Toaster />
          <RoughNotation animationDelay={1000} animationDuration={2000} type="box" show={true}>
            <h1 className="font-bold text-8xl">PaperBrain</h1>
          </RoughNotation>
          <p className="mt-4 font-extralight text-xl">Exploring your study papers has never been easier!</p>
          {
            !active ?
              <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>
                <Link href='/api/auth/login'>
                  Lets Get Started
                </Link>
              </button>
              :
              <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>
                <Link href='/search'>
                  Start Reading!
                </Link>
              </button>
          }

          <footer className='absolute bottom-4'>
            <p className='text-sm'>Follow
              <a className='hover:underline text-blue-600 hover:text-blue-600 transition-all' href="https://twitter.com/__paperbrain"> @__paperbrain</a> for updates
            </p>
          </footer>
        </div>

        
      </div>

    </Layout >
  )
}
