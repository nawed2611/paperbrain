import React, { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import axios from 'axios';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout';
import { useUser } from '@auth0/nextjs-auth0';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillRead, AiFillFilePdf, AiOutlineLogout, AiOutlineStar, AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai';
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

        if (!slug) return;

        if (!user) {
            toast.error('You are not logged in!');
            setLoading(false);
            router.push('/');
            return;
        }

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

    const handleStarred = (e: any) => {
        const { paper_title, paper_summary, paper_url } = e;
        axios.post('http://localhost:8800/api/users/addPaper', {
            username: user?.name,
            email: user?.email,
            paperName: paper_title,
            paperAbstract: paper_summary,
            paperURL: paper_url,
            starred: true,
        })
            .then(res => {
                toast.success('Paper added to starred!');
            })
            .catch(err => {
                toast.error('Something went wrong!');
                console.error(err);
            })
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
                            <button className="p-2 text-sm text-center rounded-lg border border-green-700 cursor-pointer bg-white-700 px-4 hover:scale-105 transition-all">
                                <Link href="/search" className='flex items-center gap-x-2'><BiArrowBack />Go Back to Search</Link>
                            </button>
                        </div>
                        <div className='h-[84vh] w-[28vw] m-2 overflow-x-hidden scrollbarHide flex flex-col items-center'>
                            {
                                response.map((paper: any) => {
                                    return (
                                        <div key={paper.paper_title} className='w-full rounded-md border-2 border-green-200 m-2 flex flex-col items-center justify-center'>
                                            <div className='flex bg-white flex-col items-center justify-center'>
                                                <div className='flex flex-wrap flex-col items-center justify-center'>
                                                    <h3 className='font-bold text-xl p-4 bg-[#f0fdf4]'>{paper.paper_title}</h3>
                                                    <p className='text-sm text-clip overflow-hidden h-32 p-4'>{paper.paper_summary}</p>
                                                </div>
                                                <button onClick={() => openModal(paper)} className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 mt-4 m-2 px-4 hover:scale-105 transition-all'><AiFillRead />Continue Reading
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
                <div className='w-full h-[95vh] flex flex-col overflow-y-scroll items-center'>
                    {
                        user &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="border-b border-green-200 w-full z-10 flex items-center justify-between">

                            <form onSubmit={handleSubmit} className="flex rounded-full border border-green-300 p-1 ml-12 items-center justify-center">
                                <input type="text" className=" text-green-600 focus:outline-none px-4 placeholder:text-gray-500 w-[40vw]" value={newQuery} onChange={(e) => setNewQuery(e.target.value)} placeholder="eg: GPT-3 Stable Diffusion etc..." />
                                <button className="flex items-center hover:scale-105 p-2 transition-all rounded-full  hover:bg-slate-700 hover:text-slate-50" type='submit'><AiOutlineSearch size={21} /></button>
                            </form>
                            {/*                             
                            <button className="hover:bg-gray-50 mx-2 rounded-full p-2 border transition-all hover:scale-105">
                                <IoIosMoon />
                            </button> */}
                            <div className="flex m-2 p-2 items-center justify-center">
                                <Image src={`${user.picture}`} alt="user-profile-picture" className="rounded-full" width={32} height={32} />
                                <div className="items-center flex p-2 sm:text-left">
                                    <p className="text-center font-semibold">
                                        {user.name}
                                    </p>
                                    {/* add an svg for a dropdown menu */}
                                    <motion.button
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        onClick={handleUserProfileClick} className="p-1  m-2 text-center transition-all text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                                        {
                                            userProfileMenu ?
                                                <IoIosArrowUp size={21} />
                                                :
                                                <IoIosArrowDown size={21} />
                                        }
                                    </motion.button>
                                    {
                                        userProfileMenu &&
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-16 right-8 w-44 border-2 rounded-md  border-green-100 bg-white z-12 flex flex-col m-2">
                                            {/* <Link className='flex items-center bg-white hover:bg-gray-50 m-1 p-2 px-4 text-sm text-center' href="/profile">
                                                <AiOutlineUser className='mr-2' />Profile
                                            </Link> */}
                                            <Link className='flex items-center p-2 m-1 text-center transition-all text-sm text-green-600 font-semibold rounded-lg  hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2' href="/api/auth/logout">
                                                <AiOutlineLogout className='mr-2' />Logout
                                            </Link>
                                            <Link className='flex items-center p-2 m-1 text-center transition-all text-sm text-green-600 font-semibold rounded-lg  hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2' href="/upload">
                                                <AiOutlineUpload className='mr-2' />Upload Papers
                                            </Link>
                                        </motion.div>
                                    }
                                </div>
                            </div>
                        </motion.div>
                    }
                    {
                        modal ?
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className='flex h-full overflow-y-scroll z-100 flex-col justify-center border-2 border-green-200 rounded-md items-center m-4 bg-white'>
                                <div className='flex rounded-md flex-col items-center justify-center p-8'>
                                    <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={modal}>
                                        <h1 className='font-bold text-3xl p-2 m-2 mt-8'>{modalContent?.paper_title}</h1>
                                    </RoughNotation>
                                    <p className='w-[90%] font-bold underline text-xl mt-12'>Abstract</p>
                                    <p className='w-[90%] text-base mt-2'>{modalContent?.paper_summary}</p>
                                    <div className='w-1/2 flex justify-center items-center mt-4'>
                                        <button onClick={() => handleClick(modalContent)} className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 mt-4 m-2 px-4 hover:scale-105 transition-all w-32'><AiFillFilePdf />View PDF</button>
                                        {/* <button onClick={() => handleStarred(modalContent)} className='items-center flex gap-x-2 p-2 text-green-700 border-green-700 border text-sm text-center rounded-lg hover:bg-gray-50 cursor-pointer mt-4 m-2 px-4 hover:scale-105 transition-all w-32'><AiOutlineStar />Star</button> */}
                                    </div>
                                </div>
                            </motion.div>
                            :
                            !loading &&
                            <div className='flex bg-white w-[90%] h-full border-2 border-green-200 flex-col items-center m-4 justify-center'>
                                <div className='flex flex-col items-center justify-center p-8'>
                                    <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={true}>
                                        <h1 className='flex items-center font-bold text-3xl p-2 m-2'>Your Search Results are here <BsArrowReturnLeft size={21} className="ml-4" /></h1>
                                    </RoughNotation>
                                    {/* <p className='w-[90%] font-bold underline text-xl mt-12'>Abstract</p> */}
                                    <p className='w-[90%] text-base mt-2'>Click on Continue Reading to open it here</p>
                                </div>

                            </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default SearchResults