import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../layout';

const SearchResults = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { slug } = router.query;
    const [pdfs, setPdfs] = useState('');
    const [modal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [response, setResponse] = useState([]);
    const [starred, setStarred] = useState(false);

    const openModal = (e: any) => {
        console.log('lol', e.target.value.split(",", 2));
        const url = e.target.value.split(",", 2);
        console.log('url', url);
        setPdfs(url);
        console.log('opening modal', e.target.value);
        setOpenModal(true);
        let a = e.target.value.replace(url[0], '')
        a = e.target.value.replace(url[1], '')
        console.log('a', a);
        setModalContent(a);
    }

    const handleClick = (e: any) => {
        console.log('clicked', e.target.value.split(",", 2));
        router.push(`/pdf/${e.target.value.split(",", 2)[1]}`, `/pdf/${e.target.value.split(",", 2)[0]}`);
    }

    const handleStarred = (e: any) => {
        console.log('starred', e.target.value);

        axios.post(`http://localhost:5000/starred`, { query: e.target.value })
            .then(res => {
                console.log(res.data);
                setStarred(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }


    useEffect(() => {
        console.log(slug);
        setLoading(true);
        axios.post(`http://localhost:5000/`, { query: slug })
            .then(res => {
                console.log(res.data);
                setLoading(false);
                setResponse(res.data.bruh);

            })
            .catch(err => {
                console.error(err)
            })
    }, [slug]);

    return (
        <Layout>
            <div className='flex ring overflow-y-hidden'>
                {
                    response &&
                    <div className='h-screen border border-black-2'>
                        <div className='p-3 w-[30vw] flex flex-col items-center justify-center'>
                            <h2 className='font-bold text-2xl capitalize m-2'>Search Results for: {slug}</h2>
                            <Link className="border border-black p-1 px-4 rounded hover:bg-slate-100" href="/search">Go Back</Link>
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
                                            className='flex justify-center glass flex-col p-2 border-black'>
                                            <h2 className='p-4 font-bold rounded-md text-xl capitalize'>{item[0]}</h2>
                                            <button onClick={openModal} value={item} className='border border-black hover:bg-slate-100 rounded-md p-2 m-2'>View Abstract</button>
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
                <div className='w-full'>
                    {
                        modal &&
                        <motion.div initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='h-screen flex flex-col justify-center items-center m-4'>
                            <div className='flex bg-slate-100 glass rounded-md flex-col items-center justify-center p-12 mx-12 border border-black'>
                                <h1 className='font-bold text-3xl p-2 m-2'>{modalContent.substring(0, modalContent.indexOf(','))}</h1>
                                <p><strong className='font-bold text-xl'>Abstract:</strong> {modalContent.substring(modalContent.indexOf(',') + 2)}</p>
                                <button onClick={handleClick} value={pdfs} className='border border-black hover:bg-slate-100 rounded-md p-2 mt-6 mb-2 w-32'>View PDF</button>
                                <button onClick={handleStarred} value={modalContent} className='border border-black w-32 hover:bg-slate-100 rounded-md p-2 m-2'>Star</button>
                            </div>
                        </motion.div>
                    }
                </div>
            </div>

        </Layout>
    )
}

export default SearchResults