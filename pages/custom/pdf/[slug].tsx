import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Layout from "../../layout";
import { client } from "../../../utils/client";
import { RoughNotation } from "react-rough-notation";

export default function Pdf() {
    const router = useRouter();
    const { slug } = router.query;
    const [loading, setLoading] = useState(false);
    const [response2, setResponse2] = useState({ answer: '' });
    let currentString = '';
    const [explainQuery, setExplainQuery] = useState('');
    const pdfURL = `https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2` + slug + '? alt = media';

    const handleQuerySubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        client.post('/explain', { query: explainQuery })
            .then(res => {
                setResponse2(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
        addToCurrentString();
    }

    function addToCurrentString() {
        if (currentString.length <= response2?.answer.length) {
            currentString += response2?.answer[currentString.length];

            setTimeout(addToCurrentString, 200);
        }
    }

    return (
        <Layout>
            <div className="flex gradient h-screen">
                <div className='flex flex-col w-[50vw] h-screen'>
                    <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={true}>
                        <h1 className='text-2xl border-b-2 border-green-200 font-bold m-4 p-2 pb-6'>{slug}</h1>
                    </RoughNotation>
                    <motion.div initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='flex flex-col items-center justify-center w-[100%] h-[80%]'>
                        <h2 className="font-bold text-xl mt-2">Explain Paper</h2>
                        <p className="text-sm">Copy paste text here</p>
                        <form onSubmit={handleQuerySubmit} className='w-full mt-8 flex flex-col items-center justify-center'>
                            <textarea rows={6} className='rounded-md focus:outline-none border-2 py-4 px-8 w-[80%]' value={explainQuery} onChange={(e) => setExplainQuery(e.target.value)} placeholder='Enter Your Query Here...' />
                            <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-8 px-4 hover:scale-105 transition-all'>Explain</button>
                        </form>
                        {
                            response2 &&
                            <div className="m-4 p-4 w-[40vw]">
                                {response2?.answer}
                            </div>
                        }
                        {
                            loading &&
                            <div className="m-4 p-4">Loading ...</div>
                        }
                    </motion.div>
                </div>
                <div className="w-[60vw] h-full">
                    <embed src={`https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2` + slug + '?alt=media'}
                        type="application/pdf" width="100%" height="100%"
                    ></embed>
                </div>
            </div>
        </Layout >
    );
}