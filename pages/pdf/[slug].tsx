import React, { useState, useEffect, use } from "react";
import { client } from "../../utils/client";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Layout from "../layout";
import Navbar from "../../components/navbar";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "@auth0/nextjs-auth0";
import { Document, Outline, Page, pdfjs } from "react-pdf";
import { RoughNotation } from "react-rough-notation";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import Chatbot from "../../components/chatbot";

const ViewPdf = () => {
  const router = useRouter();
  const [response, setResponse] = useState({
    paper_title: "",
    paper_summary: "",
    paper_url: "",
  });
  let { slug } = router.query;
  slug = slug?.toString();
  slug = slug?.replace(/-/g, " ");
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfURL, setPDFURL] = useState("");

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setPageNumber(numPages);
  };

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    client
      .post("/", { query: slug })
      .then((res) => {
        setResponse(res.data.papers[0]);
        let id = res.data.papers[0].paper_url.split("/").pop();
        setPDFURL("https://arxiv.org/pdf/" + id + ".pdf");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [slug]);

  return (
    <Layout>
      <Navbar heading={true} />

      <motion.div className='flex h-[91vh]'>
        <motion.div className='flex flex-col w-[50vw]'>
          <h1 className='text-xl border-b border-gray-300 font-semibold mx-4 p-2'>
            {slug}
          </h1>
          {/* </RoughNotation> */}
          <motion.div className='min-h-[50vh] overflow-y-auto scroll-smooth'>
            {/* {
                            response.paper_title && <h1 className='border-2 border-green-200 bg-white m-4 p-2 pb-6'><strong>Abstract - </strong>{response.paper_summary}</h1>
                        } */}

            <Chatbot name='arxiv' f_path='' />
          </motion.div>
        </motion.div>

        <motion.div className='rounded-md flex justify-center w-[60vw] overflow-y-auto overflow-x-hidden'>
          {pdfURL ? (
            <embed
              src={pdfURL}
              type='application/pdf'
              width='100%'
              height='100%'
            />
          ) : (
            <h1 className='text-2xl border-b border-green-200 font-bold m-4 p-2 pb-6'>
              Loading...
            </h1>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default ViewPdf;
