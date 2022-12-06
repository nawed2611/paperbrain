import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const [modalContent, setModalContent] = useState('');
    const [response, setResponse] = useState([]);

    const openModal = (e: any) => {
        const url = e.target.value.split(",", 2);
        setPdfs(url);
        setOpenModal(true);
        let a = e.target.value.replace(url[0], '')
        a = e.target.value.replace(url[1], '')
        setModalContent(a);
    }

    const handleClick = (e: any) => {
        console.log('clicked', e.target.value.split(",", 2));
        router.push(`/pdf/${e.target.value.split(",", 2)[1]}`, `/pdf/${e.target.value.split(",", 2)[0]}`);
    }

    useEffect(() => {
        console.log(slug);
        setLoading(true);
        axios.post(`${process.env.BACKEND_URL}` + '/', { query: slug })
            .then(res => {
                console.log(res.data);
                setLoading(false);
                setResponse(res.data.papers);
                toast.success(`Results for ${slug} found!`);

            })
            .catch(err => {
                console.error(err)
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
                            <Link className="border rounded border-black p-1 px-4 hover:bg-gray-50 transition-all hover:scale-105" href="/search">Go Back</Link>
                        </div>
                        <div className='w-96 h-[83vh] overflow-y-scroll border-2 flex flex-col items-center'>
                            {
                                response.map((item, index) => {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            key={index}
                                            className='w-full flex justify-center glass flex-col p-2 border-black hover:bg-gray-100'>
                                            <h2 className='p-4 font-bold rounded-md text-lg capitalize'>{item[0]}</h2>
                                            <button onClick={openModal} value={item} className='border border-black hover:bg-gray-50 hover:scale-105 transition-all w-[60%] rounded-md p-2 m-2 text-sm mx-auto'>View Abstract</button>
                                        </motion.div>

                                    )
                                })
                            }
                            {
                                loading &&
                                <div className='h-64'>
                                    Loading...
                                </div>
                            }
                        </div>
                    </div>
                }
                <div className='w-full h-[98vh] overflow-y-scroll '>
                    {
                        modal &&
                        <motion.div initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col justify-center items-center m-4'>
                            <div className='flex bg-slate-100 glass rounded-md flex-col items-center justify-center p-8 border border-black'>
                                <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#fff000' show={modal}>
                                    <h1 className='font-bold text-3xl p-2 m-2'>{modalContent.substring(0, modalContent.indexOf(','))}</h1>
                                </RoughNotation>
                                <p className='w-[90%] mt-12'><strong className='font-bold'>Abstract: {' '}</strong> {modalContent.substring(modalContent.indexOf(',') + 2)}</p>
                                <div>
                                    <RoughNotation animationDelay={1000} animationDuration={2000} type="underline" show={modal}>
                                        <button onClick={handleClick} value={pdfs} className='border hover:scale-105 transition-all border-black hover:bg-slate-100 rounded-md p-2 mt-6 mb-2 w-32'>View PDF</button>

                                    </RoughNotation>
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