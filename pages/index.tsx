import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const { user } = useUser();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (user) {
      setActive(true);
      toast.success('You are logged in!');
    }
  }, [user]);

  return (
    <div className="flex flex-col overflow-hidden h-screen items-center justify-center">
      <Toaster />
      <h1 className="font-bold text-8xl">ReSearch!</h1>
      <p className="mt-4 font-extralight text-xl">Exploring your study papers has never been easier!</p>
      {
        !active ?
          (
            <Link href='/api/auth/login' className='p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>Lets Get Started</Link>
          )
          :
          (
            <Link href='/search' className='p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>Continue To Read!</Link>
          )
      }

    </div>
  )
}
