import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { RoughNotation } from "react-rough-notation";
import Link from "next/link";
import Layout from './layout';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const { user } = useUser();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (user) {
      setActive(true);
      toast.success(`Welcome! ${user.name}`);
    }
  }, [user]);

  return (
    <Layout className='overflow-hidden'>
      <div className="flex flex-col gradient h-screen items-center justify-center">
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
                Continue To Read!
              </Link>
            </button>
        }

        <footer className='absolute bottom-4'>
          <p className='text-sm'>Follow
            <a className='hover:underline text-blue-600 hover:text-blue-600 transition-all' href="https://twitter.com/nawed2611"> @nawed2611</a> for updates
          </p>
        </footer>

      </div>
    </Layout>
  )
}
