import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Link from "next/link"

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.push('/search')
  }

  return (
    <div className="flex flex-col overflow-hidden h-screen items-center justify-center">
      <h1 className="font-bold text-5xl">ReSearch!</h1>
      <p className="mt-4 font-extralight text-xl">Exploring your study papers has never been easier!</p>
      <Link href='/api/auth/login' className='p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105'>Lets Get Started</Link>
    </div>
  )
}
