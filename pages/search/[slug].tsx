import React, { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../layout';
import { toast, Toaster } from 'react-hot-toast';
import { RoughNotation } from "react-rough-notation";

const SearchResults = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { slug } = router.query;

    const [pdfs, setPdfs] = useState('');
    const [modal, setOpenModal] = useState(false);
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

    return (
        <Layout className='overflow-hidden'>
            <div className='flex'>
                <Toaster />
                {
                    response &&
                    <div className='border border-black-2'>
                        <div className='p-3 w-[30vw] flex flex-col items-center justify-center'>
                            <h2 className='font-bold text-2xl capitalize m-2'>Search Results for: {slug}</h2>
                            <button className="border rounded border-black p-1 px-4 hover:bg-gray-50 transition-all hover:scale-105">
                                <Link href="/search">Go Back to Search</Link>
                            </button>
                        </div>
                        <div className='h-[83vh] w-[30vw] overflow-y-scroll border-2 flex flex-col items-center'>
                            {
                                response.map((paper: any) => {
                                    return (
                                        <div key={paper.paper_title} className='w-full p-2 flex flex-col items-center justify-center border-b border-black-2'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <div className='flex flex-wrap flex-col items-center justify-center'>
                                                    <h3 className='font-bold text-xl p-3 bg-green-50'>{paper.paper_title}</h3>
                                                    <p className='text-sm text-clip overflow-hidden w-96 h-32 p-2'>{paper.paper_summary}</p>
                                                </div>
                                                <button onClick={() => openModal(paper)} className='border hover:scale-105 transition-all border-black rounded-md p-2 mt-6 mb-2 w-32'>Read More</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                loading &&
                                <div className='flex flex-col items-center justify-center'>
                                    <h1 className='font-bold text-2xl'>Loading...</h1>
                                </div>
                            }
                        </div>
                    </div>
                }
                <div className='w-full h-[98vh] overflow-y-scroll flex items-center'>
                    {
                        modal &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col justify-center items-center m-4'>
                            <div className='flex bg-slate-100 glass rounded-md flex-col items-center justify-center p-8 border border-black'>
                                <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#fff000' show={modal}>
                                    <h1 className='font-bold text-3xl p-2 m-2'>{modalContent?.paper_title}</h1>
                                </RoughNotation>
                                <p className='w-[90%] font-bold text-2xl mt-12'>Abstract  {' '}</p>
                                <p className='w-[90%] text-lg mt-2'>{modalContent?.paper_summary}</p>
                                <div>
                                    <button onClick={() => handleClick(modalContent)} className='border hover:scale-105 transition-all border-black hover:bg-slate-100 rounded-md p-1 mt-6 mb-2 w-32'>View PDF</button>
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