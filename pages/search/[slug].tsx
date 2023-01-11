import React, { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout';
import { useUser } from '@auth0/nextjs-auth0';
import { IoIosArrowDown, IoIosMoon } from 'react-icons/io';
import { AiOutlineUser, AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { toast, Toaster } from 'react-hot-toast';
import { RoughNotation } from "react-rough-notation";

const SearchResults = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { slug } = router.query;
    const [newQuery, setNewQuery] = useState('')
    const { user } = useUser();

    const [pdfs, setPdfs] = useState('');
    const [modal, setOpenModal] = useState(false);
    const [userProfileMenu, setUserProfileMenu] = useState(false);
    const [modalContent, setModalContent] = useState({
        paper_title: '',
        paper_summary: '',
        paper_url: '',
    });
    const [response, setResponse] = useState([]);

    const openModal = (e: any) => {

        const url = e.paper_url;
        setPdfs(url);
        setOpenModal(true);
        setModalContent(e);
    }

    const handleClick = (e: any) => {
        router.push(`/pdf/${e.paper_title.replace(/ /g, '-')}`);
    }

    useEffect(() => {
        setLoading(true);
        client.post('/', { query: slug })
            .then(res => {
                setResponse(res.data.papers);
                toast.success(`Results for ${slug} found!`);
                setLoading(false);
            })
            .catch(err => {
                toast.error(`No results found for ${slug}!`);
                setLoading(false);
                console.error(err);
            })
    }, [slug]);

    const handleUserProfileClick = () => {
        setUserProfileMenu(!userProfileMenu);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.push(`/search/${newQuery}`);
    }

    return (
        <Layout className='overflow-hidden'>
            <div className='flex gradient'>
                <Toaster />
                {
                    response &&
                    <div className='border-2 border-green-100'>
                        <div className='p-3 flex flex-col gap-y-2 items-center justify-center'>
                            <h2 className='font-bold text-xl capitalize m-2'>Papers for: {slug}</h2>
                            <button className="border rounded border-black p-1 px-4 hover:bg-gray-50 transition-all hover:scale-105">
                                <Link href="/search">Go Back to Search</Link>
                            </button>
                        </div>
                        <div className='h-[84vh] w-[33vw] m-2 overflow-x-hidden scrollbarHide flex flex-col items-center'>
                            {
                                response.map((paper: any) => {
                                    return (
                                        <div key={paper.paper_title} className='w-full border-2 border-green-200 m-2 flex flex-col items-center justify-center'>
                                            <div className='flex bg-white flex-col items-center justify-center'>
                                                <div className='flex flex-wrap flex-col items-center justify-center'>
                                                    <h3 className='font-bold text-xl p-4 bg-[#f0fdf4]'>{paper.paper_title}</h3>
                                                    <p className='text-sm text-clip overflow-hidden h-32 p-4'>{paper.paper_summary}</p>
                                                </div>
                                                <button onClick={() => openModal(paper)} className='border text-sm hover:scale-105 transition-all border-black rounded-md p-2 mt-6 mb-2'>Continue Reading
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                loading &&
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='font-bold text-sm'>Loading...</p>
                                </div>
                            }
                        </div>
                    </div>
                }
                <div className='w-full h-[98vh] flex flex-col overflow-y-scroll items-center'>
                    {
                        user &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="border-b border-green-200 w-full flex items-center justify-between">

                            <form onSubmit={handleSubmit} className="flex rounded-full border-2 p-1 ml-12 items-center justify-center">
                                <input type="text" className=" text-green-600 focus:outline-none px-4 w-[40vw]" value={newQuery} onChange={(e) => setNewQuery(e.target.value)} placeholder="eg: GPT-3 Stable Diffusion etc..." />
                                <button className="flex items-center hover:scale-105 p-2 transition-all rounded-full  hover:bg-slate-700 hover:text-slate-50" type='submit'><AiOutlineSearch size={21} /></button>
                            </form>
                            {/*                             
                            <button className="hover:bg-gray-50 mx-2 rounded-full p-2 border transition-all hover:scale-105">
                                <IoIosMoon />
                            </button> */}
                            <div className="flex m-2  p-2 items-center justify-center">
                                <Image src={`${user.picture}`} alt="user-profile-picture" className="rounded-full" width={32} height={32} />
                                <div className="items-center flex p-2 sm:text-left">
                                    <p className="text-center font-semibold">
                                        {user.name}
                                    </p>
                                    {/* add an svg for a dropdown menu */}
                                    <button onClick={handleUserProfileClick} className=" hover:bg-gray-50 mx-2 rounded-full p-2 border transition-all hover:scale-105">
                                        <IoIosArrowDown />
                                    </button>
                                    {
                                        userProfileMenu &&
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute flex flex-col top-14 right-12 mt-2 rounded-md shadow-xl py-1">
                                            <Link className='flex items-center bg-white hover:bg-gray-50 m-1 p-2 px-4 text-sm text-center' href="/profile">
                                                <AiOutlineUser className='mr-2' />Profile
                                            </Link>
                                            <Link className='flex items-center bg-white hover:bg-gray-50 m-1 p-2 px-4 text-sm text-center' href="/api/auth/logout">
                                                <AiOutlineLogout className='mr-2' />Logout
                                            </Link>
                                        </motion.div>

                                    }
                                </div>
                            </div>
                        </motion.div>
                    }
                    {
                        modal &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col justify-center border-2 border-green-200 rounded-md items-center m-4 bg-white'>
                            <div className='flex rounded-md flex-col items-center justify-center p-8 glass'>
                                <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={modal}>
                                    <h1 className='font-bold text-3xl p-2 m-2'>{modalContent?.paper_title}</h1>
                                </RoughNotation>
                                <p className='w-[90%] font-bold underline text-xl mt-12'>Abstract</p>
                                <p className='w-[90%] text-base mt-2'>{modalContent?.paper_summary}</p>
                                <div>
                                    <button onClick={() => handleClick(modalContent)} className='border hover:scale-105 transition-all border-black hover:bg-green-50 rounded-md p-1 mt-6 mb-2 w-32'>View PDF</button>
                                </div>
                            </div>
                        </motion.div>
                    }

                </div>
            </div>
        </Layout>
    )
}

export default SearchResults