import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineArrowDown, AiOutlineSearch, AiOutlineLogout, AiOutlineUpload } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RoughNotation } from "react-rough-notation";

import Layout from './layout';

const Search = () => {
  const [query, setQuery] = useState('');
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  }

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
  }, [user, router]);


  return (
    <Layout>
      <div className='flex gradient h-screen w-screen'>
        {
          user &&
          <motion.div initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-4 right-4 py-8 px-8 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <Image src={`${user.picture}`} alt="user-profile-picture" className="rounded-full w-16 h-16" width={16} height={16} />
            <div className="text-center flex  items-center space-y-2 sm:text-left">
              <div className="space-y-0.5 mb-2">
                <p className=" text-black font-semibold">
                  {user.name}
                </p>
                <p className="text-slate-500 font-medium">
                  {user.email}
                </p>
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-1  m-2 text-center transition-all text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                {isOpen ? <IoIosArrowUp size={21} /> : <IoIosArrowDown size={21} />}
              </motion.button>

              {
                isOpen &&
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}

                  className='absolute top-16 border-2 border-green-100 right-8 w-44 bg-white z-12 flex flex-col m-2 '>
                  <Link scroll={false} href='/api/auth/logout' className="flex items-center p-2 m-1 text-center transition-all text-sm text-green-600 font-semibold rounded-lg  hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                    <AiOutlineLogout size={21} className='mr-2' />Logout
                  </Link>

                  <Link scroll={false} href='/upload' className="flex items-center p-2 m-1 text-center transition-all text-sm text-green-600 font-semibold rounded-lg hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                    <AiOutlineUpload size={21} className='mr-2' />Upload Papers
                  </Link>
                </motion.div>

              }

            </div>
          </motion.div>
        }

        <div className='flex items-center justify-center w-full'>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center p-12'>

            <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#cdf5d9' show={true}>
              <div className='p-8'>
                <h1 className='text-4xl text-gray-900 font-bold'>Looking for Research Papers?</h1>
                <h1 className='text-2xl text-gray-500 font-bold'>We have got you covered.</h1>
              </div>
            </RoughNotation>

            <form onSubmit={handleSubmit} className="flex rounded-full border-2 p-2 mt-6 items-center justify-center">
              <input type="text" className="text-green-600 focus:outline-none px-4 bg-transparent w-[30vw]" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="eg: GPT-3 Stable Diffusion etc..." />
              <button className="flex items-center hover:scale-105 p-2 transition-all rounded-full  hover:bg-green-900 hover:text-slate-50" type='submit'><AiOutlineSearch size={21} /></button>
            </form>
          </motion.div>
        </div>
      </div >
    </Layout>
  )
}

export default Search