import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import { storage } from '../config/firebase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineLogout, AiOutlineUpload } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Layout from './layout';

export default function Upload() {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (file.type !== 'application/pdf') {
            toast.error('Please upload a pdf file');
            return;
        }
        // Create a root reference
        const storageRef = ref(storage, 'pdfs/' + file.name + Date.now());

        // Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setProgress(progress);
        }
            , (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }
            , () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    toast.success('File uploaded successfully!');

                    router.push(`/custom/pdf/${downloadURL.replace('https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2', '')}`);
                });
            }
        );
    }

    const handleChange = (e: any) => {
        if (e.target.files[0].type == 'application/pdf') {
            setFile(e.target.files[0]);
        } else {
            // alert('Please upload a pdf file');
            setFile(e.target.files[0]);
        }
    }

    return (
        <Layout>
            <div><Toaster /></div>
            <main className='gradient h-screen flex items-center justify-center'>
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
                <div className='flex flex-col p-2 items-center gap-y-4'>
                    <h2 className='text-2xl'>
                        Upload your document
                    </h2>

                    {/* a form with styles for user to upload pdf */}
                    <form className='flex flex-col items-center gap-y-4' onSubmit={handleSubmit}>
                        <input type='file' onChange={handleChange} className='bg-gray-50 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded' />

                        {
                            file && (
                                <button
                                    type='submit'
                                    className='flex items-center gap-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
                                    <span>Upload</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>)
                        }
                        {
                            progress > 0 && (
                                <CircularProgressbar className='absolute bottom-32 w-24 h-24'
                                    styles={buildStyles({
                                        textSize: '10px',
                                        pathColor: '#8beb86',
                                    })}

                                    value={Math.floor(progress)} text={`${Math.floor(progress)}%`} />
                            )
                        }
                    </form>
                </div>

                {/* show loading spinner when processing pdf */}
                {
                    loading && (
                        <div className='flex flex-col items-center gap-y-4'>
                            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0a8 8 0 018 8H9a7 7 0 00-7-7v1zm0 0h1a8 8 0 018 8v-1a7 7 0 00-7-7zm0 0v1a8 8 0 01-8-8h1a7 7 0 007 7z"></path>
                            </svg>
                            <p className='text-xl'>Processing your document...</p>
                        </div>
                    )
                }

            </main>
        </Layout>
    )
}

