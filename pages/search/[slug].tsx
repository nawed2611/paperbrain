import React, { useEffect, useState } from "react";
import { client } from "../../utils/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "../layout";
import { useUser } from "@auth0/nextjs-auth0";
import { BsArrowReturnLeft } from "react-icons/bs";
import { AiFillRead, AiFillFilePdf, AiOutlineStar } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import { RoughNotation } from "react-rough-notation";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const SearchResults = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { slug } = router.query;
  const { user } = useUser();

  const [pdfs, setPdfs] = useState("");
  const [modal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    paper_title: "",
    paper_summary: "",
    paper_url: "",
    paper_authors: [],
  });
  const [response, setResponse] = useState([]);

  const openModal = (e: any) => {
    const url = e.paper_url;
    setPdfs(url);
    setOpenModal(true);
    // convert e.paper_authors from string to array
    e.paper_authors = e.paper_authors.split(",");
    // console.log(e.paper_authors);
    modalContent.paper_authors = e.paper_authors;
    setModalContent(e);
  };

  const handleClick = (e: any) => {
    router.push(`/pdf/${e.paper_title.replace(/ /g, "-")}`);
  };

  useEffect(() => {
    setLoading(true);

    client
      .post("/", { query: slug })
      .then((res) => {
        setResponse(res.data.papers);
        toast.success(`Results for ${slug} found!`);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`No results found for ${slug}!`);
        setLoading(false);
        console.error(err);
      });
  }, [slug, user, router]);


  return (
    <Layout className='overflow-hidden'>
      <Toaster />

      <motion.div className='bg-white h-screen'>
        {user && <Navbar heading={true} />}
        <div className='flex'>
          {response && (
            <Sidebar
              papers={true}
              heading='Your Search results are here'
              response={response}
              openModal={openModal}
            />
          )}

          {modal ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='flex bg-white w-[90%] h-[85vh] border-2 border-gray-300 border-dashed rounded-lg flex-col items-center m-4'
            >
              <div className='h-[78vh] m-6'>
                <h1 className='font-bold text-xl px-4 text-center'>
                  {modalContent?.paper_title}
                </h1>
                <div className='h-[65vh]'>
                  <div className='inline-flex mx-4 mt-6'>
                    <p className='font-bold underline'>Authors: </p>
                    <p className='text-base mx-4'>
                      {modalContent?.paper_authors.join(" ; \u00A0\u00A0")}
                    </p>
                  </div>
                  <div className='flex flex-col m-4'>
                    <h1 className='font-bold underline m-2 text-center'>
                      Abstract
                    </h1>
                    <div className='h-[51vh] pr-2 overflow-y-auto'>
                      <p className='text-base'>{modalContent?.paper_summary}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='flex justify-center items-center gap-x-4 bottom-12 absolute'>
                    <button
                      onClick={() => handleClick(modalContent)}
                      className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-gray-600 cursor-pointer bg-gray-800 px-4 hover:scale-105 transition-all w-32'
                    >
                      <AiFillFilePdf />
                      View PDF
                    </button>
                    <button className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-gray-600 cursor-pointer bg-gray-800 px-4 hover:scale-105 transition-all w-32'>
                      <AiOutlineStar />
                      Star
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            !loading && (
              <div className='flex bg-white w-[90%] h-[85vh] border-2 border-gray-300 border-dashed rounded-lg flex-col items-center m-4 justify-center'>
                <div className='flex flex-col items-center justify-center p-8'>
                  <RoughNotation
                    animationDelay={1000}
                    animationDuration={2000}
                    type='highlight'
                    color='rgb(229 231 235)'
                    show={true}
                  >
                    <h1 className='flex items-center font-bold text-3xl p-2 m-2'>
                      Your Search Results are here{" "}
                      <BsArrowReturnLeft size={21} className='ml-4' />
                    </h1>
                  </RoughNotation>
                  <p className='w-[90%] text-base mt-2'>
                    Click on Continue Reading to open it here
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default SearchResults;
