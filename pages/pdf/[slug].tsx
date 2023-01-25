
import React, { useState, useEffect, use } from 'react';
import { client } from '../../utils/client';
import { useRouter } from 'next/router';
import { motion } from "framer-motion"
import Layout from '../layout';
import { toast } from 'react-hot-toast';
import { useUser } from '@auth0/nextjs-auth0';
import { Document, Page, pdfjs } from 'react-pdf';
import { RoughNotation } from 'react-rough-notation';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Chatbot from '../chatbot';

const ViewPdf = () => {
    const router = useRouter();
    const [response, setResponse] = useState({
        paper_title: '',
        paper_summary: '',
        paper_url: '',
    });
    let { slug } = router.query;
    slug = slug?.toString();
    slug = slug?.replace(/-/g, ' ');
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfURL, setPDFURL] = useState('');


    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setPageNumber(numPages);
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        client.post('/', { query: slug })
            .then(res => {
                setResponse(res.data.papers[0]);
                let id = res.data.papers[0].paper_url.split('/').pop();
                setPDFURL('https://arxiv.org/pdf/' + id + '.pdf');
            })
            .catch(err => {
                console.error(err)
            });

    }, [slug]);


    return (
        <Layout >
            <motion.div className='flex gradient'>
                <motion.div className='flex flex-col w-[50vw] h-screen'>
                    <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={true}>
                        <h1 className='text-2xl border-b border-green-200 font-bold m-4 p-2 pb-6'>{slug}</h1>
                    </RoughNotation>
                    <Chatbot name="arxiv" />
                </motion.div>

                <motion.div className='h-[99vh] rounded-md w-[60vw] mt-2 overflow-y-scroll overflow-x-hidden'>
                    {
                        pdfURL ?
                            <Document file={{
                                url: pdfURL
                            }}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={console.error}
                                loading={<div>Loading PDF...</div>}

                            >
                                {Array.from(new Array(pageNumber), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        className=""
                                        pageNumber={index + 1}
                                        scale={1.2}

                                    />
                                ))}
                            </Document>
                            :
                            <div className="absolute right-64 top-[50%] items-center justify-center">
                                Loading PDF...
                            </div>
                    }
                </motion.div>
            </motion.div>

        </Layout>
    )
}

export default ViewPdf;