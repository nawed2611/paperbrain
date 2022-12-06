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
      console.log(user);
      setActive(true);
      toast.success(`Welcome! ${user.name}`);
    }
  }, [user]);

  return (
    <Layout className='overflow-hidden'>
      <div className="flex flex-col h-screen items-center justify-center">
        <Toaster />
        <div className='flex text-gray-900 mb-20 gap-4'>
          <Link className='hover:scale-105 hover:underline transition-all' href="https://github.com/nawed2611/metrohacks">Code</Link>
          <Link className='hover:scale-105 hover:underline transition-all' href="https://github.com/nawed2611/metrohacks">Devpost</Link>
        </div>
        <RoughNotation animationDelay={1000} animationDuration={2000} type="box" show={true}>
          <h1 className="font-bold text-8xl">ReSearch!</h1>
        </RoughNotation>
        <p className="mt-4 font-extralight text-xl">Exploring your study papers has never been easier!</p>
        {
          !active ?
            <Link scroll={false} href='/api/auth/login' className='p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>Lets Get Started</Link>
            :
            <Link scroll={false} href='/search' className='p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>Continue To Read!</Link>
        }
      </div>
    </Layout>
  )
}
